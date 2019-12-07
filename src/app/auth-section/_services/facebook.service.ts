import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/_services/server.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

	FB_APP_ID: number = environment.fbAppID;

  constructor(
    private server: ServerService,
    public navCtrl: NavController,
    private fb: Facebook,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
  ) { }



  async doFbLogin() {

		const loading = await this.loadingController.create({
			message: 'Please wait...'
    });

    this.presentLoading(loading);

		let permissions = new Array<string>();

		// the permissions your facebook app needs from the user

    permissions = ['public_profile', 'email'];

		this.fb.login(permissions)
		.then(async (response: FacebookLoginResponse) => {

      const userId = response.authResponse.userID;
      await this.saveFBUser(userId).then( (data: any) => {
				console.log(data.token);
				this.nativeStorage.setItem('user_token', data.token);
				this.router.navigate(['/events']);

			});

			// Getting name and gender properties

      this.fb.api('/me?fields=name,email', permissions)
			.then(user => {
				user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
				// now we have the users info, let's save it in the NativeStorage
				this.nativeStorage.setItem('facebook_user',
				{
					name: user.name,
					email: user.email,
					picture: user.picture
				})
				.then(() => {
          console.log(user);
					// this.router.navigate(['events']);
					loading.dismiss();
				}, error => {
					console.log(error);
					loading.dismiss();
				});
			});
		}, error => {
			console.log(error);
			loading.dismiss();
		});
  }

  async saveFBUser(userId: string) {
    console.log(userId);
    const url = 'loginFacebook';
    const body = {
      facebook_id: userId
    };

    try {

      const res = await this.server.ServerPost(url, body);
      res.subscribe( (data: any) => {
				console.log('data', data);
					return data;
				});

    } catch (error) {
      console.error(error);
    }


  }

	async presentLoading(loading) {
		return await loading.present();
  }

	doFbLogout() {
		this.fb.logout()
		.then(res => {
			// user logged out so we will remove him from the NativeStorage
			this.nativeStorage.remove('facebook_user');
			this.router.navigate(['/events']);
		}, error => {
			console.log(error);
		});
	}
}

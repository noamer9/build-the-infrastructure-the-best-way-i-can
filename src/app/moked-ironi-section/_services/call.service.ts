import { LoaderService } from './../../_services/loader.service';
import { GlobalService } from './../../_services/global.service';
import { User, UserInfo } from './../../auth-section/model/user';
import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/_services/server.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Subject } from 'rxjs';
import { Call } from './../model/call';
@Injectable({
  providedIn: 'root'
})
export class CallService {

  call: Call;

  constructor( private server: ServerService,
    public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private global: GlobalService,
    private platform: Platform,
    private loader: LoaderService,
    private toastController: ToastController) { }

  async mokedIroniCall(call: Call, fd?: FormData) {
		const url = 'moked';
		const body = call;
		const loading = await this.loader.presentLoadingWithOptions();

		console.log(fd);
		try {
			if (fd) {
				const imageRes = await this.server.ServerUpload('moked/image', fd);
				imageRes.subscribe( async (data: any) => {
					console.log(data);
					if (data) {
						call.avatar = data.data;
						console.log("call avatar :", call);
						const res = await this.server.ServerPost(url, body);
						res.subscribe( (data: any) => {
							if (data.success) {
								this.presentToast('   פרטי פנייה נשלחו בהצלחה');
								this.router.navigate([`/moked-ironi/${call.user_id}`]);
							
							}
						});
					}
				});
			} else {

				const res = await this.server.ServerPost(url, body);
				res.subscribe( (data: any) => {
					if (data.success) {
						this.presentToast('פרטי פנייה נשלחו בהצלחה');
						this.router.navigate([`/moked-ironi/${call.user_id}`]);
					}
				});
			}

    } catch (error) {
      console.error(error);
    } finally {
			this.loader.loadingDismiss(loading);
		}

  }
  

  async presentToast(msg: string) {
		console.log('present toast');
		const toast = await this.toastController.create({
			message: msg,
			duration: 2000,
			position: 'top'
		});
		toast.present();
	}
}

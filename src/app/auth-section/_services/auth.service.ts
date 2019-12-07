import { LoaderService } from './../../_services/loader.service';
import { GlobalService } from './../../_services/global.service';
import { User, UserInfo } from './../model/user';
import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/_services/server.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

	public userObservable = new Subject<User>();
	public userIdObservable = new Subject<number>();
	private user: User;

  constructor(
      private server: ServerService,
      public navCtrl: NavController,
      private nativeStorage: NativeStorage,
      public loadingController: LoadingController,
			private router: Router,
			private global: GlobalService,
			private platform: Platform,
			private loader: LoaderService,
			private toastController: ToastController
  ) { }

  async login(user: User, firstTime?: boolean) {
		const url = 'login';
		const body = user;

		const loading = await this.loader.presentLoadingWithOptions('בודק פרטים...');
		try {
      const res = await this.server.ServerPost(url, body);
      res.subscribe( (data: any) => {
				if (data.user !== null) {

					// if (this.platform.is('android')) {
					// 	this.nativeStorage.setItem('user_token', data.token);

					// } else {
					// }
					localStorage.setItem('user_token', data.token);

					console.log(data.user);
					this.userObservable.next({...data.user});
					this.global.userObservable.next({...data.user});
					this.global.user = {...data.user};
					this.global.loginObservable.next(true);
					this.global.isLogin = true;
					this.presentToast('משתמש מחובר');
					if(firstTime) {
						this.router.navigate(['events']);
					}

				}
			});


    } catch (error) {
      console.error(error);
    } finally {
			this.loader.loadingDismiss(loading);
		}

  }

  async register(user: User) {
		const url = 'register';
		const body = user;
		const loading = await this.loader.presentLoadingWithOptions('מעדכן פרטים...');

		try {

      const res = await this.server.ServerPost(url, body);
      res.subscribe( (data: any) => {
				if (data.user !== null) {
					this.userIdObservable.next(data.userId);
					this.user = user;
					this.presentToast('משתמש נרשם בהצלחה');

				}
			});

    } catch (error) {
      console.error(error);
    } finally {
			this.loader.loadingDismiss(loading);
		}

	}

	async updateUser(user: User, id: number) {
		const url = `users/${id}`;
		const body = user;
		const loading = await this.loader.presentLoadingWithOptions('מעדכן פרטים...');

		try {

      const res = await this.server.ServerPut(url, body);
      res.subscribe( (data: any) => {
				if (data.user !== null) {
					this.userIdObservable.next(data.data.id);
					this.loader.loadingDismiss(loading);

					this.presentToast('משתמש עודכן בהצלחה');

				}
			});

    } catch (error) {
			this.loader.loadingDismiss(loading);
			console.error(error);
		} finally {
			this.loader.loadingDismiss(loading);
		}
	}

	async getUserById(id: number) {
		const url = `users/${id}`;
		const loading = await this.loader.presentLoadingWithOptions('מעדכן פרטים...');

		try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (user: any) => {
				console.log(user.data);
				this.userObservable.next({...user.data});
				this.global.userObservable.next({...user.data});
				this.global.user = {...user.data};

			});

    } catch (error) {
      console.error(error);
    } finally {
			this.loader.loadingDismiss(loading);

		}
	}

	async getUserByToken() {
		const url = `token`;
		const loading = await this.loader.presentLoadingWithOptions();

		try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (data: any) => {
				console.log('user', data);
				this.global.isLogin = true;
				this.global.loginObservable.next(true);

				// if (this.platform.is('android')) {
				// 	this.nativeStorage.setItem('user_token', data.token);

				// } else {

				// }
				localStorage.setItem('user_token', data.token);

				this.userObservable.next({...data.user});
				this.global.user = {...data.user};
				this.global.userObservable.next({...data.user});
				this.loader.loadingDismiss(loading);

			});

    } catch (error) {
			console.error(error);
			alert(error);

    } finally {

		}
	}

  async setUserInfo(user: UserInfo, fd?: FormData) {
		const url = 'usersInfo';
		const body = user;
		const loading = await this.loader.presentLoadingWithOptions();

		console.log(fd);
		try {
			if (fd) {
				const imageRes = await this.server.ServerUpload('user/image', fd);
				imageRes.subscribe( async (data: any) => {
					console.log(data);
					if (data) {
						user.avatar = data.data;
						console.log(user);
						const res = await this.server.ServerPost(url, body);
						res.subscribe( (data: any) => {
							if (data.success) {
								this.presentToast('פרטי משתמש עודכנו בהצלחה');
								this.router.navigate(['/auth']);
								const loginUser: User = {
									email: this.user.email,
									password: this.user.password
								}
								this.login(loginUser, true);
							}
						});
					}
				});
			} else {

				const res = await this.server.ServerPost(url, body);
				res.subscribe( (data: any) => {
					if (data.success) {
						this.presentToast('פרטי משתמש עודכנו בהצלחה');
						this.router.navigate(['/auth']);
					}
				});
			}

    } catch (error) {
      console.error(error);
    } finally {
			this.loader.loadingDismiss(loading);
		}

	}

	async updateUserInfo(user: UserInfo, fd?: FormData) {
		const url = `usersInfo/${user.id}`;
		const body = user;
		const loading = await this.loader.presentLoadingWithOptions();

		try {
			if (fd) {
				const imageRes = await this.server.ServerUpload('user/image', fd);
				imageRes.subscribe( async (data: any) => {
					if (data) {
						user.avatar = data.data;
						console.log(user);

						const res = await this.server.ServerPut(url, body);
						res.subscribe( (data: any) => {
							if (data) {
								this.presentToast('משתמש עודכן בהצלחה');
								this.router.navigate(['/events']);
							}
						});
					}
				});
			} else {
				const res = await this.server.ServerPut(url, body);
				res.subscribe( (data: any) => {
					if (data) {
						this.presentToast('משתמש עודכן בהצלחה');
						this.router.navigate(['/events']);
					}
				});
			}


    } catch (error) {
      console.error(error);
    } finally {
			this.loader.loadingDismiss(loading);
		}

	}

		// full example
	// upload() {
	// 	const fileTransfer: FileTransferObject = this.transfer.create();

	// 	let options: FileUploadOptions = {
	// 		fileKey: 'file',
	// 		fileName: 'name.jpg',
	// 		headers: {}
	// 	}

	// 	fileTransfer.upload('<file path>', '<api endpoint>', options)
	// 	.then((data) => {
	// 		// success
	// 	}, (err) => {
	// 		// error
	// 	})
	// }

	logout() {

		localStorage.removeItem('user_token');
		this.global.isLogin = false;
		this.global.loginObservable.next(false);
		this.presentToast('משתמש נותק');
		this.router.navigate(['events']);
		this.global.userObservable.next({});

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

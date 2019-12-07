import { LoaderService } from './../../_services/loader.service';
import { GlobalService } from './../../_services/global.service';
import { User, UserInfo } from './../../auth-section/model/user';
import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/_services/server.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Subject, BehaviorSubject } from 'rxjs';
import { CallSrugim } from './../model/call-srugim';

@Injectable({
	providedIn: 'root'
})
export class CallSrugimService {

	callSrugim: CallSrugim;
	public userCallsObservable = new BehaviorSubject<CallSrugim[]>([]);
	public userCallObservable = new Subject<CallSrugim>();
	public userCalls: CallSrugim[] = [];
	public userCall: CallSrugim;
	
	constructor(private server: ServerService,
		public navCtrl: NavController,
		private nativeStorage: NativeStorage,
		public loadingController: LoadingController,
		private router: Router,
		private global: GlobalService,
		private platform: Platform,
		private loader: LoaderService,
		private toastController: ToastController) { }

	async mokedSrugimCall(call: CallSrugim, fd?: FormData) {
		const url = 'mokedSrugim';
		const body = call;
		const loading = await this.loader.presentLoadingWithOptions();

		console.log(fd);
		try {
			if (fd) {
				console.log("fd :", fd);
				const imageRes = await this.server.ServerUpload('mokedSrugim/image', fd);
				imageRes.subscribe(async (data: any) => {
					console.log(data);
					if (data) {
						call.avatar = data.data;
						console.log("call avatar :", call);
						const res = await this.server.ServerPost(url, body);
						res.subscribe((data: any) => {
							if (data.success) {
								this.presentToast('   פרטי פנייה נשלחו בהצלחה');
								this.router.navigate([`/moked-srugim/${call.user_id}`]);

							}
						});
					}
				});
			} else {

				const res = await this.server.ServerPost(url, body);
				res.subscribe((data: any) => {
					if (data.success) {
						this.presentToast('פרטי פנייה נשלחו בהצלחה');
						this.router.navigate([`/moked-srugim/${call.user_id}`]);
					}
				});
			}

		} catch (error) {
			console.error(error);
		} finally {
			this.loader.loadingDismiss(loading);
		}

	}

	// mokedSrugim/doc

	async mokedSrugimCallWithDoc(call: CallSrugim, fd?: FormData) {
		const url = 'mokedSrugim';
		const body = call;
		const loading = await this.loader.presentLoadingWithOptions();

		console.log(fd);
		try {
			if (fd) {
				const imageRes = await this.server.ServerUploadDoc('mokedSrugim/doc', fd);
				imageRes.subscribe(async (data: any) => {
					console.log(data);
					if (data) {
						call.document = data.data;
						console.log("call document :", call);
						const res = await this.server.ServerPost(url, body);
						res.subscribe((data: any) => {
							if (data.success) {
								this.presentToast('   פרטי פנייה נשלחו בהצלחה');
								this.router.navigate([`/moked-srugim/${call.user_id}`]);

							}
						});
					}
				});
			} else {

				const res = await this.server.ServerPost(url, body);
				res.subscribe((data: any) => {
					if (data.success) {
						this.presentToast('פרטי פנייה נשלחו בהצלחה');
						this.router.navigate([`/moked-srugim/${call.user_id}`]);
					}
				});
			}

		} catch (error) {
			console.error(error);
		} finally {
			this.loader.loadingDismiss(loading);
		}

	}

	//get user calls from moked srugim if exsists
	async getUserCalls(userId) {
		const url = `mokedSrugim/${userId}`;
		const res = await this.server.ServerGet(url);
		res.subscribe((data: any) => {
			if (data.success) {
				this.presentToast('נמצאו פניות למוקד');
				this.userCalls = data.data;
				this.userCallsObservable.next([...this.userCalls]);
				this.router.navigate([`/moked-srugim/calls/${userId}`]);

			}
			else {
				this.presentToast('לא נמצאו פניות למוקד סרוגים');
				this.router.navigate([`/moked-srugim/calls/${userId}`]);
			}
		});
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

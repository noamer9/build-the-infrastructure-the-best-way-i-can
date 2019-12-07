import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }

  async presentLoadingWithOptions(message?: string) {
      const loading = await this.loadingController.create({
        spinner: 	'circles',
        animated: true,
        showBackdrop: true,
        message: message || 'אנא המתן...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      await loading.present();
      return loading;
  }

  loadingDismiss(loading: HTMLIonLoadingElement) {
    loading.dismiss();
  }
}

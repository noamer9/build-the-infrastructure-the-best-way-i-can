import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController, private router: Router) { }

  async presentAlertLogin(state) {
    const alert = await this.alertController.create({
      header: 'משתמש לא רשום!',
      message: 'נא הירשם כדי להשלים את הפעולה',
      buttons: [
        {
          text: 'בטל',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'הרשמה',
          handler: () => {
            this.router.navigate(['auth/register'], { queryParams: { returnUrl: state }});
          }
        }
      ]
    });

    await alert.present();
  }
}

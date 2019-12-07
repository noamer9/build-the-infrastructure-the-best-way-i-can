import { ToastController } from '@ionic/angular';
import { GlobalService } from './../global.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate  {
  constructor(
    private router: Router,
    private global: GlobalService,
    private toastController: ToastController) { }


  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.global.isLogin) {
      this.presentToast('בשביל לבצע פעולה זאת חייב להירשם');
      this.router.navigate(['auth/register'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
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

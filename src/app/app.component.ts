import { User } from './auth-section/model/user';
import { GlobalService } from './_services/global.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Component, OnDestroy } from '@angular/core';

import { Platform, ToastController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AuthService } from './auth-section/_services/auth.service';
import { Subscription } from 'rxjs';
import { EventService } from './event-section/_services/event.service';


export interface Link {
  title: string;
  url: string;
  icon: string;
  active: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnDestroy {



  subscription: Subscription;
  subscription2: Subscription;
  isLogin = false;
  userId = 0;

  pages = [
    {
      title: 'עריכת משתמש',
      url: `/auth/register/${this.userId}`,
      icon: 'create'
    },
    {
      title: 'עריכת פרטי חבר',
      url: `/auth/${this.userId}`,
      icon: 'information'
    },
    {
      title: 'אירועים',
      url: '/events',
      icon: 'clock'
    }
  ];

  loginPage = {
    title: 'התחבר',
    url: '/auth',
    icon: 'log-in'

  };
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router,
    private auth: AuthService,
    private toastController: ToastController,
    public menuCtrl: MenuController,
    private global: GlobalService
    ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.pages.map( p => {
          return p['active'] = (event.url === p.url);
        });
      }
    });
    this.subscription = this.global.loginObservable.subscribe((login: boolean) => {
      this.isLogin = login;
    });
    this.subscription2 = this.global.userObservable.subscribe((user: User) => {
      console.log(user);
      this.userId = user.id;
      if (this.userId !== 0 || this.userId !== NaN) {
        this.pages = [
          {
            title: 'עריכת משתמש',
            url: `/auth/register/${this.userId}`,
            icon: 'create'
          },
          {
            title: 'עריכת פרטי חבר',
            url: `/auth/${this.userId}`,
            icon: 'information'
          },
          {
            title: 'אירועים',
            url: '/events',
            icon: 'clock'
          },
          {
            title: 'חדשות',
            url: '/news',
            icon: 'clock'
          },
          {
            title: 'מבצעים והנחות',
            url: '/campaigns',
            icon: 'clock'
          },
          {
            title: 'לוח קהילה',
            url: '/communitys',
            icon: 'clock'
          },
          {
            title: 'מוקד עירוני',
            url: `/moked-ironi/${this.userId}`,
            icon: 'information'
          },
          {
            title: 'מוקד סרוגים',
            url: `/moked-srugim/${this.userId}`,
            icon: 'information'
          }
        ];
      }
    });


  }

  initializeApp() {
    this.platform.ready().then(async () => {
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      // this.nativeStorage.remove('user_token');
      let token: string;
      // if (this.platform.is('android')) {
      // await this.nativeStorage.getItem('user_token').then(
      //     res => {
      //       if (res) {
      //         token = res.toString();
      //         console.log(typeof token);
      //       }
      //     },
      //     error => {
      //       console.log(error);
      //       this.presentToast('שלום אורח, כדי להירשם לאירועים נא התחבר');
      //     }
      //   );

      // } else {
      // }
      token = localStorage.getItem('user_token');

      if (token && token !== undefined) {
        console.log('get by token');
        await this.auth.getUserByToken();
        // this.nativeStorage.getItem('facebook_user')
        // .then( data => {

        //   // user is previously logged and we have his data
        //   // we will let him access the app

        //   this.router.navigate(["events"]);
        //   this.splashScreen.hide();

        // }, err => {
        //   //we don't have the user data so we will ask him to log in

        //   this.router.navigate(['auth']);
        // });
      }

      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  onLogout() {
    this.menuCtrl.close();
    this.auth.logout();
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}


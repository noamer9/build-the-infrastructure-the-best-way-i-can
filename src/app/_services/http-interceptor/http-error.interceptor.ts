import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError, map } from 'rxjs/operators';
  import { Router } from '@angular/router';
  import { ToastController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

   export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router,
      public toastController: ToastController,
      private nativeStorage: NativeStorage,
      private platform: Platform) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token: string;

      token = localStorage.getItem('user_token');
      const ignore = request.body ? request.body.toString() : '';


      if (token) {
        console.log(token);
        request = request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + token
          }
        });
      }

      if (ignore === '[object FormData]') {
        request = request.clone({
          headers: request.headers.set('Accept', 'application/json')
        });
        return next.handle(request);
      }


    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json, application/x-www-form-urlencoded',
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log(error);
          if (error.ok === false) {
            this.presentToast('מייל או סיסמא שגויים ');
          } else {
            this.router.navigate(['auth']);
          }
        } else if (error.status === 404 ) {
          if (error.error.message === 'Validation error') {
            this.presentToast('אירעה שגיאה, בדקו שאתם רשומים');
          } else if (error.error.message === 'value exist'){
            this.presentToast('משתמש אחר עם נתונים אלו כבר קיים, נסו מייל או טלפון שונים');
          }
        } else if (error.status === 500) {
          this.presentToast('אירעה שגיאה בשרת, נסו שוב במועד מאוחר יותר');
        }
        return throwError(error);
      }));
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

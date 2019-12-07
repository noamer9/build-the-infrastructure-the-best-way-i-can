import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { SharedModule } from './shared/shared.module';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
// import { CampaignSectionModule } from './campaign-section/campaign-section.module';
import { IonicModule, IonicRouteStrategy, ToastController, IonRefresher } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './_services/http-interceptor/http-error.interceptor';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    NativeStorage,
    ToastController,
    SplashScreen,
    Facebook,
    LaunchNavigator,
    InAppBrowser,
    IonRefresher,
    FileUploadModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

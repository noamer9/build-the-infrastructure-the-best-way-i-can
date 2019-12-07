import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SharedModule } from './../shared/shared.module';
import { CommunitysSectionRoutingModule } from './communitys-section-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommunitysSectionRoutingModule,
    SharedModule,
    IonicModule
  ],
  providers: [InAppBrowser, SocialSharing]
 
})
export class CommunitysSectionModule { }
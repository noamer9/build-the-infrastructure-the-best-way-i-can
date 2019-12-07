import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventSectionRoutingModule } from './event-section-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventSectionRoutingModule,
    SharedModule
  ],
  providers: [InAppBrowser, SocialSharing]
})
export class EventSectionModule { }

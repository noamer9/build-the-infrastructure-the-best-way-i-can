import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MokedSrugimSectionRoutingModule } from './moked-srugim-section-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MokedSrugimSectionRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [InAppBrowser, SocialSharing]
})
export class MokedSrugimSectionModule { }
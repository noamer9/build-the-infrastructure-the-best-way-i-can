

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CampaignService } from './../_services/campaign.service';
import { SharedModule } from './../../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { CampaignPage } from './campaign.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

const routes: Routes = [
  {
    path: '',
    component: CampaignPage
  }
];

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
    
  ],
  declarations: [CampaignPage],
  providers: [CampaignService, InAppBrowser]
})
export class CampaignPageModule {}


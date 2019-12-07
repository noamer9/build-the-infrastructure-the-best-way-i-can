import { NewsService } from './../_services/news.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SocialService } from '../../event-section/_services/social.service';
import { NewPage } from './new.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
const routes: Routes = [
  {
    path: '',
    component: NewPage
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
  declarations: [NewPage],
  providers: [NewsService, InAppBrowser, SocialService]
})
export class NewPageModule {}



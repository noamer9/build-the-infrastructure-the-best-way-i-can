import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommunityService } from './../_services/community.service';
import { SharedModule } from './../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


import { CommunitysPage } from './communitys.page';

const routes: Routes = [
  {
    path: '',
    component: CommunitysPage
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
  declarations: [CommunitysPage],
  providers: [CommunityService, InAppBrowser]
})
export class CommunitysPageModule {}


//





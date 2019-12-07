import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserCallsIroniPage } from './user-calls-ironi.page';

const routes: Routes = [
  {
    path: '',
    component: UserCallsIroniPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserCallsIroniPage]
})
export class UserCallsIroniPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthSectionRoutingModule } from './auth-section-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthSectionRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [NativeStorage]
})
export class AuthSectionModule { }

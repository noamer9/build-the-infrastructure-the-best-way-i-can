import { Subscription } from 'rxjs';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { UserInfo, User } from './../../auth-section/model/user';
import { AuthService } from './../../auth-section/_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { CallService } from './../_services/call.service';
import { Call } from './../model/call';

@Component({
  selector: 'app-user-calls-ironi',
  templateUrl: './user-calls-ironi.page.html',
  styleUrls: ['./user-calls-ironi.page.scss'],
})
export class UserCallsIroniPage implements OnInit {

  private subscription: Subscription;
  callInfo: Call; 
  userInfo: UserInfo;
  userId: number;
 
  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private global: GlobalService,
    private callService: CallService
  ) {

    this.route.paramMap.subscribe(async paramsMap => {
      console.log(+paramsMap.get('userId'));
      this.userId = +paramsMap.get('userId');
    });
  }
 
  async ngOnInit() {
    if (this.userId !== undefined && this.global.isLogin) {
      try {
        await this.auth.getUserById(this.userId);
        this.subscription = this.auth.userObservable.subscribe((user: User) => {
          if (user.info !== null) {
            this.userInfo = user.info;
            console.log('user info', this.userInfo);
           
          }

        });
      } catch (error) {
        console.error(error);
      }

    }

  }

}

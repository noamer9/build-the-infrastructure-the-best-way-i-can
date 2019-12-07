import { Subscription } from 'rxjs';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { UserInfo, User } from './../../auth-section/model/user';
import { AuthService } from './../../auth-section/_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { CallSrugimService } from './../_services/call-srugim.service';
import { CallSrugim } from './../model/call-srugim';

@Component({
  selector: 'app-user-calls-srugim',
  templateUrl: './user-calls-srugim.page.html',
  styleUrls: ['./user-calls-srugim.page.scss'],
})
export class UserCallsSrugimPage implements OnInit {

  private subscription: Subscription;
  private subscription2: Subscription;
  callInfo: CallSrugim; 
  userInfo: UserInfo;
  userId: number;
  public userCalls: CallSrugim[];

  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private global: GlobalService,
    private callSrugimService: CallSrugimService
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
            this.callSrugimService.getUserCalls(this.userId);

            if (this.callSrugimService.userCalls.length > 0) {
              this.userCalls = this.callSrugimService.userCalls;
              console.log("this user calls to srugim", this.userCalls );
            } else {
              this.subscription2 = this.callSrugimService.userCallsObservable.subscribe((userCalls: CallSrugim[] ) => {
                if( userCalls !== [] ){
                  this.userCalls = userCalls;
                  console.log("this user calls to srugim", this.userCalls );
                }
              })
              
            }





          }

        });
      } catch (error) {
        console.error(error);
      }

    }

  }

}

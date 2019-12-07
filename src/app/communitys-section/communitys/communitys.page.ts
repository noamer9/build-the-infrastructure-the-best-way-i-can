import { Router } from '@angular/router';
import { AlertService } from './../../_services/alert.service';
import { GlobalService } from './../../_services/global.service';
// import { SocialService } from './../_services/social.service';
import { Community } from './../model/community';
import { CommunityService } from './../_services/community.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-communitys',
  templateUrl: './communitys.page.html',
  styleUrls: ['./communitys.page.scss'],
})
export class CommunitysPage implements OnInit {

  public subscription: Subscription;
  public subscription2: Subscription;
  public communitys: Community[];
  public isLogin = false;
  constructor(private communityService: CommunityService,
              
              private global: GlobalService,
              private alert: AlertService,
              private router: Router) { }

  ngOnInit() {

    console.log("this.communityService.Communitys.length ,", this.communityService.communitys.length);
    if (this.communityService.communitys.length > 0) {
      this.communitys = this.communityService.communitys;
    } else {
      this.communityService.getAllCommunitys();
      this.subscription = this.communityService.communitysObservable
      .subscribe((communitys: Community[]) => {
        this.communitys = communitys;
        console.log(this.communitys);
      });
    }
    this.subscription2 = this.global.loginObservable.subscribe((login: boolean) => {
      this.isLogin = login;
    });
  }

 


  

  async doRefresh(event: any) {
    try {
      await this.communityService.getAllCommunitys();
    } catch (error) {
      console.log(error);
    } finally {
      event.target.complete();
    }
  }

}

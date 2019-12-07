import { Router } from '@angular/router';
import { AlertService } from './../../_services/alert.service';
import { GlobalService } from './../../_services/global.service';
// import { SocialService } from './../_services/social.service';
import { Campaign } from './../model/campaign';
import { CampaignService } from './../_services/campaign.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss'],
})
export class CampaignPage implements OnInit {
  index: number = -1;
  isTouched:boolean = false;
  public subscription: Subscription;
  public subscription2: Subscription;
  public campaigns: Campaign[];
  public isLogin = false;
  constructor(private campaignService: CampaignService,
              
              private global: GlobalService,
              private alert: AlertService,
              private router: Router) { }

  ngOnInit() {

    console.log("this.campaignService.Campaigns.length ,", this.campaignService.campaigns.length);
    if (this.campaignService.campaigns.length > 0) {
      this.campaigns = this.campaignService.campaigns;
    } else {
      this.campaignService.getAllCampaigns();
      this.subscription = this.campaignService.campaignsObservable
      .subscribe((campaigns: Campaign[]) => {
        this.campaigns = campaigns;
        console.log(this.campaigns);
      });
    }
    this.subscription2 = this.global.loginObservable.subscribe((login: boolean) => {
      this.isLogin = login;
    });
  }

 
public showDetails(i){
    this.index = i;
    this.isTouched = true;
}

  

  async doRefresh(event: any) {
    try {
      await this.campaignService.getAllCampaigns();
    } catch (error) {
      console.log(error);
    } finally {
      event.target.complete();
    }
  }

}

import { Injectable } from '@angular/core';
import { LoaderService } from './../../_services/loader.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Campaign } from './../model/campaign';

import { ServerService } from 'src/app/_services/server.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  public campaignsObservable = new BehaviorSubject<Campaign[]>([]);
  public campaignObservable = new Subject<Campaign>();
  public campaigns: Campaign[] = [];
  public campaign: Campaign;
  constructor( private server: ServerService, private iab: InAppBrowser, private loader: LoaderService ) { }

  async getAllCampaigns() {
    const url = 'campaigns';
    const loading = await this.loader.presentLoadingWithOptions();
    try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (campaigns: any) => {
        this.campaigns = campaigns.data;
        console.log("this .campaigns.length in the service ,", this.campaigns.length );
        this.campaignsObservable.next([...this.campaigns]);
      });

    } catch (error) {
      console.error(error);
    } finally {
      this.loader.loadingDismiss(loading);
    }

  }

  async getCampaignById( id: number ) {
    const url = `campaigns/${id}`;
    const loading = await this.loader.presentLoadingWithOptions();

    try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (campaignData: any) => {
        this.campaign = campaignData.data;
        console.log("this.campaign ,", this.campaign);
        this.campaignObservable.next(this.campaign);
      });

    } catch (error) {
      console.error(error);
    } finally {
      this.loader.loadingDismiss(loading);

    }

    // this.server.ServerGet(url).subscribe( res => {
    //   this.event = res.data;
    //   this.eventObservable.next(this.event);
    // });
  }

  getCampaign(id: number): Campaign {
    this.campaign = this.campaigns.find( (campaignItem: Campaign) => campaignItem.id === id);
    return {...this.campaign};

  }







}

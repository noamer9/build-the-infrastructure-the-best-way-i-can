import { Injectable } from '@angular/core';
import { LoaderService } from './../../_services/loader.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Community } from './../model/community';

import { ServerService } from 'src/app/_services/server.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  public communitysObservable = new BehaviorSubject<Community[]>([]);
  public communityObservable = new Subject<Community>();
  public communitys: Community[] = [];
  public community: Community;
  constructor( private server: ServerService, private iab: InAppBrowser, private loader: LoaderService ) { }

  async getAllCommunitys() {
    const url = 'communitys';
    const loading = await this.loader.presentLoadingWithOptions();
    try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (communitys: any) => {
        this.communitys = communitys.data;
        console.log("this .communitys.length in the service ,", this.communitys.length );
        this.communitysObservable.next([...this.communitys]);
      });

    } catch (error) {
      console.error(error);
    } finally {
      this.loader.loadingDismiss(loading);
    }

  }

  async getCommunityById( id: number ) {
    const url = `communitys/${id}`;
    const loading = await this.loader.presentLoadingWithOptions();

    try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (communityData: any) => {
        this.community = communityData.data;
        console.log("this.community ,", this.community);
        this.communityObservable.next(this.community);
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

  getCommunity(id: number): Community {
    this.community = this.communitys.find( (communityItem: Community) => communityItem.id === id);
    return {...this.community};

  }
}

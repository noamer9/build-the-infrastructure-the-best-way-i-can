import { Router } from '@angular/router';
import { AlertService } from './../../_services/alert.service';
import { GlobalService } from './../../_services/global.service';
import { SocialService } from './../_services/social.service';
import { Event } from './../model/event';
import { EventService } from './../_services/event.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit, OnDestroy {

  public subscription: Subscription;
  public subscription2: Subscription;
  public events: Event[];
  public isLogin = false;
  constructor(private eventService: EventService,
              private social: SocialService,
              private global: GlobalService,
              private alert: AlertService,
              private router: Router) { }

  ngOnInit() {

    if (this.eventService.events.length > 0) {
      this.events = this.eventService.events;
    } else {
      this.eventService.getAllEvents();
      this.subscription = this.eventService.eventsObservable
      .subscribe((events: Event[]) => {
        this.events = events;
        console.log(this.events);
      });
    }
    this.subscription2 = this.global.loginObservable.subscribe((login: boolean) => {
      this.isLogin = login;
    });
  }

  onPurchase(eventUrl: string) {
    if (!this.isLogin) {
      this.alert.presentAlertLogin(this.router.url);
    } else {
      this.eventService.onPurchase(eventUrl);
    }
  }

  async doRefresh(event: any) {
    try {
      await this.eventService.getAllEvents();
    } catch (error) {
      console.log(error);
    } finally {
      event.target.complete();
    }
  }

  onShareWhatsapp(event: Event) {
    this.social.whatsapp(event);
  }

  onShareFacebook(event: Event) {
    this.social.facebook(event);
  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }

    if (this.subscription2 !== undefined) {
      this.subscription2.unsubscribe();
    }
  }

}



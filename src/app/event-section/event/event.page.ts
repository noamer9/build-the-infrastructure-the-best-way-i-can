import { AlertService } from './../../_services/alert.service';
import { SocialService } from './../_services/social.service';
import { NavService } from './../../_services/nav.service';
import { GlobalService } from './../../_services/global.service';
import { Subscription } from 'rxjs';
import { Event } from './../model/event';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../_services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})

export class EventPage implements OnInit, OnDestroy {

  subscription: Subscription;
  subscription2: Subscription;
  private eventId: number;
  public event: Event;
  public isLogin = false;
  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private global: GlobalService,
              private navService: NavService,
              private social: SocialService,
              private alert: AlertService,
              private router: Router) {

      this.route.paramMap.subscribe( async paramsMap => {
      this.eventId = +paramsMap.get('eventId');

      if (this.eventService.events.length > 0) {
        this.event = this.eventService.getEvent(this.eventId);
        this.global.eventObservable.next(this.event);
        console.log(this.event);

      } else {
        this.eventService.getEventById(this.eventId);

        this.subscription = this.eventService.eventObservable.subscribe( (event: Event) => {

          this.event = event;
          this.global.eventObservable.next(this.event);
          console.log(this.event);
        });
      }

      this.subscription2 = this.global.loginObservable.subscribe((login: boolean) => {
        this.isLogin = login;
      });

    });


  }

  ngOnInit() {

  }

  onPurchase() {
    if (!this.isLogin) {
      this.alert.presentAlertLogin(this.router.url);
    } else {
      this.eventService.onPurchase(this.event.url);
    }
  }

  async doRefresh(event: any) {
    try {
      await this.eventService.getEventById(this.eventId);
    } catch (error) {
      console.log(error);
    } finally {
      event.target.complete();
    }
  }

  onNav() {
    this.navService.onNav(this.event.lat, this.event.lng);
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

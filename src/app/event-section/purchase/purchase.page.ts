import { Subscription } from 'rxjs';
import { Event } from './../model/event';
import { EventService } from './../_services/event.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit, OnDestroy {

  private subscription: Subscription;
  public eventToPurchase: Event;
  public form: FormGroup;
  private eventId: number;
  private userId = 1; // waiting for user section.
  public quantity_kids = 0;
  public quantity_adults = 0;
  public total = 0;
  public totalPrice = 0;
  public price = 0;

  constructor(private iab: InAppBrowser, private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {

    this.route.paramMap.subscribe( async paramsMap => {
      this.eventId = +paramsMap.get('eventId');

      if (this.eventService.events.length > 0) {
        this.eventToPurchase = this.eventService.getEvent(this.eventId);
      } else {
        this.subscription = this.eventService.eventObservable.subscribe( (event: Event) => {

          this.eventToPurchase = event;
          console.log(this.eventToPurchase);
          this.price = this.eventToPurchase.price || 0;
        });
        await this.eventService.getEventById(this.eventId);

      }

    });
  }

  updatePurchase() {
    this.total = this.quantity_adults + this.quantity_kids;
    this.totalPrice = this.total * this.price;
  }

  onPurchase() {
    const url = 'https://www.tranzila.com';
    const target = '_self';
    const options = 'location=yes,hidden=yes,hideurlbar=yes,hardwareback=no,closebuttoncaption=סיימתי';
    const browser = this.iab.create(url , target, options);
    browser.on('loadstop').subscribe( () => {
      browser.show();
      browser.executeScript({code: `alert('test');`});

    });
    browser.on('message').subscribe(() => {
      browser.executeScript({code: `alert('message');`});

    });


  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}

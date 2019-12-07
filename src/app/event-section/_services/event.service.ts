import { LoaderService } from './../../_services/loader.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Event } from './../model/event';
import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/_services/server.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public eventsObservable = new BehaviorSubject<Event[]>([]);
  public eventObservable = new Subject<Event>();
  public events: Event[] = [];
  public event: Event;

  constructor( private server: ServerService, private iab: InAppBrowser, private loader: LoaderService ) { }

  async getAllEvents() {
    const url = 'events';
    const loading = await this.loader.presentLoadingWithOptions();
    try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (events: any) => {
        this.events = events.data;
        this.eventsObservable.next([...this.events]);
      });

    } catch (error) {
      console.error(error);
    } finally {
      this.loader.loadingDismiss(loading);
    }

  }

  async getEventById( id: number ) {
    const url = `events/${id}`;
    const loading = await this.loader.presentLoadingWithOptions();

    try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (event: any) => {
        this.event = event.data;
        this.eventObservable.next(this.event);
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

  getEvent(id: number): Event {
    this.event = this.events.find( (eventItem: Event) => eventItem.id === id);
    return {...this.event};

  }

  async onPurchase(eventUrl) {
    // const url = 'https://www.tranzila.com';
    const target = '_self';
    const options = 'location=yes,hidden=yes,hideurlbar=yes,hardwareback=no,closebuttoncaption=סיימתי';
    const browser = this.iab.create(eventUrl , target, options);
    const loading = await this.loader.presentLoadingWithOptions();

    browser.on('loadstop').subscribe( () => {
      browser.show();
      this.loader.loadingDismiss(loading);
    });
    browser.on('message').subscribe(() => {
      browser.executeScript({code: `alert('message');`});

    });


  }


}

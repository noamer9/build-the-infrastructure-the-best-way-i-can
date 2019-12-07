import { BehaviorSubject } from 'rxjs';
import { Event } from './../event-section/model/event';
import { User } from './../auth-section/model/user';
import { Article } from './../news-section/model/article';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  articleObservable = new BehaviorSubject<Article | {}>({});
  userObservable = new BehaviorSubject<User | {}>({});
  eventObservable = new BehaviorSubject<Event | {}>({});
  loginObservable = new BehaviorSubject<boolean>(false);
  user: User;
  event: Event;
  article: Article;
  public isLogin = false;

  constructor() { }
}

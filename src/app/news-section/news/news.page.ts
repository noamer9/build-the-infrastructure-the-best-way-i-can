import { Router } from '@angular/router';
import { AlertService } from './../../_services/alert.service';
import { GlobalService } from './../../_services/global.service';
// import { SocialService } from './../_services/social.service';
import { Article } from './../model/article';
import { NewsService } from './../_services/news.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit, OnDestroy {

  public subscription: Subscription;
  public subscription2: Subscription;
  public articles: Article[];
  public isLogin = false;
  constructor(private newsService: NewsService,
              
              private global: GlobalService,
              private alert: AlertService,
              private router: Router) { }

  ngOnInit() {

    console.log("this.newsService.articles.length ,", this.newsService.articles.length);
    if (this.newsService.articles.length > 0) {
      this.articles = this.newsService.articles;
    } else {
      this.newsService.getAllNews();
      this.subscription = this.newsService.articlesObservable
      .subscribe((articles: Article[]) => {
        this.articles = articles;
        console.log(this.articles);
      });
    }
    this.subscription2 = this.global.loginObservable.subscribe((login: boolean) => {
      this.isLogin = login;
    });
  }

 

  async doRefresh(event: any) {
    try {
      await this.newsService.getAllNews();
    } catch (error) {
      console.log(error);
    } finally {
      event.target.complete();
    }
  }

  // onShareWhatsapp(event: Event) {
  //   this.social.whatsapp(event);
  // }

  // onShareFacebook(event: Event) {
  //   this.social.facebook(event);
  // }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }

    if (this.subscription2 !== undefined) {
      this.subscription2.unsubscribe();
    }
  }

}

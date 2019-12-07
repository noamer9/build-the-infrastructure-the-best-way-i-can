
import { AlertService } from './../../_services/alert.service';
import { SocialService } from './../../event-section/_services/social.service';
import { NavService } from './../../_services/nav.service';
import { GlobalService } from './../../_services/global.service';
import { Subscription } from 'rxjs';
import { Article } from './../model/article';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../_services/news.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  isArticle:boolean = true;
  subscription: Subscription;
  subscription2: Subscription;
  private articleId: number;
  public article: Article;
  public isLogin = false;
  constructor(private route: ActivatedRoute,
              private newsService: NewsService,
              private global: GlobalService,
              private navService: NavService,
              private social: SocialService,
              private alert: AlertService,
              private router: Router) {

      this.route.paramMap.subscribe( async paramsMap => {
      this.articleId = +paramsMap.get('articleId');
        console.log("this.articleId ,", this.articleId);
        console.log("this.newsService.articles.length ,", this.newsService.articles.length);
      if (this.newsService.articles.length > 0) {
        this.article = this.newsService.getArticle(this.articleId);
        this.global.articleObservable.next(this.article);
        console.log(this.article);

      } else {
        this.newsService.getArticleById(this.articleId);

        this.subscription = this.newsService.articleObservable.subscribe( (article: Article) => {

          this.article = article;
          this.global.articleObservable.next(this.article);
          console.log(this.article);
        });
      }

      this.subscription2 = this.global.loginObservable.subscribe((login: boolean) => {
        this.isLogin = login;
      });

    });


  }

  ngOnInit() {

  }



  async doRefresh(event: any) {
    try {
      await this.newsService.getArticleById(this.articleId);
    } catch (error) {
      console.log(error);
    } finally {
      event.target.complete();
    }
  }



  onShareWhatsapp(article: Article) {
    this.social.whatsappArticle(article);
  }

  onShareFacebook(article: Article) {
    this.social.facebookArticle(article);
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

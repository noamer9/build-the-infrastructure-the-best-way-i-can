import { Injectable } from '@angular/core';
import { LoaderService } from './../../_services/loader.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Article } from './../model/article';

import { ServerService } from 'src/app/_services/server.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public articlesObservable = new BehaviorSubject<Article[]>([]);
  public articleObservable = new Subject<Article>();
  public articles: Article[] = [];
  public article: Article;
  constructor( private server: ServerService, private iab: InAppBrowser, private loader: LoaderService ) { }

  async getAllNews() {
    const url = 'article';
    const loading = await this.loader.presentLoadingWithOptions();
    try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (news: any) => {
        this.articles = news.data;
        console.log("this .articles.length in the service ,", this.articles.length );
        this.articlesObservable.next([...this.articles]);
      });

    } catch (error) {
      console.error(error);
    } finally {
      this.loader.loadingDismiss(loading);
    }

  }

  async getArticleById( id: number ) {
    const url = `article/${id}`;
    const loading = await this.loader.presentLoadingWithOptions();

    try {

      const res = await this.server.ServerGet(url);
      res.subscribe( (newData: any) => {
        this.article = newData.data;
        console.log("this.article ,", this.article);
        this.articleObservable.next(this.article);
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

  getArticle(id: number): Article {
    this.article = this.articles.find( (articleItem: Article) => articleItem.id === id);
    return {...this.article};

  }

}

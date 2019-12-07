import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EventService } from './../../event-section/_services/event.service';
import { NewsService } from './../../news-section/_services/news.service';
import { ServerService } from './../../_services/server.service';
import { PostComment, Comment, PostCommentArticle } from './../model/comment';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from 'src/app/_services/global.service';
import { AlertService } from 'src/app/_services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  isArticle:boolean;
  commentToRespondObservable = new BehaviorSubject<Comment | {} >({});
  likeObservable = new BehaviorSubject<boolean>(true);
  dislikeObservable = new BehaviorSubject<boolean>(true);
  constructor(private server: ServerService,
              private eventService: EventService, 
              private newsService: NewsService,
              private router: Router, 
              private toastController: ToastController,
              private global: GlobalService,
              private alert: AlertService
               ) { }

  async postComment(comment: PostComment) {
    const url = 'comments';
    const body = comment;
    try {

      const res = await this.server.ServerPost(url, body);
      res.subscribe( async (data: any) => {
        if (data.success) {
          console.log('posted');
          await this.eventService.getEventById(comment.event_id).then( () => {
            this.router.navigate(['/events/view', comment.event_id]);
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }


  //postArticleComment
  async postArticleComment(comment: PostCommentArticle) {
    console.log("article comment ,", comment);
    const url = 'articleComments';
    const body = comment;
    try {

      const res = await this.server.ServerPost(url, body);
      res.subscribe( async (data: any) => {
        if (data.success) {
          console.log('posted');
          console.log('data', data);
          await this.newsService.getArticleById(comment.article_id).then( () => {
            this.router.navigate(['/news/view', comment.article_id]);
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }


  async likeComment(comment: Comment, opt: boolean) {
    console.log("opt :", opt);
    console.log("is state = article :", this.isArticle );
    if(this.isArticle){
     
      const url = 'articleComments/' + comment.id;
      if (opt) {
        comment.likes ++;
      }
  
      if (!opt) {
        if (comment.likes > 0) {
          comment.likes --;
        }
      }
  
      
      const body = {
        user_id:  comment.user.id,
        article_id: comment.article_id,
        title: comment.title,
        body: comment.body,
        likes: comment.likes
       };
      try {
  
        const res = await this.server.ServerPut(url, body);
        res.subscribe( async (data: any) => {
          if (data.success) {
            if (opt) {
              localStorage.setItem(`articleId${comment.id.toString()}`, '1');
              console.log("article state = ", this.isArticle);
            }
  
            if (!opt) {
              localStorage.setItem(`articleId${comment.id.toString()}`, '0');
  
            }
            // this.presentToast('')
            // await this.eventService.getEventById(comment.event_id);
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      const url = 'comments/' + comment.id;
    if (opt) {
      comment.likes ++;
    }

    if (!opt) {
      if (comment.likes > 0) {
        comment.likes --;
      }
    }

    
    const body = {
      user_id:  comment.user.id,
      event_id: comment.event_id,
      title: comment.title,
      body: comment.body,
      likes: comment.likes
     };
    try {

      const res = await this.server.ServerPut(url, body);
      res.subscribe( async (data: any) => {
        if (data.success) {
          if (opt) {
            localStorage.setItem(comment.id.toString(), '1');

          }

          if (!opt) {
            localStorage.setItem(comment.id.toString(), '0');

          }
          // this.presentToast('')
          // await this.eventService.getEventById(comment.event_id);
        }
      });
    } catch (error) {
      console.error(error);
    }
    }
    
  }

  async onLike(comment: Comment) {
    console.log(comment.id);
    if (!this.global.isLogin) {
      this.alert.presentAlertLogin(this.router.url);
    } else {
        await this.likeComment(comment, true);
    }
  }

  async onDislike(comment: Comment) {
    if (!this.global.isLogin) {
      this.alert.presentAlertLogin(this.router.url);
    } else {
      await this.likeComment(comment, false);

    }

  }

  checkLikes(commentId: number, state: number, belongs?:boolean): boolean {
    console.log("belongs :", belongs);
    this.isArticle = belongs;
    console.log("commentId :", commentId);
    if(this.isArticle){
      const isLike = localStorage.getItem(`articleId${commentId.toString()}`);

      if (isLike && +isLike === 1 && state === 1) {
        console.log("isLike = like :", isLike);
        return false;
      } 
  
      if (isLike && +isLike === 0 && state === 0) {
        console.log("isLike = dislike :", isLike);
        return false;
      }
  
      return true;

    } else {
      const isLike = localStorage.getItem(commentId.toString());

      if (isLike && +isLike === 1 && state === 1) {
        console.log("isLike = like :", isLike);
        return false;
      } 
  
      if (isLike && +isLike === 0 && state === 0) {
        console.log("isLike = dislike :", isLike);
        return false;
      }
  
      return true;
    }
   
  }



  async presentToast(msg: string) {
    console.log('present toast');
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}

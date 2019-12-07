import { AlertService } from './../../_services/alert.service';
import { Event } from './../../event-section/model/event';
import { Article } from './../../news-section/model/article';
import { User } from './../../auth-section/model/user';
import { GlobalService } from './../../_services/global.service';
import { CommentService } from './../_services/comment.service';
import { Comment, PostComment, PostCommentArticle  } from './../model/comment';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonTextarea, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit, OnDestroy {

  public isComment = true;
  @Input() isArticle:boolean;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;

  private userId: number;
  private eventId: number;
  private articleId: number;
  public newArticleComment: PostCommentArticle;
  public newComment: PostComment;
  public relatedComment: Comment;
  public postTitle: string;
  public postContent: string;
  @ViewChild('textarea') textArea: IonInput;


  constructor( private commentService: CommentService,
                private global: GlobalService,
                private alert: AlertService,
                private router: Router) {}

  ngOnInit() {
    console.log("is article :", this.isArticle );
    this.isComment = true;

    this.subscription = this.commentService.commentToRespondObservable.subscribe( (comment: Comment) => {
      if (Object.keys(comment).length !== 0) {
        console.log("Object.keys(comment).length ,", Object.keys(comment).length);
        console.log("Object.keys(comment) ,", Object.keys(comment));
        this.relatedComment = comment;
        console.log("related comment :", this.relatedComment );
        this.onOpenComment();
      }
    });

    this.subscription2 = this.global.userObservable.subscribe( (user: User) => {
      this.userId = user.id;
      console.log('UUUUUSEEER', this.userId);
    });

   
   
      this.subscription3 = this.global.eventObservable.subscribe( (event: Event) => {
        this.eventId = event.id;
         console.log('eveveveet', this.eventId);
      });
    
      if( this.isArticle ){
        this.subscription4 = this.global.articleObservable.subscribe( (article: Article) => {
          this.articleId = article.id;
           console.log('articleeeeee',  this.articleId);
        });
      }
    
  }

  onOpenComment() {
    if (!this.global.isLogin) {
      console.log(this.router.url);
      this.alert.presentAlertLogin(this.router.url);
    } else {
      this.isComment = true;
      if (this.textArea) {
        this.textArea.setFocus();
      }
  
      // this.textArea.setFocus();
    }
  }

 onPost() {

    if (!this.global.isLogin) {
      console.log(this.router.url);
      this.alert.presentAlertLogin(this.router.url);
    } else {
      if( this.isArticle ){
        this.newArticleComment = {
          user_id: this.userId,
          article_id: this.articleId,
          title: this.postTitle ?  this.postTitle : 'ל.ת',
          body: this.postContent ? this.postContent : 'ל.ת',
        };
        if (this.relatedComment) {
          this.newArticleComment.relate_to = this.relatedComment.id;
        } else {
          this.newArticleComment.relate_to = null;
        }
        
        this.commentService.postArticleComment(this.newArticleComment);
       
      } else {
        this.newComment = {
          user_id: this.userId,
          event_id: this.eventId,
          title: this.postTitle ?  this.postTitle : 'ל.ת',
          body: this.postContent ? this.postContent : 'ל.ת',
        };

        if (this.relatedComment) {
          this.newComment.relate_to = this.relatedComment.id;
        }
        this.commentService.postComment(this.newComment);
      }
      
      // if (this.relatedComment) {
      //   this.newComment.relate_to = this.relatedComment.id;
      // }

      // this.commentService.postComment(this.newComment);
      this.postContent = '';
      this.postTitle = '';
      this.isComment = true;
      this.relatedComment = null;
    }
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
  }
}

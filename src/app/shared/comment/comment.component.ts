import { CommentService } from './../_services/comment.service';
import { Comment } from './../model/comment';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  viewSubComments = false;
  canLike = true;
  canDislike = true;
  @Input() comment: Comment;
  @Input() isArticle: boolean;

  
  constructor(private commentService: CommentService,  
              private router: Router, 
              private global: GlobalService) { }

  ngOnInit() {
    console.log(this.comment.user);
    this.canLike = this.commentService.checkLikes(this.comment.id, 1, this.isArticle);
    this.canDislike = this.commentService.checkLikes(this.comment.id, 0, this.isArticle);
  }

  onRespond() {
    this.commentService.commentToRespondObservable.next(this.comment);
  }

  like() {
    this.canLike = false;
    this.canDislike = true;
    this.commentService.onLike(this.comment)
  }

  dislike() {
    this.canDislike = false;
    this.canLike = true;
    this.commentService.onDislike(this.comment);
  }


}

import { CommentService } from './_services/comment.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount/discount.component';
import { CommunityComponent } from './community/community.component';
import { IonicModule } from '@ionic/angular';
import { CommentComponent } from './comment/comment.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [HeaderComponent, CommentComponent, PostCommentComponent, MenuItemComponent, DiscountComponent, CommunityComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, 
    RouterModule
  ],
  providers: [NgModule, CommentService],
  exports: [HeaderComponent, CommentComponent, PostCommentComponent, MenuItemComponent, DiscountComponent, CommunityComponent]
})
export class SharedModule { }

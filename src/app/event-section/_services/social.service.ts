import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Event } from './../model/event';
import { Article } from '../../news-section/model/article';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private social: SocialSharing) { }


  whatsapp(event: Event) {
    this.social.shareViaWhatsApp(event.title + '\n \n' + event.description + '\n', event.image_path , event.url);
  }

  facebook(event: Event) {
    this.social.shareViaFacebook(event.title + '\n \n' + event.description + '\n' + event.description, event.image_path, event.url);

  }

  whatsappArticle(article: Article){
    this.social.shareViaWhatsApp(article.title + '\n \n' + article.description + '\n' + article.description, article.image_path, article.url);
  }

  facebookArticle(article: Article) {
    this.social.shareViaFacebook(article.title + '\n \n' + article.description + '\n' + article.description, article.image_path, article.url);

  }
}

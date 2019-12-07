import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/_services/global.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth-section/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private subscription: Subscription;
  public avatarUrl: string;

  constructor( private global: GlobalService) { 
    this.subscription = this.global.userObservable.subscribe((user: User) => {
      if (user) {
        if (user.info) {
          if (user.info.avatar) {
            this.avatarUrl = user.info.avatar;
          }
        }
      }
    })
  }

  ngOnInit() {}

}

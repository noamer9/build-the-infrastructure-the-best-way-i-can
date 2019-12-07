import { Component, OnInit, Input } from '@angular/core';

export interface Link {
  title: string;
  url: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {

  @Input() link: Link;
  @Input() isLogin: boolean;

  constructor() { }

  ngOnInit() {}


}

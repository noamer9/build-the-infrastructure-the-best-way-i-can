import { Community } from './../../communitys-section/model/community';
import { CommunityService } from 'src/app/communitys-section/_services/community.service';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  @Input() community: Community;
  isTouched:boolean = false;
  constructor() { }

  ngOnInit() {}

  showDetails(){
    this.isTouched = !this.isTouched;
  }

}

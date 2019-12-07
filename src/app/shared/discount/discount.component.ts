import { Campaign } from './../../campaign-section/model/campaign';
import { CampaignService } from 'src/app/campaign-section/_services/campaign.service';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  @Input() campaign: Campaign;
  isTouched:boolean = false;
  constructor() { }

  ngOnInit() {}

  showDetails(){
    this.isTouched = !this.isTouched;
  }

}

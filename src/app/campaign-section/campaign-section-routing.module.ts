import { AuthGuard } from './../_services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: './campaign/campaign.module#CampaignPageModule' },
  { path: 'campaigns', loadChildren: './campaign/campaign.module#CampaignPageModule' }

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignSectionRoutingModule { }
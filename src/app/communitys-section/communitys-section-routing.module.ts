import { AuthGuard } from './../_services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: './communitys/communitys.module#CommunitysPageModule' },
  { path: 'communitys', loadChildren: './communitys/communitys.module#CommunitysPageModule' },  { path: 'communitys', loadChildren: './communitys/communitys.module#CommunitysPageModule' }


  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunitysSectionRoutingModule { }
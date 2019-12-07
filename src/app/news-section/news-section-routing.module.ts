import { AuthGuard } from './../_services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'view/:articleId', loadChildren: './new/new.module#NewPageModule' },  
  { path: 'new', loadChildren: './new/new.module#NewPageModule' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsSectionRoutingModule { }
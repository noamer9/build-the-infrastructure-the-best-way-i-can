import { AuthGuard } from './../_services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: ':userId', pathMatch: 'full' },
//   { path: 'call', loadChildren: './call/call.module#CallPageModule' },
  { path: ':userId', loadChildren: './call/call.module#CallPageModule' },
  { path: 'calls/:userId', loadChildren: './user-calls-ironi/user-calls-ironi.module#UserCallsIroniPageModule' },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MokedIroniSectionRoutingModule { }
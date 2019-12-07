import { AuthGuard } from './../_services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: ':userId', pathMatch: 'full' },
//   { path: 'call', loadChildren: './call/call.module#CallPageModule' },
  { path: ':userId', loadChildren: './moked-srugim/moked-srugim.module#MokedSrugimPageModule' },
  { path: 'moked-srugim', loadChildren: './moked-srugim/moked-srugim.module#MokedSrugimPageModule' },
  { path: 'calls/:userId', loadChildren: './user-calls-srugim/user-calls-srugim.module#UserCallsSrugimPageModule' },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MokedSrugimSectionRoutingModule { }
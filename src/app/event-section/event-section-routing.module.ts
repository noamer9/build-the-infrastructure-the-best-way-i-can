import { AuthGuard } from './../_services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'purchase/:eventId', canActivate: [AuthGuard], loadChildren: './purchase/purchase.module#PurchasePageModule' },
  { path: 'view/:eventId', loadChildren: './event/event.module#EventPageModule' },
  { path: 'event', loadChildren: './event/event.module#EventPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventSectionRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth-section/auth-section.module#AuthSectionModule' },
  { path: 'events', loadChildren: './event-section/event-section.module#EventSectionModule' },
  { path: 'news', loadChildren: './news-section/news-section.module#NewsSectionModule' },
  { path: 'campaigns', loadChildren: './campaign-section/campaign-section.module#CampaignSectionModule' },
  { path: 'communitys', loadChildren: './communitys-section/communitys-section.module#CommunitysSectionModule' },
  { path: 'moked-ironi', loadChildren: './moked-ironi-section/moked-ironi-section.module#MokedIroniSectionModule' },
  { path: 'moked-srugim', loadChildren: './moked-srugim-section/moked-srugim-section.module#MokedSrugimSectionModule' },
  // { path: 'my-calls', loadChildren: './my-calls-section/my-calls-section.module#MyCallsSectionModule' },
  // { path: 'my-calls-ironi', loadChildren: './my-calls-ironi-section/my-calls-ironi-section.module#MyCallsIroniSectionModule' },

  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsageDashPage } from './usage-dash.page';

const routes: Routes = [
  {
    path: '',
    component: UsageDashPage,
    children : [
      {
        path: 'jour',
        loadChildren: () => import('../usage-jour-dash/usage-jour-dash.module').then( m => m.UsageJourDashPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsageDashPageRoutingModule {}

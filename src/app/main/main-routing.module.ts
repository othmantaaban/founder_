import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      // {
      //   path: 'finance-jour-dash',
      //   loadChildren: () => import('../pages/finance-jour-dash/finance-jour-dash.module').then( m => m.FinanceJourDashPageModule)
      // },
      // {
      //   path: 'finance-mois-dash',
      //   loadChildren: () => import('../pages/finance-mois-dash/finance-mois-dash.module').then( m => m.FinanceMoisDashPageModule)
      // },
      // {
      //   path: 'finance-annee-dash',
      //   loadChildren: () => import('../pages/Finnance/finance-annee-dash/finance-annee-dash.module').then( m => m.FinanceAnneeDashPageModule)
      // },
      // {
      //   path: 'admin-jour-dash',
      //   loadChildren: () => import('../pages/admin/admin-jour-dash/admin-jour-dash.module').then( m => m.AdminJourDashPageModule)
      // },
      // {
      //   path: 'admin-mois-dash',
      //   loadChildren: () => import('../pages/admin/admin-mois-dash/admin-mois-dash.module').then( m => m.AdminMoisDashPageModule)
      // },
      // {
      //   path: 'admin-annee-dash',
      //   loadChildren: () => import('../pages/admin-annee-dash/admin-annee-dash.module').then( m => m.AdminAnneeDashPageModule)
      // },
      // {
      //   path: 'pedag-jour-dash',
      //   loadChildren: () => import('../pages/pedag-jour-dash/pedag-jour-dash.module').then( m => m.PedagJourDashPageModule)
      // },
      // {
      //   path: 'pedag-mois-dash',
      //   loadChildren: () => import('../pages/pedag-mois-dash/pedag-mois-dash.module').then( m => m.PedagMoisDashPageModule)
      // },
      {
        path: 'usage-jour-dash',
        loadChildren: () => import('../pages/usage/usage-jour-dash/usage-jour-dash.module').then( m => m.UsageJourDashPageModule)
      },
      {
        path: 'accueil',
        loadChildren: () => import('../pages/accueil/accueil.module').then( m => m.AccueilPageModule)
      },
      {
        path: 'suivi-inscription',
        loadChildren: () => import('../pages/suivi-inscription/suivi-inscription.module').then( m => m.SuiviInscriptionPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/finance-jour-dash',
        pathMatch: 'full'
      },
      // {
      //   path: 'finance',
      //   loadChildren: () => import('../finance-tabs/finance-tabs.module').then(m => m.FinanceTabsPageModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}

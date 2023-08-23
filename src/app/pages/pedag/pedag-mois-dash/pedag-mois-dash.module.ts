import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedagMoisDashPageRoutingModule } from './pedag-mois-dash-routing.module';

import { PedagMoisDashPage } from './pedag-mois-dash.page';
import { CardsFinanceComponent } from 'src/app/components/cards-finance/cards-finance.component';
import { NgChartsModule } from 'ng2-charts';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { DonutChartComponent } from 'src/app/components/donut-chart/donut-chart.component';
import { StackedBarChartComponent } from 'src/app/components/stacked-bar-chart/stacked-bar-chart.component';
import { ParentModule } from 'src/app/parent/parent.module';
import { CardsPedgComponent } from 'src/app/components/cards-pedg/cards-pedg.component';
import { HorizontalBarChartComponent } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component';
import { CardsPedagv2Component } from 'src/app/components/cards-pedagv2/cards-pedagv2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedagMoisDashPageRoutingModule,
    NgChartsModule,
  ],
  declarations: [
    PedagMoisDashPage,
    CardsPedgComponent,
    HorizontalBarChartComponent,
    CardsPedagv2Component
  ]
})
export class PedagMoisDashPageModule {}

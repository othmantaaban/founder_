import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
// import { NgApexchartsModule } from "ng-apexcharts";
import { NgChartsModule } from 'ng2-charts';
import { DonutChartComponent } from '../components/donut-chart/donut-chart.component';
import { CardsFinanceComponent } from '../components/cards-finance/cards-finance.component';
import { ListingFinanceComponent } from '../components/listing-finance/listing-finance.component';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { HorizontalBarChartComponent } from '../components/horizontal-bar-chart/horizontal-bar-chart.component';
import { ListingAdministrationComponent } from '../components/listing-administration/listing-administration.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,NgChartsModule],
  declarations: [ExploreContainerComponent,DonutChartComponent,CardsFinanceComponent,ListingFinanceComponent,PieChartComponent,HorizontalBarChartComponent,ListingAdministrationComponent],
  exports: [ExploreContainerComponent]
})
export class ExploreContainerComponentModule {}

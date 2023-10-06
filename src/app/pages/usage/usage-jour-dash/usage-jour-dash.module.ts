import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsageJourDashPageRoutingModule } from './usage-jour-dash-routing.module';

import { UsageJourDashPage } from './usage-jour-dash.page';
import { NgChartsModule } from 'ng2-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { VerticalBarChartComponent } from 'src/app/components/vertical-bar-chart/vertical-bar-chart.component';
import { ListingUsageComponent } from 'src/app/components/listing-usage/listing-usage.component';
import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';
// import { VerticalBarChartComponent } from 'src/app/components/vertical-bar-chart/vertical-bar-chart.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsageJourDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    HorizontalBarChartComponentModule
  ],
  declarations: [
    UsageJourDashPage,
    // HorizontalBarChartComponent,
    VerticalBarChartComponent,
    // UsageJourDashPage,
    ListingUsageComponent
  ]

})
export class UsageJourDashPageModule {}

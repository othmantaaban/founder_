import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuiviInscriptionPageRoutingModule } from './suivi-inscription-routing.module';

import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';

import { SuiviInscriptionPage } from './suivi-inscription.page';
import { NgApexchartsModule } from "ng-apexcharts";
import { PieChartComponentModule } from 'src/app/components/pie-chart/pie-chart.component.module';
import { HorizontalBarChartComponent } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuiviInscriptionPageRoutingModule,
    NgApexchartsModule,
    PieChartComponentModule,
    NgChartsModule
  ],
  declarations: [SuiviInscriptionPage,DateSegmentsComponent,HorizontalBarChartComponent]
})
export class SuiviInscriptionPageModule {}

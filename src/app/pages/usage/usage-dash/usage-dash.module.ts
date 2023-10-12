import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsageDashPageRoutingModule } from './usage-dash-routing.module';

import { UsageDashPage } from './usage-dash.page';
import { DateSegmentsComponentModule } from 'src/app/components/date-segments/date-segment.component.module';
// import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsageDashPageRoutingModule,
    DateSegmentsComponentModule
  ],
  declarations: [
    UsageDashPage,
    // DateSegmentsComponent
  ]
})
export class UsageDashPageModule {}

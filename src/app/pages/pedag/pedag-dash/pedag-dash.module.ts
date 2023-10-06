import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedagDashPageRoutingModule } from './pedag-dash-routing.module';

import { PedagDashPage } from './pedag-dash.page';
import { DateSegmentsComponentModule } from 'src/app/components/date-segments/date-segment.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedagDashPageRoutingModule,
    DateSegmentsComponentModule
  ],
  declarations: [
    PedagDashPage,
    // DateSegmentsComponent
  ]
})
export class PedagDashPageModule {}

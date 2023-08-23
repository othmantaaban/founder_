import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedagDashPageRoutingModule } from './pedag-dash-routing.module';

import { PedagDashPage } from './pedag-dash.page';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedagDashPageRoutingModule
  ],
  declarations: [
    PedagDashPage,
    DateSegmentsComponent
  ]
})
export class PedagDashPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanceJourDashPageRoutingModule } from './finance-jour-dash-routing.module';

import { FinanceJourDashPage } from './finance-jour-dash.page';
// import { NgChartsModule } from 'ng2-charts';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ParentModule } from 'src/app/parent/parent.module';
import { CardsFinanceComponent } from 'src/app/components/cards-finance/cards-finance.component';
import { HorizontalBarChartComponent } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component';
import { ListingRecouvrementsComponent } from 'src/app/components/listing-recouvrements/listing-recouvrements.component';
import { ListingFinanceComponent } from 'src/app/components/listing-finance/listing-finance.component';
import { ListingFinanceAvoirsComponent } from 'src/app/components/listing-finance-avoirs/listing-finance-avoirs.component';
import { ListingDiscountComponent } from 'src/app/components/listing-discount/listing-discount.component';
import { ListingFinanceDepenseComponent } from 'src/app/components/listing-finance-depense/listing-finance-depense.component';
import { NgChartsModule } from 'ng2-charts';
import { HorizontalBarChartComponentModule } from 'src/app/components/horizontal-bar-chart/horizontal-bar-chart.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanceJourDashPageRoutingModule,
    NgChartsModule,
    ScrollingModule,
    // ParentModule
    HorizontalBarChartComponentModule
  ],
  declarations: [
    FinanceJourDashPage,
    CardsFinanceComponent,
    ListingRecouvrementsComponent,
    ListingFinanceAvoirsComponent,
    ListingDiscountComponent,
    ListingFinanceComponent,
    ListingFinanceDepenseComponent,
  ]
})
export class FinanceJourDashPageModule {}

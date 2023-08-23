import { ChangeDetectorRef, Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
import { SharedService } from 'src/app/services/shared.service';
import { FinanceJourDashPage } from '../finance-jour-dash/finance-jour-dash.page';
import { FinanceJourDashPageModule } from '../finance-jour-dash/finance-jour-dash.module';

@Component({
  selector: 'app-finance-dash',
  templateUrl: './finance-dash.page.html',
  styleUrls: ['./finance-dash.page.scss'],
})
export class FinanceDashPage implements OnInit {
  // @ViewChild("jour") jourRef: any;
  // @ViewChild("mois") moisRef: any;
  // @ViewChild("annes") anneeRef: any;
  public pathList=[
    {vue:'Jour', path:'/tabs/admin-jour-dash',value:'jour'},
    {vue:'Mois', path:'/tabs/admin-mois-dash',value:'mois'},
    {vue:'Annee',path:'/tabs/admin-annee-dash',value:'annee'}
  ];

  public active : string = "jour";

// : ComponentRef
  constructor(
    private sharedService: SharedService,
    private navigation : NavController
    ) {
      this.sharedService.getClickEvent().subscribe((x)=>{
        this.active = x !== null ? x : this.active;
        console.log(this.active);
          switch (this.active) {
            case 'jour':
              navigation.navigateRoot("tabs/finance-dash/jour")
              break;
            case 'mois':
              navigation.navigateRoot("tabs/finance-dash/mois")
              break;
            case 'annee':
              navigation.navigateRoot("tabs/finance-dash/annee")
              break;
            default:
              break;
          }
        // console.log(this.moisRef);
        // console.log(this.anneeRef);
    });
  }

  ngOnInit(): void {
    // this.jourRef.callApi();
  }

  ionViewWillEnter() {
    // this.jourRef.callApi();
  }

}


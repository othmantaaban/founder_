import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pedag-dash',
  templateUrl: './pedag-dash.page.html',
  styleUrls: ['./pedag-dash.page.scss'],
})
export class PedagDashPage implements OnInit {
  public pathList=[
    {vue:'Jour', path:'/tabs/admin-jour-dash',value:'jour'},
    {vue:'Mois', path:'/tabs/admin-mois-dash',value:'mois'},
    // {vue:'Annee',path:'/tabs/admin-annee-dash',value:'annee'}
  ];

  active

  constructor(
    private sharedService: SharedService,
    private navigation : NavController
    ) {
      this.sharedService.getClickEvent().subscribe((x)=>{
        this.active = x !== null ? x : this.active;
        console.log(this.active);
          switch (this.active) {
            case 'jour':
              navigation.navigateRoot("tabs/pedag-dash/jour")
              break;
            case 'mois':
              navigation.navigateRoot("tabs/pedag-dash/mois")
              break;
            default:
              break;
          }

    });
  }
  ngOnInit() {
  }

}

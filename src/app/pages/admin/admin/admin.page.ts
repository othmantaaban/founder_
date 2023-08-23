import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public  pathList=[
    {vue:'Jour',path:'/tabs/admin',value:'jour'},
    {vue:'Mois',path:'/tabs/admin',value:'mois'},
    {vue:'Annee',path:'/tabs/admin',value:'annee'}
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
              navigation.navigateRoot("tabs/admin/jour")
              break;
            case 'mois':
              navigation.navigateRoot("tabs/admin/mois")
              break;
            case 'annee':
              navigation.navigateRoot("tabs/admin/annee")
              break;
            default:
              break;
          }
        // console.log(this.moisRef);
        // console.log(this.anneeRef);
    });
  }

  ngOnInit() {
  }

}

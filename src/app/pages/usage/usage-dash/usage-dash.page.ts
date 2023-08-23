import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usage-dash',
  templateUrl: './usage-dash.page.html',
  styleUrls: ['./usage-dash.page.scss'],
})
export class UsageDashPage implements OnInit {

  pathList = [
    // {vue:"Jour",path:"/tabs/usage-jour-dash",value:"jour"},
    // { vue: "Mois", path: "/tabs/usage-jour-dash", value: "mois" },
  ]

  constructor() { }

  ngOnInit() {
  }

}

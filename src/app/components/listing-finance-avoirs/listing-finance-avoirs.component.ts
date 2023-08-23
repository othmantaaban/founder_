import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-finance-avoirs',
  templateUrl: './listing-finance-avoirs.component.html',
  styleUrls: ['./listing-finance-avoirs.component.scss'],
})
export class ListingFinanceAvoirsComponent implements OnInit {

  @Input() items=[];
  @Input() Title:string;
  constructor() { }

  ngOnInit() {}

}

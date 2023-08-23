import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-administration',
  templateUrl: './listing-administration.component.html',
  styleUrls: ['./listing-administration.component.scss'],
})
export class ListingAdministrationComponent implements OnInit {

  constructor() { }
  @Input() items=[];
  @Input() Title:string;
  ngOnInit() {}

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-recouvrements',
  templateUrl: './listing-recouvrements.component.html',
  styleUrls: ['./listing-recouvrements.component.scss'],
})
export class ListingRecouvrementsComponent implements OnInit {


  @Input() items=[];
  @Input() Title:string;
  constructor() { }

  ngOnInit() {}

}

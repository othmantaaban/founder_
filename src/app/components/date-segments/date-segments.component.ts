import { Component, Input, OnInit, ViewChild,ChangeDetectorRef,ElementRef } from '@angular/core';
import { IonSegment, IonSlides } from '@ionic/angular';
import { ChartData } from 'chart.js';
import {FinanceService} from 'src/app/finance.service';
import { SharedService } from 'src/app/services/shared.service';
import { GlobalConstantesComponent } from '../global-constantes/global-constantes.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-date-segments',
  templateUrl: './date-segments.component.html',
  styleUrls: ['./date-segments.component.scss'],
})
export class DateSegmentsComponent implements OnInit {

  public Select:string;
  
  public itemsList=[];
  @Input() listPaths:any[];
  public static dateValue:any;
  
  public selectedValue:string = "jour";
  public selectedDate:string;

  @Input() defaultValue:string;
  @Input() active:any;



  constructor(
    private financeService : FinanceService,
    private sharedService:SharedService,
    private router: Router
  ) { 
    // this.selectedValue="jour"
  }


  clickMe(){
    this.sharedService.sendClickEvent(this.selectedValue);
  }

  public selectedIndex=0

  rightDate(){
   if(GlobalConstantesComponent.dateValue<this.itemsList.length-1){
    console.log(this.selectedIndex+1,this.itemsList)
    this.selectedIndex=GlobalConstantesComponent.dateValue
    this.selectedIndex+=1
    // DateSegmentsComponent.dateValue=this.itemsList[this.selectedIndex].anglais
    // GlobalConstantesComponent.dateValue=this.itemsList[this.selectedIndex].
    GlobalConstantesComponent.dateValue=this.selectedIndex
    this.selectedDate=this.itemsList[GlobalConstantesComponent.dateValue].francais
    DateSegmentsComponent.dateValue=this.itemsList[GlobalConstantesComponent.dateValue].anglais
    // GlobalConstantesComponent.dateValue=this.selectedIndex

  }
   this.sharedService.sendClickEvent(this.selectedValue);
  }

  leftDate(){
    if(GlobalConstantesComponent.dateValue!=0){
      this.selectedIndex=GlobalConstantesComponent.dateValue
      this.selectedIndex-=1
      // DateSegmentsComponent.dateValue=this.itemsList[this.selectedIndex].anglais
    GlobalConstantesComponent.dateValue=this.selectedIndex
    this.selectedDate=this.itemsList[GlobalConstantesComponent.dateValue].francais
    DateSegmentsComponent.dateValue=this.itemsList[GlobalConstantesComponent.dateValue].anglais
    // this.itemsList[this.selectedIndex].anglais

    }
   this.sharedService.sendClickEvent(this.selectedValue);
  }

  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


  onDisplay(item: any){
    console.log(item)
    DateSegmentsComponent.dateValue=item
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
    centeredSlides: true,
    slidesPerView: 3,
    pagination:false,
    // spaceBetween: 20,
    // autoplay: true
  };

  public moisList=[]
  public jourList=[]
  public anneeList=[]

  segmentChanged(ev: any) {
    // ev.preventDefault();
    console.log('value: ', ev.target);
    console.log('value: ', ev.detail.value);
    this.selectedValue = ev.detail.value;
    console.log(this.selectedValue);
    DateSegmentsComponent.dateValue = undefined
    this.initialize();
    this.sharedService.sendClickEvent(this.selectedValue);
  }

  test(ev: any) {
    ev.preventDefault();
  }

  sousSegmentChanged(ev: any) {
    // console.log('value: ', ev.detail.value);
  }

  numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }

  

   days = (date_1, date_2) =>{
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}

  get getStaticDate() {
    return GlobalConstantesComponent.dateValue;
  }

  ngOnInit() {
    this.selectedValue = this.router.getCurrentNavigation().finalUrl.toString().split("/").pop()
    
    this.initialize();

    // const event = new Date('10/21/2022');
    // const options = {year: 'numeric', month: 'long', day: 'numeric' };

    // console.log(event.toLocaleDateString('de-DE', options));
    // // expected output (varies according to local timezone): Donnerstag, 20. Dezember 2012

    // console.log(event.toLocaleDateString('ar-EG', options));
    // // expected output (varies according to local timezone): الخميس، ٢٠ ديسمبر، ٢٠١٢

    // console.log(event.toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric' }));
    // // expected output (varies according to local timezone and default locale): Thursday, December 20, 2012


    // this.selectedDate=GlobalConstantesComponent.dateValue
    // Define a list of days:

  }

  initialize() {
    const c = new Date();
    let prior = new Date().setDate(c.getDate() - 30);
    let k=30
    let daysList=[]
    while(k>=0){
      let prior = new Date().setDate(c.getDate() - k);
      const sf = new Date(prior).toLocaleDateString('fr-FR',{year: 'numeric', month: 'long', day: 'numeric' });
      const s = new Date(prior).toLocaleDateString('fr-FR');
      let splitedDate=s.split("/")
      daysList.push({francais:sf,anglais:splitedDate[2]+"-"+splitedDate[1]+"-"+splitedDate[0]})
      // daysList.push({francais:splitedDate[0]+"/"+splitedDate[1]+"/"+splitedDate[2],anglais:splitedDate[2]+"-"+splitedDate[1]+"-"+splitedDate[0]})
      k-=1
    }
    this.jourList=daysList
    console.log("datelist here",daysList)


    // Define a list of years
    let j=5
    while(j>=0){
      let currentYear=new Date().getFullYear()+1
      console.log(currentYear)
      this.anneeList.push({francais:""+(currentYear-j),anglais:""+(currentYear-j)})
      j-=1
    }

    // Define list of months

    let m=0
    let suivi=0
    const months = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
    const monthsDict = {10:9, 9:10, 8:11, 7:12, 6:1, 5:2, 4:3, 3:4, 2:5, 1:6, 0:7};
    const mois = ["Septembre", "Octobre", "Novembre", "Decembre","Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet"];
    let currentMonth=new Date().getMonth()
    for(let i=0;i<mois.length;i++){
        this.moisList.push({francais:mois[i],anglais:months[i]})
    }

 
    console.log(this.listPaths);
    console.log(this.active);
    
    // this.selectedValue=this.listPaths[parseInt(this.active)].value
    // this.itemsList=this.jourList.reverse()

    console.log('this.selectedValue' , this.selectedValue);

    console.log(this.moisList);
    if(this.selectedValue==="jour"){
    this.itemsList=this.jourList.reverse()
    }else if(this.selectedValue=== "mois"){
      this.itemsList=this.moisList.reverse()
    }else if(this.selectedValue=== "annee"){
    this.itemsList=this.anneeList.reverse()
    }
    // GlobalConstantesComponent.dateValue = this.itemsList[0].francais;
    // console.log(GlobalConstantesComponent.dateValue);
    
    // if(this.selectedValue==="jour"){
    // console.log("defult value in jour : ",this.selectedValue)
    // this.itemsList=this.jourList.reverse()
    // }else if(this.selectedValue==="mois"){
    // console.log("defult value in mois: ",this.selectedValue)
    // this.itemsList=this.moisList
    // }else if(this.selectedValue==="annee"){
    // console.log("defult value in annee: ",this.selectedValue)
    // this.itemsList=this.anneeList.reverse()
    // }

    if(this.selectedValue==="mois"){
      console.log(GlobalConstantesComponent.dateValue);
      // GlobalConstantesComponent.dateValue=parseInt(Object.keys(monthsDict).find(key => monthsDict[key] === (currentMonth+1))) 
    }
    // else{
    //     GlobalConstantesComponent.dateValue=0
    //   }
    // this.selectedDate=this.itemsList[GlobalConstantesComponent.dateValue].francais
    // DateSegmentsComponent.dateValue=this.itemsList[GlobalConstantesComponent.dateValue].anglais
    // this.sharedService.sendClickEvent();
  }
}

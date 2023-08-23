import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-finance-annee-dash',
  templateUrl: './finance-annee-dash.page.html',
  styleUrls: ['./finance-annee-dash.page.scss'],
})
export class FinanceAnneeDashPage implements OnInit {

  ionViewWillEnter() {
    this.callApi()
  }


  public itemsEncaissement=[
  
  ]
  
  //combochart1
  public barChartLabels1 = [];
  public barChartType1 = 'line';
  public barChartData1 = [
        {data: [], label: 'CA',backgroundColor:"#EE386E",type:"bar"},
        {data: [], label: 'Encaissements',backgroundColor:"#2B2A64",type:"bar"},
        {data: [], label: 'Retards',backgroundColor:"#F7643B",type:"line"},
      ];
      

  //combochart2
  public barChartLabels2 = [];
  public barChartType2 = 'line';
  public barChartData2 = [
            {data: [], label: 'Trésorerie',backgroundColor:"#EE386E",type:"line"},
            {data: [], label: 'Encaissement',backgroundColor:"#2B2A64",type:"bar"},
            {data: [], label: 'Dépenses',backgroundColor:"#F7643B",type:"bar"},
          ];

  //combochart3
  public barChartLabels3 = [];
  public barChartType3 = 'line';
  public barChartData3 = [
              {data: [], label: 'Encaissement Cumulé',backgroundColor:"#EE386E",type:"line"},
              {data: [], label: 'Encaissement',backgroundColor:"#2B2A64",type:"bar"},
      ];

  //combochart4
  public barChartLabels4 = [];
  public barChartType4 = 'line';
  public barChartData4 = [
                {data: [], label: 'Retards Cumulés',backgroundColor:"#EE386E",type:"line"},
                {data: [], label: 'Retards',backgroundColor:"#2B2A64",type:"bar"},
        ];
  pathList=[
          {vue:"Jour",path:"/tabs/finance-jour-dash",value:"jour"},
          {vue:"Mois",path:"/tabs/finance-mois-dash",value:"mois"},
          // {vue:"Annee",path:"/tabs/finance-annee-dash",value:"annee"},
        ]


  // Group By Function
  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }
  clickEventSubscription:Subscription;
  constructor(
    private financeService : FinanceService,private sharedService:SharedService
  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      this.callApi();
    })
   }

   callApi(){
    console.log(DateSegmentsComponent.dateValue);
    
    let date=DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getFullYear() + 1 
    console.log(date);
    
    this.financeService.getEncaissementsAnnuelList(date).subscribe(response => {
      const data=response.result.slice(0,8)
      let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
      let tmpTable = this.groupArrayOfObjects(
        dataEnc,
        "Mois"
      );
      
      const dictEnc = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictEnc.push({
          Mois: key1,
          total: total,
        });
        total=0
      }
      let tmpData=[]
      let tmpLabels=[]
      dictEnc.map((d)=>{
        tmpLabels.push(d.Mois)
        tmpData.push(d.total)
      })
      this.barChartLabels1=tmpLabels
      this.barChartData1[1].data=tmpData
      this.barChartData2[1].data=tmpData
      this.barChartLabels2=tmpLabels
      console.log("data 2:",this.barChartData2)

      // Encaissement cumulé
      this.barChartData3[1].data=tmpData
      this.barChartLabels3=tmpLabels
      let prev=0
      for(let i=0;i<this.barChartData3[1].data.length;i++){
        this.barChartData3[0].data.push(this.barChartData3[1].data[i]+prev)
        // console.log(this.barChartData3[1].data[i]+prev)
        prev=this.barChartData3[1].data[i]+prev
      }
      
    })

    this.financeService.getCAList(date).subscribe(response => {
      const data=response.result
      // Cycle prep
      let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
      let tmpTable = this.groupArrayOfObjects(
        dataEnc,
        "Mois"
      );
      // console.log(dataEnc)
      const dictEnc = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictEnc.push({
          Mois: key1,
          total: total,
        });
        total=0
      }
      let tmpData=[]
      let tmpLabels=[]
      dictEnc.map((d)=>{
        tmpLabels.push(d.Mois)
        tmpData.push(d.total)
      })
      this.barChartData1[0].data=tmpData
    })

    this.financeService.getRetardsAnnuelList(date).subscribe(response => {
      const data=response.result
      // Cycle prep
      let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
      let tmpTable = this.groupArrayOfObjects(
        dataEnc,
        "Mois"
      );
      const dictEnc = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictEnc.push({
          Mois: key1,
          total: total,
        });
        total=0
      }
      let tmpData=[]
      let tmpLabels=[]
      dictEnc.map((d)=>{
        tmpLabels.push(d.Mois)
        tmpData.push(d.total)
      })
      this.barChartData1[2].data=tmpData
      // Encaissement cumulé
      this.barChartData4[1].data=tmpData
      this.barChartLabels4=tmpLabels
      let prev=0
      for(let i=0;i<this.barChartData4[1].data.length;i++){
        this.barChartData4[0].data.push(this.barChartData4[1].data[i]+prev)
        prev=this.barChartData4[1].data[i]+prev
        // console.log(prev)
      }
    })

    this.financeService.getDepensesAnnuelList(date).subscribe(response => {
      const data=response.result
      // Cycle prep
      let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
      let tmpTable = this.groupArrayOfObjects(
        dataEnc,
        "Mois"
      );
      // console.log(dataEnc)
      const dictEnc = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictEnc.push({
          Mois: key1,
          total: total,
        });
        total=0
      }
      let tmpData=[]
      let tmpLabels=[]
      dictEnc.map((d)=>{
        // console.log(d.Mois)
        this.barChartLabels2.push(d.Mois)
        tmpData.push(-d.total)
      })
      // this.barChartLabels2=tmpData
      this.barChartData2[2].data=tmpData
      // console.log(this.barChartLabels2)
      for(let i=0;i<this.barChartData2[2].data.length;i++){
        this.barChartData2[0].data.push(this.barChartData2[1].data[i]-this.barChartData2[2].data[i])
        // console.log(this.barChartData2[1].data[i]-this.barChartData2[2].data[i])
      }
      // console.log(this.barChartData2[0].data)
    })

    this.financeService.getEncaissementCardsAnneeList(date).subscribe(response => {
          const data=response
          console.log("cards data: ",data)
          // Cycle prep
          this.itemsEncaissement=[] //vider la liste
          data.map((c,index)=>{
            if(c.result.length!=0){
              // console.log(c.result[0])
              this.itemsEncaissement.push({alias:"élèves",title:c.title,montant:this.numFormatter(parseInt(c.result[0].Montant)),count:c.result[0].nbEleves,unite:"MAD"})
            }
          })
         // console.log("cards data: ",this.itemsEncaissement)
    });

  }

  ngOnInit() {
    this.callApi()
    // this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
    //   this.callApi();
    // })

    // this.financeService.getEncaissementsAnnuelList("").subscribe(response => {
    //   const data=response.result.slice(0,8)
    //   // Cycle prep
    //   let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
    //   let tmpTable = this.groupArrayOfObjects(
    //     dataEnc,
    //     "Mois"
    //   );
      
    //   const dictEnc = [];
    //   for (const [key1, value1] of Object.entries(tmpTable)) {
    //     let total=0
    //     // console.log("here: ",Object.keys(value1).length)
    //     Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
    //     dictEnc.push({
    //       Mois: key1,
    //       total: total,
    //     });
    //     total=0
    //   }
    //   let tmpData=[]
    //   let tmpLabels=[]
    //   dictEnc.map((d)=>{
    //     tmpLabels.push(d.Mois)
    //     tmpData.push(d.total)
    //   })
    //   this.barChartLabels1=tmpLabels
    //   this.barChartData1[1].data=tmpData
    //   this.barChartData2[1].data=tmpData.slice(0,2)

    //   // Encaissement cumulé
    //   this.barChartData3[1].data=tmpData
    //   this.barChartLabels3=tmpLabels
    //   let prev=0
    //   for(let i=0;i<this.barChartData3[1].data.length;i++){
    //     this.barChartData3[0].data.push(this.barChartData3[1].data[i]+prev)
    //     // console.log(this.barChartData3[1].data[i]+prev)
    //     prev=this.barChartData3[1].data[i]+prev
    //   }
      
    // })

    // this.financeService.getCAList("").subscribe(response => {
    //   const data=response.result
    //   // Cycle prep
    //   let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
    //   let tmpTable = this.groupArrayOfObjects(
    //     dataEnc,
    //     "Mois"
    //   );
    //   // console.log(dataEnc)
    //   const dictEnc = [];
    //   for (const [key1, value1] of Object.entries(tmpTable)) {
    //     let total=0
    //     // console.log("here: ",Object.keys(value1).length)
    //     Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
    //     dictEnc.push({
    //       Mois: key1,
    //       total: total,
    //     });
    //     total=0
    //   }
    //   let tmpData=[]
    //   let tmpLabels=[]
    //   dictEnc.map((d)=>{
    //     tmpLabels.push(d.Mois)
    //     tmpData.push(d.total)
    //   })
    //   this.barChartData1[0].data=tmpData
    // })

    // this.financeService.getRetardsAnnuelList("").subscribe(response => {
    //   const data=response.result
    //   // Cycle prep
    //   let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
    //   let tmpTable = this.groupArrayOfObjects(
    //     dataEnc,
    //     "Mois"
    //   );
    //   const dictEnc = [];
    //   for (const [key1, value1] of Object.entries(tmpTable)) {
    //     let total=0
    //     // console.log("here: ",Object.keys(value1).length)
    //     Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
    //     dictEnc.push({
    //       Mois: key1,
    //       total: total,
    //     });
    //     total=0
    //   }
    //   let tmpData=[]
    //   let tmpLabels=[]
    //   dictEnc.map((d)=>{
    //     tmpLabels.push(d.Mois)
    //     tmpData.push(d.total)
    //   })
    //   this.barChartData1[2].data=tmpData
    //   // Encaissement cumulé
    //   this.barChartData4[1].data=tmpData
    //   this.barChartLabels4=tmpLabels
    //   let prev=0
    //   for(let i=0;i<this.barChartData4[1].data.length;i++){
    //     this.barChartData4[0].data.push(this.barChartData4[1].data[i]+prev)
    //     prev=this.barChartData4[1].data[i]+prev
    //     // console.log(prev)
    //   }
    // })

    // this.financeService.getDepensesAnnuelList("").subscribe(response => {
    //   const data=response.result
    //   // Cycle prep
    //   let dataEnc=data.map((d) => ({Mois:d.Month,Montant:d.Montant}));
    //   let tmpTable = this.groupArrayOfObjects(
    //     dataEnc,
    //     "Mois"
    //   );
    //   // console.log(dataEnc)
    //   const dictEnc = [];
    //   for (const [key1, value1] of Object.entries(tmpTable)) {
    //     let total=0
    //     Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
    //     dictEnc.push({
    //       Mois: key1,
    //       total: total,
    //     });
    //     total=0
    //   }
    //   let tmpData=[]
    //   let tmpLabels=[]
    //   dictEnc.map((d)=>{
    //     // console.log(d.Mois)
    //     this.barChartLabels2.push(d.Mois)
    //     tmpData.push(-d.total)
    //   })
    //   // this.barChartLabels2=tmpData
    //   this.barChartData2[2].data=tmpData
    //   // console.log(this.barChartLabels2)
    //   for(let i=0;i<this.barChartData2[2].data.length;i++){
    //     this.barChartData2[0].data.push(this.barChartData2[1].data[i]-this.barChartData2[2].data[i])
    //     // console.log(this.barChartData2[1].data[i]-this.barChartData2[2].data[i])
    //   }
    //   // console.log(this.barChartData2[0].data)
    // })
    
    
    
  }

}

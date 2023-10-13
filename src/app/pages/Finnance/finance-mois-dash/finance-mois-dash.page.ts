import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-finance-mois-dash',
  templateUrl: './finance-mois-dash.page.html',
  styleUrls: ['./finance-mois-dash.page.scss'],
})
export class FinanceMoisDashPage implements OnInit {

    public retardsTotal={montant:0,count:0}
    //Repartition encaissement cycle
    public cycleLabels = [];
    public cycleData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
    public serviceLabels = [];
    public serviceData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
    // CA
    public caCycleLabels = [];
    public caCycleData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
    public caServiceLabels = [];
    public caServiceData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
    

    public modeLabels = [];
    public modeData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];

    //Repartition retards cycle
    public cycleRetLabels = [];
    public cycleRetData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];

    //Repartition retards cycle
    public niveauRetLabels = [];
    public niveauRetData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];

    //Repartition retards service
    public serviceRetLabels = [];
    public serviceRetData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];

    public typeLabels = ['Transport', 'Cantine', 'F.I', 'F.S'];
    public typeData = [
      {data: [65, 59, 80, 81], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
    
  public itemsEncaissement=[]

  public retardsList=[]
  public itemsDepenses=[
    {alias:"Factures",title:"Dépenses Aujourd'hui",montant:"109",count:"53"},
  ]
  public depenses: any =[]

  pathList=[
    {vue:"Jour",path:"/tabs/finance-jour-dash",value:"jour"},
    {vue:"Mois",path:"/tabs/finance-mois-dash",value:"mois"},
    {vue:"Annee",path:"/tabs/finance-annee-dash",value:"annee"}
  ]

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    // loop: true,
    centeredSlides: true,
    // spaceBetween: 20,
    // autoplay: true
  };
   
  
  //BarChart
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    indexAxis: 'x',
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',backgroundColor:"#F7643B"},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B',backgroundColor:"#2B2A64"}
  ];

  public absentsList=[
    {User:"Amir Yassine",Role:"Réclamation"},
    {User:"Reda Youssfi",Role:"Réunion pédagogique"},
    {User:"Hamza Jerrari",Role:"Réunion pédagogique"},
  ]

  clickEventSubscription:Subscription;
  constructor(
    private financeService : FinanceService,private cdr: ChangeDetectorRef,private sharedService:SharedService, 
    private api : ApiService

  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe((elt)=>{
      console.log();
      if (elt.value == "mois") {
        this.callApi();
      }
    })
   }

  ionViewWillEnter() {
    this.callApi()
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

  // getRetardsMoisList : etat_impayes_parents

  callApi(){ 
    this.itemsEncaissement=[]
    console.log(DateSegmentsComponent.dateValue)
  
    let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getMonth() + 1;
    console.log("date mois");

    this.financeService.getEncaissementCardsList(JSON.stringify({date: date, type: "mois"}))
    .subscribe(response => {
      console.log(response);
      
      this.itemsEncaissement = []
      response.forEach(element => {
        // if (element.result[0].Montant) {
          let item = {
            title: element.title,
            montant: element.result.montant,
            alias: element.note,
            unite: "MAD",
            count: element.result.countEleves
          }
          this.itemsEncaissement.push(item)
        // }
      });
      const data = response

    })

    this.financeService.getCAList(date)
    .subscribe(response => {
      const data=response.result
      // Cycle prep
      let lastIndex = 0 


      this.caServiceData[0].data = [];
      this.caServiceLabels = [];

      this.caCycleData[0].data = [];
      this.caCycleLabels = [];

      data.forEach(element => {
        let cycleIndex = this.caCycleLabels.indexOf(element.Cycle)

        if(cycleIndex == -1) {
          this.caCycleLabels.push(element.Cycle)
          this.caCycleData[0].data.push(0) 
          lastIndex = this.caCycleData[0].data.length - 1 
        }

        this.caCycleData[0].data[cycleIndex != -1 ? cycleIndex : lastIndex] += +element.Montant 

        // 
        let serviceIndex = this.caServiceLabels.indexOf(element.Service)
        
        if(serviceIndex == -1) {
          this.caServiceLabels.push(element.Service)
          this.caServiceData[0].data.push(0) 
          lastIndex = this.caServiceData[0].data.length - 1 
        }

        this.caServiceData[0].data[serviceIndex != -1 ? serviceIndex : lastIndex] += +element.Montant 



      });

    }) 
    
    this.cycleLabels = []
    this.cycleData = []

          
    this.modeLabels = []
    this.modeData = []

    
    this.serviceLabels = []
    this.serviceData = []
    this.financeService.getEncaissementMoisList(date)
    .subscribe(response => {
      console.log(response);
      
      // const data = response.result
      let lastIndex = 0
      // console.log(data);
      
      this.cycleLabels = response.cycle[0]
      this.cycleData = response.cycle[1]

            
      this.modeLabels = response.paiement[0]
      this.modeData = response.paiement[1] 

      console.log(response);
      
      this.serviceLabels = response.service[0]
      this.serviceData = response.service[1]
      
            

      // console.log(data);
      
      // data.forEach(element => {

        // let cycleIndex = this.cycleLabels.indexOf(element.Cycle)
        // if(cycleIndex == -1) {
        //   this.cycleLabels.push(element.Cycle)
        //   this.cycleData[0].data.push(0)
        //   lastIndex = this.cycleData[0].data.length - 1
        // }

        // this.cycleData[0].data[cycleIndex != -1 ? cycleIndex : lastIndex] += +element.Montant

        
        // let typeIndex = this.modeLabels.indexOf(element.PaiementMode)
        // if(typeIndex == -1) {
        //   this.modeLabels.push(element.PaiementMode)
        //   this.modeData[0].data.push(0)
        //   lastIndex = this.modeData[0].data.length - 1
        // }

        // this.modeData[0].data[typeIndex != -1 ? typeIndex : lastIndex] += +element.Montant


                
        // let serviceIndex = this.serviceLabels.indexOf(element.Service)
        // if(serviceIndex == -1) {
        //   this.serviceLabels.push(element.Service)
        //   this.serviceData[0].data.push(0)
        //   lastIndex = this.serviceData[0].data.length - 1
        // }

        // this.serviceData[0].data[serviceIndex != -1 ? serviceIndex : lastIndex] += +element.Montant

      // });
    })



        // Cards Prep

    this.financeService.getRetardsMoisList(date)
    .subscribe(response=>{
      // const data = response

      let lastIndex = 0

      this.cycleRetData[0].data = []
      this.cycleRetLabels = []
      
      this.niveauRetData[0].data = []
      this.niveauRetLabels = []

      this.retardsList = []

      let total = 0
      let list = []
      console.log(response);
      let data = response
      // const data = response.sort((a,b) =>  b.totalImpaye - a.totalImpaye );


      data.forEach(element => {
        console.log(element);

        let cycleIndex =  this.cycleRetLabels.indexOf(element.Cycle)

        if(cycleIndex == -1) {
          this.cycleRetLabels.push(element.Cycle)
          this.cycleRetData[0].data.push(0)
          lastIndex = this.cycleRetData[0].data.length - 1
        }

        this.cycleRetData[0].data[cycleIndex ? cycleIndex : lastIndex] += +element.totalImpaye
        
        let niveauIndex =  this.niveauRetLabels.indexOf(element.Niveau)

        if(niveauIndex == -1) {
          this.niveauRetLabels.push(element.Niveau)
          this.niveauRetData[0].data.push(0)
          lastIndex = this.niveauRetData[0].data.length - 1
        }

        this.niveauRetData[0].data[niveauIndex ? niveauIndex : lastIndex] += +element.totalImpaye

        
        list.push(
          { 
            eleve: element.Eleve,
            montant: element.totalImpaye
          })

        total += +element.totalImpaye

      });
      
      list = list.sort((a,b) =>  b.montant - a.montant );
      
      this.retardsList = list.length != 0 ? list.slice(0,30) : []
      // console.log(this.retardsList.length);
      
      // this.itemsEncaissement.push(
      //   {
      //     alias:"élèves",
      //     title:"Retards des paiements",
      //     montant:this.numFormatter(total),
      //     count: this.retardsList.length,
      //     unite:"MAD"
      //   })  
    })

    this.api.get({period: date}, "get_depenses_mois")
    .subscribe(response => {
      this.depenses = response
      
    })

  }

   // Group By Function
  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  ngOnInit() {

    // this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
    //   this.callApi();
    // })
  
  }

  getRetardData() {
    let element = []
    for (let index = 0; index < this.cycleLabels.length; index++) {
      element.push(this.caCycleData[0].data[index] - this.cycleData[0].data[index])  
    }
    return  [
      {
        data: element, 
        label: '',
        backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
  }
  getRetardService() {
    let elt = this.serviceLabels.length > this.caServiceLabels.length ? this.caServiceLabels.length: this.serviceLabels.length
    let element = []
    
    for (let index = 0; index < this.cycleLabels.length; index++) {
      element.push(this.caServiceData[0].data[index] - this.serviceData[0].data[index])  
    }
    return  [
      {
        data: element, 
        label: '',
        backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];

  }
}

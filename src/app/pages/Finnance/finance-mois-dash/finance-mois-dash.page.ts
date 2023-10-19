import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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

  loader_obj = {
    card_infos : false,
    ca_prevu : false,
    encaiss : false,
    retard : false,
    depense : false,
  }


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

  public depensesCategLabels = []
  public depensesCategData = []
    
  public depensesPrestataireLabels = []
  public depensesPrestataireData = []
    
  public listDepenses = []
    
  public itemsEncaissement=[]

  public retardsList=[]
  public itemsDepenses=[
    {alias:"Factures",title:"Dépenses Aujourd'hui",montant:"109",count:"53"},
  ]
  // public depenses: any =[]

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

  depenses : any = [];

  clickEventSubscription:Subscription;
  constructor(
    private financeService : FinanceService,private cdr: ChangeDetectorRef,private sharedService:SharedService, 
    private api : ApiService,
    private loadingController : LoadingController

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

  async callApi(){ 
    this.loader()
    this.itemsEncaissement=[]
  
    let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getMonth() + 1;

    this.itemsEncaissement = []
    this.financeService.getEncaissementCardsList(JSON.stringify({date: date, type: "mois"}))
    .subscribe(response => {
      
      response.forEach(element => {
          let item = {
            title: element.title,
            montant: element.result.montant,
            alias: element.note,
            unite: "MAD",
            count: element.result.countEleves
          }
          this.itemsEncaissement.push(item)
      });

      this.loader_obj.card_infos = true;

      this.loader_dissmis()

    })

    this.caServiceData = [];
    this.caServiceLabels = [];
    this.caCycleData = [];
    this.caCycleLabels = [];

    this.financeService.getCAList(date)
    .subscribe(response => {

      this.caServiceData = response.service.data;
      this.caServiceLabels = response.service.labels;

      this.caCycleData = response.cycle.data;
      this.caCycleLabels = response.cycle.labels;

      this.loader_obj.ca_prevu = true
      this.loader_dissmis()
    }) 
    
    this.cycleLabels = []
    this.cycleData = []

          
    this.modeLabels = []
    this.modeData = []

    
    this.serviceLabels = []
    this.serviceData = []

    // this.financeService.getEncaissementMoisList(date)
    // .subscribe(response => {
      
    //   this.cycleLabels = response?.cycle[0]
    //   this.cycleData = response?.cycle[1]

            
    //   this.modeLabels = response?.paiement[0]
    //   this.modeData = response?.paiement[1] 

    //   this.serviceLabels = response?.service[0]
    //   this.serviceData = response?.service[1]

    //   this.loader_obj.encaiss = true

    //   this.loader_dissmis()
    // })


    this.api.get({period: date, type: "mois"}, "get_encaissements_data")
    .subscribe(response => {
      this.cycleLabels = response?.cycle[0]
      this.cycleData = response?.cycle[1]

            
      this.modeLabels = response?.paiement[0]
      this.modeData = response?.paiement[1] 

      this.serviceLabels = response?.service[0]
      this.serviceData = response?.service[1]

      this.loader_obj.encaiss = true

      this.loader_dissmis()
    })

    this.cycleRetData = []
    this.cycleRetLabels = []
    
    this.serviceRetData = []
    this.serviceRetLabels = []

    this.retardsList = []

    this.financeService.getRetardsMoisList(date)
    .subscribe(response=>{

      this.cycleRetData = response.cycle.data
      this.cycleRetLabels = response.cycle.labels
      
      this.serviceRetData = response.service.data
      this.serviceRetLabels = response.service.labels

      this.retardsList = response.list

      this.loader_obj.retard = true

      this.loader_dissmis()
    })

    this.depenses = []
    this.depensesCategLabels = [];
    this.depensesCategData = [];

    this.depensesPrestataireLabels = [];
    this.depensesPrestataireData = [];

    this.listDepenses = [];

    this.api.get({period: date, type: "mois"}, "get_depenses_data")
    .subscribe(response => {
      this.depenses = response
      this.depensesCategLabels = response.category.labels
      this.depensesCategData = response.category.data

      this.depensesPrestataireLabels = response.prestataire.labels
      this.depensesPrestataireData = response.prestataire.data

      this.listDepenses = response.listDepense.list

      this.loader_obj.depense = true
      this.loader_dissmis()
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

  
  }


  async loader_dissmis() {
    console.log(this.loader_obj);
    
    if(
      this.loader_obj.ca_prevu == true && 
      this.loader_obj.retard == true && 
      this.loader_obj.encaiss == true && 
      this.loader_obj.depense == true && 
      this.loader_obj.card_infos == true
    ) {
      const loading = await this.loadingController.getTop();
      console.log("cwfcewfwe");
      
      await loading.dismiss()
    }
  }

  async loader() {
    this.loader_obj = {
      card_infos : false,
      ca_prevu : false,
      encaiss : false,
      retard : false,
      depense : false,
    }
  
  
    const loading = await this.loadingController.create({
      spinner: null,
      message: '<h3>Loading Data, Please wait...</h3>',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    await loading.present();

  }
}

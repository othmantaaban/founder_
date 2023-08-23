import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
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
  public depensesList=[
    {libelle:"depense1",nfacteur:"facteur1",prestataire:"prestataire1",montant:"15000"},
    {libelle:"depense2",nfacteur:"facteur1",prestataire:"prestataire2",montant:"20000"},
    {libelle:"depense3",nfacteur:"facteur1",prestataire:"prestataire3",montant:"13000"},
    {libelle:"depense4",nfacteur:"facteur1",prestataire:"prestataire4",montant:"25000"},
  ]
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
    private financeService : FinanceService,private cdr: ChangeDetectorRef,private sharedService:SharedService
  ) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      this.callApi();
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

  callApi(){ 
    this.itemsEncaissement=[]
    console.log(DateSegmentsComponent.dateValue)
  
    let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getMonth();
    console.log(date);
    
    this.financeService.getEncaissementMoisList(date).subscribe(response => {
      const data=response.result
      console.log("enc data month: ",data)
      // Cycle prep
      let dataCycle=data.map((d) => ({Cycle:d.Cycle,Montant:d.Montant}));
      let tmpTable = this.groupArrayOfObjects(
        dataCycle,
        "Cycle"
      );
      const dictCycle = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictCycle.push({
          Cycle: key1,
          total: total,
        });
        total=0
      }
      let tmpData=[]
      let tmpLabels=[]
      dictCycle.map((d)=>{
        tmpLabels.push(d.Cycle)
        tmpData.push(d.total)
      })
      this.cycleLabels=tmpLabels
      this.cycleData[0]["data"]=tmpData


      // Service prep
      let dataService=data.map((d) => ({Service:d.Service,Montant:d.Montant}));
      tmpTable = this.groupArrayOfObjects(
        dataService,
        "Service"
      );
      const dictService = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictService.push({
          Service: key1,
          total: total,
        });
        total=0
      }
      tmpData=[]
      tmpLabels=[]
      dictService.map((d)=>{
        tmpLabels.push(d.Service)
        tmpData.push(d.total)
      })
      this.serviceLabels=tmpLabels
      this.serviceData[0]["data"]=tmpData

      // Mode prep
      let dataMode=data.map((d) => ({Mode:d.PaiementMode,Montant:d.Montant}));
      tmpTable = this.groupArrayOfObjects(
        dataMode,
        "Mode"
      );
      const dictMode = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictMode.push({
          Service: key1,
          total: total,
        });
        total=0
      }
      tmpData=[]
      tmpLabels=[]
      dictMode.map((d)=>{
        tmpLabels.push(d.Service)
        tmpData.push(d.total)
      })
      this.modeLabels=tmpLabels
      this.modeData[0]["data"]=tmpData

    })

    this.financeService.getCAList(date).subscribe(response => {
      const data=response.result
      console.log("enc data month: ",data)
      // Cycle prep
      let dataCycle=data.map((d) => ({Cycle:d.Cycle,Montant:d.Montant}));
      let tmpTable = this.groupArrayOfObjects(
        dataCycle,
        "Cycle"
      );
      const dictCycle = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictCycle.push({
          Cycle: key1,
          total: total,
        });
        total=0
      }
      let tmpData=[]
      let tmpLabels=[]
      dictCycle.map((d)=>{
        tmpLabels.push(d.Cycle)
        tmpData.push(d.total)
      })
      this.caCycleLabels=tmpLabels
      this.caCycleData[0]["data"]=tmpData


      // Service prep
      let dataService=data.map((d) => ({Service:d.Service,Montant:d.Montant}));
      tmpTable = this.groupArrayOfObjects(
        dataService,
        "Service"
      );
      const dictService = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total=0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
        dictService.push({
          Service: key1,
          total: total,
        });
        total=0
      }
      tmpData=[]
      tmpLabels=[]
      dictService.map((d)=>{
        tmpLabels.push(d.Service)
        tmpData.push(d.total)
      })
      this.caServiceLabels=tmpLabels
      this.caServiceData[0]["data"]=tmpData
    }) 

        // Cards Prep
        this.financeService.getEncaissementCardsMoisList(date).subscribe(response => {
    const data=response
    console.log("cards data: ",data)
    // Cycle prep
    // this.itemsEncaissement=[] //vider la liste
    data.map((c,index)=>{
      if(c.result.length!=0){
        // console.log(c.result[0])
        if(c.title=="Dépenses"){
          // Dépenses
        this.itemsEncaissement.push({alias:"factures",title:c.title,montant:this.numFormatter(parseInt(c.result[0].Montant)),count:c.result[0].nbEleves,unite:"MAD"})

        }else{
          this.itemsEncaissement.push({alias:"élèves",title:c.title,montant:this.numFormatter(parseInt(c.result[0].Montant)),count:c.result[0].nbEleves,unite:"MAD"})

        }
      }
    })

    let total = this.itemsEncaissement.reduce(function(prev, cur) {
      return prev + cur.montant;
    }, 0);
    console.log("trésorerie: ",total)
    
        })
        this.financeService.getRetardsMoisList(date).subscribe(response=>{
          const data=response
          console.log("retards data: ",data)
          // Cycle prep
          let dataCycle=data.map((d) => ({Cycle:d.Cycle,Montant:d.totalImpaye}));
          let tmpTable = this.groupArrayOfObjects(
            dataCycle,
            "Cycle"
          );
          const dictCycle = [];
          for (const [key1, value1] of Object.entries(tmpTable)) {
            let total=0
            // console.log("here: ",Object.keys(value1).length)
            Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
            dictCycle.push({
              Cycle: key1,
              total: total,
            });
            total=0
          }
          let tmpData=[]
          let tmpLabels=[]
          dictCycle.map((d)=>{
            tmpLabels.push(d.Cycle)
            tmpData.push(d.total)
          })
    
          this.cycleRetLabels=tmpLabels
          this.cycleRetData[0]["data"]=tmpData
          // console.log(tmpData)
          
          // Service prep
          let dataNiveau=data.map((d) => ({Niveau:d.Niveau,Montant:d.totalImpaye}));
          tmpTable = this.groupArrayOfObjects(
            dataNiveau,
            "Niveau"
          );
          const dictNiveau = [];
          for (const [key1, value1] of Object.entries(tmpTable)) {
            let total=0
            // console.log("here: ",Object.keys(value1).length)
            Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
            dictNiveau.push({
              Niveau: key1,
              total: total,
            });
            total=0
          }
          tmpData=[]
          tmpLabels=[]
          dictNiveau.map((d)=>{
            tmpLabels.push(d.Niveau)
            tmpData.push(d.total)
          })
          this.niveauRetLabels=tmpLabels
          this.niveauRetData[0]["data"]=tmpData
    
          // Service prep
          let dataService=data.map((d) => ({Service:d.Service,Montant:d.Montant}));
          tmpTable = this.groupArrayOfObjects(
            dataService,
            "Service"
          );
          const dictService = [];
          for (const [key1, value1] of Object.entries(tmpTable)) {
            let total=0
            // console.log("here: ",Object.keys(value1).length)
            Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
            dictService.push({
              Service: key1,
              total: total,
            });
            total=0
          }
          tmpData=[]
          tmpLabels=[]
          dictService.map((d)=>{
            tmpLabels.push(d.Service)
            tmpData.push(d.total)
          })
          this.serviceRetLabels=tmpLabels
          this.serviceRetData[0]["data"]=tmpData
    
          // Cycle prep
          let dataRetards=data.map((d) => ({Eleve:d.Eleve,Montant:d.totalImpaye}));
          // 
    
          dataRetards=dataRetards.sort((a,b) => b.Montant - a.Montant);
          dataRetards.map((a)=>{
            this.retardsList.push({eleve:a.Eleve,montant:a.Montant})
          })
          this.retardsList=this.retardsList.slice(0,10)
            let totalMontant= dataRetards.reduce(function(prev, cur) {
              return prev + cur.Montant;
            }, 0);
            this.retardsTotal.count=dataRetards.length
            this.itemsEncaissement.push({alias:"élèves",title:"Retards des paiements",montant:this.numFormatter(totalMontant),count:dataRetards.length,unite:"MAD"})
           
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

}

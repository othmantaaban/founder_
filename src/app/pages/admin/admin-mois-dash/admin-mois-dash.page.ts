import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { AdministrationService } from 'src/app/services/administration.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-mois-dash',
  templateUrl: './admin-mois-dash.page.html',
  styleUrls: ['./admin-mois-dash.page.scss'],
})
export class AdminMoisDashPage implements OnInit {

  clickEventSubscription:Subscription;

  constructor(private adminService:AdministrationService,private sharedService:SharedService) {
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      this.callApi();
    })
   }

  ionViewWillEnter() {
    this.callApi()
  }

  pathList=[
    {vue:"Jour",path:"/tabs/admin-jour-dash",value:"jour"},
    {vue:"Mois",path:"/tabs/admin-mois-dash",value:"mois"},
    // {vue:"Annee",path:"/tabs/admin-annee-dash",value:"annee"}
  ]

  //Absences personnel
  public absPersoLabels: string[] = ['Enseignants', 'Administratifs', 'Aides',"Transport"];
  public absPersoData: ChartData<'doughnut'> = {
    labels: this.absPersoLabels,
    datasets: [
      {
        data: [13, 18, 10,20],
        backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBorderColor: ["grey"]
      }
    ]
  };

  public absCycleLabels: string[] = ['Maternelle', 'Primaire', 'Collége',"Lycée"];
  public absCycleData: ChartData<'doughnut'> = {
    labels: this.absCycleLabels,
    datasets: [
      {
        data: [20, 22, 10,10],
        backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBorderColor: ["grey"]
      }
    ]
  };

  public absMatiereLabels: string[] = ['Arabe', 'Français', 'Anglais',"Mathématiques"];
  public absMatiereData: ChartData<'doughnut'> = {
    labels: this.absMatiereLabels,
    datasets: [
      {
        data: [23, 11, 20,24],
        backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
        hoverBorderColor: ["grey"]
      }
    ]
  };


    //Messges personnel
    public msgEtatLabels: string[] = ['Répondus', 'Non Répondu'];
    public msgEtatData: ChartData<'bar'> = {
      labels: this.msgEtatLabels,
      datasets: [
        {
          data: [13, 18],
          backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
          hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
          hoverBorderColor: ["grey"]
        }
      ]
    };
  
    public msgCycleLabels: string[] = [];
    // public msgCycleData: ChartData<'bar'> = {
    //   labels: this.msgCycleLabels,
    //   datasets: [
    //     {
    //       data: [],
    //       backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
    //       hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
    //       hoverBorderColor: ["grey"]
    //     }
    //   ]
    // };

    public msgCycleData = [
      {data: [], label: '',backgroundColor:"#2B2A64"},
    ];
  
    public msgDelaisLabels: string[] = ['> 2H', '> 3H', '> 4H'];
    public msgDelaisData: ChartData<'bar'> = {
      labels: this.msgDelaisLabels,
      datasets: [
        {
          data: [33, 18, 10,],
          backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
          hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
          hoverBorderColor: ["grey"]
        }
      ]
    };

        //Demandes personnel
    public dmdEtatLabels: string[] = [];

    public dmdEtatData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
  
    public dmdCycleLabels: string[] = [];

    public dmdCycleData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];
  
    public dmdNatureLabels: string[] = [];

    public dmdNatureData = [
      {data: [], label: '',backgroundColor:["#2B2A64", "#F7643B", "#EE386E","#C4013B"]},
    ];

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
  
    callApi(){   

  
      let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : new Date().getMonth();
      console.log(date);
      
        this.adminService.getMessagesMois(date).subscribe(response =>{
        const data=response.result
        // Cycle prep
        let dataCycle=data.map((d) => ({Cycle:d.Cycle,Count:1}));
        let tmpTable = this.groupArrayOfObjects(
          dataCycle,
          "Cycle"
        );
        const dictCycle = [];
        for (const [key1, value1] of Object.entries(tmpTable)) {
          let total=0
          // console.log("here: ",Object.keys(value1).length)
          Object.values(value1).map(v =>{total+=parseFloat(v.Count)})
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
        console.log("msg cycle data: ",dictCycle)
        this.msgCycleLabels=tmpLabels
        this.msgCycleData[0]["data"]=tmpData
      })

      this.adminService.getDemandesMois(date).subscribe(response =>{
        const data=response.result
        // Nature prep
        let dataNature=data.map((d) => ({Nature:d.Nature,Count:1}));
        let tmpTable = this.groupArrayOfObjects(
          dataNature,
          "Nature"
        );
        console.log(dataNature)
        const dictNature = [];
        for (const [key1, value1] of Object.entries(tmpTable)) {
          let total=0
          // console.log("here: ",Object.keys(value1).length)
          Object.values(value1).map(v =>{total+=parseFloat(v.Count)})
          dictNature.push({
            Nature: key1,
            total: total,
          });
          total=0
        }
        let tmpData=[]
        let tmpLabels=[]
        dictNature.map((d)=>{
          tmpLabels.push(d.Nature)
          tmpData.push(d.total)
        })
        this.dmdNatureLabels=tmpLabels
        this.dmdNatureData[0]["data"]=tmpData

        // Cycle prep
        let dataCycle=data.map((d) => ({Cycle:d.Cycle,Count:1}));
        tmpTable = this.groupArrayOfObjects(
          dataCycle,
          "Cycle"
        );
        // console.log("data cycle: ",dataCycle)
        const dictCycle = [];
        for (const [key1, value1] of Object.entries(tmpTable)) {
          let total=0
          // console.log("here: ",Object.keys(value1).length)
          Object.values(value1).map(v =>{total+=parseFloat(v.Count)})
          dictCycle.push({
            Cycle: key1,
            total: total,
          });
          total=0
        }
        tmpData=[]
        tmpLabels=[]
        dictCycle.map((d)=>{
          tmpLabels.push(d.Cycle)
          tmpData.push(d.total)
        })
        this.dmdCycleLabels=tmpLabels
        this.dmdCycleData[0]["data"]=tmpData

        // Etat prep
        let dataEtat=data.map((d) => ({Etat:d.Statut,Count:1}));
        tmpTable = this.groupArrayOfObjects(
          dataEtat,
          "Etat"
        );
        // console.log(dataEtat)
        const dictEtat = [];
        for (const [key1, value1] of Object.entries(tmpTable)) {
          let total=0
          // console.log("here: ",Object.keys(value1).length)
          Object.values(value1).map(v =>{total+=parseFloat(v.Count)})
          dictEtat.push({
            Etat: key1,
            total: total,
          });
          total=0
        }
        tmpData=[]
        tmpLabels=[]
        dictEtat.map((d)=>{
          tmpLabels.push(d.Etat)
          tmpData.push(d.total)
        })
        this.dmdEtatLabels=tmpLabels
        this.dmdEtatData[0]["data"]=tmpData
      })
  
    }

  
    ngOnInit() {
  
      // this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      //   this.callApi();
      // })
    
    }

}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-finance-jour-dash',
  templateUrl: './finance-jour-dash.page.html',
  styleUrls: ['./finance-jour-dash.page.scss'],
})
export class FinanceJourDashPage implements OnInit {


  @ViewChild('slides') slides;
  public loaders = [false, false, false, false, false, false, false]

  public itemsEncaissement = [];

  public annulationsList = [];
  public itemsAnnulations = [];
  public depensesLst = [];
  public itemsDepenses = [];
  public discountsList = [];
  public depensesList = [];
  public avoirsList = [];
  public recouvrementsList = [];


  public absentsList = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    centeredSlides: true,
  };

  pathList = [
    { vue: 'Jour', path: '/tabs/finance-jour-dash', value: 'jour' },
    { vue: 'Mois', path: '/tabs/finance-mois-dash', value: 'mois' },
    { vue: 'Annee', path:'/tabs/finance-annee-dash', value:'annee'}
  ];


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
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: "#F7643B" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: "#2B2A64" }
  ];

  ionViewWillEnter() {
    this.callApi()
  }

  //Encaissement

  // public encCycleLabels: string[] = [];
  // public encCycleData: ChartData<'pie'> = {
  //   labels:[],
  //   datasets: [
  //       {
  //           data: [],
  //           backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //           hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //           hoverBorderColor: ["grey"]
  //         }
  //       ]
  //     };

  //  public encTypeLabels: string[] = [];
  //  public encTypeData: ChartData<'pie'> = {
  //          labels: [],
  //          datasets: [
  //              {
  //                  data: [],
  //                  backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //                  hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //                  hoverBorderColor: ["grey"]
  //                }
  //              ]
  //            };
  //  public encServiceLabels: string[] = ['Transport', 'F.Inscriptions', 'F.A','Cantine'];
  //  public encServiceLabels: string[] = [];
  //  public encServiceData: ChartData<'pie'> = {
  //         labels: [],
  //          datasets: [
  //                   {
  //                     data: [],
  //                     backgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //                     hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E","#C4013B"],
  //                     hoverBorderColor: ["grey"]
  //                     }
  //                        ]
  //                      };

  public encCycleLabels = [];
  public encCycleData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  public encTypeLabels = [];
  public encTypeData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  public encServiceLabels = [];
  public encServiceData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];
  public depCategorieLabels = [];
  public depCategorieData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];
  public depPrestLabels: string[] = [];
  public depPrestData: ChartData<'pie'> = {
    labels: this.depPrestLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"],
        hoverBackgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"],
        hoverBorderColor: ["grey"]
      }
    ]
  };

  public encSiteLabels = [];
  public encSiteData = [
    { data: [], label: '', backgroundColor: ["#2B2A64", "#F7643B", "#EE386E", "#C4013B"] },
  ];

  slideChanged() {
  }

  clickEventSubscription: Subscription;
  constructor(
    private financeService: FinanceService, private cdr: ChangeDetectorRef, public loadingController: LoadingController, private sharedService: SharedService
  ) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
      // this.callApi();
      this.presentLoadingWithOptions()
    })
  }

  callApi() {
    const formatedDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    let date = DateSegmentsComponent.dateValue !== undefined ? DateSegmentsComponent.dateValue : formatedDate();
    console.log(date);
    
    // Donut Chart Prep(Encaissement)
    this.financeService.getEncaissementList(date).subscribe(response => {
      const data = response.result
      // console.log("encaissement data hare: ",data)
      // Cycle prep
      let dataCycle = data.map((d) => ({ Cycle: d.Cycle, Montant: d.Montant }));
      let tmpTable = this.groupArrayOfObjects(
        dataCycle,
        "Cycle"
      );
      const dictCycle = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1).length)
        Object.values(value1).map(v => { total += parseFloat(v.Montant) })
        dictCycle.push({
          Cycle: key1,
          total: total,
        });
      }
      let tmpData = []
      let tmpLabels = []
      dictCycle.map((d) => {
        tmpLabels.push(d.Cycle)
        tmpData.push(d.total)
      })
      // this.encCycleData.labels=tmpLabels
      // this.encCycleData.datasets[0]["data"]=tmpData
      this.encCycleLabels = tmpLabels
      this.encCycleData[0]["data"] = tmpData
      console.log("encaissement cycle data: ", this.encCycleData)

      // Service prep
      let dataService = data.map((d) => ({ Service: d.Service, Montant: d.Montant }));
      tmpTable = this.groupArrayOfObjects(
        dataService,
        "Service"
      );
      // console.log("here: ",dataService)
      const dictService = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1))
        Object.values(value1).map(v => { total += parseFloat(v.Montant) })
        dictService.push({
          Service: key1,
          total: total,
        });
        total = 0
      }
      // console.log("here: ",dictService)
      tmpData = []
      tmpLabels = []
      dictService.map((d) => {
        tmpLabels.push(d.Service)
        tmpData.push(d.total)
      })
      // this.encServiceData.labels=tmpLabels
      // this.encServiceData.datasets[0]["data"]=tmpData
      this.encServiceLabels = tmpLabels
      this.encServiceData[0]["data"] = tmpData
      // console.log("here: ",this.encServiceData)

      // Service prep
      let dataSite = data.map((d) => ({ Site: d.Site, Montant: d.Montant }));
      tmpTable = this.groupArrayOfObjects(
        dataSite,
        "Site"
      );
      // console.log("here: ",dataService)
      const dictSite = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1))
        Object.values(value1).map(v => { total += parseFloat(v.Montant) })
        dictSite.push({
          Site: key1,
          total: total,
        });
        total = 0
      }
      // console.log("here: ",dictService)
      tmpData = []
      tmpLabels = []
      dictSite.map((d) => {
        tmpLabels.push(d.Site)
        tmpData.push(d.total)
      })
      // this.encServiceData.labels=tmpLabels
      // this.encServiceData.datasets[0]["data"]=tmpData
      this.encSiteLabels = tmpLabels
      this.encSiteData[0]["data"] = tmpData
      // console.log("here: ",this.encServiceData)


      // Type prep
      let dataType = data.map((d) => ({ Type: d.PaiementMode, Montant: d.Montant }));
      const tmpTable2 = this.groupArrayOfObjects(
        dataType,
        "Type"
      );
      const dictType = [];
      for (const [key1, value1] of Object.entries(tmpTable2)) {
        let total = 0
        Object.values(value1).map(v => { total += parseFloat(v.Montant) })
        dictType.push({
          Type: key1,
          total: total,
        });
        total = 0
      }
      tmpData = []
      tmpLabels = []
      dictType.map((d) => {
        tmpLabels.push(d.Type)
        tmpData.push(d.total)
      })
      // this.encTypeData.labels=tmpLabels
      // this.encTypeData.datasets[0]["data"]=tmpData
      this.encTypeLabels = tmpLabels
      this.encTypeData[0]["data"] = tmpData
      // console.log(this.encTypeData)
      // this.loaders[0]=true
      this.cdr.markForCheck();

    })
    // Cards Prep
    this.financeService.getEncaissementCardsList(date).subscribe(response => {
      this.itemsAnnulations = []
      const data = response
      // Cycle prep
      this.itemsEncaissement = [] //vider la liste
      data.filter((d) => { return d.title == "Encaissements" || d.title == "Total remise" }).map((c, index) => {
        if (c.result.length != 0) {
          // console.log(c.result[0])
          this.itemsEncaissement.push({ alias: c.alias, title: c.title, montant: this.numFormatter(parseInt(c.result[0].Montant)), count: c.result[0].nbEleves, unite: "MAD" })
        }
        console.log("items encaissement", this.itemsEncaissement)
      })

      data.filter((d) => { return d.title != "Encaissements" && d.title != "Total remise" && d.title != "Retards" && d.title != "Total annuel des remises" }).map((c, index) => {
        if (c.result.length != 0) {
          // console.log(c.result[0])
          this.itemsAnnulations.push({ alias: c.alias, title: c.title, montant: this.numFormatter(parseInt(c.result[0].Montant)), count: c.result[0].nbEleves, unite: "MAD" })
        }
      })

      // console.log("cards data: ",this.itemsEncaissement)

    })

    // cards Prep(Depenses)
    this.financeService.getDepensesList(date).subscribe(response => {
      const data = response.result
      const countDep = response.count
      let depensesMontant = data.map((d) => (d.Montant));
      let totalMontant = 0
      depensesMontant.map(v => {
        totalMontant += parseFloat(v)
      })
      this.itemsDepenses = []
      this.itemsDepenses.push({ alias: "dépenses", title: "Dépenses du jour", montant: this.numFormatter(totalMontant), count: countDep })
      // console.log("Depenses items here: ",this.itemsDepenses)
      //-------//
      // Cycle prep
      let dataDepenses = data.map((d) => ({ UserBy: d.UserBy, Montant: d.Montant, Type: d.Rubrique }));
      console.log("dpsList", dataDepenses)

      this.depensesLst = []
      dataDepenses.map((a) => {
        this.depensesLst.push({ eleve: a.UserBy, montant: a.Montant, type: a.Type })
      })

      //-------//
      // Cycle prep
      let dataType = data.map((d) => ({ Type: d.Rubrique, Montant: d.Montant }));
      const tmpTable = this.groupArrayOfObjects(
        dataType,
        "Type"
      );
      const dictType = [];
      for (const [key1, value1] of Object.entries(tmpTable)) {
        let total = 0
        // console.log("here: ",Object.keys(value1))
        Object.values(value1).map(v => { total += parseFloat(v.Montant) })
        dictType.push({
          Type: key1,
          total: total,
        });
        total = 0
      }
      // console.log("here: ",dictService)
      let tmpData = []
      let tmpLabels = []
      dictType.map((d) => {
        tmpLabels.push(d.Type)
        tmpData.push(d.total)
      })
      // this.depCategorieData.labels=tmpLabels
      // this.depCategorieData.datasets[0]["data"]=tmpData
      this.depCategorieLabels = tmpLabels
      this.depCategorieData[0]["data"] = tmpData
      console.log("here 2: ", this.depCategorieData)

    })

    // Listing Annulation:
    // "2022-08-02"
    this.financeService.getEncaissementAnnulationsList(date).subscribe(response => {
      this.annulationsList = []
      const data = response.result
      // Cycle prep
      let dataAnnulations = data.map((d) => ({ User: d.Eleve, Montant: d.Montant }));

      dataAnnulations.map((a) => {
        this.annulationsList.push({ eleve: a.User, montant: a.Montant })
      })

      // console.log("Annulation items here: ",this.annulationsList)


    })


    this.financeService.getDiscountsList(date).subscribe(response => {
      this.discountsList = []

      const data = response.result
      // Cycle prep
      let dataDiscounts = data.map((d) => ({ Eleve: d.Eleve, Service: d.Service, DiscountAmountTotal: d.DiscountAmountTotal, DiscountAmount: d.DiscountAmount, nbMois: d.nbMois }));

      dataDiscounts.map((d) => {
        this.discountsList.push({ Eleve: d.Eleve, Service: d.Service, DiscountAmount: d.DiscountAmount, DiscountAmountTotal: d.DiscountAmountTotal })
      })
    })


    this.financeService.getAvoirsList(date).subscribe(response => {
      this.avoirsList = []

      const data = response.result
      let dataAvoirs = data.map((d) => ({ Eleve: d.Eleve, Amount: d.Amount, ConsumedAmount: d.ConsumedAmount, UserBy: d.UserBy }));

      dataAvoirs.map((d) => {
        this.avoirsList.push({ Eleve: d.Eleve, Amount: d.Amount, ConsumedAmount: d.ConsumedAmount, UserBy: d.UserBy })
      })
    })


    this.financeService.getRecouvrementsList(date).subscribe(response => {
      this.recouvrementsList = []

      const data = response.result
      let dataRecouvrements = data.map((d) => ({ Eleve: d.Eleve, Classe: d.Classe, Action: d.Action, DateAction: d.DateAction }));

      dataRecouvrements.map((d) => {
        this.recouvrementsList.push({ Eleve: d.Eleve, Classe: d.Classe, Action: d.Action, DateAction: d.DateAction })
      })
    })






    // Depenses
    // this.financeService.getDepensesList(date).subscribe(response => {
    //   const data=response.result
    //   const countDep=response.count
    //   let depensesMontant=data.map((d) => (d.Montant));
    //   let totalMontant=0
    //   depensesMontant.map(v =>{
    //     totalMontant+=parseFloat(v)
    //   })
    //   this.itemsDepenses=[]
    //   this.itemsDepenses.push({alias:"dépenses",title:"Dépenses du jour",montant:this.numFormatter(totalMontant),count:countDep})
    //   //-------//
    //   // Cycle prep
    //   let dataDepenses=data.map((d) => ({UserBy:d.UserBy,Montant:d.Montant,Type:d.Type}));

    //   dataDepenses.map((a)=>{
    //     this.depensesLst.push({eleve:a.UserBy,montant:a.Montant,type:a.Type})
    //   })
    //   //-------//
    //   // Cycle prep
    //   let dataType=data.map((d) => ({Rubrique:d.Rubrique,Montant:d.Montant}));
    //   const tmpTable = this.groupArrayOfObjects(
    //     dataType,
    //     "Rubrique"
    //   );
    //   const dictType = [];
    //   for (const [key1, value1] of Object.entries(tmpTable)) {
    //     let total=0
    //     // console.log("here: ",Object.keys(value1))
    //     Object.values(value1).map(v =>{total+=parseFloat(v.Montant)})
    //     dictType.push({
    //       Type: key1,
    //       total: total,
    //     });
    //     total=0
    //   }
    //   let tmpData=[]
    //   let tmpLabels=[]
    //   dictType.map((d)=>{
    //     tmpLabels.push(d.Type)
    //     tmpData.push(d.total)
    //   })
    //   this.depCategorieData.labels=tmpLabels
    //   this.depCategorieData.datasets[0]["data"]=tmpData

    // })
  }


  // Group By Function
  groupArrayOfObjects = (list, key) => {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      message: '<h3>Loading Data, Please wait...</h3>',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present().then(() => {
      this.callApi();
    }).then(() => {
      loading.dismiss()
    });
    // loading.dismiss()
  }

  // async presentLoadingWithOptions() {
  //   const loading = await this.loadingController.create({
  //     spinner: null,
  //     duration: 3000,
  //     message: '<h3>Loading Data, Please wait...</h3>',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading'
  //   });
  //   return await loading.present();
  // }

  public data: any[];

  ngOnInit() {
    this.cdr.markForCheck();
    console.log("first exec")
    // this.presentLoadingWithOptions() 

    // this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
    //   this.presentLoadingWithOptions()
    // })
  }

}

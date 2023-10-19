import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { DateSegmentsComponent } from 'src/app/components/date-segments/date-segments.component';
import { FinanceService } from 'src/app/finance.service';
// import { ApiService } from 'src/app/services/api.service';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-finance-jour-dash',
  templateUrl: './finance-jour-dash.page.html',
  styleUrls: ['./finance-jour-dash.page.scss'],
})
export class FinanceJourDashPage implements OnInit {
  public remise = []
  public remise_count = 0
  @ViewChild('slides') slides;
  public loaders = [false, false, false, false, false, false, false]

  depenses = []
  depensesCategLabels = []
  depensesCategData = []

  depensesPrestataireLabels = []
  depensesPrestataireData = []

  listDepenses = []

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

  // depenses : any = [];


  public done1 = false;
  public done2 = false;
  public done3 = false;
  public done4 = false;
  public done5 = false;
  public done6 = false;
  public done7 = false;

  slideChanged() {
  }

  clickEventSubscription: Subscription;
  constructor(
    private api : ApiService,  
    private financeService: FinanceService, 
    private cdr: ChangeDetectorRef, 
    public loadingController: LoadingController, 
    private sharedService: SharedService,
    private navCtrl : NavController 

  ) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe((elt) => {
      // this.callApi();

      if (elt.value == "jour") {
        this.presentLoadingWithOptions()
      }
    })
  }

  // getEncaissementList :get_encaissements

  // getDepensesList: get_depenses

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
    
    let done1 = false;
    let done2 = false;
    let done3 = false;
    let done4 = false;
    let done5 = false;
    let done6 = false;
    let done7 = false;

        // Cards Prep
    this.financeService.getEncaissementCardsList(JSON.stringify({date: date, type: "jour"}))
    .subscribe(response => {
      
      this.itemsEncaissement = []
      response.forEach(element => {
        console.log(element);
        
        let item = {
          title: element.title,
          montant: element.result.montant,
          alias: element.note,
          unite: "MAD",
          count: element.result.countEleves
        }
        this.itemsEncaissement.push(item)
      });

      done1 = true

    })
    
    // Donut Chart Prep(Encaissement)

    this.api.get({period: date, type: "jour"}, "get_encaissements_data")
    .subscribe(response => {
      this.encCycleLabels = response?.cycle[0]
      this.encCycleData = response?.cycle[1]

            
      this.encTypeLabels = response?.paiement[0]
      this.encTypeData = response?.paiement[1] 

      this.encServiceLabels = response?.service[0]
      this.encServiceData = response?.service[1]

      // this.loader_obj.encaiss = true

      // this.loader_dissmis()
    })


    this.financeService.getRecouvrementsList(date)
    .subscribe(response => {
      this.recouvrementsList = []

      const data = response.result
      
      data.forEach(
        (d) => (
        this.recouvrementsList.push({ 
          Eleve: d.Eleve, 
          Classe: d.Classe, 
          Action: d.Action, 
          DateAction: d.DateAction 
        })
      ));
      done3 = true

    })


    // cards Prep(Depenses)
    this.financeService.getDepensesList(date)
    .subscribe(response => {
      const data = response.result
      console.log(data);
      
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


      done4 = true

    })

    // Listing Annulation:
    // "2022-08-02"
    this.financeService.getEncaissementAnnulationsList(date)
    .subscribe(response => {
      this.annulationsList = []
      const data = response.result
      // Cycle prep
      let dataAnnulations = data.map((d) => ({ User: d.Eleve, Montant: d.Montant }));

      // dataAnnulations.map((a) => {
      //   this.annulationsList.push({ eleve: a.User, montant: a.Montant })
      // })
      this.annulationsList = [...dataAnnulations]

      // console.log("Annulation items here: ",this.annulationsList)

      done5 = true

    })


    this.financeService.getDiscountsList(date)
    .subscribe(response => {
      this.discountsList = []

      const data = response.result
      // Cycle prep
      let dataDiscounts = data.map((d) => ({ Eleve: d.Eleve, Service: d.Service, DiscountAmountTotal: d.DiscountAmountTotal, DiscountAmount: d.DiscountAmount, nbMois: d.nbMois }));

      // dataDiscounts.map((d) => {
      //   this.discountsList.push({ Eleve: d.Eleve, Service: d.Service, DiscountAmount: d.DiscountAmount, DiscountAmountTotal: d.DiscountAmountTotal })
      // })
      this.discountsList = [...dataDiscounts]

      done6 = true

    })


    this.financeService.getAvoirsList(date)
    .subscribe(response => {
      this.avoirsList = []

      const data = response.result
      let dataAvoirs = data.map((d) => ({ Eleve: d.Eleve, Amount: d.Amount, ConsumedAmount: d.ConsumedAmount, UserBy: d.UserBy }));
      this.avoirsList = [...dataAvoirs]
      // dataAvoirs.map((d) => {
      //   this.avoirsList.push({ Eleve: d.Eleve, Amount: d.Amount, ConsumedAmount: d.ConsumedAmount, UserBy: d.UserBy })
      // })

      done7 = true

    })
    // let d = "2022-08-24"
    this.api.get({"period":date},"remises_jour")
    .subscribe(elt => {
      console.log(elt);
      this.remise = elt.requests
      this.remise_count = elt.total
    })

    this.api.get({period: date, type: "jour"}, "get_depenses_data")
    .subscribe(response => {
      this.depenses = response
      this.depensesCategLabels = response.category.labels
      this.depensesCategData = response.category.data

      this.depensesPrestataireLabels = response.prestataire.labels
      this.depensesPrestataireData = response.prestataire.data

      this.listDepenses = response.listDepense.list

      // this.loader_obj.depense = true
      // this.loader_dissmis()
    })






    // remises_jour


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

  navigateTo(link: string){
    this.navCtrl.navigateRoot([link]);
  }

}

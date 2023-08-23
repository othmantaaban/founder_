import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ChartData } from 'chart.js';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type ChartOptions = {
  chart: ApexChart;
  series: ApexAxisChartSeries | any[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: any[];
  labels: any[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  public itemsEncaissement=[
    {alias:"eleves",title:"CA Prévisionnel",montant:"99 KMAD",count:"1650"},
    {alias:"eleves",title:"Encaissements",montant:"90 KMAD",count:"1000"},
    {alias:"eleves",title:"Retards",montant:"30 KMAD",count:"950"},
    {alias:"",title:"Dépenses",montant:"150 KMAD",count:""},
  ]

  public annulationsList=[
    {eleve:"Taha EL ALJ",montant:"1800 DH"},
    {eleve:"Mohammed Benomar",montant:"2000 DH"},
    {eleve:"Jalal EL Monnif",montant:"1300 DH"},
    {eleve:"Karim Souhaili",montant:"2500 DH"},
  ]
   
  
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
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',backgroundColor:"#277BC0"},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B',backgroundColor:"#FF6363"}
  ];

  public absentsList=[
    {User:"Amir Yassine",Role:"Réclamation"},
    {User:"Reda Youssfi",Role:"Réunion pédagogique"},
    {User:"Hamza Jerrari",Role:"Réunion pédagogique"},
  ]

  constructor(
    // private cdf: ChangeDetectorRef
  ) {

  }




  ngOnInit() {
   
  }

}

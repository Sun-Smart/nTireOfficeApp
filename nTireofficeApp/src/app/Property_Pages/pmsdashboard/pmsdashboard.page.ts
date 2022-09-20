import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-pmsdashboard',
  templateUrl: './pmsdashboard.page.html',
  styleUrls: ['./pmsdashboard.page.scss'],
})
export class PmsdashboardPage  {
  @ViewChild('pieChart') pieChart;
  students: any[];
  username:any;
  public technologies              : any = {
    "technologies" : [
                       {
                          'title' : 'Mobile: Ionic/Angular',
                          'count'       : 50,
                          'color'      : 'rgba(206, 61, 95, 0.5)',
                          'hover'      : 'rgba(199, 108, 129, 0.5)'
                       },
                       {
                          'title' : 'Front-end: Sass/CSS',
                          'count'       : 15,
                          'color'      : 'rgba(83, 131, 185, 0.5)',
                          'hover'      : 'rgba(122, 160, 202, 0.5)'
                       },
                       {
                          'title' : 'Server: PHP/MySQL',
                          'count'       : 10,
                          'color'      : 'rgba(198, 147, 194, 0.5)',
                          'hover'      : 'rgba(200, 166, 197, 0.5)'
                       },
    ]}
    public pieChartEl                : any;
    public chartLabels               : any    = [];
    public chartValues               : any    = [];
    public chartColours              : any    = [];
    public chartHoverColours         : any    = [];
  chartLoading: any;

  constructor() { this.username=localStorage.getItem('TUM_USER_NAME'); }
  ionViewDidLoad() 
  {
     this.defineChartData();
     this.createPieChart();  
  }
 
  defineChartData()
{
   let k : any;

   for(k in this.technologies.technologies)
   {
      var tech  =      this.technologies.technologies[k];
      this.chartLabels.push(tech.technology);
      this.chartValues.push(tech.time);
      this.chartColours.push(tech.color);
      this.chartHoverColours.push(tech.hover);
   }
}


createPieChart(){

  
    debugger
      
      this.pieChartEl 			= new Chart(this.pieChart.nativeElement, 
      {
         type: 'pie',
         data: {
             labels: this.chartLabels,
             datasets: [{
                 label                 : 'Daily Technology usage',
                 data                  : this.chartValues,
                 duration              : 2000,
                 easing                : 'easeInQuart',
                 backgroundColor       : this.chartColours,
                 hoverBackgroundColor  : this.chartHoverColours
             }]
         },
         options : {
            maintainAspectRatio: false,            
            layout: {
               padding: {
                  left     : 50,
                  right    : 0,
                  top      : 0,
                  bottom   : 0
               }
            },
            animation: {
               duration : 5000
            }
         }
      });



      this.chartLoading = this.pieChartEl.generateLegend();
   }


}

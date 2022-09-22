import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
@Component({
  selector: 'app-pmsdashboard',
  templateUrl: './pmsdashboard.page.html',
  styleUrls: ['./pmsdashboard.page.scss'],
})
export class PmsdashboardPage  {
//   @ViewChild('pieChart') pieChart: { nativeElement: any; };
  students: any[];
  username:any;
   technologies              : any = {
   "technologies" : [
            {
               'technology' : 'Mobile: Ionic/Angular',
               'time'       : 50,
               'color'      : 'rgba(206, 61, 95, 0.5)',
               'hover'      : 'rgba(199, 108, 129, 0.5)'
            },
            {
               'technology' : 'Front-end: Sass/CSS',
               'time'       : 15,
               'color'      : 'rgba(83, 131, 185, 0.5)',
               'hover'      : 'rgba(122, 160, 202, 0.5)'
            },
            {
               'technology' : 'Server: PHP/MySQL',
               'time'       : 10,
               'color'      : 'rgba(198, 147, 194, 0.5)',
               'hover'      : 'rgba(200, 166, 197, 0.5)'
            },
            {
               'technology' : 'Code Documentation',
               'time'       : 5,
               'color'      : 'rgba(54, 116, 152, 0.5)',
               'hover'      : 'rgba(103, 139, 160, 0.5)'
            },
            {
               'technology' : 'Knowledge: Blogging',
               'time'       : 10,
               'color'      : 'rgba(152, 54, 145, 0.5)',
               'hover'      : 'rgba(152, 89, 149, 0.5)',
            },
            {
               'technology' : 'SEO/Online Marketing',
               'time'       : 10,
               'color'      : 'rgba(192, 192, 192, 0.5)',
               'hover'      : 'rgba(220, 220, 220, 0.5)'
            }
  ]
};		
public pieChartEl                : any;
public barChartEl                : any;
public lineChartEl               : any;
public chartLabels               : any    = [];
public chartValues               : any    = [];
public chartColours              : any    = [];
public chartHoverColours         : any    = [];
public chartLoadingEl            : any;

  chartLoading: any;

  constructor() { this.username=localStorage.getItem('TUM_USER_NAME');  }
  ionViewDidLoad() 
  {
     this.defineChartData();
     this.createPieChart();  
  }
 
  defineChartData() 
  {
     

     for(let i=0;i<this.technologies.length;i++)
     {
        var tech  =  this.technologies.technologies[i];

        this.chartLabels.push(tech.technology);
        this.chartValues.push(tech.time);
        this.chartColours.push(tech.color);
        this.chartHoverColours.push(tech.hover);
     }
     console.log(this.chartLabels);
     
  }


  createPieChart()
  {
   const canvas = <HTMLCanvasElement> document.getElementById('maintenanceChart');
   const ctx = canvas.getContext('2d');
     this.pieChartEl= 	new Chart(ctx, 
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

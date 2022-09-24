import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { IpaddressService} from '../../service/ipaddress.service';
declare var $ :any;
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  result:any;
  CategoryCount:any;
  userid:any;
  currentDate:any;
  username:any;
  sourcechart: any;
  myChart:any;

  @ViewChild('sourcecanvas1') sourcecanvas1;
  constructor(private platform: Platform,public alertController: AlertController, private http: HttpClient, public Ipaddressservice: IpaddressService,private navCtrl: NavController,private menuCtrl: MenuController,private router: Router) {
    debugger
this.menuCtrl.enable(true, 'first');
    this.userid= window.localStorage['TUM_USER_ID'];
    this.username=localStorage.getItem('TUM_USER_NAME');
    this.currentDate = new Date();
    this.getCategoryCountChart();
    this.getMaintenanceCountChart();
    this.getBranchCountChart();
  }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/landing-page']);
  }
  getCategoryCountChart = function () {
  debugger;
    var sourcearray=[];
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlCams+'camscategorycount/'+this.userid).subscribe(resp => { 
    debugger
      this.result = resp;

      this.CategoryCount = JSON.parse(this.result);
      console.log(this.CategoryCount);
      this.labels2 = [];
      this.data2 = [];
      for (var i = 0; i < this.CategoryCount.length; i++) {
          // $scope.labels2[i] = $scope.CategoryCount[i].AssetCategory + '-' + $scope.CategoryCount[i].AssetCount;
          this.labels2[i] = this.CategoryCount[i].AssetCategory +' - '+ this.CategoryCount[i].AssetCount;
          this.data2[i] = this.CategoryCount[i].AssetCount;
      }
      console.log(this.labels2);
      console.log(this.data2);
      const canvas = <HTMLCanvasElement> document.getElementById('myChart');
      const ctx = canvas.getContext('2d');
      // var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx ,{
        type: 'pie',
        data: {
          labels:this.labels2,
          datasets: [{
            label: '# of Tomatoes',
            data:this.data2,
            backgroundColor:['rgba(247,70,74,1)', 'rgba(220,220,220,1)','rgba(151,187,205,1)',  'rgba(70,191,189,1)', 'rgba(253,180,92,1)', 'rgba(148,159,177,1)', 'rgba(77,83,96,1)', 'rgba(103,16,103,1)', 'rgba(165,131,134,1)', '#FF4500', '#800000', '#00BFFF ', '#000000', '#00FF00', '#008080', '#FF00FF']

          }]
        },
        options: {
          responsive: true,
          fullwidth: true,
          legend: {
              display:true,
              align: 'start',
              position:'bottom',
              verticalAlign:"center",
              labels: {
                  boxWidth: 20,
                  padding: 20
              }
          }
        }
      });

    }, error => {


    });

}


getMaintenanceCountChart = function () {

  var sourcearray=[];
  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlCams+'camsmaintenancecurrentmonthcount/'+this.userid,{
    headers: options,
  }).subscribe(resp => {
    this.Monthresult = resp;

    this.MaintenanceCount = JSON.parse(this.Monthresult);
    console.log(this.MaintenanceCount);

    this.data3 = [];

    this.data3.push(this.MaintenanceCount[0].Completed);
    this.data3.push(this.MaintenanceCount[0].Pending);
    this.labels3 = ["Completed" +' - '+ this.MaintenanceCount[0].Completed, "Pending" +' - '+ this.MaintenanceCount[0].Pending];
    console.log(this.labels3);
    console.log(this.data3);
    const canvas = <HTMLCanvasElement> document.getElementById('maintenanceChart');
    const ctx = canvas.getContext('2d');


    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels:this.labels3,
        datasets: [{
          label: '# of Tomatoes',
          data:this.data3,
          backgroundColor:['rgba(151,187,205,1)', 'rgba(220,220,220,1)']

        }]
      },
      options: {
        responsive: true,
        legend: {
            position: 'bottom',
            labels: {
                boxWidth: 20,
                padding: 20
            }
        }
      }
    });

  }, error => {


  });

}


getBranchCountChart = function () {
debugger
  var sourcearray=[];
  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlCams+'camsbranchcount',{
    headers: options,
  }).subscribe((resp:any) => {
    debugger
    this.branchCountresult = resp;

    this.branchCount = JSON.parse(this.branchCountresult);
    console.log(this.branchCount);
    this.labels = [];
    this.data = [];
    for (var i = 0; i < this.branchCount.length; i++) {
      this.labels.push(this.branchCount[i].Branch);
      this.data.push(this.branchCount[i].AssetCount);
      // $scope.data.push($scope.colorpie[i].color);
  }
    console.log(this.labels);
    console.log(this.data);

       sourcearray = [
        {

          data: this.data,
          backgroundColor: ['rgb(16, 99, 16)','rgb(68, 49, 9)'],


        }]
        if (this.sourcechart) {
          this.sourcechart.destroy();
      }
      this.sourcechart = new Chart(this.sourcecanvas1.nativeElement, {

        type: 'bar',

        data: {
          labels: this.labels,
          datasets: sourcearray,

        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: 10
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                display: true,
                labelString: window.localStorage['TUM_BRANCH_CODE'],

              }
            }]
          },
          tooltips: {

            callbacks: {
              title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function (tooltipItem, data) {
                return "Target" + " : " + data['datasets'][0]['data'][tooltipItem['index']];
              },

            },



          },
        }

      });

    }, error => {


    });

}


}

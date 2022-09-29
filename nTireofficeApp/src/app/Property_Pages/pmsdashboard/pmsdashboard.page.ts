import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IpaddressService} from '../../service/ipaddress.service';
import { Chart } from 'chart.js';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-pmsdashboard',
  templateUrl: './pmsdashboard.page.html',
  styleUrls: ['./pmsdashboard.page.scss'],
})
export class PmsdashboardPage implements OnInit {
//   @ViewChild('pieChart') pieChart: { nativeElement: any; };

  students: any[];
  username:any;
  chartLoading: any;
  userid: any;


  @ViewChild('sourcecanvas1') sourcecanvas1;

  constructor( private http: HttpClient, private platform: Platform, public Ipaddressservice: IpaddressService) {
    this.userid= window.localStorage['TUM_USER_ID'];
     this.username=localStorage.getItem('TUM_USER_NAME');
     this.getCategoryCountChart();

     }

  ngOnInit() 
  {
  
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
  
        this.CategoryCount = this.result;
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
              label: this.labels2,
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



}

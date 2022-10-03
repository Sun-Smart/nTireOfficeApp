import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IpaddressService } from '../../service/ipaddress.service';
import { Chart } from 'chart.js';
import { Platform } from '@ionic/angular';
import { TableSampleService } from '../table-sample.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pmsdashboard',
  templateUrl: './pmsdashboard.page.html',
  styleUrls: ['./pmsdashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PmsdashboardPage implements OnInit {
  //   @ViewChild('pieChart') pieChart: { nativeElement: any; };

  students: any[];
  username: any;
  chartLoading: any;
  userid: any;

  options = { checkboxes: true }
  data: any = [];
  dataStatus : any =[];
  dataDetails : any =[];
  dataVaccant : any =[];
  dataRaised : any =[];


  columns: any = [];
  columnsStatus: any = [];
  columnsDetails: any = [];
  columnsVaccant: any = [];
  columnsRaised : any = [];
  rows: any



  @ViewChild('sourcecanvas1') sourcecanvas1;

  constructor(private http: HttpClient, private platform: Platform, public Ipaddressservice: IpaddressService, private tableApi: TableSampleService) {
    this.userid = window.localStorage['TUM_USER_ID'];
    this.username = localStorage.getItem('TUM_USER_NAME');
    // this.getCategoryCountChart();
    this.getBranchCountChart();

    this.columns = [
      { name: 'sno',},
      { name: 'invoice', },
      { name: 'month', },
      { name: 'amount', },
      { name: 'status', },
    ];

    this.columnsStatus = [
      { name: 'sno',},
      { name: 'readBy', },
      { name: 'description', },
      { name: 'status', },
    ];

    this.columnsDetails = [
      { name: 'sno',},
      { name: 'propertycode', },
      { name: 'issuedescription', },
      { name: 'status', },
    ];

    this.columnsVaccant = [
      { name: 'sno',},
      { name: 'propertycode', },
      { name: 'issuedescription', },
      { name: 'flat', },
    ];

    this.columnsRaised = [
      { name: 'sno',},
      { name: 'propertycode', },
      { name: 'invoice', },
      { name: 'amount', },
      { name: 'status', },
    ];
  }

  ngOnInit() {
    debugger;
    this.data = this.tableApi.getDashbTable1();
    console.log(this.data);

    this.dataStatus = this.tableApi.getDashbTable2();
    console.log(this.dataStatus);

    this.dataDetails = this.tableApi.getDashbTable3();
    console.log(this.dataDetails);

    this.dataVaccant = this.tableApi.getDashbTable4();
    console.log(this.dataVaccant);

    this.dataRaised = this.tableApi.getDashbTable5();
    console.log(this.dataRaised);

  }

  // getCategoryCountChart = function () {
  //   debugger;
  //   var sourcearray = [];
  //   const header = new Headers();
  //   header.append("Content-Type", "application/json");

  //   let options = new HttpHeaders().set('Content-Type', 'application/json');     
  //   this.http.get(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlProperty+'customerpayments?strfunction=1&branch=1&userid=1').subscribe(resp => {
  //     debugger
  //     this.result = resp;

  //     this.CategoryCount = this.result;
  //     console.log(this.CategoryCount);
  //     this.labels2 = [];
  //     this.data2 = [];
  //     for (var i = 0; i < this.CategoryCount.length; i++) {
  //       // $scope.labels2[i] = $scope.CategoryCount[i].AssetCategory + '-' + $scope.CategoryCount[i].AssetCount;
  //       this.labels2[0] = this.CategoryCount[1].Invoice + ' - ' + this.CategoryCount[1].OutStanding +' - ' + this.CategoryCount[1].Paid;
  //       this.data2[0] = this.CategoryCount[1].Year;
  //     }
  //     console.log(this.labels2);
  //     console.log(this.data2);
  //     const canvas = <HTMLCanvasElement>document.getElementById('myChart');
  //     const ctx = canvas.getContext('2d');
  //     // var ctx = document.getElementById("myChart");
  //     var myChart = new Chart(ctx, {
  //       type: 'pie',
  //       data: {
  //         labels: this.labels2,
  //         datasets: [{
  //           label: this.labels2,
  //           data: this.data2,
  //           backgroundColor: ['rgba(247,70,74,1)', 'rgba(220,220,220,1)', 'rgba(151,187,205,1)', 'rgba(70,191,189,1)', 'rgba(253,180,92,1)', 'rgba(148,159,177,1)', 'rgba(77,83,96,1)', 'rgba(103,16,103,1)', 'rgba(165,131,134,1)', '#FF4500', '#800000', '#00BFFF ', '#000000', '#00FF00', '#008080', '#FF00FF']

  //         }]
  //       },
  //       options: {
  //         responsive: true,
  //         fullwidth: true,
  //         legend: {
  //           display: true,
  //           align: 'start',
  //           position: 'bottom',
  //           verticalAlign: "center",
  //           labels: {
  //             boxWidth: 20,
  //             padding: 20
  //           }
  //         }
  //       }
  //     });

  //   }, error => {


  //   });

  // }

  getBranchCountChart = function () {
    debugger
      var sourcearray=[];
      const header = new Headers();
      header.append("Content-Type", "application/json");
    
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty+'propertystatus?strfunction=1&branch=1&userid=1',{
        headers: options,
      }).subscribe((resp:any) => {
        console.log(resp)
        debugger
        this.branchCountresult = resp;
    
        this.branchCount = this.branchCountresult;
        console.log(this.branchCount);
        this.labels = [];
        this.data = [];
        for (var i = 0; i < this.branchCount.length; i++) {
          this.labels[i] = this.branchCount[i].Property_Status + ' - ' + this.branchCount[i].OutStanding +' - ' + this.branchCount[i].Paid;
        this.data[i] = this.branchCount[i].No_of_Property;
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
              labels: this.label,
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

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
  dataStatus: any = [];
  dataDetails: any = [];
  dataVaccant: any = [];
  dataRaised: any = [];


  columns: any = [];
  columnsStatus: any = [];
  columnsDetails: any = [];
  columnsVaccant: any = [];
  columnsRaised: any = [];
  rows: any
  barChart: any;


  @ViewChild('sourcecanvas1') sourcecanvas1;
  @ViewChild('sourcecanvas2') sourcecanvas2;
  @ViewChild('sourcecanvas3') sourcecanvas3;

  constructor(private http: HttpClient, private platform: Platform, public Ipaddressservice: IpaddressService, private tableApi: TableSampleService) {
    this.userid = window.localStorage['TUM_USER_ID'];
    this.username = localStorage.getItem('TUM_USER_NAME');
    this.customerPayment();
    this.getBranchCountChart();
    this.getEmployeeCountChart();
    this.getToBevaccantChart();
    // this.getCategoryCountChart();
    this.getBranchCountChart();


    this.columnsStatus = [
      { name: 'issuecode', },
      { name: 'issuedate', },
      { name: 'issuedescription', },
      { name: 'Status', },
    ];

    this.columnsDetails = [
      { name: 'sno', },
      { name: 'propertycode', },
      { name: 'issuedescription', },
      { name: 'status', },
    ];
  }

  ngOnInit() {
    debugger;
    this.data = this.tableApi.getDashbTable1();
    console.log(this.data);



    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'issuestatus?strfunction=1&branch=1&userid=1').subscribe((res: any) => {
      console.log(res)
      this.dataStatus = res
    })

    // this.dataStatus = this.tableApi.getDashbTable2();
    // console.log(this.dataStatus);

    this.dataDetails = this.tableApi.getDashbTable3();
    console.log(this.dataDetails);

    this.dataVaccant = this.tableApi.getDashbTable4();
    console.log(this.dataVaccant);

    this.dataRaised = this.tableApi.getDashbTable5();
    console.log(this.dataRaised);

  }

  customerPayment = function () {
    debugger
 
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'customerpayments?strfunction=1&branch=1&userid=1', {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp)
      debugger
      this.customerPaymenhtresult = resp;

      this.customerPayment = this.customerPaymenhtresult;
      console.log(this.customerPayment)
      console.log(this.customerPayment[0].Invoice);
      this.labels = [];
      this.data = [];

      for (var i = 0; i < this.customerPayment.length; i++) {
        this.labels[i] = this.customerPayment[i].Year;

        this.data[i] = this.customerPayment[i].Invoice + this.customerPayment[i].OutStanding + this.customerPayment[i].Paid;
      }
      console.log(this.data);
      if (this.barchart) {
        this.barchart.destroy();
      }
      this.barchart = new Chart(this.sourcecanvas2.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [{
            barPercentage: 0.3,
            barThickness: '10',
            label: "Invoice",
            stack: "Base",
            backgroundColor: "#E1BA24",
            data: [this.customerPayment[0].Invoice, this.customerPayment[0].Invoice]

          }
            ,
          {
            barPercentage: 0.3,
            barThickness: '10',
            label: "OutStanding",
            stack: "Sensitivity",
            backgroundColor: "#2A93CE",
            data: [this.customerPayment[0].OutStanding, this.customerPayment[1].OutStanding]

          },
          {
            barPercentage: 0.3,
            barThickness: '10',
            label: "Paid",
            stack: "solid",
            backgroundColor: "#004073",
            data: [this.customerPayment[0].Paid, this.customerPayment[1].Paid]

          }
          ]
        },
        options: {
          legend: {
            display: true
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
          // tooltips: {

          //   callbacks: {
          //     title: function (tooltipItem, data) {
          //       return data['labels'][tooltipItem[0]['index']];
          //     },
          //     label: function (tooltipItem, data) {
          //       return data.datasets[0]['label'] + " : " + data['datasets'][0]['data'][tooltipItem['index']];
          //     },

          //   },
          // },
        }
      })
    });
  }

  getEmployeeCountChart = function () {
    debugger;
    var sourcearray = [];
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'emloyeemaintenance?strfunction=1&branch=1&userid=1').subscribe(resp => {
      debugger
      this.result = resp;

      this.employeeCount = this.result;
      console.log(this.employeeCount);
      // this.Total = new IonLabel;
      // this.Compplete =new IonLabel;
      // this.Pending =new IonLabel;
      this.labels2 = [];
      this.data2 = [];
      for (var i = 0; i < this.employeeCount.length; i++) {
        debugger

        this.FieldName = this.employeeCount[i].FieldName;

        if (this.FieldName = "Total") {
          // this. labels2[0] ="Total";
          this.labels2[0] = "Total";
          this.data2[0] = this.employeeCount[i].Total;
        }
        if (this.FieldName = "Complete") {
          //this. labels2[1] ="Complete";
          this.labels2[1] = "Complete";
          this.data2[1] = this.employeeCount[i].Completed;
        }
        if (this.FieldName = "Pending") {
          //this. labels2[2] ="Pending";
          this.labels2[2] = "Pending";
          this.data2[2] = this.employeeCount[i].Pending;
        }
        // $scope.labels2[i] = $scope.CategoryCount[i].AssetCategory + '-' + $scope.CategoryCount[i].AssetCount;
        //   this.labels2[i] ="Total,Completed,Pending" ;//"Total="+this.employeeCount[i].Total + " "+ "Completed=" + this.employeeCount[i].Completed + " "+"Pending="+ this.employeeCount[i].Pending;
        //   this.data2[i] = "Total =" + this.employeeCount[i].Completed +this.employeeCount[i].Pending;
        //  this.data2[i] = "Completed =" + this.employeeCount[i].Completed ;
        //   this.data2[i] =  "Pending ="+this.employeeCount[i].Pending;        

      }

      console.log(this.labels2);
      console.log(this.data2);
      const canvas = <HTMLCanvasElement>document.getElementById('myChart1');
      const ctx = canvas.getContext('2d');
      // var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.labels2,
          datasets: [{
            label: this.labels2,
            data: this.data2,
            backgroundColor: ['rgba(247,70,74,1)', 'rgba(220,220,220,1)', 'rgba(151,187,205,1)', 'rgba(70,191,189,1)', 'rgba(253,180,92,1)', 'rgba(148,159,177,1)', 'rgba(77,83,96,1)', 'rgba(103,16,103,1)', 'rgba(165,131,134,1)', '#FF4500', '#800000', '#00BFFF ', '#000000', '#00FF00', '#008080', '#FF00FF']

          }]
        },
        options: {
          responsive: true,
          fullwidth: true,
          legend: {
            display: true,
            align: 'start',
            position: 'bottom',
            verticalAlign: "center",
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
    var sourcearray = [];
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'propertystatus?strfunction=1&branch=1&userid=1', {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp)
      debugger
      this.branchCountresult = resp;

      this.branchCount = this.branchCountresult;
      console.log(this.branchCount);
      this.labels = [];
      this.data = [];
      for (var i = 0; i < this.branchCount.length; i++) {
        this.labels[i] = this.branchCount[i].Property_Status;
        this.data[i] = this.branchCount[i].No_of_Property;
        // $scope.data.push($scope.colorpie[i].color);
      }
      console.log(this.labels);
      console.log(this.data);

      sourcearray = [
        {
          data: this.data,
          backgroundColor: ['rgb(16, 99, 16)', 'rgb(68, 49, 9)'],
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
                return  "Target : " + data['datasets'][0]['data'][tooltipItem['index']];
              },

            },
          },
        }
      });
    }, error => {
    });
  }

  getToBevaccantChart = function () {
    debugger
    var sourcearray = [];
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'tobevaccant?strfunction=1&branch=1&userid=1', {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp)
      debugger
      this.tovaccantchart = resp;

      this.tovaccantchartcount = this.tovaccantchart;
      console.log(this.branchCount);
      this.labels = [];
      this.data = [];
      for (var i = 0; i < this.tovaccantchartcount.length; i++) {
        this.labels[i] = this.tovaccantchartcount[i].Days;
        this.data[i] = this.tovaccantchartcount[i].Count;
        // $scope.data.push($scope.colorpie[i].color);
      }
      console.log(this.labels);
      console.log(this.data);

      sourcearray = [
        {

          data: this.data,
          backgroundColor: ['rgba(253,180,92,1)', 'rgba(148,159,177,1)', 'rgba(77,83,96,1)', 'rgba(103,16,103,1)', 'rgba(165,131,134,1)', '#FF4500', '#800000', '#00BFFF ',],


        }]
      if (this.sourcechart1) {
        this.sourcechart.destroy();
      }
      this.sourcechart1 = new Chart(this.sourcecanvas3.nativeElement, {

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

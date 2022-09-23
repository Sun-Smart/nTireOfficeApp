/* eslint-disable arrow-body-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable object-shorthand */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable max-len */
/* eslint-disable no-var */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { IpaddressService } from '../../service/ipaddress.service';
declare let $;
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  branchlist: any;
  branchlist1 = [];
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('sourcecanvas') sourcecanvas;
  @ViewChild('productcanvas') productcanvas;
  @ViewChild('productcanvas1') productcanvas1;


  labelsp;
  datap;
  sourcelabel;
  sourcedata;
  Productlabel = [];
  totalleads = [];
  closedleades = [];
  percenclosedleads = [];
  barChart: any;
  productchart: any;
  sourcechart: any;
  productchart1: any;
  branch;
  branch_txt;
  labels1n = [];
  total_leads_datan = [];
  closed_leads_datan = [];
  perc_closedn = [];
  username: any;
  // This property will save the callback which we can unsubscribe when we leave this view
  public unsubscribeBackEvent: any;
  constructor(private platform: Platform, public alertController: AlertController, private http: HttpClient, public Ipaddressservice: IpaddressService, private navCtrl: NavController, private menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'first');
    this.Getbranches();

    var branchid = localStorage.getItem('TUM_BRANCH_ID');
    this.branch_txt = localStorage.getItem('TUM_BRANCH_CODE');

    this.Stagewisegraph(branchid);
    this.Sourcewisegrph(branchid);
    this.productwisegraph(branchid);
    this.username = localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
  }

  Getbranches() {
    var params = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID']
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/getBranchAccess/', params, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = resp;

      this.branchlist.forEach(element => {
        this.branchlist1.push(element);
        console.log("branchlist1 : " + JSON.stringify(this.branchlist1));
      });

      this.branch = parseInt(localStorage.getItem('TUM_BRANCH_ID'));

    }, error => {


    });
  }
  branchchange(branchid) {

    this.Stagewisegraph(branchid);
    this.Sourcewisegrph(branchid);
    this.productwisegraph(branchid);
  }
  Stagewisegraph(branchid) {

    var final_data;
    var exampleArrya = [];
    var params = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
      branchid: branchid
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/getdashboard_stagewise/', params, {
      headers: options,
    }).subscribe(resp => {
      console.log("options" + JSON.stringify(resp));

      final_data = resp;
      this.labelsp = ["Demo", "Enquiry", "Lost", "Negotiation", "Proposal", "Qualified", "Quality Testing Done", "Quotes Given"];
      this.datap = [final_data[0]['Demo'], final_data[0]['Enquiry'], final_data[0]['Lost'], final_data[0]['Negotiation'], final_data[0]['Proposal'], final_data[0]['Qualified'], final_data[0]['Quality Testing done'], final_data[0]['Quotes Given']];

      for (var i = 0; i < this.branchlist1.length; i++) {
        if (this.branchlist1[i].BRANCH_ID == this.branch) {
          var branch = this.branchlist1[i].BRANCH_DESC;
        }

      }
      exampleArrya = [
        {
          label: branch,

          data: this.datap,
          backgroundColor: '#2ebaed',

        }];

      if (this.barChart) {
        this.barChart.destroy();
      }
      this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'line',

        data: {
          labels: this.labelsp,
          datasets: exampleArrya,
          toolTipContent: "<a href = {name}> {label}</a><hr/>Views: {y}",
        },
        options: {
          is3D: true,
          legend: {
            display: true,
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
                fontSize: 8,
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
                return localStorage.getItem('TUM_BRANCH_CODE') + " : " + data['datasets'][0]['data'][tooltipItem['index']];
              },

            },



          },
        }

      });

    }, error => {


    });
  }


  Sourcewisegrph(branchid) {
    var sourecfinal;
    var sourcearray = [];
    var params = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
      branchid: branchid
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/getdashboard_sourcewise/', params, {
      headers: options,
    }).subscribe(resp => {
      console.log("getdashboard_sourcewise : " + JSON.stringify(resp));

      sourecfinal = resp;
      this.sourcelabel = ['Web Lead', 'Personal', 'Branch', 'Corporate Website', 'Mobile', 'Call Center'];
      this.sourcedata = [sourecfinal[0]['Web Lead'], sourecfinal[0]['Personal Lead'], sourecfinal[0]['Branch'], sourecfinal[0]['Corporate Website'], sourecfinal[0]['Mobile'], sourecfinal[0]['Call Center']];

      sourcearray = [
        {

          data: this.sourcedata,
          backgroundColor: '#46d39a',

        }];
      if (this.sourcechart) {
        this.sourcechart.destroy();
      }
      this.sourcechart = new Chart(this.sourcecanvas.nativeElement, {

        type: 'bar',

        data: {
          labels: this.sourcelabel,
          datasets: sourcearray,

        },
        options: {
          is3D: true,
          zoomEnabled: true,
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
  productwisegraph(branchid) {
    var productresult;
    this.Productlabel = [];
    this.totalleads = [];
    this.closedleades = [];
    this.percenclosedleads = [];
    this.labels1n = [];
    this.total_leads_datan = [];
    this.closed_leads_datan = [];
    this.perc_closedn = [];
    var params = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
      branchid: branchid
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/salesdashboard_productwiseforcast/', params, {
      headers: options,
    }).subscribe(resp => {
      console.log("salesdashboard_productwiseforcast : " + JSON.stringify(resp));

      productresult = resp;
      var top10 = productresult.sort((a: any, b: any) => {
        return a['Total Leads'] < b['Total Leads'] ? 1 : -1;
      }).slice(0, 10);
      var nottop10 = productresult.filter(
        book => top10.indexOf(book) == -1

      );

      console.log(top10);

      for (var i = 0; i < top10.length; i++) {
        if (top10[i].Product == "Corporate Banking Related") {
          top10[i].Product = "CBR";
        } else if (top10[i].Product == "REGALIA PLATINUM CARD") {
          top10[i].Product = "RPC";
        } else if (top10[i].Product == "Customer Onboarding Application") {
          top10[i].Product = "COA";
        } else if (top10[i].Product == "Commercial Vehicle Insurance") {
          top10[i].Product = "CVI";
        } else if (top10[i].Product == "Retail products") {
          top10[i].Product = "RP";
        } else if (top10[i].Product == "Interview Process APP") {
          top10[i].Product = "IPA";
        } else if (top10[i].Product == "Retail Banking Related") {
          top10[i].Product = "RBR";
        } else if (top10[i].Product == "Home Loan") {
          top10[i].Product = "Home Loan";
        } else if (top10[i].Product == "Credit Cards") {
          top10[i].Product = "Credit Cards";
        } else if (top10[i].Product == "test") {
          top10[i].Product = "Test";
        }

        this.Productlabel.push(top10[i].Product);
        this.totalleads.push(top10[i]['Total Leads']);
        this.closedleades.push(top10[i]['Closed Leads']);
        this.percenclosedleads.push(top10[i]['% Closed Leads']);
      }
      if (this.productchart) {
        this.productchart.destroy();
      }
      this.productchart = new Chart(this.productcanvas.nativeElement, {
        type: 'line',

        data: {
          labels: this.Productlabel,
          datasets: [{

            label: 'Total Leads',
            yAxisID: 'A',
            data: this.totalleads,
            borderColor: '#e55759',

          },
          {
            label: '% Closed Leads',
            yAxisID: 'A',
            data: this.percenclosedleads,

          }, {
            label: 'Closed Leads',
            yAxisID: 'B',
            data: this.closedleades,
            borderColor: '#d8b655',
            backgroundColor: ' #d8b655'
          },

          ]
        },
        options: {

          tooltips: {
            mode: 'index',

            callbacks: {
              label: function (t, d) {
                if (t.datasetIndex === 0) {
                  return 'Total Leads' + " " + t.yLabel.toFixed();
                } else if (t.datasetIndex === 1) {

                  return "% Closed Leads" + " " + Math.round(+t.yLabel.toString());

                }
                else if (t.datasetIndex === 2) {

                  return "Closed Leads" + " " + Math.round(+t.yLabel.toString());
                }

              }
            }
          },
          legend: {
            display: false
          },
          scales: {
            xAxes: [{

              labelMaxWidth: 100



            }],
            yAxes: [{
              id: 'A',
              type: 'linear',
              position: 'left',
            }, {
              id: 'B',
              type: 'linear',
              position: 'right',

            }]
          }
        }

      });
      for (var i = 0; i < nottop10.length; i++) {
        //console.log(final_result[i]['Total Leads']);
        if (i == 2) {

        }
        else {
          if (nottop10[i].Product.length > 10) {
            nottop10[i].Product = nottop10[i].Product.substring(0, 10) + '...';
            console.log(nottop10[i]);
          }
          this.labels1n.push(nottop10[i].Product);
          this.total_leads_datan.push(nottop10[i]['Total Leads']);
          this.closed_leads_datan.push(nottop10[i]['Closed Leads']);
          this.perc_closedn.push(nottop10[i]['% Closed Leads']);
        }
      }
      if (this.productchart1) {
        this.productchart1.destroy();
      }
      this.productchart1 = new Chart(this.productcanvas1.nativeElement, {

        type: 'line',
        data: {
          labels: this.labels1n,
          datasets: [{
            label: 'Total Leads',
            yAxisID: 'A',
            data: this.total_leads_datan,
            borderColor: '#dd4a68',
          },
          {
            label: '% Closed Leads',
            yAxisID: 'A',
            data: this.closed_leads_datan,

          }, {
            label: 'Closed Leads',
            yAxisID: 'B',
            data: this.perc_closedn,
            borderColor: '#856c6c',
            backgroundColor: ' #4a95ba'
          },

          ]
        },

        options: {
          tooltips: {
            mode: 'index',

            callbacks: {
              label(t, d) {
                if (t.datasetIndex === 0) {
                  return 'Total Leads' + " " + t.yLabel.toFixed();
                } else if (t.datasetIndex === 1) {

                  return "% Closed Leads" + " " + Math.round(+t.yLabel.toString());

                }
                else if (t.datasetIndex === 2) {

                  return "Closed Leads" + " " + Math.round(+t.yLabel.toString());
                }

              }
            }
          },
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
              id: 'A',
              type: 'linear',
              position: 'left',
            }, {
              id: 'B',
              type: 'linear',
              position: 'right',

            }]
          }
        }

      });
    }, error => {


    });
  }
}

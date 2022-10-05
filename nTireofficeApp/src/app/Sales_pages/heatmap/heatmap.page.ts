/* eslint-disable radix */
/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.page.html',
  styleUrls: ['./heatmap.page.scss'],
})
export class HeatmapPage implements OnInit {
  segmentdata;
  status1;
  branch;
  usertype;
  branchlist;
  branchlist1 = [];

  branchuser_data1: any;
  branchuser_data = [];
  branchid;
  status;
  HeatMapRecord_data1: any;
  HeatMapRecord_data = [];
  HeatMapRecordbranch1: any;
  HeatMapRecordbranch = [];
  username:any;
  constructor(public alertController: AlertController, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.usertype = window.localStorage['TUM_USER_TYPE'];
    this.Getbranches();
    this.username=localStorage.getItem('TUM_USER_NAME');
    this.segmentdata = "11";
    this.branchid = window.localStorage['TUM_BRANCH_ID'];
    this.branch = window.localStorage['TUM_BRANCH_ID'];
    this.status = "3";
    this.status1 = "3";
    this.getbranchusers(this.branchid, this.status);
    if (this.usertype != '1') {

      this.HeatMapRecord(localStorage['TUM_USER_ID']);
    }
  }

  ngOnInit() {
  }
  Getbranches() {
    var obj = {
      access_token: window.localStorage['token'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      'usertoken': window.localStorage['usertoken'],
      USER_ID: parseInt(window.localStorage['TUM_USER_ID'])
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getBranchAccess', obj, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = JSON.stringify(resp);
      this.branchlist = JSON.parse(this.branchlist);
      this.branchlist.forEach(element => {
        this.branchlist1.push(element);

        console.log("branchlist1 : " + JSON.stringify(this.branchlist1));
      });
    }, error => {


    });
  }

  getbranchusers(location, status) {
    this.branchuser_data = [];
    var obj = {
      access_token: window.localStorage['token'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      'usertoken': window.localStorage['usertoken'],
      USER_ID: parseInt(window.localStorage['TUM_USER_ID']),
      branchid: parseInt(location),
      status: status
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getbranchusers', obj, {
      headers: options,
    }).subscribe(resp => {
      console.log("getbranchusers : " + JSON.stringify(resp));
      this.branchuser_data1 = JSON.stringify(resp);
      this.branchuser_data1 = JSON.parse(this.branchuser_data1);
      this.branchuser_data1.forEach(element => {
        this.branchuser_data.push(element);
      });
      this.HeatMapRecord_data = [];
    }, error => {


    });
  }
  HeatMapRecord(user_id) {
    this.HeatMapRecord_data = [];
    var obj = {
      access_token: window.localStorage['token'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
      tum_user_id: parseInt(user_id),
      status: this.status
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getHeatMapRecord/', obj, {
      headers: options,
    }).subscribe(resp => {

      this.HeatMapRecord_data1 = JSON.stringify(resp);
      this.HeatMapRecord_data1 = JSON.parse(this.HeatMapRecord_data1);
      this.HeatMapRecord_data1.forEach(element => {
        this.HeatMapRecord_data.push(element);

        console.log("HeatMapRecord_data : " + JSON.stringify(this.HeatMapRecord_data));
      });
      this.HeatMapRecord_data.sort(function (a, b) {
        var c = a.TCM_CAMPAIGN_SHORTDESC.toUpperCase();
        var d = b.TCM_CAMPAIGN_SHORTDESC.toUpperCase();
        return c > d ? 1 : -1;
      });

    }, error => {


    });
  }
  getbranchwise() {
    this.HeatMapRecordbranch = [];
    if (this.branch == undefined || this.branch == "") {
      this.presentAlert('', 'Please Select Branch');

    }
    else if (this.status1 == undefined || this.status1 == "") {
      this.presentAlert('', 'Please Select Status');

    }
    else {
      this.HeatMapRecordbranch = [];
      var obj = {
        access_token: window.localStorage['token'],
        userid: parseInt(window.localStorage['TUM_USER_ID']),
        'usertoken': window.localStorage['usertoken'],
        USER_ID: parseInt(window.localStorage['TUM_USER_ID']),
        BranchID: parseInt(this.branch),
        status: this.status1
      };
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getHeatMapRecordbranchwise', obj, {
        headers: options,
      }).subscribe(resp => {
        console.log("HeatMapRecord_data : " + JSON.stringify(resp));
        this.HeatMapRecordbranch1 = JSON.stringify(resp);
        this.HeatMapRecordbranch1 = JSON.parse(this.HeatMapRecordbranch1);
        this.HeatMapRecordbranch1.forEach(element => {
          this.HeatMapRecordbranch.push(element);

        });
        this.HeatMapRecordbranch.sort(function (a, b) {
          var c = a.TCM_CAMPAIGN_SHORTDESC.toUpperCase();
          var d = b.TCM_CAMPAIGN_SHORTDESC.toUpperCase();
          return c > d ? 1 : -1;
        });

      }, error => {


      });
    }
  }

  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
}

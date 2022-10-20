/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable radix */
/* eslint-disable id-blacklist */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { NavParams } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-histotydetails',
  templateUrl: './histotydetails.page.html',
  styleUrls: ['./histotydetails.page.scss'],
})
export class HistotydetailsPage implements OnInit {
  @Input() firstName: string;
  item;
  showhistforuser = [];
  showhistforuser1: any;
  showhistforuserfilter = [];
  nextdate;
  fromDate;
  toDate;
  shownodata: boolean = false
  constructor(private datePipe: DatePipe, private model: ModalController, private callNumber: CallNumber, navParams: NavParams, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    console.log(navParams.get('item'));
    this.item = navParams.get('item');
    localStorage.setItem('customer-lead_id', this.item.customer_lead_id);
    // if (this.item.TCC_NEXT_CALL_DATE != null) {
    //   this.nextdate = this.item.TCC_NEXT_CALL_DATE;
    // }

    var today = new Date();

    this.fromDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.toDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    this.Gethistorydata();

  }

  ngOnInit() {
  }
  getItems(ev: any) {

    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.showhistforuser = this.showhistforuser.filter((item) => {
        return (item.Meeting_address.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
  searchFilter(fromDate, toDate) {
    debugger
    let start = new Date(fromDate);
    let end = new Date(toDate);

    // console.log('showhistforuser before' + start);
    // console.log('showhistforuser before' + end);
    console.log('showhistforuser before' + new Date('10/23/2020'));


    // return this.showhistforuser.filter(item => {
    //   var dateParts = item.EXPECTEDCLOSEDDATE.split("/");

    //   let date = new  Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    //   return date >= start && date <= end;
    // })
    console.log('this.showhistforuser ',);
    if (this.showhistforuser.length) {
      this.showhistforuser = this.showhistforuserfilter.filter(

        m => new Date(m.EXPECTEDCLOSEDDATE.split('/')[2] + '-' + m.EXPECTEDCLOSEDDATE.split('/')[1] + '-' + m.EXPECTEDCLOSEDDATE.split('/')[0]) >= new Date(start) && new Date(m.EXPECTEDCLOSEDDATE.split('/')[2] + '-' + m.EXPECTEDCLOSEDDATE.split('/')[1] + '-' + m.EXPECTEDCLOSEDDATE.split('/')[0]) <= new Date(end)
      );
    } else {
      this.shownodata = true;
    }



    //let date = new Date(item.created_at);
    // return date >= start && date <= end;
    // console.log('showhistforuser after'+JSON.stringify(this.showhistforuser));
  }
  Gethistorydata() {
    debugger;
    var params = {
      TCC_CUST_ID: parseInt(this.item.TCC_CUSTOMER_ID),
      "Token": window.localStorage['token'],
      access_token: window.localStorage['token'],
      'usertoken': window.localStorage['usertoken'],
      customer_lead_id: parseInt(window.localStorage['customer-lead_id']),
      TCC_CUST_LEAD_ID: window.localStorage['customer-lead_id'],
      TCC_CUSTOMER_ID: parseInt(this.item.TCC_CUSTOMER_ID),
      TCC_CAMPAIGN_ID: parseInt(this.item.TCC_CAMPAIGN_ID),
      user_id: parseInt(window.localStorage['TUM_USER_ID']),
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      // TCC_CUST_LEAD_ID: window.localStorage['customer-lead_id'],
      Campaign: "0",
      CUST_LNAME: "",
      TCC_LEAD_PRIORITY: "",
      TCC_LEAD_BY: "",
      response: "6",
      offset: "0",
      limit: "50"
    };
    this.item.BRANCH_ID = parseInt(this.item.BRANCH_ID)
    var updateleadHistoryJSON = Object.assign(this.item, params);
    console.log("params : " + JSON.stringify(updateleadHistoryJSON));
    debugger
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'gethistorydata', updateleadHistoryJSON, {
      headers: options,
    }).subscribe(resp => {
      this.showhistforuser1 = resp;
      // this.showhistforuser1 = JSON.parse(this.showhistforuser1)
      // console.log("showhistforuser : " + JSON.stringify(resp));
      debugger
      this.showhistforuser1.forEach(element => {
        element.MOBILE = element.MOBILE;
        element.BRANCH_DESC = this.item.BRANCH_DESC;
        element.CustFullName = this.item.CustFullName;
        //element.TCC_NEXT_CALL_DATE = objdatas.NEXT_CALL_DATE;

        if (this.nextdate != undefined) {
          element.TCC_NEXT_CALL_DATE = this.nextdate;
        }

        element.TCC_LAST_CALLED = element.TCC_LAST_CALLED;
        element.ProdAndCamp = this.item.ProdAndCamp;
        element.producttypeTEXT = this.item.producttypeTEXT;
        element.CreatedOn = this.item.CreatedOn;
        element.PRODUCT_MODE = this.item.PRODUCT_MODE;
        element.ExpectedClosedDate = element.ExpectedClosedDate;
        element.ExpctedAmount = element.ExpctedAmount;
        element.Campaign = this.item.Campaign;
        element.OFFPHONE = this.item.OFFPHONE;
        element.RESPHONE = this.item.RESPHONE;
        element.TCC_AGENT_REMARKS = element.TCC_AGENT_REMARKS;
        var date = element.CREATED_ON;

        // var timesp = date;
        // var time2 = timesp[1];

        // var d1 = new Date(timesp[0] + " " + time2[0]);
        // var d2 = new Date(d1);
        // d2.setMinutes(d2.getMinutes() + 30);
        // console.log('getMinutes' + d2);

        // var penddata = this.datePipe.transform(d2, "hh:mm a");
        // console.log('penddata' + penddata);
        // var created_time = penddata;
        // var time = created_time.split(' ');

        // if (time[1] == 'AM') {
        //   element.created_time = time[0] + " " + 'PM';
        // }
        // else {
        //   element.created_time = time[0] + " " + 'AM';
        // }


        if (this.nextdate != undefined) {
          element.call_time = this.formatTime(this.nextdate);
        }
        if (!element.doc_id) {
          element.insertedOn = element.CREATED_ON;
        } else {
          element.insertedOn = element.uploaded_on;
        }
        this.showhistforuser.push(element);
        this.showhistforuserfilter.push(element);
        console.log("showhistforuser : " + JSON.stringify(this.showhistforuser));
      });


    }, error => {

      console.log("showhistforuser : " + JSON.stringify(error));
    });
  }
  makeCall(number) {
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  closemodel() {
    this.model.dismiss();
  }
  tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  formatTime(time) {
    if (time) {
      var parts = time?.split('T');
      var parts2 = parts[1];
      var parts3 = parts2?.split(':');
    }
    // var date = new Date(0, 0, 0, parts3[0], parts3[1], 0);

    // return this.datePipe.transform(date, 'hh:mm a');
    return;

  };
  dateconversion1(time) {
    var parts = time?.split('T');
    var parts2 = parts[1];
    var parts3 = parts2?.split(':');

    var date = new Date(0, 0, 0, parts3[0], parts3[1], 0);
    return date;
  }

  dateconversion(date) {

    console.log("dateconversion : " + date);
    var d = new Date(date);

    var timeString = d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds;
    console.log("timeString : " + timeString);
    var H = +timeString.substr(0, 2);
    console.log("H : " + H);
    var h = (H % 12) || 12;
    console.log("h : " + h);
    var ampm = H < 12 ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + " " + ampm;

    var datetime = +d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + timeString;

    return datetime;

  }


}

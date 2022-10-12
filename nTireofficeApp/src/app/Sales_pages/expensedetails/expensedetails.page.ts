/* eslint-disable radix */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-undef-init */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable object-shorthand */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
declare var $: any;
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google: any;
import { AddtravelexpensedetailsPage } from '../addtravelexpensedetails/addtravelexpensedetails.page'
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-expensedetails',
  templateUrl: './expensedetails.page.html',
  styleUrls: ['./expensedetails.page.scss'],
})
export class ExpensedetailsPage implements OnInit {
  allappointments;
  brach;
  datfil;
  IsVisible;
  user_id;
  meetingArray = [];
  token;
  fromdate;
  todate;
  allMeetings1;
  allUsername1 = [];
  allmeetingArray1 = [];
  meetArrayLength;
  maxArray1;
  today;
  formattedDate;
  formattedDate1;
  formattedTime;
  meetingCount = [];
  allMeetings;
  allUsername = [];
  allmeetingArray = [];
  maxArray;
  CUSTOMER_ID;
  customer_id;
  customer_name;
  call_id;
  product_desc;
  product;
  campaign;
  campaign_desc;
  remarks;
  status;
  branch_id;
  documents = [];
  lastcalldate;
  nextcalldate;
  lastcall;
  latlngvals;
  nextcall;
  formattedadd;
  mobile;
  offphone;
  RESPHONE;
  documentarray;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  allExpense;
  expense_id1;
  checkdata;
  branchlist: any;
  branchlist1 = [];
  username: any;
  private backbuttonSubscription: Subscription;
  constructor(private nativeGeocoder: NativeGeocoder, public alertController: AlertController, public modalController: ModalController, private datePipe: DatePipe, private http: HttpClient, public Ipaddressservice: IpaddressService, private geolocation: Geolocation) {
    this.brach = localStorage.getItem('BRANCH_ID');
    this.username = localStorage.getItem('TUM_USER_NAME');
    this.IsVisible = true;
    this.brach = "";
    this.Getbranches();
  }

  ngOnInit() {
  }
  Getbranches() {
    var params = {
      access_token: window.localStorage['token'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      'usertoken': window.localStorage['usertoken'],
      USER_ID: parseInt(window.localStorage['TUM_USER_ID'])
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getBranchAccess', params, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = resp;
      this.branchlist.forEach(element => {
        this.branchlist1.push(element)
        console.log("branchlist1 : " + JSON.stringify(this.branchlist1));
      });



    }, error => {


    });
  }

  searchAppointment(val, usertype, fromdate, todate) {
    this.allmeetingArray1 = [];
    if (this.brach == "") {
      this.presentAlert1('', 'Please Enter Branch');
    }
    else if (fromdate == '' || fromdate == undefined) {
      this.presentAlert1('', 'Please Select From Date');

    }
    else if (todate == '' || todate == undefined) {
      this.presentAlert1('', 'Please Select To Date');
    }
    else if (fromdate > todate) {
      this.presentAlert1('', 'From Date should not be Greater than To Date');
    }
    else {
      this.IsVisible = false;
      if ((val == '' || val == undefined) || (fromdate == '' || fromdate == undefined) || (todate == '' || todate == undefined)) {
        //console.log("okay")

        if (val == '' || val == undefined) {
          $('#alluserTable').show();
          $('#tableByUser').hide();
          $('#oneUserAlert').hide();
          $('#alluserTablebyDate').hide();
          $('#tableCard').show();
          this.getAllMeeting(this.brach);
          // alert('Please Enter User');
        } else {

          var obj = undefined;
          // //console.log(obj);
          if (obj == undefined) {
            //console.log("undefined value")
            //alert("Invalid User");
            obj = '';
          } else {
            $('#alluserTable').hide();
            $('#tableCard').hide();
            this.user_id = parseInt(obj.TUM_USER_ID);
            this.meetingArray = [];
            this.token = window.localStorage['token'];
            var dataobj = { user_id: this.user_id }
            var tokenJSON = { access_token: this.token, userid: window.localStorage['TUM_USER_ID'], 'usertoken': window.localStorage['usertoken'] };

            var getappbyuserJSON = Object.assign(dataobj, tokenJSON);
            const header = new Headers();
            header.append("Content-Type", "application/json");
            let options = new HttpHeaders().set('Content-Type', 'application/json');
            this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getallappointmentsbyUser/', getappbyuserJSON, {
              headers: options,
            }).subscribe(resp => {
              this.allappointments = resp;
              //console.log(this.allappointments)
              if (this.allappointments.length != 0) {
                this.meetingArray.push({
                  User: obj.TUM_USER_CODE
                })

                for (var i = 0; i < this.allappointments.length; i++) {

                  var app_date = this.allappointments[i].TCC_NEXT_CALL_DATE;
                  var datetime = app_date.split('T');
                  var date = this.datePipe.transform(datetime[0], 'dd/MM/yyyy');

                  this.today = new Date();
                  // console.log(this.today)
                  this.formattedDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');

                  this.formattedDate1 = this.datePipe.transform(datetime[0], 'yyyy-MM-dd');

                  this.formattedTime = this.datePipe.transform(this.today, 'HH:mma');

                  // console.log(this.formattedTime)
                  // console.log(this.formattedDate);
                  // console.log(this.formattedDate1);
                  if (this.formattedDate1 < this.formattedDate) {
                    this.checkdata = true;
                    // console.log("red")
                    // this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'rgba(244, 67, 54, 0.71)'});
                    this.meetingArray.push(this.allappointments[i]);
                    this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                    this.allappointments[i].ColorCode = 'rgba(244, 67, 54, 0.71)';
                    date = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                    this.allappointments[i].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy');

                  } else if (this.formattedDate1 == this.formattedDate) {
                    this.checkdata = true;
                    // console.log("same date")
                    app_date = this.allappointments[i].TCC_NEXT_CALL_DATE;
                    // console.log(this.allappointments[i].TCC_NEXT_CALL_DATE)
                    // console.log(app_date)
                    var el = new Date();
                    var parts = app_date.split('T');
                    var parts2 = parts[1];
                    var parts3 = parts2.split(':');
                    // console.log(parts3)
                    var sHours = parts3[0];
                    var sMinutes = parts3[1];
                    el.setHours(sHours);
                    el.setMinutes(sMinutes);
                    el.setSeconds(0);
                    // console.log(el);
                    var milliseconds = el.getTime();
                    // console.log(milliseconds)
                    var milliseconds1 = new Date().getTime();
                    // console.log(milliseconds1)
                    var appDatePlusThirtyMin = el.setMinutes(el.getMinutes() + 30);
                    // console.log(appDatePlusThirtyMin);
                    if (milliseconds < milliseconds1) {
                      if (milliseconds1 < appDatePlusThirtyMin) {
                        //console.log("yellow")
                        // this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'#FFC107'});
                        this.meetingArray.push(this.allappointments[i]);
                        this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                        this.allappointments[i].ColorCode = '#FFC107';
                        date = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                        this.allappointments[i].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy');

                      } else {
                        // console.log("no color")
                        // this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'rgba(244, 67, 54, 0.71)'});
                        this.meetingArray.push(this.allappointments[i]);
                        this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                        this.allappointments[i].ColorCode = 'rgba(244, 67, 54, 0.71)';
                        date = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                        this.allappointments[i].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy');

                      }
                    } else {
                      this.checkdata = false;
                      // console.log("future time")
                      // this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'rgb(57, 226, 64)'});
                      this.meetingArray.push(this.allappointments[i]);
                      this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                      this.allappointments[i].ColorCode = 'rgb(57, 226, 64)';
                      date = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                      this.allappointments[i].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy');

                    }
                  } else {
                    this.checkdata = false;
                    // console.log("green")
                    // this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'rgb(57, 226, 64)'});
                    this.meetingArray.push(this.allappointments[i]);
                    this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                    this.allappointments[i].ColorCode = 'rgb(57, 226, 64)';
                    date = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                    this.allappointments[i].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy');
                  }
                }
                // console.log(this.meetingArray)
                $('#tableByUser').show();
                $('#oneUserAlert').show();
              } else {
                //console.log("No Record")
                $('#tableByUser').hide();
                $('#oneUserAlert').show();
              }
            }, error => {

              alert("" + JSON.stringify(error));
            });

            // }
          }
        }
        if (fromdate != undefined && todate != undefined) {

          this.fromdate = this.datePipe.transform(fromdate, 'yyyy-MM-dd');

          this.todate = this.datePipe.transform(todate, 'yyyy-MM-dd');

          // this.fromdate = fromdate
          // this.todate = todate
          console.log(this.fromdate);
          console.log(this.todate);
          $('#alluserTablebyDate').show();
          $('#alluserTable').hide();
          this.meetingArray = [];
          this.user_id = parseInt(window.localStorage['TUM_USER_ID']);
          var dataJSONtmp = { fdate: this.fromdate, tdate: this.todate, BRANCHID: parseInt(this.brach) }
          this.token = window.localStorage['token'];
          var tokenJSON = { access_token: this.token, userid: this.user_id, 'usertoken': window.localStorage['usertoken'] };
          var getleadJSON = Object.assign(dataJSONtmp, tokenJSON);
          const header = new Headers();
          header.append("Content-Type", "application/json");
          let options = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'get_AllappointmentsbyDate', getleadJSON, {
            headers: options,
          }).subscribe(resp => {
            //sales_services.get_AllappointmentsbyDate(this.fromdate, this.todate).then(function(resp) {
            //console.log(resp)
            this.allMeetings1 = resp;
            this.allUsername1 = [];
            this.allmeetingArray1 = [];
            for (var i = 0; i < this.allMeetings1.length; i++) {

              var cc = this.fromdate.split('-')
              // console.log(cc)
              var dd = this.todate.split('-')
              // console.log(dd)
              var newc = new Date(cc[0], cc[1] - 1, cc[2])
              // console.log(newc)
              var newd = new Date(dd[0], dd[1] - 1, dd[2])
              // console.log(newd)
              var datfils = this.allMeetings1[i].NEXT_CALL_DATE.split('T')
              this.datfil = datfils[0]
              var ee = this.datfil.split('-')
              var newe = new Date(ee[0], ee[1] - 1, ee[2])
              // console.log(newe)

              var objvalue = {
                'Current_Caller': this.allMeetings1[i].Current_Caller,
                'meeting_array': [this.allMeetings1[i]]
              };
              var index = this.getIndexIfObjWithOwnAttr(this.allmeetingArray1, 'Current_Caller', this.allMeetings1[i].Current_Caller);
              if (index == -1) {
                this.allmeetingArray1.push(objvalue);
              } else {
                if ((newe <= newd && newe >= newc)) {
                  this.allmeetingArray1[index.toString()].meeting_array.push(this.allMeetings1[i]);
                }
              }
              //  this.allmeetingArray1.push({'Meeting':'Meeting'+[i+1],'Company':this.allMeetings1[i].BRANCH_DESC,'MeetingDate':this.allMeetings1[i].TCC_NEXT_CALL_DATE});
            }
            //console.log(this.allmeetingArray1);
            var max = 0;
            for (var j = 0; j < this.allmeetingArray1.length; j++) {

              this.meetArrayLength = this.allmeetingArray1[j].meeting_array.length;

              if (this.meetArrayLength >= max) {
                max = this.meetArrayLength;

                this.maxArray1 = this.allmeetingArray1[j].meeting_array;

              }
              for (var k = 0; k < this.meetArrayLength; k++) {
                this.allmeetingArray1[j].meeting_array[k].Meeting = 'Meeting' + [k + 1];
                var app_date = this.allmeetingArray1[j].meeting_array[k].TCC_NEXT_CALL_DATE;
                var date = app_date.split('T');
                // console.log(date)
                this.allmeetingArray1[j].meeting_array[k].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy');
                this.today = new Date();
                // console.log(this.today)
                this.formattedDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');

                this.formattedDate1 = this.datePipe.transform(date[0], 'yyyy-MM-dd');

                // console.log(this.formattedDate1)
                this.formattedTime = this.datePipe.transform(this.today, 'HH:mma');

                // console.log(this.formattedTime)
                // console.log(this.formattedDate);
                // console.log(this.formattedDate1);
                if (this.formattedDate1 < this.formattedDate) {
                  // console.log("red")
                  this.checkdata = true;
                  this.allmeetingArray1[j].meeting_array[k].ColorCode = 'rgba(244, 67, 54, 0.71)';
                } else if (this.formattedDate1 == this.formattedDate) {
                  // console.log("same date")
                  app_date = this.allmeetingArray1[j].meeting_array[k].TCC_NEXT_CALL_DATE;
                  // console.log(this.allmeetingArray1[j].meeting_array[k].TCC_NEXT_CALL_DATE)
                  // console.log(app_date)
                  var el = new Date();
                  var parts = app_date.split('T');
                  var parts2 = parts[1];
                  var parts3 = parts2.split(':');
                  // console.log(parts3)
                  var sHours = parts3[0];
                  var sMinutes = parts3[1];
                  el.setHours(sHours);
                  el.setMinutes(sMinutes);
                  el.setSeconds(0);
                  // console.log(el);
                  var milliseconds = el.getTime();
                  // console.log(milliseconds)
                  var milliseconds1 = new Date().getTime();
                  // console.log(milliseconds1)
                  var appDatePlusThirtyMin = el.setMinutes(el.getMinutes() + 30);
                  // console.log(appDatePlusThirtyMin);
                  if (milliseconds < milliseconds1) {
                    if (milliseconds1 < appDatePlusThirtyMin) {
                      // console.log("yellow")
                      this.allmeetingArray1[j].meeting_array[k].ColorCode = '#FFC107';
                    } else {
                      this.checkdata = true;
                      // console.log("no color")
                      this.allmeetingArray1[j].meeting_array[k].ColorCode = 'rgba(244, 67, 54, 0.71)';
                    }
                  } else {
                    // console.log("future time")
                    this.checkdata = false;
                    this.allmeetingArray1[j].meeting_array[k].ColorCode = 'rgb(57, 226, 64)';
                  }
                } else {
                  // console.log("green")
                  this.checkdata = false;
                  this.allmeetingArray1[j].meeting_array[k].ColorCode = 'rgb(57, 226, 64)';
                }
              }
            }
          }, error => {

            console.log("" + JSON.stringify(error));
          });

        }
      } else {
        // this.fromdate = $filter('date')(fromdate, "yyyy-MM-dd");
        // this.todate = $filter('date')(todate, "yyyy-MM-dd");
        this.fromdate = fromdate
        this.todate = todate
        obj = undefined;

        // console.log(obj);
        if (obj == undefined) {
          // console.log("undefined value")

          obj = '';
        } else {
          $('#alluserTable').hide();
          $('#tableCard').hide();
          $('#tableByUser').show();
          $('#oneUserAlert').hide();
          $('#alluserTablebyDate').hide();
          this.user_id = obj.TUM_USER_ID;
          this.meetingArray = [];
          var dataJSONtmp1 = { fromdate: this.fromdate, todate: this.todate, user_id: this.user_id }
          this.token = window.localStorage['token'];

          var tokenJSON = { access_token: this.token, userid: window.localStorage['TUM_USER_ID'], 'usertoken': window.localStorage['usertoken'] };
          var getappbydateJSON = Object.assign(dataJSONtmp1, tokenJSON);
          const header = new Headers();
          header.append("Content-Type", "application/json");
          let options = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'get_AllappointmentsbyuserDate/', getappbydateJSON, {
            headers: options,
          }).subscribe(resp => {
            this.allappointments = resp;
            // console.log(this.allappointments)
            if (this.allappointments.length != 0) {
              this.meetingArray.push({
                User: obj.TUM_USER_CODE
              })

              for (var i = 0; i < this.allappointments.length; i++) {
                var app_date = this.allappointments[i].TCC_NEXT_CALL_DATE;
                var datetime = app_date.split('T');
                var date = this.datePipe.transform(datetime[0], 'dd/MM/yyyy');

                this.today = new Date();
                // console.log(this.today)
                this.formattedDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
                this.formattedDate1 = this.datePipe.transform(datetime[0], 'yyyy-MM-dd');
                this.formattedTime = this.datePipe.transform(this.today, 'HH:mma');

                if (this.formattedDate1 < this.formattedDate) {
                  // console.log("red")
                  this.meetingArray.push({ 'Meeting': 'Meeting' + [i + 1], 'Company': this.allappointments[i].BRANCH_CODE, 'MeetingDate': date, 'MeetingDateTime': this.allappointments[i].TCC_NEXT_CALL_DATE, 'ColorCode': 'rgba(244, 67, 54, 0.71)' });
                } else if (this.formattedDate1 == this.formattedDate) {
                  // console.log("same date")
                  app_date = this.allappointments[i].TCC_NEXT_CALL_DATE;
                  // console.log(this.allappointments[i].TCC_NEXT_CALL_DATE)
                  // console.log(app_date)
                  var el = new Date();
                  var parts = app_date.split('T');
                  var parts2 = parts[1];
                  var parts3 = parts2.split(':');
                  // console.log(parts3)
                  var sHours = parts3[0];
                  var sMinutes = parts3[1];
                  el.setHours(sHours);
                  el.setMinutes(sMinutes);
                  el.setSeconds(0);
                  // console.log(el);
                  var milliseconds = el.getTime();
                  // console.log(milliseconds)
                  var milliseconds1 = new Date().getTime();
                  // console.log(milliseconds1)
                  var appDatePlusThirtyMin = el.setMinutes(el.getMinutes() + 30);
                  // console.log(appDatePlusThirtyMin);
                  if (milliseconds < milliseconds1) {
                    if (milliseconds1 < appDatePlusThirtyMin) {
                      // console.log("yellow")
                      this.meetingArray.push({ 'Meeting': 'Meeting' + [i + 1], 'Company': this.allappointments[i].BRANCH_CODE, 'MeetingDate': date, 'MeetingDateTime': this.allappointments[i].TCC_NEXT_CALL_DATE, 'ColorCode': '#FFC107' });
                    } else {
                      // console.log("no color")
                      this.meetingArray.push({ 'Meeting': 'Meeting' + [i + 1], 'Company': this.allappointments[i].BRANCH_CODE, 'MeetingDate': date, 'MeetingDateTime': this.allappointments[i].TCC_NEXT_CALL_DATE, 'ColorCode': 'rgba(244, 67, 54, 0.71)' });
                    }
                  } else {
                    // console.log("future time")
                    this.meetingArray.push({ 'Meeting': 'Meeting' + [i + 1], 'Company': this.allappointments[i].BRANCH_CODE, 'MeetingDate': date, 'MeetingDateTime': this.allappointments[i].TCC_NEXT_CALL_DATE, 'ColorCode': 'rgb(57, 226, 64)' });
                  }
                } else {
                  // console.log("green")
                  this.meetingArray.push({ 'Meeting': 'Meeting' + [i + 1], 'Company': this.allappointments[i].BRANCH_CODE, 'MeetingDate': date, 'MeetingDateTime': this.allappointments[i].TCC_NEXT_CALL_DATE, 'ColorCode': 'rgb(57, 226, 64)' });
                }
              }
              // console.log(this.meetingArray)
              $('#tableByUser').show();
              $('#oneUserAlert').show();
            } else {
              //console.log("No Record")
              $('#tableByUser').hide();
              $('#oneUserAlert').show();
            }
          }, error => {

            alert("" + JSON.stringify(error));
          });

        }
      }
    }
  }
  getIndexIfObjWithOwnAttr(array, attr, value) {

    var initial_array = [];
    for (var i = 0; i < array.length; i++) {

      if (array[i][attr] == value) {
        initial_array.push(i);
        return i;
        // console.log(i)
      }
    }
    if (initial_array.length > 0) {
      return initial_array;
      console.log("hello")
    } else {
      return -1;
      console.log("-1")
    }

    console.log(initial_array)
  }
  getAllMeeting(branchid) {

    this.meetingCount = [];

    var dataobj = { BRANCHID: parseInt(branchid) }
    this.token = window.localStorage['token'];

    var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };

    var getappJSON = Object.assign(dataobj, tokenJSON);
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'get_Allappointments', getappJSON, {
      headers: options,
    }).subscribe(resp => {

      this.allMeetings = resp;
      this.allUsername = [];
      this.allmeetingArray = [];
      for (var i = 0; i < this.allMeetings.length; i++) {
        // this.allMeetings[i].Meeting="Meeting"+[i+1];
        var objvalue = {
          'Current_Caller': this.allMeetings[i].Current_Caller,
          'meeting_array': [this.allMeetings[i]]
        };
        var index = this.getIndexIfObjWithOwnAttr(this.allmeetingArray, 'Current_Caller', this.allMeetings[i].Current_Caller);
        if (index == -1) {
          this.allmeetingArray.push(objvalue);
        } else {
          this.allmeetingArray[index.toString()].meeting_array.push(this.allMeetings[i]);
        }
        //  this.allmeetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allMeetings[i].BRANCH_DESC,'MeetingDate':this.allMeetings[i].TCC_NEXT_CALL_DATE});
      }
      var max = 0;
      for (var j = 0; j < this.allmeetingArray.length; j++) {
        this.meetArrayLength = this.allmeetingArray[j].meeting_array.length;
        if (this.meetArrayLength >= max) {
          max = this.meetArrayLength;
          this.maxArray = this.allmeetingArray[j].meeting_array;
        }
        for (var k = 0; k < this.meetArrayLength; k++) {
          this.allmeetingArray[j].meeting_array[k].Meeting = 'Meeting' + [k + 1];
          var app_date = this.allmeetingArray[j].meeting_array[k].TCC_NEXT_CALL_DATE;
          var date = app_date.split('T');
          // //console.log(date)
          this.allmeetingArray[j].meeting_array[k].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy');

          this.today = new Date();
          // //console.log(this.today)
          this.formattedDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');

          this.formattedDate1 = this.datePipe.transform(date[0], 'yyyy-MM-dd');
          this.formattedTime = this.datePipe.transform(this.today, 'HH:mma');

          if (this.formattedDate1 < this.formattedDate) {
            // //console.log("red")
            this.allmeetingArray[j].meeting_array[k].ColorCode = 'rgba(244, 67, 54, 0.71)';
          } else if (this.formattedDate1 == this.formattedDate) {
            // //console.log("same date")
            app_date = this.allmeetingArray[j].meeting_array[k].TCC_NEXT_CALL_DATE;
            // //console.log(this.allmeetingArray[j].meeting_array[k].TCC_NEXT_CALL_DATE)
            // //console.log(app_date)
            var el = new Date();
            var parts = app_date.split('T');
            var parts2 = parts[1];
            var parts3 = parts2.split(':');
            // //console.log(parts3)
            var sHours = parts3[0];
            var sMinutes = parts3[1];
            el.setHours(sHours);
            el.setMinutes(sMinutes);
            el.setSeconds(0);
            // //console.log(el);
            var milliseconds = el.getTime();
            // console.log(milliseconds)
            var milliseconds1 = new Date().getTime();
            // console.log(milliseconds1)
            var appDatePlusThirtyMin = el.setMinutes(el.getMinutes() + 30);
            // console.log(appDatePlusThirtyMin);
            if (milliseconds < milliseconds1) {
              if (milliseconds1 < appDatePlusThirtyMin) {
                // console.log("yellow")
                this.allmeetingArray[j].meeting_array[k].ColorCode = '#FFC107';
              } else {
                // console.log("no color")
                this.allmeetingArray[j].meeting_array[k].ColorCode = 'rgba(244, 67, 54, 0.71)';
              }
            } else {
              // console.log("future time")
              this.allmeetingArray[j].meeting_array[k].ColorCode = 'rgb(57, 226, 64)';
            }
          } else {
            // console.log("green")
            this.allmeetingArray[j].meeting_array[k].ColorCode = 'rgb(57, 226, 64)';
          }
        }
      }

      // console.log(this.meetingCount)
      //console.log(this.allmeetingArray);

    }, error => {

      alert("" + JSON.stringify(error));
    });

    this.getIndexIfObjWithOwnAttr = function (array, attr, value) {
      var initial_array = [];
      for (var i = 0; i < array.length; i++) {
        if (array[i][attr] == value) {
          initial_array.push(i);
          return i;
          // //console.log(i)
        }
      }
      if (initial_array.length > 0) {
        return initial_array;
        //console.log("hello")
      } else {
        return -1;
        //console.log("-1")
      }
      //console.log(initial_array)
    };
  }
  showMeetingDeatils(data) {

    console.log(data);
    this.CUSTOMER_ID = data.CUST_LEAD_ID;
    this.customer_id = data.CUST_LEAD_ID;
    this.customer_name = data.CUSTOMER_NAME;
    // this.customer_ref='';
    this.call_id = data.CALL_ID;
    this.product = data.TCC_CAMPAIGN_ID;
    this.product_desc = data.TCM_PRODUCT_DESC;
    this.campaign = data.TCC_CAMPAIGN_ID;
    this.campaign_desc = data.TCM_CAMPAIGN_SHORTDESC;
    // this.travel_type=''';
    // this.travel_cost=NULL;
    this.remarks = data.Remarks;
    this.status = data.LEADSTATUS;

    // this.ipaddress=NULL;
    this.branch_id = data.BRANCH_ID;
    this.documents = [];
    var dataobj = {
      Custid: parseInt(this.customer_id),

    }
    this.token = window.localStorage['token'];

    var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };

    var getExpenseJSON = Object.assign(dataobj, tokenJSON);
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getAllExpenseDetail/', getExpenseJSON, {
      headers: options,
    }).subscribe(resp => {

      this.allExpense = resp;
      console.log(this.allExpense);
      // for (var i = 0; i < this.allExpense.length; i++) {
      //   this.allExpense[i].expense_id= expense_id;
      //   this.allExpense[i].expense_cost= expense_cost;
      //   this.allExpense[i].remarks= remarks;
      // }
      for (var i = 0; i < this.allExpense.length; i++) {
        console.log(this.allExpense[i].expense_id)
        this.expense_id1 = this.allExpense[i].expense_id;
        var dataobj = { expense_id: this.expense_id1 }
        var getExpensedocJSON = Object.assign(dataobj, tokenJSON);
        const header = new Headers();
        header.append("Content-Type", "application/json");
        let options = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getExpenseDoc/', getExpensedocJSON, {
          headers: options,
        }).subscribe(resp => {

          this.documentarray = resp;
          console.log(resp)
          for (var j = 0; j < this.documentarray.length; j++) {
            this.documents.push(this.documentarray[j]);
            console.log(this.documents);
          }


        }, error => {


        });


      }



    }, error => {


    });


    this.lastcalldate = data.CreatedOn1.split('T');
    this.lastcall = this.datePipe.transform(this.lastcalldate[0], 'dd/MM/yyyy');
    this.nextcalldate = data.TCC_NEXT_CALL_DATE.split('T');
    this.nextcall = this.datePipe.transform(this.nextcalldate[0], 'dd/MM/yyyy');
    console.log(data.TCC_LOCATION_TO_MEET);
    if (data.TCC_LOCATION_TO_MEET != null) {


      var self = this;
      var lanlong1 = data.TCC_LOCATION_TO_MEET.split(",");
      console.log(parseFloat(lanlong1[0]));
      // //console.log(lanlong1);
      // var geocoder = new google.maps.Geocoder();
      // this.latlngvals = new google.maps.LatLng(parseFloat(lanlong1[0]), parseFloat(lanlong1[1]));
      // console.log(this.latlngvals)
      // this.nativeGeocoder.reverseGeocode(parseFloat(lanlong1[0]), parseFloat(lanlong1[1]), this.geoencoderOptions).then((result) => {
      //  console.log(result)
      // this.formattedadd = this.generateAddress(result[0]);
      //this.formattedadd = data.MeetingAddress;
      console.log(data.MeetingAddress)
      if (data.MeetingAddress == undefined || data.MeetingAddress == "undefined" || data.MeetingAddress == "null" || data.MeetingAddress == null) {
        this.formattedadd = 'No Address found';
      } else {
        this.formattedadd = data.MeetingAddress;
      }
      if (data.MOBILE == undefined || data.MOBILE == "undefined" || data.MOBILE == "null" || data.MOBILE == null) {
        this.mobile = '-';
      } else {
        this.mobile = data.MOBILE;
      }
      if (data.OFFPHONE == undefined || data.OFFPHONE == "undefined" || data.OFFPHONE == "null" || data.OFFPHONE == null) {
        this.offphone = '-';
      } else {
        this.offphone = data.OFFPHONE;
      }
      if (data.RESPHONE == undefined || data.RESPHONE == "undefined" || data.RESPHONE == "null" || data.OFFPHONE == null) {
        this.RESPHONE = '-';
      } else {
        this.RESPHONE = data.RESPHONE;
      }

      // });
      // var alertPopup;



      self.presentAlert('Expense Info', data.CustFullName, data.TCC_CUSTOMER_ID, data.MOBILE, this.offphone, this.RESPHONE, data.Current_Caller, this.lastcall, this.nextcall, data.PriorityText, data.Ratingtext, data.Campaign, data.Remarks, this.formattedadd, this.CUSTOMER_ID, this.checkdata);

    }



  }
  async presentAlert(heading, CustFullName, TCC_CUSTOMER_ID, MOBILE, offphone, RESPHONE, Current_Caller, lastcall, nextcall, PriorityText, Ratingtext, Campaign, Remarks, formattedadd, Customer_ID, checkdata) {
    var alert = await this.alertController.create({
      header: heading,
      backdropDismiss:false,
      message: '<div><table style="width: 100%;text-align: left;font-size:15px"><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Customer Name</td><td>' + CustFullName + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Customer Id</td><td>' + TCC_CUSTOMER_ID + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Contact Number</td><td>' + MOBILE + ' | ' + offphone + ' | ' + RESPHONE + '</td></tr></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Current Caller</td><td>' + Current_Caller + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Last Call</td><td>' + lastcall + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Next Call</td><td>' + nextcall + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Priority</td><td>' + PriorityText + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Rating</td><td>' + Ratingtext + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Campaign</td><td>' + Campaign + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Remarks</td><td>' + Remarks + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Meeting Place</td><td>' + formattedadd + '</td></tr></table></div>',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Add',
          handler: () => {

            if (new Date(nextcall.split("-")[2] + "-" + nextcall.split("-")[1] + "-" + nextcall.split("-")[0]) > new Date()) {
              this.presentAlert1("", "For Future Meeting not allow to add expense details");
            }
            else {
              this.expensedetail(Customer_ID);
            }


          }
        }
      ]
    });

    await alert.present();
  }
  async expensedetail(Customer_ID) {

    var modal = await this.modalController.create({
      component: AddtravelexpensedetailsPage,
      componentProps: {
        Customer_ID: Customer_ID
      }
    });
    await modal.present();
  }
  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }
  ionViewDidLeave() {
    this.modalController.dismiss();
  }
  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
}

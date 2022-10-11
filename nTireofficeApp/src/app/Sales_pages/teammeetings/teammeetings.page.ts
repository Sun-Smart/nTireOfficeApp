/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-undef-init */
/* eslint-disable prefer-const */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable new-parens */
/* eslint-disable space-before-function-paren */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
declare var $: any;
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
declare var google: any;

@Component({
  selector: 'app-teammeetings',
  templateUrl: './teammeetings.page.html',
  styleUrls: ['./teammeetings.page.scss'],
})
export class TeammeetingsPage implements OnInit {
  branchlist: any;
  branchlist1 = [];
  user_id;
  token;
  allMeetings1;
  meetingArray = []

  allappointments;
  today;
  formattedDate;
  formattedDate1;
  formattedTime;
  fromdate;
  todate;
  allUsername1 = [];
  allmeetingArray1 = [];
  meetArrayLength = [];
  maxArray1 = [];
  meetingCount = [];
  allMeetings;
  allUsername = [];
  allmeetingArray = [];
  lastlocationmeet = [];
  loctoomeet = [];
  maxArray;
  lastcalldate;
  lastcall;
  nextcalldate;
  nextcall;
  formattedadd;
  destination;
  branchlocation;
  branchlatlng;
  orginiLocation;
  mobile;
  offphone;
  RESPHONE;
  StartAddress;
  DistanceTravel;
  branch;
  username: any;
  constructor(public alertController: AlertController, public modalController: ModalController, private datePipe: DatePipe, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.branch = "";
    this.Getbranches();
    this.getAllMeeting(window.localStorage['TUM_BRANCH_ID']);
    this.username = localStorage.getItem('TUM_USER_NAME');
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
  searchAppointment(val, branchid, fromdate, todate) {

    if (branchid == "") {
      this.presentAlert1('', 'Please Select Branch');
    }
    else if (fromdate == undefined) {
      this.presentAlert1('', 'Please Select From Date');
    }
    else if (todate == undefined) {
      this.presentAlert1('', 'Please Select To Date');
    }
    else {
      if ((val == '' || val == undefined) || (fromdate == '' || fromdate == undefined) || (todate == '' || todate == undefined) || (branchid == '' || branchid == undefined)) {

        if (val == '' || val == undefined) {

          $('#alluserTable').show();
          $('#tableByUser').hide();
          $('#oneUserAlert').hide();
          $('#alluserTablebyDate').hide();
          $('#tableCard').show();
          this.getAllMeeting(branchid);
          // alert('Please Enter User');
        } else {
          var obj1 = undefined;
          // console.log(obj1);
          if (obj1 == undefined) {
            alert("Inavlid User Type")

          } else {
            obj1 == undefined
            // console.log(obj);
            if (obj == undefined) {
              console.log("undefined value")
              alert("Invalid User")

              obj = '';
            } else {
              $('#alluserTable').hide();
              $('#tableCard').hide();
              this.user_id = obj.TUM_USER_ID;
              this.meetingArray = [];
              var dataJSONtmp = { user_id: this.user_id }
              this.token = window.localStorage['token'];

              var tokenJSON = { access_token: this.token, userid: window.localStorage['TUM_USER_ID'], 'usertoken': window.localStorage['usertoken'] };

              var getappbyuserJSON = Object.assign(dataJSONtmp, tokenJSON);
              const header = new Headers();
              header.append("Content-Type", "application/json");

              let options = new HttpHeaders().set('Content-Type', 'application/json');
              this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'pendleadsdatalength', getappbyuserJSON, {
                headers: options,
              }).subscribe(resp => {

                this.allappointments = resp;
                console.log(this.allappointments)
                if (this.allappointments.length != 0) {
                  this.meetingArray.push({
                    User: obj.TUM_USER_CODE
                  })

                  for (var i = 0; i < this.allappointments.length; i++) {

                    // var app_date=new Date(this.allappointments[i].TCC_NEXT_CALL_DATE);
                    var app_date = this.allappointments[i].TCC_NEXT_CALL_DATE;
                    var datetime = app_date.split('T');
                    var date = this.datePipe.transform(datetime[0], 'dd/MM/yyyy')

                    this.today = new Date();


                    this.formattedDate = this.datePipe.transform(this.today, 'yyyy-MM-dd')

                    this.formattedDate1 = this.datePipe.transform(datetime[0], 'yyyy-MM-dd')
                    this.formattedTime = this.datePipe.transform(this.today, 'HH:mma')


                    if (this.formattedDate1 < this.formattedDate) {

                      this.meetingArray.push(this.allappointments[i]);
                      this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                      this.allappointments[i].ColorCode = 'rgba(244, 67, 54, 0.71)';
                      var date1 = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');

                      this.allappointments[i].AppointmentDate = this.datePipe.transform(date1[0], 'dd/MM/yyyy')


                    } else if (this.formattedDate1 == this.formattedDate) {

                      // console.log("same date")
                      var app_date = this.allappointments[i].TCC_NEXT_CALL_DATE;
                      // console.log(this.allappointments[i].TCC_NEXT_CALL_DATE)
                      // console.log(app_date)

                      var el = new Date();
                      var parts = app_date.split('T');
                      var parts2 = parts[1];
                      var parts3 = parts2?.split(':');
                      // console.log(parts3)
                      // var sHours = parts3[0]
                      // var sMinutes = parts3[1]
                      var seconds = 0;

                      // el.setHours(sHours);
                      // el.setMinutes(sMinutes);
                      el.setSeconds(seconds);
                      // console.log(el);

                      var milliseconds = el.getTime();
                      // console.log(milliseconds)
                      var milliseconds1 = new Date().getTime();
                      // console.log(milliseconds1)
                      var appDatePlusThirtyMin = el.setMinutes(el.getMinutes() + 30);
                      // console.log(appDatePlusThirtyMin);
                      if (milliseconds < milliseconds1) {
                        if (milliseconds1 < appDatePlusThirtyMin) {
                          console.log("yellow")
                          //this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'#FFC107'});
                          this.meetingArray.push(this.allappointments[i]);
                          this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                          this.allappointments[i].ColorCode = '#FFC107';
                          var date2 = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                          this.allappointments[i].AppointmentDate = this.datePipe.transform(date2[0], 'dd/MM/yyyy')

                        } else {
                          // console.log("no color")
                          //this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'rgba(244, 67, 54, 0.71)'});
                          this.meetingArray.push(this.allappointments[i]);
                          this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                          this.allappointments[i].ColorCode = 'rgba(244, 67, 54, 0.71)';
                          var date3 = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                          this.allappointments[i].AppointmentDate = this.datePipe.transform(date3[0], 'dd/MM/yyyy')

                        }
                      } else {
                        // console.log("future time")
                        //this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'rgb(57, 226, 64)'});
                        this.meetingArray.push(this.allappointments[i]);
                        this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                        this.allappointments[i].ColorCode = 'rgb(57, 226, 64)';
                        var date4 = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                        this.allappointments[i].AppointmentDate = this.datePipe.transform(date4[0], 'dd/MM/yyyy')

                      }

                    } else {
                      // console.log("green")
                      //this.meetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allappointments[i].BRANCH_CODE,'MeetingDate':date,'MeetingDateTime':this.allappointments[i].TCC_NEXT_CALL_DATE,'ColorCode':'rgb(57, 226, 64)'});
                      this.meetingArray.push(this.allappointments[i]);
                      this.allappointments[i].Meeting = 'Meeting' + [i + 1];
                      this.allappointments[i].ColorCode = 'rgb(57, 226, 64)';
                      var date5 = this.allappointments[i].TCC_NEXT_CALL_DATE.split('T');
                      this.allappointments[i].AppointmentDate = this.datePipe.transform(date5[0], 'dd/MM/yyyy')

                    }


                  }
                  // console.log(this.meetingArray)
                  $('#tableByUser').show();
                  $('#oneUserAlert').show();

                } else {
                  console.log("No Record")
                  $('#tableByUser').hide();
                  $('#oneUserAlert').show();
                }


              }, error => {

                console.log("error : " + JSON.stringify(error));

              });

            }
          }

        }

        if (fromdate != undefined && todate != undefined && branchid != undefined) {
          this.fromdate = this.datePipe.transform(fromdate, 'yyyy-MM-dd')

          this.todate = this.datePipe.transform(todate, 'yyyy-MM-dd')

          console.log(this.fromdate);
          console.log(this.todate);
          $('#alluserTablebyDate').show();
          $('#alluserTable').hide();
          this.meetingArray = [];
          this.token = window.localStorage['token'];
          this.user_id = parseInt(window.localStorage['TUM_USER_ID']);
          var tokenJSON = { access_token: this.token, userid: this.user_id, 'usertoken': window.localStorage['usertoken'] };

          var dataJSONtmp2 = { fdate: this.fromdate, tdate: this.todate, BRANCHID: parseInt(branchid) }
          var getappbydateJSON6 = Object.assign(dataJSONtmp2, tokenJSON);
          const header = new Headers();
          header.append("Content-Type", "application/json");
          let options = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'get_AllappointmentsbyDate', getappbydateJSON6, {
            headers: options,
          }).subscribe(resp => {
            console.log(resp)
            this.allMeetings1 = resp;
            this.allUsername1 = [];
            this.allmeetingArray1 = [];
            for (var i = 0; i < this.allMeetings1.length; i++) {
              //this.allMeetings[i].Meeting="Meeting"+[i+1];
              var objvalue = {
                'Current_Caller': this.allMeetings1[i].Current_Caller,
                'meeting_array': [this.allMeetings1[i]]

              }
              var index1 = this.getIndexIfObjWithOwnAttr(this.allmeetingArray1, 'Current_Caller', this.allMeetings1[i].Current_Caller);
              if (index1 == -1) {
                this.allmeetingArray1.push(objvalue);
              } else {

                this.allmeetingArray1[index1.toString()].meeting_array.push(this.allMeetings1[i])
              }
              // this.allmeetingArray1.push({'Meeting':'Meeting'+[i+1],'Company':this.allMeetings1[i].BRANCH_DESC,'MeetingDate':this.allMeetings1[i].TCC_NEXT_CALL_DATE});

            }

            console.log(this.allmeetingArray1);

            var max = 0;

            for (var j = 0; j < this.allmeetingArray1.length; j++) {
              // console.log(this.allmeetingArray[j].meeting_array.length)
              this.meetArrayLength = this.allmeetingArray1[j].meeting_array.length;
              //this.meetingCount.push(this.allmeetingArray[i].meeting_array);

              if (this.allmeetingArray1[j].meeting_array.length >= max) {
                max = this.allmeetingArray1[j].meeting_array.length;
                // console.log(max)
                this.maxArray1 = this.allmeetingArray1[j].meeting_array;
                console.log(this.maxArray1)
              }
              for (var k = 0; k < this.allmeetingArray1[j].meeting_array.length; k++) {
                this.allmeetingArray1[j].meeting_array[k].Meeting = 'Meeting' + [k + 1];
                var app_date = this.allmeetingArray1[j].meeting_array[k].TCC_NEXT_CALL_DATE;
                var date = app_date.split('T');
                // console.log(date)
                this.allmeetingArray[j].meeting_array[k].AppointmentTime = this.formatTime(this.allmeetingArray[j].meeting_array[k].TCC_NEXT_CALL_DATE);
                this.allmeetingArray1[j].meeting_array[k].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy')


                this.today = new Date();
                // console.log(this.today)
                this.formattedDate = this.datePipe.transform(this.today, 'yyyy-MM-dd')
                this.formattedDate1 = this.datePipe.transform(date[0], 'yyyy-MM-dd')
                this.formattedTime = this.datePipe.transform(this.today, 'HH:mma')

                // console.log(this.formattedTime)
                // console.log(this.formattedDate);
                // console.log(this.formattedDate1);
                if (this.formattedDate1 < this.formattedDate) {
                  // console.log("red")
                  this.allmeetingArray1[j].meeting_array[k].ColorCode = 'rgba(244, 67, 54, 0.71)';

                } else if (this.formattedDate1 == this.formattedDate) {
                  // console.log("same date")
                  var app_date = this.allmeetingArray1[j].meeting_array[k].TCC_NEXT_CALL_DATE;
                  // console.log(this.allmeetingArray1[j].meeting_array[k].TCC_NEXT_CALL_DATE)
                  // console.log(app_date)

                  var el = new Date();
                  var parts = app_date.split('T');
                  var parts2 = parts[1];
                  var parts3 = parts2?.split(':');
                  // console.log(parts3)
                  // var sHours = parts3[0]
                  // var sMinutes = parts3[1]

                  // el.setHours(sHours);
                  // el.setMinutes(sMinutes);
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
                      // console.log("no color")
                      this.allmeetingArray1[j].meeting_array[k].ColorCode = 'rgba(244, 67, 54, 0.71)';
                    }
                  } else {
                    // console.log("future time")
                    this.allmeetingArray1[j].meeting_array[k].ColorCode = 'rgb(57, 226, 64)';

                  }

                } else {
                  // console.log("green")
                  this.allmeetingArray1[j].meeting_array[k].ColorCode = 'rgb(57, 226, 64)';
                }
              }
            }
          }, error => {

            alert("" + JSON.stringify(error));
          });

        }

      } else {

        this.fromdate = this.datePipe.transform(fromdate, 'yyyy-MM-dd')

        this.todate = this.datePipe.transform(todate, 'yyyy-MM-dd')


        var obj1 = undefined;
        // console.log(obj1);
        if (obj1 == undefined) {
          alert("Inavlid User Type")

        } else {
          var obj = undefined;
          // console.log(obj);
          if (obj == undefined) {
            // console.log("undefined value")
            alert("Invalid User")

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
            var tokenJSON = { access_token: this.token, userid: window.localStorage['TUM_USER_ID'], 'usertoken': window.localStorage['usertoken'] };

            var getappbydateJSON4 = Object.assign(dataJSONtmp1, tokenJSON);
            const header = new Headers();
            header.append("Content-Type", "application/json");
            let options = new HttpHeaders().set('Content-Type', 'application/json');
            this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'get_AllappointmentsbyuserDate/', getappbydateJSON4, {
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
                  var date = this.datePipe.transform(datetime[0], 'dd/MM/yyyy')

                  this.today = new Date();
                  // console.log(this.today)
                  this.formattedDate = this.datePipe.transform(this.today, 'yyyy-MM-dd')

                  this.formattedDate1 = this.datePipe.transform(datetime[0], 'yyyy-MM-dd')

                  this.formattedTime = this.datePipe.transform(this.today, 'HH:mma')

                  if (this.formattedDate1 < this.formattedDate) {
                    // console.log("red")
                    this.meetingArray.push({ 'Meeting': 'Meeting' + [i + 1], 'Company': this.allappointments[i].BRANCH_CODE, 'MeetingDate': date, 'MeetingDateTime': this.allappointments[i].TCC_NEXT_CALL_DATE, 'ColorCode': 'rgba(244, 67, 54, 0.71)' });

                  } else if (this.formattedDate1 == this.formattedDate) {

                    // console.log("same date")
                    var app_date = this.allappointments[i].TCC_NEXT_CALL_DATE;
                    // console.log(this.allappointments[i].TCC_NEXT_CALL_DATE)
                    // console.log(app_date)

                    var el = new Date();
                    var parts = app_date.split('T');
                    var parts2 = parts[1];
                    var parts3 = parts2?.split(':');
                    // console.log(parts3)
                    // var sHours = parts3[0]
                    // var sMinutes = parts3[1]

                    // el.setHours(sHours);
                    // el.setMinutes(sMinutes);
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
                console.log("No Record")
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
    this.token = window.localStorage['token'];
    var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };
    var dataobj = { BRANCHID: parseInt(branchid) }
    var getappJSON = Object.assign(dataobj, tokenJSON);
    console.log(getappJSON)
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'get_Allappointments', getappJSON, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)


      this.allMeetings = JSON.stringify(resp);
      this.allMeetings = JSON.parse(this.allMeetings);
      this.allUsername = [];
      this.allmeetingArray = [];
      this.lastlocationmeet = [];
      for (var i = 0; i < this.allMeetings.length; i++) {
        console.log(this.allMeetings[i]);

        this.lastlocationmeet.push(this.allMeetings[i].TCC_LOCATION_TO_MEET);
        console.log(this.lastlocationmeet);
        this.loctoomeet = this.lastlocationmeet;

        //this.allMeetings[i].Meeting="Meeting"+[i+1];
        var objvalue = {
          'Current_Caller': this.allMeetings[i].Current_Caller,
          'meeting_array': [this.allMeetings[i]]

        }
        var index = this.getIndexIfObjWithOwnAttr(this.allmeetingArray, 'Current_Caller', this.allMeetings[i].Current_Caller);
        if (index == -1) {
          this.allmeetingArray.push(objvalue);
        } else {

          this.allmeetingArray[index.toString()].meeting_array.push(this.allMeetings[i])
        }
        // 	this.allmeetingArray.push({'Meeting':'Meeting'+[i+1],'Company':this.allMeetings[i].BRANCH_DESC,'MeetingDate':this.allMeetings[i].TCC_NEXT_CALL_DATE});

      }

      var max;
      for (var j = 0; j < this.allmeetingArray.length; j++) {
        this.meetArrayLength = this.allmeetingArray[j].meeting_array.length;
        max = 0;
        if (this.meetArrayLength >= max) {
          max = this.meetArrayLength;
          this.maxArray = this.allmeetingArray[j].meeting_array;
        }
        for (var k = 0; k < this.allmeetingArray[j].meeting_array.length; k++) {
          this.allmeetingArray[j].meeting_array[k].Meeting = 'Meeting' + [k + 1];
          var app_date = this.allmeetingArray[j].meeting_array[k].TCC_NEXT_CALL_DATE;
          var date = app_date.split('T');
          // console.log(date)
          this.allmeetingArray[j].meeting_array[k].AppointmentTime = this.formatTime(this.allmeetingArray[j].meeting_array[k].TCC_NEXT_CALL_DATE);
          this.allmeetingArray[j].meeting_array[k].AppointmentDate = this.datePipe.transform(date[0], 'dd/MM/yyyy')


          this.today = new Date();
          // console.log(this.today)
          this.formattedDate = this.datePipe.transform(this.today, 'yyyy-MM-dd')

          this.formattedDate1 = this.datePipe.transform(date[0], 'yyyy-MM-dd')

          // console.log(this.formattedDate1)
          this.formattedTime = this.datePipe.transform(this.today, 'yyyy-MM-dd')
          if (this.formattedDate1 < this.formattedDate) {
            //("formattedDate1 :"+this.formattedDate1+"formattedDate : "+this.formattedDate);

            // console.log("red")
            this.allmeetingArray[j].meeting_array[k].ColorCode = 'rgba(244, 67, 54, 0.71)';

          } else if (this.formattedDate1 == this.formattedDate) {
            // console.log("same date")
            var app_date = this.allmeetingArray[j].meeting_array[k].TCC_NEXT_CALL_DATE;
            var start_Time = this.allmeetingArray[j].meeting_array[k].START_TIME;
            // console.log(this.allmeetingArray[j].meeting_array[k].TCC_NEXT_CALL_DATE)
            // console.log(app_date)

            var el = new Date();
            var parts = app_date.split('T');
            var parts2 = parts[1];
            var parts3 = parts2?.split(':');
            // console.log(parts3)
            // var sHours = parts3[0]
            // var sMinutes = parts3[1]

            // el.setHours(sHours);
            // el.setMinutes(sMinutes);
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
                if (start_Time != '' || start_Time != undefined) {

                  this.allmeetingArray[j].meeting_array[k].ColorCode = '#BB8FCE';
                } else {
                  // console.log("yellow")
                  this.allmeetingArray[j].meeting_array[k].ColorCode = '#FFC107';
                }
              } else {
                // console.log("no color")
                this.allmeetingArray[j].meeting_array[k].ColorCode = 'rgba(244, 67, 54, 0.71)';
              }
            } else {
              // console.log("future time")
              this.allmeetingArray[j].meeting_array[k].ColorCode = 'rgb(57, 226, 64)';

            }

          } else {

            this.allmeetingArray[j].meeting_array[k].ColorCode = 'rgb(57, 226, 64)';
          }



        }
      }

      // console.log(this.meetingCount)
      console.log(this.allmeetingArray);
    }, error => {

      alert("" + JSON.stringify(error));
    });


    this.getIndexIfObjWithOwnAttr = function (array, attr, value) {

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
  }
  showMeetingDeatils(data, index) {



    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var waypts = new Array();

    this.destination = data.TCC_LOCATION_TO_MEET;
    // if(this.destination == data.)
    this.branchlocation = window.localStorage['BRANCH_LATLONG'];
    //this.branchlocation='13.0500,80.2121';
    if (this.branchlocation) {
      this.branchlatlng = this.branchlocation.split(',');
      var branchlatlng_obj = { lat: parseFloat(this.branchlatlng[0]), lng: parseFloat(this.branchlatlng[1]) };
      console.log(branchlatlng_obj);
    }
    // if (data.Meeting == 'Meeting1') {
    console.log('yes');
    this.orginiLocation = this.branchlocation;
    // }
    console.log(this.branchlocation);
    console.log(waypts);

    var self;
    self = this;
    var distance;
    var lastcall;
    var nextcall;
    var nexttime;
    // return new Promise((resolve, reject) => {
    this.lastcalldate = data.CreatedOn1.split('T');
    lastcall = this.datePipe.transform(this.lastcalldate[0], 'dd/MM/yyyy');

    this.nextcalldate = new Date(data.TCC_NEXT_CALL_DATE);
    //var date1 = ;
    var meetDate = ('0' + this.nextcalldate.getDate()).slice(-2) + '/' + ('0' + (this.nextcalldate.getMonth() + 1)).slice(-2) + '/' + this.nextcalldate.getFullYear();
    var parts = data.TCC_NEXT_CALL_DATE.split('T');
    var parts2 = parts[1];
    var parts3 = parts2?.split(':') || [];
    // var date = new Date(0, 0, 0, parts3[0], parts3[1], 0);
    var date = new Date();
    var meetTime = this.datePipe.transform(date, 'hh:mm a');
    nextcall = meetDate + ' ' + meetTime;
    console.log(nextcall);
    //nextcall = this.datePipe.transform(this.nextcalldate, 'dd/MM/yyyy hh:mm a');


    if (this.destination != null) {
      directionsService.route({
        // origin: $rootScope.Sales_currentLoc,
        origin: this.orginiLocation,
        destination: this.destination,
        waypoints: waypts,
        // optimizeWaypoints: true,
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.DirectionsTravelMode.DRIVING

      }, function (response, status) {
        console.log(response);
        var disCount = 0;
        this.routes = response.routes[0].legs;
        console.log(this.routes);

        distance = this.routes[0].distance.text;
        if (data.MOBILE == null) {
          this.mobile = '-';
        } else {
          this.mobile = data.MOBILE;
        }

        if (data.OFFPHONE == "null") {
          this.offphone = '-';
        } else {
          this.offphone = data.OFFPHONE;
        }

        if (data.RESPHONE == "null") {
          this.RESPHONE = '-';
        } else {
          this.RESPHONE = data.RESPHONE;
        }

        if ((data.Meeting_address == null) || (data.Meeting_address == '') || (data.Meeting_address == undefined)) {
          this.formattedadd = "No Address";
        } else {
          this.formattedadd = data.Meeting_address;
        }
        this.StartAddress = this.routes[0].start_address;
        self.presentAlert('Meeting Details', data.CustFullName, data.TCC_CUSTOMER_ID, this.mobile, this.offphone, this.RESPHONE, data.Current_Caller, lastcall, nextcall, data.PriorityText, data.Ratingtext, data.Campaign, data.Remarks, this.StartAddress, this.formattedadd, distance);

      });

    }
    else {
      if (data.MOBILE == null) {
        this.mobile = '-';
      } else {
        this.mobile = data.MOBILE;
      }

      if (data.OFFPHONE == "null") {
        this.offphone = '-';
      } else {
        this.offphone = data.OFFPHONE;
      }

      if (data.RESPHONE == "null") {
        this.RESPHONE = '-';
      } else {
        this.RESPHONE = data.RESPHONE;
      }

      if ((data.Meeting_address == null) || (data.Meeting_address == '') || (data.Meeting_address == undefined)) {
        this.formattedadd = "No Address";
      } else {
        this.formattedadd = data.Meeting_address;
      }
      this.StartAddress = "-";
      self.presentAlert('Meeting Details', data.CustFullName, data.TCC_CUSTOMER_ID, this.mobile, this.offphone, this.RESPHONE, data.Current_Caller, lastcall, nextcall, data.PriorityText, data.Ratingtext, data.Campaign, data.Remarks, this.StartAddress, this.formattedadd, distance);

    }

  }
  async presentAlert(heading, CustFullName, TCC_CUSTOMER_ID, MOBILE, offphone, RESPHONE, Current_Caller, lastcall, nextcall, PriorityText, Ratingtext, Campaign, Remarks, StartAddress, formattedadd, DistanceTravel) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'teammeeting',
      message: '<div><table style="width: 100%;text-align: left;font-size:15px"><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Customer Name</td><td>' + CustFullName + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Customer Id</td><td>' + TCC_CUSTOMER_ID + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Contact Number</td><td>' + MOBILE + ' | ' + offphone + ' | ' + RESPHONE + '</td></tr></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Current Caller</td><td>' + Current_Caller + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Last Call</td><td>' + lastcall + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Next Call</td><td>' + nextcall + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Priority</td><td>' + PriorityText + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Rating</td><td>' + Ratingtext + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Campaign</td><td>' + Campaign + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Remarks</td><td>' + Remarks + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Start Place</td><td>' + StartAddress + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Meeting Place</td><td>' + formattedadd + '</td></tr><tr><td style="padding-top: 5px;padding-bottom: 5px;font-weight: bold;color: #fff;width: 125px;">Distance</td><td>' + DistanceTravel + '</td></tr></table></div>',
      buttons: ['Cancel']
    });

    await alert.present();
  }
  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  formatTime(time) {
    if (time) {
      var parts = time.split('T');
      var parts2 = parts[1];
      var parts3 = parts2?.split(':') || [];
    }
    var date = new Date();

    return this.datePipe.transform(date, 'hh:mm a');

  };
}

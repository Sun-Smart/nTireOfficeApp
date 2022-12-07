/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { DatePipe } from '@angular/common';
declare var $;
import { Router, ActivatedRoute } from '@angular/router';
import { ToastmessageService } from '../../service/toastmessage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-od-request',
  templateUrl: './od-request.page.html',
  styleUrls: ['./od-request.page.scss'],
})
export class OdRequestPage implements OnInit {
  odFrom;
  odTo;
  travelstatus;
  statusstatus;
  advancestatus;
  fromdateval;
  todateval;
  fromhour;
  tohour;
  company;
  todayDate;
  ODServicename;
  currentstatus;
  reqref;
  FUNCTION_ID;
  token;
  userID;
  time;
  usertoken;
  ODRefshow: boolean;
  ODshow: boolean;
  todate;
  fromPlace;
  toPlace;
  tavelDate;
  travelComment;
  travelamount;
  travelmode;
  AllTravelData = [];
  urldata;
  odrequest;
  branch;
  name;
  contact;
  empCode;
  currencylist1;
  currencylist = [];
  advanceCurrency;
  TavelmodeType1;
  TavelmodeType1_res;
  TavelmodeType = [];
  from;
  to;
  travelReq;
  release;
  advance;
  fromHour;
  toHour;
  reason;
  nod;
  empID;
  reqID1;
  Repayment;
  monthlyDeduction;
  installment;
  advanceAmount;
  reqID;
  workflowTable;
  reqtype;
  taveltext;
  alldata;
  editfromPlace;
  edittoPlace;
  edittavelDate;
  edittravelComment;
  edittravelamount;
  edittravelmode;
  editfield: boolean;
  disabledvalue;
  dat_valid: { currentDate: Date; };
  travelid: any;
  odrequest1 = [];
  Txnreference;
  odrequest2 = [];
  reqdate;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private alertController: AlertController, private router: Router, private toastmessageService: ToastmessageService, private route: ActivatedRoute, public HttpRequest: HttprequestService, public HttpRequest1: HttprequestService, public Ipaddressservice: IpaddressService, private datepipe: DatePipe) {
    this.reqref = undefined;

    this.FUNCTION_ID = window.localStorage['FUNCTION_ID'];
    this.token = window.localStorage['token'];
    this.userID = window.localStorage['TUM_USER_ID'];
    this.usertoken = window.localStorage['TUM_USER_ID'];
    this.name = window.localStorage['TUM_USER_NAME'];
    this.empCode = window.localStorage['TUM_EMP_CODE'];
    // console.log(this.coff.name);
    // this.validate = validate;
    this.company = window.localStorage['FUNCTION_DESC'];
    this.branch = window.localStorage['TUM_BRANCH_CODE'];

    this.advanceCurrency = "";

    this.travelReq = false;
    this.release = false;
    this.advance = false;
    this.disabledvalue = false;
    this.dat_valid = {
      currentDate: new Date()
    };
    this.getEmployeeDetails();
    this.getAdvancedCurrency();
    this.getTravelMode();
    var today = new Date();

    this.from = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.to = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.travelmode = "";

    this.urldata = this.route.params.subscribe(params => {

      console.log(params);

      if (params.item != undefined) {
        // if(params!=undefined){
        this.odrequest = JSON.parse(params.item);

        this.ODshow = false;
        this.ODRefshow = true;
        this.odrequest1.push(this.odrequest);
        if (this.odrequest != '') {
          // alert("empty")
          console.log(this.odrequest);
          this.time = this.odrequest.Between;
          this.time = this.odrequest.Between.split('-');

          this.fromHour = this.time[0];
          this.toHour = this.time[1];
          this.disabledvalue = true;
          this.Txnreference = this.odrequest.Txnreference;
          this.from = this.odrequest.Odfrmdate.split('/');
          this.from = this.from[2] + '-' + this.from[1] + '-' + this.from[0];
          console.log(this.from);

          this.to = this.odrequest.Odtodate.split('/');
          this.to = this.to[2] + '-' + this.to[1] + '-' + this.to[0];
          console.log(this.to);
          this.reqdate = this.odrequest.RequestDate.split('/');
          this.reqdate = this.reqdate[2] + '-' + this.reqdate[1] + '-' + this.reqdate[0];
          console.log(this.reqdate);
          this.reason = this.odrequest.Reason;
          this.nod = this.odrequest.NoDays;
          this.reqref = this.odrequest.RequestRef;
          this.currentstatus = this.odrequest.Currentstatus;

          if (this.reqref != undefined) {
            var obj = {
              reqref: this.reqref,
              'function_id': this.FUNCTION_ID,
              'access_token': this.token,
              'userid': this.userID,
              'usertoken': this.usertoken
            }
            this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + 'odSummarydetail/', obj).then(resp => {

              console.log(resp)
              this.odrequest = resp;
              this.odrequest.forEach(element => {
                this.odrequest2.push(element);
              });

              console.log(this.odrequest2);

              // alert(""+JSON.stringify(this.odrequest1));
              window.localStorage['RefID'] = '';
              this.todate = this.odrequest2[0].ToPlace;

              if (this.odrequest2 != undefined) {
                this.ODRefshow = true;
                this.ODshow = false;
                console.log(this.odrequest2.length)
                for (var i = 0; i < this.odrequest2.length; i++) {

                  //   this.fromPlace=this.odrequest1[i].FromPlace;
                  //   this.travelComment=this.odrequest1[i].Comments;
                  //   this.travelmode=this.odrequest1[i].TravelMode;
                  //   this.tavelDate=new Date(this.odrequest1[0].ToDate[0]);
                  //   this.od.to=new Date(this.odrequest1[0].ToDate[0]);
                  //   this.od.from=new Date(this.odrequest1[0].FromDate[0]);
                  //   this.toPlace=this.odrequest1[i].ToPlace;
                  //  this.od.fromHour= new Date(this.odrequest1[i].FromHours);
                  //  this.od.toHour= new Date(this.odrequest1[i].ToHours);
                  //  this.od.advanceAmount=this.odrequest1[0].amount;
                  //  this.requestref=this.odrequest1[0].TxnReference;
                  // this.reqdate=new Date(this.odrequest2[0].ODReqDate);

                  // this.od.nod=this.odrequest1[i].NoDays;
                  this.nod = this.odrequest2[i].NoDays;

                }
              }
              else {

                this.ODRefshow = false;
                this.ODshow = true;
              }

            }, error => {

              console.log("error : " + JSON.stringify(error));

            });

          }
          else {
            this.ODRefshow = false;
            this.ODshow = true;
          }
        }

      } else {
        console.log("inside");
        this.ODshow = true;
        this.ODRefshow = false;
      }
    });
  }

  ionViewDidEnter() {

  }
  getTravelMode() {
    var travelobj = {
      'FunctionID': parseInt(this.FUNCTION_ID),
      'access_token': this.token,
      'userid': parseInt(this.userID),
      'usertoken': parseInt(this.usertoken)
    }

    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getTravelMode", travelobj).then(resp => {
      console.log("getTravelMode ;" + JSON.stringify(resp));
      this.TavelmodeType1 = resp;
      // this.TavelmodeType1 = this.TavelmodeType1_res.recordset;
      console.log("" + JSON.stringify(resp))
      console.log(resp)
      this.TavelmodeType1.forEach(element => {
        this.TavelmodeType.push(element);
      });
      console.log(this.TavelmodeType)
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  getAdvancedCurrency() {
    var currencyobj = {
      'functionid': parseInt(this.FUNCTION_ID),
      'access_token': this.token,
      'userid': parseInt(this.userID),
      'usertoken': parseInt(this.usertoken)
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getCurrencyType", currencyobj).then(resp => {
      this.currencylist1 = resp;
      this.currencylist1.forEach(element => {
        this.currencylist.push(element);
      });
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  getEmployeeDetails() {
    var obj = {
      code: window.localStorage.getItem("TUM_EMP_CODE"),
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/" + "GetEmployees/" + obj.code).then(resp => {

      if (resp == "Employee not Exist") {
        this.toastmessageService.presentAlert1("", "Employee Does not Exist");

      } else {

        this.name = window.localStorage['TUM_USER_NAME'];

        this.company = window.localStorage['FUNCTION_DESC'];
        this.branch = window.localStorage['TUM_BRANCH_CODE'];
        var employeeDetails = resp;

        //  this.designation = employeeDetails[0].DESCRIPTION;
        //   this.department = employeeDetails[0].Department;
        //  this.empID = employeeDetails[0].EmpID;
        this.empID = parseInt(window.localStorage['EmployeeID'])

        // this.userID = employeeDetails[0].UserID;
        this.contact = employeeDetails[0].ContactPhone;

      }
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }


  travelDateValidation(event) {
    console.log(this.from);
    console.log(this.to);
    // console.log(travelDate)
    //if(travelDate){
    if (event.target.value >= this.from && event.target.value <= this.to) {
      console.log("" + this.from + "" + this.to + "" + event.target.value)
      //  if(travelDate<$scope.od.from || travelDate>$scope.od.to){
      // alert("");
    }
    else {
      alert("Travel date should between or equal to from date and to date.");
    }
    // }
  }


  editTravel(data, index) {

    $("#editfield" + index).show();

    $("#checkmarkbtn" + index).css("display", "inline-table");

    $("#editbtn" + index).hide();
    this.editfromPlace = data.FROM_PLACE;
    this.edittoPlace = data.TO_PLACE;
    this.edittavelDate = data.TRAVEL_DATE;
    this.edittravelComment = data.TRAVEL_COMMENT;
    this.edittravelamount = data.TRAVEL_AMOUNT;
    this.edittravelmode = data.TRAVEL_MODEVAL;
  }
  saveeditTravel(data, index) {

    this.AllTravelData[index].FROM_PLACE = this.editfromPlace;
    this.AllTravelData[index].TO_PLACE = this.edittoPlace;
    this.AllTravelData[index].TRAVEL_DATE = this.edittavelDate;
    this.AllTravelData[index].TRAVEL_COMMENT = this.edittravelComment;
    this.AllTravelData[index].TRAVEL_AMOUNT = this.edittravelamount;
    this.AllTravelData[index].TRAVEL_MODEVAL = this.edittravelmode;

    this.TavelmodeType.forEach(element => {

      if (element.VAL == this.edittravelmode) {

        this.AllTravelData[index].TRAVEL_MODETEXT = element.TEXT;
      }

    });


    // $("#travelidvals" + index).css("display", "block");
    $("#editbtn" + index).css("display", "inline-table");

    $("#editfield" + index).hide();
    $("#checkmarkbtn" + index).hide();
  }

  ngOnInit() {
  }

  validateFromDate(from) {
    console.log(from);
    this.nod = " ";
    var date1 = from;
    var date2 = this.to;
    this.tavelDate = from.target.value;
    // date1.setHours(00, 00, 00);
    // date2.setHours(00, 00, 00);
    // console.log(date1, date2)
    if (date1 != undefined) {
      if (date1 < date2) {
        // console.log("To date should be greater than from date")
        alert("To date should be greater than from date");
        this.to = "";
        this.nod = " ";
      } else {
        var fromDate = new Date(this.from);
        var toDate = new Date(this.to);


        // To calculate the time difference of two dates
        var Difference_In_Time = fromDate.getTime() - toDate.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


        this.nod = -Difference_In_Days;
      }
    }
  }
  validateToDate(event) {
    this.nod = " ";
    var date1 = this.from;
    var date2 = event.target.value;
    if (date1 != undefined) {
      // console.log("To")
      if (date1 > date2) {
        alert("To date should be greater than from date");
        this.to = "";
        this.nod = " ";
      } else {

        var fromDate = new Date(this.from);
        var toDate = new Date(event.target.value);


        // To calculate the time difference of two dates
        var Difference_In_Time = fromDate.getTime() - toDate.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


        this.nod = -Difference_In_Days + 1;
      }
    }
  }

  // refresh() {
  //   this.from = undefined;
  //   this.to = undefined;
  //   this.reason = undefined;
  //   this.fromHour = undefined;
  //   this.toHour = undefined;
  //   this.release = 'N';
  //   this.travelReq =false;
  //  this.release=false;
  //  this.advance=false;
  //   this.nod = undefined;
  //   this.fromPlace=undefined;
  //   this.toPlace=undefined;
  //   this.tavelDate=undefined;
  //   this.travelmode=undefined;
  //   this.travelComment=undefined;
  //   this.travelamount=undefined;
  //   this.installment=undefined;



  // };

  changevalue() {
    console.log(this.travelReq)
    if (this.travelReq == false) {
      console.log("IN")
      this.fromPlace = "";
      this.toPlace = "";
      this.tavelDate = "";
      this.travelmode = "";
      this.travelComment = "";
      this.travelamount = "";
    }
  }

  odSubmit() {
    console.log(this.from, this.to);
    var fromYear = this.from.split('-');
    var toyear = this.to.split('-');

    this.travelstatus = this.travelReq;
    this.statusstatus = this.release;
    this.advancestatus = this.advance;
    if (this.travelReq == true) {
      this.travelstatus = 'Y';
    }
    else {
      this.travelstatus = 'N';
    }
    if (this.release == true) {
      this.statusstatus = 'P';
    }
    else {
      this.statusstatus = 'N';
    }
    if (this.advance == true) {
      this.advancestatus = 'Y';
    }
    else {
      this.advancestatus = 'N';
    }



    console.log("" + this.travelstatus + "" + this.statusstatus)

    var fromdate = fromYear[2] + '-' + fromYear[1] + '-' + fromYear[0];
    console.log(fromdate)
    this.fromdateval = fromdate;
    console.log(this.fromdateval)

    var todate = toyear[2] + '-' + toyear[1] + '-' + toyear[0];
    this.todateval = todate
    console.log(this.todateval);
    console.log(todate)

    //  var fromhour = this.datepipe.transform(this.fromHour,"hh:mm a")

    //  var tohour =this.datepipe.transform(this.toHour,"hh:mm a")


    var from = this.formatDate2(this.from);
    var to = this.formatDate2(this.to);
    console.log("" + from);
    // var nod = this.getNOD(this.from, this.to);
    var nod = this.nod;
    //  var fromHour = this.fromHour;

    var fmhour = this.fromHour.split(":")
    var fromHour = fmhour[0] + "@" + fmhour[1];
    console.log("" + fromHour)
    //  var toHour =this.toHour;

    var thour = this.toHour.split(":")
    var toHour = thour[0] + "@" + thour[1];

    var reason = this.reason;

    let today = new Date();

    var compareDate = this.datepipe.transform(today, "dd/mm/yyyy");

    var startDate = this.datepipe.transform(new Date(String(this.from)), "dd/mm/yyyy");

    var endDate = this.datepipe.transform(new Date(String(this.to)), "dd/mm/yyyy");
    console.log(startDate, compareDate);

    var isODrequestOK = true;

    if (this.dateCheck(startDate, endDate, compareDate) || startDate == compareDate) {
      isODrequestOK = false
    }
    else {
      isODrequestOK = true
    }
    console.log(isODrequestOK)


    if (this.contact == undefined) {
      this.contact = null;
    }
    if (this.empID == undefined) {
      this.toastmessageService.presentAlert1("alert", "Invalid Emp ID");
    }
    if (this.fromHour > this.toHour) {
      this.presentAlert1('Error', 'from hour should be lesser than or equal to to hour');
      return;
    }
    else {
      //  this.show();

      if (isODrequestOK == true) {
        this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/SaveOnDuty/" + window.localStorage['FUNCTION_ID'] + "/" + this.empID + "/20/" + from + "/" + fromHour + "/" + to + "/" + toHour + "/" + nod + "/" + this.contact + "/" + reason + "/" + this.statusstatus + "/" + this.travelstatus + "/" + this.advancestatus).then((resp: any) => {
          //CHECK ATTENDANCE
          if (resp == '"Attendance not available"') {
            // console.log("Gotcha : " + resp);
            this.toastmessageService.presentAlert1("Request Not Sent", "Attendance is not available on the requested date")
            this.from = undefined;
            this.to = undefined;
            this.reason = undefined;
            this.fromHour = undefined;
            this.toHour = undefined;
            this.release = 'N';
            this.travelReq = false;
            this.release = false;
            this.advance = false;

            this.nod = undefined;
            this.fromPlace = undefined;
            this.toPlace = undefined;
            this.tavelDate = undefined;
            this.travelmode = undefined;
            this.travelComment = undefined;
            this.travelamount = undefined;
            this.installment = undefined;

          } else if (resp == '"Employee Office Hrs should not be less that Total Office Hrs"') {
            this.toastmessageService.presentAlert1("Request Not Sent", "Employee Office Hrs should not be less that Total Office Hrs")

            this.from = undefined;
            this.to = undefined;
            this.reason = undefined;
            this.fromHour = undefined;
            this.toHour = undefined;
            this.release = 'N';
            this.travelReq = false;
            this.release = false;
            this.advance = false;

            this.nod = undefined;
            this.fromPlace = undefined;
            this.toPlace = undefined;
            this.tavelDate = undefined;
            this.travelmode = undefined;
            this.travelComment = undefined;
            this.travelamount = undefined;
            this.installment = undefined;
          } else if (resp == '"From hours and To hours should be within the Shift Start Time and End Time"') {
            this.toastmessageService.presentAlert1("Request Not Sent", "From hours and To hours should be within the Shift Start Time and End Time")
          } else if (resp == '"OD Request already available for this date"') {
            this.toastmessageService.presentAlert1("Request Not Sent", "OD Request already available for this date")
            this.from = undefined;
            this.to = undefined;
            this.reason = undefined;
            this.fromHour = undefined;
            this.toHour = undefined;
            this.release = 'N';
            this.travelReq = false;
            this.release = false;
            this.advance = false;

            this.nod = undefined;
            this.fromPlace = undefined;
            this.toPlace = undefined;
            this.tavelDate = undefined;
            this.travelmode = undefined;
            this.travelComment = undefined;
            this.travelamount = undefined;
            this.installment = undefined;
          }
          else if (resp == '"Coff already available for this date"') {
            this.toastmessageService.presentAlert1("Request Not Sent", "Coff already available for this date");
          }
          else if (resp == '"Leave already available for this date"') {
            this.toastmessageService.presentAlert1("Request Not Sent", "Leave request already available in the same date");

          }
          else {

            debugger
            if (resp == null) {
              this.toastmessageService.presentAlert("Saved", "Saved Successfully");
              this.from = undefined;
              this.to = undefined;
              this.reason = undefined;
              this.fromHour = undefined;
              this.toHour = undefined;
              this.release = 'N';
              this.travelReq = false;
              this.release = false;
              this.advance = false;

              // this.advanceAmount = undefined;
              // $scope.od.advanceCurrency = undefined;
              // $scope.od.repayment = undefined;
              // $scope.od.advanceInstallment = undefined;
              this.nod = undefined;
              this.fromPlace = undefined;
              this.toPlace = undefined;
              this.tavelDate = undefined;
              this.travelmode = undefined;
              this.travelComment = undefined;
              this.travelamount = undefined;
              this.installment = undefined;


            }
            //IF ATTENDANCE IS PRESENT
            console.log(resp);
            var replace = resp.replace(/"/g, '');
            var split = replace.split("@");
            //this.reqID = split[0];
            var req = split[0];
            this.reqID = split[0];
            this.workflowTable = split[2];
            this.userID = this.userID;

            this.reqID1 = req.split(',')[0]
            this.reqID = req.split(',')[1];
            // console.log(this.workflowTable);

            if (split[1] != "") {
              this.toastmessageService.presentAlert("Request Sent", "Request saved Successfully <br> Req Ref : " + this.reqID1);

              console.log("coming")
              // console.log(this.AllTravelData)


              if (this.statusstatus == 'P') {
                this.reqtype = 'null';
                this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms1 + "WorkFlowAuth/" + this.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp => {
                  if (resp == "1") {
                    console.log("Workflow called successfully :" + resp);
                    //       this.refresh();
                    //       this.from = undefined;
                    //   this.to = undefined;
                    //   this.reason = undefined;
                    //   this.fromHour = undefined;
                    //   this.toHour = undefined;
                    //   this.release = 'N';
                    //   this.travelReq =false;
                    //  this.release=false;
                    //  this.advance=false;

                    //   this.nod = undefined;
                    //   this.fromPlace=undefined;
                    //   this.toPlace=undefined;
                    //   this.tavelDate=undefined;
                    //   this.travelmode=undefined;
                    //   this.travelComment=undefined;
                    //   this.travelamount=undefined;
                    //   this.installment=undefined;
                  } else {
                    // console.log("Workflow not called:" + resp);this.from = undefined;
                    this.to = undefined;
                    this.reason = undefined;
                    this.fromHour = undefined;
                    this.toHour = undefined;
                    this.release = 'N';
                    this.travelReq = false;
                    this.release = false;
                    this.advance = false;

                    this.nod = undefined;
                    this.fromPlace = undefined;
                    this.toPlace = undefined;
                    this.tavelDate = undefined;
                    this.travelmode = undefined;
                    this.travelComment = undefined;
                    this.travelamount = undefined;
                    this.installment = undefined;

                  }
                }, error => {

                  console.log("error : " + JSON.stringify(error));

                });


              }

              var self = this;
              if (self.travelstatus == 'Y') {
                // alert("came")
                for (var i = 0; i < self.AllTravelData.length; i++) {
                  (function (i) {
                    console.log("not coming")
                    // console.log(this.AllTravelData[i]);
                    var travelidobj = {
                      userid: window.localStorage['TUM_USER_ID'],
                      usertoken: window.localStorage['usertoken'],
                      access_token: window.localStorage['token']
                    }
                    self.HttpRequest.PostRequest(self.Ipaddressservice.ipaddress + self.Ipaddressservice.serviceurlhrms2 + "/getTravelID/", travelidobj).then(resp => {
                      self.travelid = resp[0].TravelId;

                      // var travelYear=self.AllTravelData[i].TRAVEL_DATE.split('-');
                      var traveldatesplit = self.AllTravelData[i].TRAVEL_DATE;
                      var traveldatesplit = traveldatesplit.split('-');

                      var travelYear = traveldatesplit[0];
                      var travelmonth = traveldatesplit[1];
                      var travelDate1 = traveldatesplit[2];
                      //  var travelmonth=travelmonth+1;
                      // var traveldate=travelYear+'-'+travelDate1+'-'+travelmonth;

                      var traveldate = travelDate1 + '-' + travelmonth + '-' + travelYear;
                      console.log("" + traveldate);


                      var travelinsertobj = {
                        companyid: window.localStorage['FUNCTION_ID'],
                        user_id: self.userID,
                        requestref: self.reqID,
                        type: 'o',
                        travelid: self.travelid,
                        fromplace: self.AllTravelData[i].FROM_PLACE,
                        toplace: self.AllTravelData[i].TO_PLACE,
                        fromdate: traveldate,
                        travelmode: self.AllTravelData[i].TRAVEL_MODEVAL,
                        travelclass: 0,
                        create: self.userID,
                        ipaddress: 0,
                        comments: self.AllTravelData[i].TRAVEL_COMMENT,
                        amount: self.AllTravelData[i].TRAVEL_AMOUNT,
                        strCancelRemarks: '',
                        lastupby: self.userID,
                        userid: self.userID,
                        usertoken: window.localStorage['usertoken'],
                        access_token: window.localStorage['token']
                      }
                      console.log(travelinsertobj);
                      // console
                      self.HttpRequest.PostRequest(self.Ipaddressservice.ipaddress + self.Ipaddressservice.serviceurlhrms2 + "saveODTraveldata/", travelinsertobj).then(resp => {
                        if (self.AllTravelData.length == i) {
                          self.AllTravelData = [];
                        }
                      }, error => {

                        console.log("error : " + JSON.stringify(error));
                        this.from = undefined;
                        this.to = undefined;
                        this.reason = undefined;
                        this.fromHour = undefined;
                        this.toHour = undefined;
                        this.release = 'N';
                        this.travelReq = false;
                        this.release = false;
                        this.advance = false;

                        this.nod = undefined;
                        this.fromPlace = undefined;
                        this.toPlace = undefined;
                        this.tavelDate = undefined;
                        this.travelmode = undefined;
                        this.travelComment = undefined;
                        this.travelamount = undefined;
                        this.installment = undefined;
                      });

                    }, error => {

                      console.log("error : " + JSON.stringify(error));
                      this.from = undefined;
                      this.to = undefined;
                      this.reason = undefined;
                      this.fromHour = undefined;
                      this.toHour = undefined;
                      this.release = 'N';
                      this.travelReq = false;
                      this.release = false;
                      this.advance = false;

                      this.nod = undefined;
                      this.fromPlace = undefined;
                      this.toPlace = undefined;
                      this.tavelDate = undefined;
                      this.travelmode = undefined;
                      this.travelComment = undefined;
                      this.travelamount = undefined;
                      this.installment = undefined;
                    });


                  })(i)

                }

              } else {
                this.AllTravelData = [];
                this.from = undefined;
                this.to = undefined;
                this.reason = undefined;
                this.fromHour = undefined;
                this.toHour = undefined;
                this.release = 'N';
                this.travelReq = false;
                this.release = false;
                this.advance = false;

                this.nod = undefined;
                this.fromPlace = undefined;
                this.toPlace = undefined;
                this.tavelDate = undefined;
                this.travelmode = undefined;
                this.travelComment = undefined;
                this.travelamount = undefined;
                this.installment = undefined;
              }

              if (this.advancestatus == 'P') {
                if (this.Repayment == 'C') {
                  this.monthlyDeduction = 0;
                } else if (this.Repayment == 'S') {
                  this.monthlyDeduction = (this.advanceAmount / this.installment);
                }
                var advanceobj = {
                  REQ_ID: this.reqID,
                  EMPID: window.localStorage['EmployeeID'],
                  REQUEST_TYPE: 2,
                  SCHEME_ID: 0,
                  MAX_INSTALLMENTS: this.installment,
                  AMOUNT: this.advanceAmount,
                  STATUS: '',
                  MONTHLY_DEDUCTION: this.monthlyDeduction,
                  CREATED_BY: this.userID,
                  USER_ID: this.userID,
                  FUNCTION_ID: window.localStorage['FUNCTION_ID'],
                  UPDATED_ON: new Date(),
                  CREATED_ON: new Date(),
                  CURRENCY: this.advanceCurrency,
                  REPAYMENT: this.Repayment,
                  userid: this.userID,
                  usertoken: window.localStorage['usertoken'],
                  access_token: window.localStorage['token']
                }
                this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "saveODAdvanceAmountData/", advanceobj).then(resp => {

                }, error => {

                  console.log("error : " + JSON.stringify(error));

                });
              }

              // this.refresh();

              var typerequest = "OD Request";
              var perdate = null;
              var reportobj = {
                Userid: parseInt(this.userID),
                from: fromdate,
                to: todate,
                typerequest: typerequest,
                userid: parseInt(this.userID),
                usertoken: this.usertoken,
                access_token: window.localStorage.token
              }

              this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getreportingto", reportobj).then(resp => {
                this.presentAlert("",resp);
                this.from = undefined;
                this.to = undefined;
                this.reason = undefined;
                this.fromHour = undefined;
                this.toHour = undefined;
                this.release = 'N';
                this.travelReq = false;
                this.release = false;
                this.advance = false;

                this.nod = undefined;
                this.fromPlace = undefined;
                this.toPlace = undefined;
                this.tavelDate = undefined;
                this.travelmode = undefined;
                this.travelComment = undefined;
                this.travelamount = undefined;
                this.installment = undefined;
              }, error => {

                console.log("error : " + JSON.stringify(error));

              });
              this.from = undefined;
              this.to = undefined;
              this.reason = undefined;
              this.fromHour = undefined;
              this.toHour = undefined;
              this.release = 'N';
              this.travelReq = false;
              this.release = false;
              this.advance = false;

              this.nod = undefined;
              this.fromPlace = undefined;
              this.toPlace = undefined;
              this.tavelDate = undefined;
              this.travelmode = undefined;
              this.travelComment = undefined;
              this.travelamount = undefined;
              this.installment = undefined;
            }
          }
        }, error => {
          console.log("error : " + JSON.stringify(error));

        });
      }
      else {
        this.toastmessageService.presentAlert1("Already Request Found", "OD Request already available for this date");
        this.from = undefined;
        this.to = undefined;
        this.reason = undefined;
        this.fromHour = undefined;
        this.toHour = undefined;
        this.release = 'N';
        this.travelReq = false;
        this.release = false;
        this.advance = false;

        this.nod = undefined;
        this.fromPlace = undefined;
        this.toPlace = undefined;
        this.tavelDate = undefined;
        this.travelmode = undefined;
        this.travelComment = undefined;
        this.travelamount = undefined;
        this.installment = undefined;
      }
    }
  };


  dateCheck(from, to, check) {

    var fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if ((cDate <= lDate && cDate >= fDate)) {
      return true;
    }
    return false;
  }
  formatTime(value) {
    if (value != null) {
      var hour = value.getHours();
      var minute = value.getMinutes();
      value = hour + "@" + minute;
      return value;
    }
  }
  formatDate2(value) {
    value = new Date(value);

    var day = value.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = value.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
      // console.log(month);
    }
    var year = value.getFullYear();
    value = day + "-" + month + "-" + year;
    return value;
  }
  deleteTravel(data, index) {
    this.AllTravelData.splice(index, 1);
  }
  addTravel() {

    if (this.fromPlace == undefined) {
      this.toastmessageService.presentAlert1("Alert", "From place need not to be empty");
    } else if (this.toPlace == undefined) {
      this.toastmessageService.presentAlert1("Alert", "To place need not to be empty");

    } else if (this.tavelDate == undefined) {
      this.toastmessageService.presentAlert1("Alert", "Travel Date need not to be empty");

    } else if (this.travelmode == "") {
      this.toastmessageService.presentAlert1("Alert", "Travel Mode need not to be empty");
    }
    else {
      for (var i = 0; i < this.TavelmodeType.length; i++) {

        if (this.TavelmodeType[i].VAL == this.travelmode) {
          this.taveltext = this.TavelmodeType[i].TEXT;
        }
      }
      var tarveldata = {
        FROM_PLACE: this.fromPlace,
        TO_PLACE: this.toPlace,
        TRAVEL_MODETEXT: this.taveltext,
        TRAVEL_MODEVAL: this.travelmode,
        TRAVEL_DATE: this.tavelDate,
        TRAVEL_COMMENT: this.travelComment,
        TRAVEL_AMOUNT: this.travelamount
      }
      console.log(tarveldata)
      // let datatravel = angular.extend(data,traveldata);
      this.alldata = tarveldata;
      this.AllTravelData.push(this.alldata);
      this.fromPlace = undefined;
      this.toPlace = undefined;
      this.tavelDate = undefined;
      this.travelmode = undefined;
      this.travelComment = undefined;
      this.travelamount = undefined;
      console.log(this.AllTravelData)
    }
  }
  odSummary() {
    // this.refresh();
    this.router.navigateByUrl('/odsummary');
  }
  handleAddressChange(event) {
    console.log('handleAddressChange' + JSON.stringify(event));
    this.fromPlace = event.formatted_address;
    this.editfromPlace = event.formatted_address;
  }
  handleAddressChange1(event) {
    console.log('handleAddressChange' + JSON.stringify(event));
    this.toPlace = event.formatted_address;
    this.edittoPlace = event.formatted_address;
  }
  async refresh() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Cancel the Process',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.from = "";
            this.to = "";
            this.reason = "";
            this.fromHour = "";
            this.toHour = "";
            this.release = 'N';
            this.travelReq = false;
            this.release = false;
            this.advance = false;
            this.nod = "";
            this.fromPlace = "";
            this.toPlace = "";
            this.tavelDate = "";
            this.travelmode = "";
            this.travelComment = "";
            this.travelamount = "";
            this.installment = "";
          }
        }
      ]
    });
    await alert.present();
  }


  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }
  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
}


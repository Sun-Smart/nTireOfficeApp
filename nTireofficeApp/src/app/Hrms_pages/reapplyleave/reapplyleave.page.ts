import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';

@Component({
  selector: 'app-reapplyleave',
  templateUrl: './reapplyleave.page.html',
  styleUrls: ['./reapplyleave.page.scss'],
})
export class ReapplyleavePage implements OnInit {
  FUNCTION_ID: any;
  token: any;

  usertoken: any;
  name: any;
  userID: any;
  empCode: any;
  company: any;
  branch: any;
  item: any;
  Lfromdate: any;
  Ltodate: any;
  leavetypearray=[];
  leaveresponse: any;
  reid: string;
  reqID: string;
  workflowTable: string;
  leaveBal: string;
  preApprovalDays: string;
  em_emp_id: any;
  release=false;
  reqtype: string;

  constructor(private model:ModalController,public toastmessageService:ToastmessageService,navParams: NavParams,private HttpRequest: HttprequestService,public Ipaddressservice: IpaddressService) {

    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.token=window.localStorage['token'];
    this.userID = window.localStorage['TUM_USER_ID'];
    this.usertoken= window.localStorage['usertoken'];
    this.em_emp_id=window.localStorage['em_emp_id'];
    this.name = window.localStorage['TUM_USER_NAME'];
    this.empCode= window.localStorage['TUM_EMP_CODE'];
    // console.log(this.coff.name);
    // this.validate = validate;
    this.company = window.localStorage['FUNCTION_DESC'];
    console.log(this.company);
    this.branch=window.localStorage['TUM_BRANCH_CODE'];
    this.item=navParams.get('item');
    console.log(""+JSON.stringify(this.item));
    this.Lfromdate = this.item.FromDate;
    console.log(""+this.Lfromdate);
    this.Lfromdate = this.Lfromdate.split('-');
    this.Lfromdate = this.Lfromdate[2]+'-'+this.Lfromdate[1]+'-'+this.Lfromdate[0];
    this.Ltodate = this.item.ToDate;
    this.Ltodate = this.Ltodate.split('-');
    this.Ltodate = this.Ltodate[2]+'-'+this.Ltodate[1]+'-'+this.Ltodate[0];
    this.item.NoDays = this.item.NoDays;
    this.item.ReqRef=this.item.ReqRef;
    this.item.Reason=this.item.Reason;

    this.LoadLeaveType();
   }

  ngOnInit() {
  }

  closemodel(index) {
    if (index == 1) {
      // this.modal1.hide();
      // modalCtrl.dismiss();
      this.model.dismiss('cancel');
    } else if (index == 3) {
      this.model.dismiss('cancel');
      // modalCtrl.dismiss();
    } else {
      this.model.dismiss('cancel');
      // modalCtrl.dismiss();
    }
  };

LoadLeaveType() {



  this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +"/mobileapi/HRMS/HRMS.svc/LoadLeaveType/"+window.localStorage['FUNCTION_ID']+'/'+this.item.EmpID).then(resp=>{
    this.leavetypearray = JSON.parse(resp.toString());
    this.leavetypearray.forEach(element=>{
      if(element.TEXT == this.item.LeaveType){
        this.item.LeaveType = element.VAL;
      }
    })

  }, error => {

  console.log("error : "+JSON.stringify(error));

  });


  }

  validateFromDate(){
    var date1 = this.Lfromdate;
    var date2 =  this.Ltodate;
    // date1.setHours(00, 00, 00);
    // date2.setHours(00, 00, 00);
    // console.log(date1, date2)
    if (date1 != undefined) {
      if (date1 < date2) {
        // console.log("To date should be greater than from date")
    alert("To date should be greater than from date");
    this.Ltodate = "";
      } else {
        var fromDate =new Date(this.Lfromdate);
        var toDate = new Date( this.Ltodate);


     // To calculate the time difference of two dates
     var Difference_In_Time = fromDate.getTime() - toDate.getTime();

     // To calculate the no. of days between two dates
     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


     this.item.NoDays=-Difference_In_Days;
      }
    }
  }

  validateToDate(event){

    var date1 = this.Lfromdate;
    var date2 = this.Ltodate;
    if (date1 != undefined) {
      // console.log("To")
      if (date1 > date2) {
      alert("To date should be greater than from date");
      this.Ltodate = "";
      } else {

         var fromDate =new Date(this.Lfromdate);
         var toDate = new Date(event.target.value);


      // To calculate the time difference of two dates
      var Difference_In_Time = fromDate.getTime() - toDate.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);


      this.item.NoDays=-Difference_In_Days;
      }
    }
  }

  getLeaveBalance(){
    this.leaveBal="";
    this.preApprovalDays="";
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/EmployeeLeaveConfig/"+this.item.LeaveType+ "/" +this.em_emp_id).then(resp=>{
      var reaparray = JSON.parse(resp.toString());

      this.item.CurLeaveBalance = reaparray[0].cur_balance;
      this.preApprovalDays = reaparray[0].PreApprovalDays
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }


  refreshModal(){
    this.item.LeaveType='';
    this.item.CurLeaveBalance='';
    this.item.ReqRef='';
    this.Lfromdate='';
    this.Ltodate='';
    this.item.NoDays='';
    this.item.Reason='';

  }
  submitLeaveDetails() {
    if (this.item.MobileNum == undefined) {
      this.item.MobileNum = null;
    }

    // this.leaveData.reason = escape(this.leaveData.reason);
    // // console.log(this.leaveData.reason);
    // var fromDate = dateService.formatDate2(this.leaveData.from);
    // var toDate = dateService.formatDate2(this.leaveData.to);
    // var typeSelected = this.leaveData.typeSelected;
    // var session = 0;
    // var nod = this.leaveData.nod;
    // var reason = this.leaveData.reason;

    // this.show();


    if(this.release ==true)
    {
     this.item.status= 'P';
    }
    else{
     this.item.status= 'N';
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +"/mobileapi/HRMS/HRMS.svc/SaveLeave/"+window.localStorage['FUNCTION_ID']+'/'+this.userID+'/'+this.item.EmpID+'/'+this.item.ReqRef+'/'+this.item.LeaveType+'/'+this.item.FromDate+'/'+this.item.ToDate+'/'+this.item.NoDays+'/'+this.item.MobileNum+'/'+this.item.Reason+'/'+this.item.status).then(resp=>{
      this.leaveresponse = JSON.parse(resp.toString());
      if (resp == '"Attendance not available"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Attendance is not available on the requested date");

      } else if (resp == '"Employee Office Hrs should not be less that Total Office Hrs"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Employee Office Hrs should not be less that Total Office Hrs");


  }
  else if (resp == '"OD already available for this date"') {
    this.toastmessageService.presentAlert1("Request Not Sent","OD already available for this date");

      }

      else if (resp == '"Leave Request already raised for this date. Cannot Process your Request"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Leave Request already raised for this date. Cannot Process your Request");

          }
  else if (resp == '"COFF Request already available for this date"') {
    this.toastmessageService.presentAlert1("Request Not Sent","COFF Request already available for this date");

      } else {

        //IF ATTENDANCE IS PRESENT
        var replace = resp.toString().replace(/"/g, '');
        var split = replace.split("@");
        this.reqID = split[0];
        this.workflowTable = split[2];
        this.reid = split[1];
        // console.log(split[1]);

        // this.reqID1 = req.split(',')[0]
        // this.reqID= req.split(',')[1];


        var a = this.reqID.split(',');
        this.reqID= a[0];
        var c= a[1];

        this.userID = this.userID;
        if (split[1] =="Leave Updated Successfully") {
          this.toastmessageService.presentAlert1("Request Sent","Leave Updated Successfully <br> Req Ref : " +this.reqID);
          this.reqtype = 'null';
          if (this.item.status == "P") {

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ c + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp=>{
              if (resp == "1") {
                console.log("Workflow called successfully :" + resp);

              } else {
                // console.log("Workflow not called:" + resp);
              }
            }, error => {

            console.log("error : "+JSON.stringify(error));

            });
          }

    } error => {

    console.log("error : "+JSON.stringify(error));

    }
    this.closemodel(1);
  }
  //   $http.get(ipLink + "/mobileapi/HRMS/HRMS.svc/SaveLeave/" + window.localStorage['FUNCTION_ID'] + "/" + userID + "/" + this.item.EmpID + "/" + this.leaveData.reqID + "/" + this.leave.typeSelected + "/" + fromDate + "/" + toDate + "/" + nod + "/" + this.contact + "/" + reason + "/" + this.leaveData.status)
  //     .success(function(response) {
  //       // console.log(response);
  //       //CHECK ATTENDANCE
  //       if (response == '"Attendance not available"') {
  //         // console.log("Gotcha : " + response);
  //         this.hide();
  //         var popup = $ionicPopup.alert({
  //           title: "<b>Request Not Sent</b>",
  //           template: "<center> Attendance is not available on the requested date </center>"
  //         });
  //         this.hide();
  //       } else if (response == '"Leave Request already available for this date"') {
  //         var popup = $ionicPopup.alert({
  //           title: "<b>Request Not Sent</b>",
  //           template: "<center>Leave Request already available for this date</center>"
  //         });
  //         this.hide();
  //       } else {

  //         //IF ATTENDANCE IS PRESENT
  //         var replace = response.replace(/"/g, '');
  //         var split = replace.split("@");
  //         this.leaveData.reqID = split[0];
  //         this.leaveData.workflowTable = split[2];
  //         this.leaveData.userID = userID;
  //         this.leaveData.empID = empID;
  //         // console.log(split[2]);

  //         if (split[1] == "Leave Updated Successfully") {
  //           var popup = $ionicPopup.alert({
  //             title: "Request Sent",
  //             type: 'button-positive',
  //             template: "<center>Request Saved Successfully <br> Req Ref : " + this.leaveData.reqID + " </center>"
  //           });
  //           this.leaveData.reqtype = 'null';
  //           // console.log(this.leaveData.status);
  //           if (this.leaveData.status == "P") {
  //             sendToAPI.sendToWorkflow(this.leaveData)
  //               .success(function(response) {
  //                 // console.log("Workflow Called");
  //                 this.refreshModal();
  //               })
  //               .error(function() {
  //                 // console.log("Error calling workflow");
  //               })
  //               .finally(function() {
  //                 this.hide();
  //               });
  //           }
  //           // this.refreshModal();
  //           // this.closeModal();
  //           // this.doRefresh();
  //         }
  //       }
  //     })
  //     .error(function(response) {
  //       this.hide();
  //       // console.log(response);
  //       var popup = $ionicPopup.alert({
  //         title: "Leave Request not Sent",
  //         template: "<center>Something went wrong</center>"
  //       });
  //     })
  //     .finally(function() {
  //       this.hide();
  //     });
  // };


});
  }
}

import { Component, OnInit } from '@angular/core';
import {NavParams,ModalController} from '@ionic/angular';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reapplypermission',
  templateUrl: './reapplypermission.page.html',
  styleUrls: ['./reapplypermission.page.scss'],
})
export class ReapplypermissionPage implements OnInit {
  item: any;
  FUNCTION_ID: any;
  token: any;
  userID: any;
  name: any;
  empCode: any;
  company: any;
  usertoken: any;
  branch: any;
  permData: { ITEM: any; };
  fromhour: string;
  tohour: string;
  changeformat: any;
  release=false;
  rreqid3: string;
  reqID2: string[];
  reqID: string;
  workflowTable: string;
  reqtype: string;
  reid: string;

  constructor(private datepipe: DatePipe,public toastmessageService:ToastmessageService,public modalCtrl: ModalController,navParams: NavParams,private HttpRequest: HttprequestService,public Ipaddressservice: IpaddressService) {
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.token=window.localStorage['token'];
    this.userID = window.localStorage['TUM_USER_ID'];
    this.usertoken= window.localStorage['usertoken'];
    this.name = window.localStorage['TUM_USER_NAME'];
    this.empCode= window.localStorage['TUM_EMP_CODE'];
    // console.log(this.coff.name);
    // this.validate = validate;
    this.company = window.localStorage['FUNCTION_DESC'];
    console.log(this.company);
    this.branch=window.localStorage['TUM_BRANCH_CODE'];
    this.item=navParams.get('item');
    this.item.RDate = this.item.RDate.split('-');
    this.item.RDate= this.item.RDate[2]+'-'+this.item.RDate[1]+'-'+this.item.RDate[0];
    console.log(""+this.item.RDate);
    this.item.PermDate = this.item.PermDate.split('-');
    this.item.PermDate= this.item.PermDate[2]+'-'+this.item.PermDate[1]+'-'+this.item.PermDate[0];
    console.log(""+this.item.PermDate);

    //
    // this.item.PermDate = permdate[]
    console.log(""+JSON.stringify(this.item));
    this.reqID = this.item.ReqRef;
   }

  ngOnInit() {
  }


  closemodel(index) {
    if (index == 1) {
      // this.modal1.hide();
      // modalCtrl.dismiss();
      this.modalCtrl.dismiss('cancel');
    } else if (index == 3) {
      this.modalCtrl.dismiss('cancel');
      // modalCtrl.dismiss();
    } else {
      this.modalCtrl.dismiss('cancel');
      // modalCtrl.dismiss();
    }
  };

  changedate()
  {
    this.changeformat = this.item.PermDate1;
    this.changeformat=   this.changeformat.split('-');
    this.item.PermDate1=this.changeformat[2]+'-'+this.changeformat[1]+'-'+this.changeformat[0];
    console.log(""+this.item.PermDate1);
  }

  submitPerm() {
    // if (this.permData.contact == undefined) {
    //   this.permData.contact = null;
    // }

    this.permData={
      ITEM:this.item,
    }
    console.log
this.fromhour =this.item.FromHours;
this.tohour =this.item.ToHours;
console.log(""+this.fromhour+this.tohour);
// this.item.Status ='P';
if(this.release ==true)
{
 this.item.Status= 'P';
}
else{
 this.item.Status= 'N';
}

this.fromhour =this.item.FromHours.split(':');
this.fromhour =this.fromhour[0]+'@'+this.fromhour[1];
this.tohour =this.item.ToHours;
this.tohour =this.tohour[0]+'@'+this.tohour[1];
this.changeformat = this.item.PermDate;
    this.changeformat=   this.changeformat.split('-');
    this.item.PermDate1=this.changeformat[2]+'-'+this.changeformat[1]+'-'+this.changeformat[0];
this.item.PermDate1 = this.item.PermDate1;



    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"SavePermission/"+window.localStorage['FUNCTION_ID']+'/'+this.item.EmpID+'/'+this.item.ReqRef+'/'+this.item.RDate+'/'+this.item.PermDate1+'/'+this.fromhour+'/'+this.tohour+'/'+this.item.MobileNum+'/'+this.item.Reason+'/'+this.item.Status).then(resp=>{
      console.log(""+JSON.stringify(resp));

      if (resp == '"Permission is not enabled for this Employee"') {
        // console.log("Gotcha : " + resp);
        this.toastmessageService.presentAlert1("Request Not Sent","Permission is not enabled for this Employee");


      }
      else if (resp == '"Coff already available for this date"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Coff already available for this date");

      }
       else if (resp == '"No of permissions for the requested month are already taken"') {
        this.toastmessageService.presentAlert1("Request Not Sent","No of permissions for the requested month are already taken");

      } else if (resp == '"Permission not available for Weekoff/Holiday"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Permission not available for Weekoff/Holiday");


      } else if (resp == '"Permission already available for this date"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Permission already available for this date");
   } else if (resp == '"Permission duration exceeds the applicable limit"') {
    this.toastmessageService.presentAlert1("Request Not Sent","Permission duration exceeds the applicable limit");

      } else {
        //IF ATTENDANCE IS PRESENT

        var replace = resp.toString().replace(/"/g, '');
        var split = replace.split("@");
        this.rreqid3 = split[0];
        // console.log(""+this.reqID);
        this.reqID2 = this.rreqid3.split(',');
        this.reqID= this.reqID2[1];
        // console.log(""+ this.rreqid3+""+ this.reqID2)
        this.workflowTable = split[3];
        this.reid = split[1];


        this.userID = this.userID;
        // console.log(split[2]);
        this.reqtype = 'null';
        if (split[2] == "Permission Updated Successfully") {
          this.toastmessageService.presentAlert1("Request Sent","Permission Updated Successfully<br> Req Ref : " + this.reqID2);

          if (this.item.Status == "P") {

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/"+ this.reid + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp=>{
              if (resp == "1") {
                console.log("Workflow called successfully :" + resp);

              } else {
                // console.log("Workflow not called:" + resp);
              }
            }, error => {

            console.log("error : "+JSON.stringify(error));
            this.permCancel();
            });
          }
          var typerequest = "Permission Request"
          // var perdate = $filter('date')(this.perm.permDate, "yyyy-MM-dd");
          var fromhour =this.datepipe.transform(this.fromhour,"hh:mm a")

          var tohour = this.datepipe.transform(this.tohour,"hh:mm a")

          var reportobj = {
            Userid:this.userID,
            from: fromhour,
            to: tohour,
            typerequest: typerequest,
            userid:this.userID,
            usertoken:this.usertoken,
            access_token: window.localStorage.token
          }

          this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getreportingto/",reportobj).then(resp=>{

            this.modalCtrl.dismiss();
            this.permCancel();
    }, error => {

    console.log("error : "+JSON.stringify(error));

    });


    // sendToAPI.permSubmit(this.permData).success(function(response) {
    //     // console.log(response);
    //     //CHECK ATTENDANCE
    //     if (response == '"Permission is not enabled for this Employee"') {
    //       // console.log("Gotcha : " + response);
    //       this.hide();
    //       var popup = $ionicPopup.alert({
    //         title: "<b>Request Not Sent</b>",
    //         template: "<center>Permission is not enabled for this Employee </center>"
    //       });
    //       this.hide();
    //     } else if (response == '"No of permissions for the requested month are already taken"') {
    //       var popup = $ionicPopup.alert({
    //         title: "<b>Request Not Sent</b>",
    //         template: "<center>No of permissions for the requested month are already taken</center>"
    //       });
    //       this.hide();
    //     } else if (response == '"Permission not available for Weekoff/Holiday"') {
    //       var popup = $ionicPopup.alert({
    //         title: "<b>Request Not Sent</b>",
    //         template: "<center>Permission not available for Weekoff/Holiday</center>"
    //       });
    //       this.hide();
    //     } else if (response == '"Permission already available for this date"') {
    //       var popup = $ionicPopup.alert({
    //         title: "<b>Request Not Sent</b>",
    //         template: "<center>Permission already available for this date</center>"
    //       });
    //       this.hide();
    //     } else if (response == '"Permission duration exceeds the applicable limit"') {
    //       var popup = $ionicPopup.alert({
    //         title: "<b>Request Not Sent</b>",
    //         template: "<center>Permission duration exceeds the applicable limit</center>"
    //       });
    //       this.hide();
    //     } else {
    //       //IF ATTENDANCE IS PRESENT

    //       var replace = response.replace(/"/g, '');
    //       var split = replace.split("@");
    //       this.permData.reqID = split[0];
    //       this.permData.workflowTable = split[2];
    //       this.permData.userID = userID;
    //       // console.log(split[2]);

    //       if (split[1] == "Permission Updated Successfully") {
    //         var popup = $ionicPopup.alert({
    //           title: "Request Sent",
    //           template: "<center>Request has been updated Successfully<br>Req Ref : " + this.permData.reqID + "</center>"
    //         });

    //         if (this.permData.status == "P") {
    //           sendToAPI.sendToWorkflow(this.permData)
    //             .success(function(response) {
    //               // console.log("Workflow Called");

    //               this.refresh();
    //               this.doRefresh();
    //               this.closeModal();
    //             })
            //     .error(function() {
            //       // console.log("Error calling workflow");
            //     })
            //     .finally(function() {
            //       this.hide();
            //     });
            // }

            // this.refresh();
            // this.doRefresh();

  //         }
  //       }
  //     })
  //     .error(function(response) {
  //       this.hide();
  //       // console.log(response);
  //       var popup = $ionicPopup.alert({
  //         title: "Request not Sent",
  //         template: "<center>" + response + "</center>"
  //       });
  //     })
  //     .finally(function() {
  //       this.hide();
  //     });
  // };
  this.permCancel();
  this.closemodel(1);
  }
  this.permCancel();
  this.closemodel(1);
}
    });
  }

  permCancel()
  {
    this.item.Reason='';
    this.item.PermDate1='';
    this.item.FromHours='';
    this.item.ToHours='';
    this.closemodel(1)
  }
    }

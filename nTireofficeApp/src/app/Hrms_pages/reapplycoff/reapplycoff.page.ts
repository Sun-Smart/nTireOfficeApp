import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {ToastmessageService} from '../../service/toastmessage.service';
import { NavParams } from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-reapplycoff',
  templateUrl: './reapplycoff.page.html',
  styleUrls: ['./reapplycoff.page.scss'],
})
export class ReapplycoffPage implements OnInit {
  FUNCTION_ID;
  empID;
  userID;
  branch;
  urldata;
  requestRef;
  reason;
  coffDateFrom;
  coffDateTo;
  status;
  maxdate;
  contactPhone;
  coffType;
  reqID;
  workflowTable;
  reqtype;
  item;
  release=false;
  private backbuttonSubscription: Subscription;
  company: any;
  name: any;
  statusstatus: string;
  dat_valid: { currentDate: Date; };
  constructor(private model:ModalController,navParams: NavParams,public toastmessageService:ToastmessageService,private datepipe: DatePipe,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public route: Router, public activatedRoute : ActivatedRoute,) {



    this.FUNCTION_ID= window.localStorage['FUNCTION_ID'];
    this.empID= window.localStorage['TUM_EMP_ID'];
    this.userID = window.localStorage['TUM_USER_ID'];
    this.branch = window.localStorage['TUM_BRANCH_CODE'];
    this.name = window.localStorage['TUM_USER_NAME'];
    this.company = window.localStorage['FUNCTION_DESC'];
    console.log(this.company);
    this.branch=window.localStorage['TUM_BRANCH_CODE'];
    this.item=navParams.get('item');
    console.log(this.item);

     this.requestRef = this.item.ReqRef;
     this.reason = this.item.Reason;
     this.coffType = this.item.type;

     this.status = "N";


      this.coffDateFrom=this.item.COFFDate;

    this.coffDateFrom = this.item.COFFDate.split('-');
    this.coffDateFrom = this.coffDateFrom[2]+'-'+this.coffDateFrom[1]+'-'+this.coffDateFrom[0];
      console.log(""+this.coffDateFrom);
      this.coffDateTo = this.item.WorkingDate;
      this.coffDateTo = this.item.WorkingDate.split('-');
      this.coffDateTo = this.coffDateTo[2]+'-'+this.coffDateTo[1]+'-'+this.coffDateTo[0];
      console.log(""+this.coffDateTo);
      this.reason = this.item.Reason;
      this.contactPhone=this.item.MobileNum;
      this.dat_valid= {
        currentDate: new Date()
      };
    //   var newDate =this.datepipe.transform(this.item.COFFDate, "yyyy-MM-dd HH:mm:ss Z");

    //  this.coffDateFrom = new Date(newDate);
    //   var newDate2 =this.datepipe.transform(this.item.WorkingDate, "yyyy-MM-dd HH:mm:ss Z");

    //  this.coffDateTo = new Date(newDate2);

    //   var yesterday = new Date().setDate(this.item.from.getDate() - 1);
    //  this.maxdate = yesterday;



  }
  closemodel(){

    this.model.dismiss();
  }
  ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.backbuttonSubscription = event.subscribe(async () => {

     this.model.dismiss();
    });
}
ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
}
  reapply(){
    // var date1 = this.formatDate(this.coffDateFrom);
    // console.log(date1);
    if(this.release ==true)
    {
     this.statusstatus= 'P';
    }
    else{
     this.statusstatus= 'N';
    }

    this.coffDateFrom = this.coffDateFrom.split('-');
    this.coffDateFrom = this.coffDateFrom[2]+'-'+this.coffDateFrom[1]+'-'+this.coffDateFrom[0];
    this.coffDateTo = this.coffDateTo.split('-');
    this.coffDateTo = this.coffDateTo[2]+'-'+this.coffDateTo[1]+'-'+this.coffDateTo[0];
    var reqdate = this.datepipe.transform(Date.now(), "dd-MM-yyyy")

    // var date2 = this.formatDate(this.coffDateTo);
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+ this.Ipaddressservice.serviceurlhrms+"SaveCOFF/" + this.FUNCTION_ID + "/" + this.userID + "/" + this.item.EmpID + "/" + this.requestRef + "/" + this.coffDateFrom + "/" + this.coffDateTo + "/" + this.contactPhone + "/" + 'E' + "/" + this.reason + "/"+ reqdate+ "/" + this.statusstatus).then(resp=>{
      if (resp == '"Attendance not available"') {
        this.toastmessageService.presentAlert1("Request Not Sent","Attendance is not available on the requested date");

      } else if (resp == '"C-OFF should not Availed On  Week Days"') {
        this.toastmessageService.presentAlert1("Request Not Sent","C-OFF should not Availed On  Week Days");
  } else if (resp == '"COFF Request already available for this date"') {
    this.toastmessageService.presentAlert1("Request Not Sent","COFF Request already available for this date");

      } else if (resp == '"C-OFF  Request already available for this date "') {
        this.toastmessageService.presentAlert1("Request Not Sent","C-OFF  Request already available for this date");

          }
          else if (resp == '"Permission already available for this date"') {
            this.toastmessageService.presentAlert1("Request Not Sent","Permission already available for this date");

              }

              else if (resp == '"OD already available for this date"') {
                this.toastmessageService.presentAlert1("Request Not Sent","OD already available for this date");

                  }
      else {

        //IF ATTENDANCE IS PRESENT
        var replace = resp.toString().replace(/"/g, '');
        var split = replace.split("@");
        this.reqID = split[0];
        this.workflowTable = split[2];
        // console.log(split[1]);
        this.userID = this.userID;
        if (split[1] =="C-off Updated Successfully") {
          this.toastmessageService.presentAlert1("Request Not Sent","Request saved Successfully <br> Req Ref : " +this.reqID);

     //SEND TO WORKFLOW
     var b = split[0]
     var a= split[0].split(',')
     this.reqID = a[1];

     this.reqtype = 'null';
  if (this.statusstatus == "P") {
            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/" + this.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp=>{

              if (resp == "1") {
                console.log("Workflow called successfully :" + resp);

              } else {
                // console.log("Workflow not called:" + resp);
              }
              this.cancelCoff();
              this.closemodel();
            }, error => {

            console.log("error : "+JSON.stringify(error));

            });
          }
          this.cancelCoff();
          this.closemodel();
        }
      }


    }, error => {
      this.toastmessageService.presentAlert1("COFF Request not Sent","Something went wrong");


    });

  }

  cancelCoff() {
    this.coffDateFrom = undefined;
    this.coffDateTo = undefined;
    this.reason = undefined;
    this.status = undefined;
    this.coffType = undefined;
  };
  //change the date fromat
  formatDate(value) {
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
}

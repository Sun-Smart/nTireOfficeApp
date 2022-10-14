import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { ToastmessageService } from '../../service/toastmessage.service';

@Component({
  selector: 'app-letterrequest',
  templateUrl: './letterrequest.page.html',
  styleUrls: ['./letterrequest.page.scss'],
})
export class LetterrequestPage implements OnInit {
  name;
  company;
  branch;
  userId;
  usertoken;
  token;
  listletters1;
  listletters = [];
  requestType;
  reason;
  reqID;
  STATUS;
  summarylist1;
  summarylist = [];
  FUNCTION_ID;
  branchId;
  emp_code;
  DEPARTMENT_ID;
  DESIGNATION_ID;

  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private HttpRequest: HttprequestService,
    private alertController: AlertController,
    public Ipaddressservice: IpaddressService, public toastmessageService: ToastmessageService) {
    this.name = window.localStorage['TUM_USER_NAME'];
    this.company = window.localStorage['FUNCTION_DESC'];
    this.branch = window.localStorage['TUM_BRANCH_CODE'];
    this.userId = parseInt(window.localStorage['TUM_USER_ID']);
    this.usertoken = window.localStorage['usertoken'];
    this.token = window.localStorage['token'];
    this.FUNCTION_ID = parseInt(window.localStorage['FUNCTION_ID']);
    this.branchId = parseInt(window.localStorage['TUM_BRANCH_ID']);
    this.emp_code = window.localStorage['TUM_EMP_CODE'];
    this.DEPARTMENT_ID = window.localStorage.getItem['EmpDepartment'];
    this.DESIGNATION_ID = window.localStorage.getItem['EmpDesignation']


    this.requestType = "";
    this.reqType();

  }

  ngOnInit() {
  }
  reqType() {
    var obj = {
      userid: parseInt(this.userId),
      usertoken: this.usertoken,
      access_token: this.token
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "letter_dropdown", obj).then(resp => {
      this.listletters1 = resp;
      this.listletters1.forEach(element => {
        this.listletters.push(element);
      });
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  letterSubmit() {
    if (!this.requestType) {
      this.toastmessageService.presentAlert1("", "please enter requried filed");
    }

    var letter_request = {
      userid: this.userId,
      usertoken: this.usertoken,
      access_token: this.token,
      FUNCTION_ID: this.FUNCTION_ID,
      BRANCH_ID: this.branchId,
      DEPARTMENT_ID: 1,
      DESIGNATION_ID: 1,
      EMP_CODE: this.emp_code,
      LETTER_TYPE: parseInt(this.requestType),
      REASON: this.reason,
      STATUS: "P"
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "insertletter_request", letter_request).then(resp => {
      this.reqID = resp[0].inserted_id;
      this.toastmessageService.presentAlert("", "Request Updated Successfully");
      this.letterList();
      this.requestType = "";
      this.reason = undefined;
      var request = {
        reqID: this.reqID,
        userID: this.userId,
        workflowTable: 'HRMS_LETTER_REQUEST_DETAILS ',
        reqtype: 'null'
      }
      if (this.STATUS == "P") {
        this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms1 + "WorkFlowAuth/" + this.reqID + "/" + request.reqtype + "/null/null/" + request.userID + "/1/" + request.workflowTable).then(resp => {
          if (resp == "1") {
            console.log("Workflow called successfully :" + resp);

          } else {
            // console.log("Workflow not called:" + resp);
          }
        }, error => {

          console.log("error : " + JSON.stringify(error));

        });
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  }
  letterList() {
    var obj = {
      userid: parseInt(this.userId),
      usertoken: this.usertoken,
      access_token: this.token
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "summaryletter_request", obj).then(resp => {
      this.summarylist1 = resp;
      this.summarylist1.forEach(element => {
        this.summarylist.push(element);
      });
    }, error => {

      console.log("error : " + JSON.stringify(error));
    });
  }
  // requestClear() {
  //   this.requestType = "";
  //   this.reason = undefined;
  // }
  async requestClear() {
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

            this.requestType = "";
            //   this.reason = undefined;
          }
        }
      ]
    });

    await alert.present();
  }
}


import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { ToastmessageService } from '../../service/toastmessage.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-assetrequest',
  templateUrl: './assetrequest.page.html',
  styleUrls: ['./assetrequest.page.scss'],
})
export class AssetrequestPage implements OnInit {
  status;
  name;
  company;
  branch;
  department;
  empID;
  contact;
  userID;
  empCode;
  usertoken;

  FUNCTION_ID;
  categoryData: any = [];
  subCategoryData: any = [];
  assestCategory;
  assestsubCategory;
  reqID;
  TUM_BRANCH_ID;
  requestDate;
  returnDate;
  reqbeforedte;
  reason;
  workflowTable;
  reqtype;
  urldata;
  asstRequest;
  ASSETCATEGORY;
  ASSETSUBCATEGORY;
  ASSETCODE;
  workflow_no;
  dat_valid;
  rreqid3: string;
  reqID2: string[];
  release: boolean;
  disabledvalue: boolean;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private router: Router, private route: ActivatedRoute,
    public alertController: AlertController, private datepipe: DatePipe, private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService, public toastmessageService: ToastmessageService) {
    this.status = "P";
    this.userID = window.localStorage['TUM_USER_ID'];
    this.empCode = window.localStorage['TUM_EMP_CODE'];

    this.empID = parseInt(window.localStorage['EmployeeID']);
    this.usertoken = window.localStorage['usertoken'];
    this.status = "P";
    this.release = false;
    this.name = window.localStorage['TUM_USER_NAME'];
    this.company = window.localStorage['FUNCTION_DESC'];
    this.branch = window.localStorage['TUM_BRANCH_CODE'];
    this.FUNCTION_ID = window.localStorage['FUNCTION_ID'];
    this.TUM_BRANCH_ID = window.localStorage['TUM_BRANCH_ID'];
    this.reqID = " ";
    this.assestCategory = "";
    this.assestsubCategory = "";
    this.disabledvalue = false;
    this.dat_valid = {
      currentDate: new Date()
    };
    this.getAssetCategory();
    this.urldata = this.route.params.subscribe(params => {
      // this.asstRequest = JSON.parse(params.item);
      this.asstRequest = JSON.stringify(params.item);
      if (this.asstRequest != undefined) {
        this.ASSETCATEGORY = this.asstRequest.ASSETCATEGORY;
        this.ASSETSUBCATEGORY = this.asstRequest.ASSETSUBCATEGORY;
        this.ASSETCODE = this.asstRequest.ASSETCODE;
        this.reason = this.asstRequest.REASON;
        this.returnDate = this.asstRequest.REQUESTON;
        this.reqID = this.asstRequest.RequestRef;
        this.workflow_no = this.asstRequest.workflow_no;
        this.disabledvalue = true;
      }
    });
  }

  ngOnInit() {
  }

  //get asset category
  getAssetCategory() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/LoadAssetCategory").then(resp => {
      this.categoryData = resp;

      console.log(this.categoryData)
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });

  }
  //get assests sub category
  getAssestsSubcat(value) {
    console.log(value)
    let getvalue = value
    console.log(getvalue)
    // this.subCategoryData = [];
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/LoadAssetSubCategory/" + this.FUNCTION_ID + "/" + getvalue).then(resp => {
      this.subCategoryData = resp;
      console.log(this.subCategoryData);
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
  }

  assestsSubmit() {
    this.requestDate = this.datepipe.transform(this.requestDate, "yyyy-MM-dd");
    this.returnDate = this.datepipe.transform(this.returnDate, "yyyy-MM-dd");
    this.reqbeforedte = this.datepipe.transform(this.reqbeforedte, "yyyy-MM-dd");
    var date1 = this.formatDate(this.requestDate);
    var date2 = this.formatDate(new Date(this.returnDate));
    var date3 = this.formatDate(new Date(this.reqbeforedte));
    this.reqID = 8
    // if (this.reqID == undefined) {
    //   this.reqID == 0
    // }
    //  if (this.status == undefined) {
    //   this.status = "P";
    // }
    if (this.release == true) {
      this.status = 'P';
    }
    else {
      this.status = 'N';
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/SaveAssets/" + this.FUNCTION_ID + "/" + this.TUM_BRANCH_ID + "/" + this.reqID + "/" + this.empID + "/" + date1 + "/" + this.assestCategory + "/" + this.assestsubCategory + "/" + date2 + "/" + this.reason + "/" + this.status).then(resp => {
      if (resp == '"Attendance not available"') {
        this.toastmessageService.presentAlert1("Request Not Sent", "Attendance is not available on the requested date");

      } else if (resp == '"Employee Office Hrs should not be less that Total Office Hrs"') {
        this.toastmessageService.presentAlert1("Request Not Sent", "Employee Office Hrs should not be less that Total Office Hrs");
      } else if (resp == '"COFF Request already available for this date"') {
        this.toastmessageService.presentAlert1("Request Not Sent", "COFF Request already available for this date");


      } else {



        var replace = resp.toString().replace(/"/g, '');
        var split = replace.split("@");
        this.rreqid3 = split[0];
        // console.log(""+this.reqID);
        this.reqID2 = this.rreqid3.split(',');
        this.reqID = this.reqID2[1];
        // console.log(""+ this.rreqid3+""+ this.reqID2)
        this.workflowTable = split[2];
        this.userID = this.userID;
        // console.log(split[2]);
        this.reqtype = 'null';




        //IF ATTENDANCE IS PRESENT
        // var replace = resp.toString().replace(/"/g, '');
        // var split = replace.split("@");
        // this.workflowTable = split[2];
        // this.userID = this.userID;
        // // console.log(split[2]);
        // this.reqID = split[0];

        if (split[1] == "8@Asset Request Updated Successfully@HRMS_INFRASTRUCTURE_REQUEST_MASTER") {
          this.toastmessageService.presentAlert1("Request Sent", "Request saved Successfully <br> Req Ref : " + this.rreqid3);

          this.reqtype = 'null';
          if (this.status == "P") {
            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms1 + "WorkFlowAuth/" + this.rreqid3 + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp => {

            }, error => {

              console.log("error : " + JSON.stringify(error));

            });
          }

          var typerequest = "Asset Request";

          var perdate = null;
          var reportobj = {
            Userid: '',
            from: '',
            to: '',
            typerequest: '',
            userid: '',
            usertoken: '',
            access_token: ''
          }
          reportobj.Userid = this.userID
          reportobj.from = this.requestDate
          reportobj.to = this.reqbeforedte
          reportobj.typerequest = typerequest
          reportobj.userid = this.userID
          reportobj.usertoken = this.usertoken
          reportobj.access_token = window.localStorage.token
          var perdate = null;
          this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms2 + "getreportingto/", reportobj).then(resp => {

          }, error => {

            console.log("error : " + JSON.stringify(error));

          });

        }
      }
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
    // this.assestCancel();
  }
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

  async assestCancel() {
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

            this.assestCategory = "";
            this.assestsubCategory = "";
            this.requestDate = undefined;
            this.returnDate = undefined;
            this.reqbeforedte = undefined;
            this.reason = undefined;
          }
        }
      ]
    });

    await alert.present();
  }











  // assestCancel() {
  //   this.assestCategory = "";
  //   this.assestsubCategory = "";
  //   this.requestDate = undefined;
  //   this.returnDate = undefined;
  //   this.reqbeforedte = undefined;
  //   this.reason = undefined;
  // }
  assesstsList() {
    this.router.navigateByUrl('/assetssummary')
  }
}

// import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { IpaddressService } from 'src/app/ipaddress.service';
import { HttprequestService } from 'src/app/service/httprequest.service';
import { IpaddressService } from 'src/app/service/ipaddress.service';
import { ToastmessageService } from 'src/app/service/toastmessage.service';

@Component({
  selector: 'app-claimssummary',
  templateUrl: './claimssummary.page.html',
  styleUrls: ['./claimssummary.page.scss'],
})
export class ClaimssummaryPage implements OnInit {
  function_id;
  userID;
  usertoken;
  token;
  TUM_BRANCH_ID;
  empCode;
  claimSummary = [];
  claimSummary1;
  Reqcategory1;
  Reqcategory = [];
  ReferenceData = [];
  error;
  username = window.localStorage.getItem('TUM_USER_NAME');
  empID1: any;
  constructor(private router: Router, private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService, public toastmessageService: ToastmessageService) {
    this.function_id = window.localStorage["FUNCTION_ID"];
    this.userID = parseInt(window.localStorage['TUM_USER_ID']);
    this.usertoken = window.localStorage['usertoken'];
    this.token = window.localStorage['token'];
    this.TUM_BRANCH_ID = parseInt(window.localStorage['TUM_BRANCH_ID']),
      this.empCode = window.localStorage['TUM_EMP_CODE'];
    this.requestCat = "";
    this.getEmployeeDetails();
    this.getReqcategory();
    this.getClaimSummary();

  }

  ngOnInit() {
    this.empID = window.localStorage['EmployeeID']
    // this.empID1=parseInt(window.localStorage['EmployeeID'])
  }
  requestCat;
  description;
  status;
  name;
  company;
  branch;
  department;
  empID;
  contact;
  getEmployeeDetails() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms2 + "GetEmployees/" + this.empCode).then(resp => {
      console.log(resp)
      if (resp == "Employee not Exist") {
        this.toastmessageService.presentAlert1("", "Employee Does not Exist");

      } else {
        this.status = "P";
        this.name = window.localStorage['TUM_USER_NAME'];

        this.company = window.localStorage['FUNCTION_DESC'];
        this.branch = window.localStorage['TUM_BRANCH_CODE']
        //  var employeeDetails = JSON.parse(resp.toString());
        var employeeDetails = resp;


        this.department = employeeDetails[0].Department;
        this.empID = employeeDetails[0].EmpID;
        // this.empID1=parseInt(window.localStorage['EmployeeID'])

        this.contact = employeeDetails[0].ContactPhone;

      }
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  getClaimSummary() {

    this.empID1 = parseInt(window.localStorage['EmployeeID'])
    console.log(this.empID)
    console.log(this.requestCat)
    console.log(this.status)
    console.log(this.description)
    this.claimSummary = [];
    if (this.requestCat != undefined) {
      var cat = this.requestCat;
    }
    else {
      cat = ""

    }
    if (this.description != undefined) {
      var descrpt = this.description;
    }
    else {
      descrpt = "";
    }
    if (this.status != undefined) {
      var status = this.status;
    }
    else {
      status = "";
    }
    var summaryobj = {
      User_ID: parseInt(this.userID),
      userid: parseInt(this.userID),
      usertoken: this.usertoken,
      access_token: this.token,
      function: parseInt(this.function_id),
      Branch: parseInt(this.TUM_BRANCH_ID),
      EmpId: parseInt(this.empID1),
      ExpCategory: cat,
      Description: descrpt,
      Status: status,
      assetcode: status
    }


    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms2 + 'getsummaryClaims', summaryobj).then(resp => {

      if (resp != "[]" && resp != "") {

        this.claimSummary1 = resp;

        this.claimSummary1.forEach(element => {
          this.claimSummary.push(element);
        });
        this.error = "";
      } else {

        this.error = "No data found";
      }

    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }

  cancel() {
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/claimsrequest'])
  }

  getReqcategory() {
    var Catobj = {
      User_ID: this.userID,
      FunctionID: parseInt(this.function_id),
      userid: parseInt(this.userID),
      usertoken: this.usertoken,
      access_token: this.token,
      appURL: 'getrequestcategoryclaims'
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms2 + "getRequestCategoryClaims", Catobj).then(resp => {

      console.log(resp)
      this.Reqcategory1 = resp;
      this.Reqcategory1.forEach(element => {
        this.Reqcategory.push(element)
      });
      console.log("ReferenceData : " + JSON.stringify(this.ReferenceData));
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }








  // getReqcategory(){
  //   var Catobj={
  //     User_ID: parseInt(this.userID),
  //     FunctionID: parseInt(this.function_id),
  //      userid: parseInt(this.userID),
  //      usertoken:this.usertoken,
  //      access_token:this.token,
  //     }
  //     this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getRequestCategoryClaims/",Catobj).then(resp=>{
  //       console.log(resp)
  //       this.Reqcategory1=resp;
  //       this.Reqcategory1.forEach(element => {
  //         this.Reqcategory.push(element)
  //       console.log(this.Reqcategory)
  //       });
  //       console.log(this.Reqcategory)

  //      }, error => {

  //      console.log("error : "+JSON.stringify(error));

  //      });
  // }
}

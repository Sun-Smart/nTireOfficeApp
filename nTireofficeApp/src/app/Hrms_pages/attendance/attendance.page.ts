import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
// import { JsonException } from '@angular-devkit/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  allemp;
  displayEmployee: any = [];
  empid;
  FUNCTION_ID;
  year: any = [];
  month: any = [];
  employee_id;
  yeardata;
  monthdata;
  attendanceList = [];
  nodata: boolean;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService, public alertController: AlertController, public loadingController: LoadingController) {
    this.FUNCTION_ID = window.localStorage['FUNCTION_ID'];

    this.employee_id = window.localStorage['EmployeeID'];
    this.yeardata = "";
    this.monthdata = "";
    this.getEmployeeList();
    this.geYears();
    this.geMonths();
  }

  ngOnInit() {
  }

  getEmployeeList() {
    var obj = {
      empID: parseInt(window.localStorage.getItem("EmployeeID")),
      name: window.localStorage.getItem("EmployeeName"),
      code: window.localStorage.getItem("TUM_EMP_CODE"),
      department: window.localStorage.getItem("EmpDepartment"),
      designation: window.localStorage.getItem("EmpDesignation"),
      branch: parseInt(window.localStorage.getItem("TUM_BRANCH_ID")),
      // designation: "20",
      // branch: 0,
      top: 20,
      increment: 0,
      appURL: 'employeelist'
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + '/EmployeeSearch/' + obj.empID + "/" + obj.name + "/" + obj.code + "/" + obj.designation + "/" + obj.branch + "/" + obj.department + "/" + obj.top + "/" + obj.increment + "/" + obj.appURL).then(resp => {
      this.displayEmployee = resp;
      this.displayEmployee = this.displayEmployee[0];

      console.log("displayEmployee : " + JSON.stringify(this.displayEmployee));

    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  geYears() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/CommonDropdown/Year/0/0/0").then(resp => {
      this.year = resp;

    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  geMonths() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/CommonDropdown/Month/0/0/0").then(resp => {
      this.month = resp;

    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  };
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }
  getAttendance() {
    this.nodata = false;
    this.attendanceList = [];
   
    // console.log(this.attendance.empID);
    if (this.yeardata == undefined) {
      this.yeardata = "0";
    }
    if (this.monthdata == undefined) {
      this.monthdata = "0";
    };

    if ((this.yeardata == '' && this.monthdata == '') || (this.yeardata != '' && this.monthdata == '') || (this.yeardata == '' && this.monthdata != '')) {
      this.presentAlert(' ', 'Please Select Year & Month');
    }else{
      this.presentLoadingWithOptions();
    var obj = {
      empID: this.employee_id,
      year: this.yeardata,
      month: this.monthdata

    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/EmployeeDailyAttendance/" + obj.empID + "/" + obj.year + "/" + obj.month + "/1").then((resp: any) => {

      this.loadingdismiss();
      // this.attendanceList = JSON.parse(resp.toString());
      this.attendanceList = resp;
      console.log(resp)
      console.log("" + JSON.stringify(this.attendanceList));
      if (this.attendanceList.length == 0) {
        this.nodata = true;
      }
      debugger
      for (var i = 0; i < this.attendanceList.length; i++) {
        this.attendanceList[i].TxnDate = this.getDateObj(this.attendanceList[i].TxnDate)
      }
      this.attendanceList = this.attendanceList.sort((a, b) => a.TxnDate - b.TxnDate)
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  }

  getDateObj(value) {
    var split = value.split("/");
    var date = new Date(split[1] + "/" + split[0] + "/" + split[2]);
    return date;
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',


    });
    return await loading.present();
  }
  async loadingdismiss() {

    return await this.loadingController.dismiss();
  }



}

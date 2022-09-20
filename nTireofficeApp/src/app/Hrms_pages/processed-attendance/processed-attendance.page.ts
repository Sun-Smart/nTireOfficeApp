import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-processed-attendance',
  templateUrl: './processed-attendance.page.html',
  styleUrls: ['./processed-attendance.page.scss'],
})
export class ProcessedAttendancePage implements OnInit {
  empid;
  displayEmployee=[];
  year=[];
  month=[];
  FUNCTION_ID;
  yeardata;
  employee_id;
  monthdata;
  attendanceList=[];
  nodata:boolean;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public loadingController: LoadingController,) {
    this.empid=window.localStorage['empid'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];

    this.employee_id = window.localStorage['em_emp_id'];
    this.yeardata="";
    this.monthdata="";
    this.getEmployeeList();
    this.geYears();
    this.geMonths();
   }

  ngOnInit() {
  }
  getEmployeeList(){
    var obj = {
       empID: this.empid,
       name: "%20",
       code: "%20",
       designation: "%20",
       branch: 0,
       department: 0,
       top: 0,
       increment: 1
     }
  this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+'/EmployeeSearch/'+ obj.empID + "/" + obj.name + "/" + obj.code + "/" + obj.designation + "/" + obj.branch + "/" + obj.department + "/" + obj.top + "/" + obj.increment).then(resp=>{
   this.displayEmployee = JSON.parse(resp.toString());
   this.displayEmployee = this.displayEmployee[0];

   console.log("displayEmployee : "+JSON.stringify(this.displayEmployee));

     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
   }
   geYears(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/CommonDropdown/"+this.FUNCTION_ID+"/Year/%20/0/0").then(resp=>{
      this.year = JSON.parse(resp.toString());

        }, error => {

        console.log("error : "+JSON.stringify(error));

        });
  }
  geMonths(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/CommonDropdown/"+this.FUNCTION_ID+"/Month/%20/0/0").then(resp=>{
      this.month = JSON.parse(resp.toString());

        }, error => {

        console.log("error : "+JSON.stringify(error));

        });
  }

  getAttendance(){
    this.nodata = false;
    this.presentLoadingWithOptions();
    // console.log(this.attendance.empID);
    if (this.yeardata == undefined) {
      this.yeardata = "0";
    }
    if (this.monthdata == undefined) {
      this.monthdata = "0";
    }
    var obj={
      empID:this.employee_id,
      year:this.yeardata,
      month:this.monthdata

    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "EmployeeDailyAttendance/" + obj.empID + "/" + obj.year + "/" + obj.month + "/1").then(resp=>{
      this.loadingdismiss();
      this.attendanceList = JSON.parse(resp.toString());
      if(this.attendanceList.length == 0){
        this.nodata = true;
      }

      for (var i = 0; i < this.attendanceList.length; i++) {
        this.attendanceList[i].TxnDate = this.getDateObj(this.attendanceList[i].TxnDate)
      }
      this.attendanceList = this.attendanceList.sort((a, b) => a.TxnDate - b.TxnDate)
        }, error => {

        console.log("error : "+JSON.stringify(error));
        this.loadingdismiss();
        });
        this.loadingdismiss();
}

getDateObj(value){
  var split = value.split("/");
  var date = new Date(split[1] + "/" + split[0] + "/" + split[2]);
  return date;
}

async presentLoadingWithOptions() {
  const loading = await this.loadingController.create({
    spinner: 'crescent',

    message: 'Please wait...',
    translucent: true,
    cssClass: 'custom-class custom-loading',


  });
  return await loading.present();
}
async   loadingdismiss() {

   return await this.loadingController.dismiss();
}

}

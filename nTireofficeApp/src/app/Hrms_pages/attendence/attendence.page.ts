/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttprequestService } from 'src/app/service/httprequest.service';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.page.html',
  styleUrls: ['./attendence.page.scss'],
})
export class AttendencePage implements OnInit {

  allemp;
  displayEmployee=[];
  empid;
  FUNCTION_ID: any;
  year=[];
  month=[];
  employee_id: any;
  yeardata;
  monthdata;
  attendanceList=[];
  nodata = false;
  username = window.localStorage.getItem('TUM_USER_NAME');
  loadingController: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,) {

    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.empid=window.localStorage['empid'];
    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];

    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.employee_id = window.localStorage['empid'];
    this.yeardata='';
    this.monthdata='';
    this.getEmployeeList();
    this.geYears();
    this.geMonths();
   }

  ngOnInit() {
  }
  getEmployeeList(){
    const obj = {
       empID: this.empid,
       // eslint-disable-next-line @typescript-eslint/quotes
       name: window.localStorage.getItem("TUM_USER_NAME"),
       // eslint-disable-next-line @typescript-eslint/quotes
       code: window.localStorage.getItem("TUM_EMP_CODE"),
       designation: '%20',
       branch: 0,
       department: 0,
       top: 0,
       increment: 1
     // eslint-disable-next-line @typescript-eslint/semi
     }
  // eslint-disable-next-line max-len, @typescript-eslint/quotes
  this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+'/EmployeeSearch/'+ obj.empID + "/" + obj.name + "/" + obj.code + '/' + obj.designation + '/' + obj.branch + '/' + obj.department + '/' + obj.top + '/' + obj.increment).then(resp=>{
   this.displayEmployee = JSON.parse(resp.toString());
   this.displayEmployee = this.displayEmployee[0];

   // eslint-disable-next-line @typescript-eslint/quotes
   console.log("displayEmployee : "+JSON.stringify(this.displayEmployee));
     }, error => {
     // eslint-disable-next-line @typescript-eslint/quotes
     console.log("error : "+JSON.stringify(error));
     });
   }
   geYears(){
     // eslint-disable-next-line max-len, @typescript-eslint/quotes
     this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/CommonDropdown/"+this.FUNCTION_ID+'/Year/%20/0/0').then(resp=>{
       this.year = JSON.parse(resp.toString());
         }, error => {
         // eslint-disable-next-line @typescript-eslint/quotes
         console.log("error : "+JSON.stringify(error));
         });
   }
   geMonths(){
     // eslint-disable-next-line max-len, @typescript-eslint/quotes
     this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/CommonDropdown/"+this.FUNCTION_ID+'/Month/%20/0/0').then(resp=>{
       this.month = JSON.parse(resp.toString());
         }, error => {
         // eslint-disable-next-line @typescript-eslint/quotes
         console.log("error : "+JSON.stringify(error));
         });
   }
   getAttendance(){
     this.nodata=false;
     this.presentLoadingWithOptions();
       // console.log(this.attendance.empID);
       if (this.yeardata === undefined) {
         this.yeardata = '0';
       }
       if (this.monthdata === undefined) {
         this.monthdata = '0';
       }
       const obj={
         empID:this.employee_id,
         year:this.yeardata,
         month:this.monthdata
       // eslint-disable-next-line @typescript-eslint/semi
       }
       // eslint-disable-next-line max-len, @typescript-eslint/quotes
       this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "EmployeeDailyAttendance/" + obj.empID + "/" + obj.year + '/' + obj.month + '/1').then(resp=>{
 this.loadingdismiss();
         this.attendanceList = JSON.parse(resp.toString());
         // eslint-disable-next-line @typescript-eslint/quotes
         console.log(""+JSON.stringify(this.attendanceList));
         if(this.attendanceList.length===0){
           this.nodata = true;
         }
           // eslint-disable-next-line @typescript-eslint/prefer-for-of
           for (let i = 0; i < this.attendanceList.length; i++) {
             this.attendanceList[i].TxnDate = this.getDateObj(this.attendanceList[i].TxnDate);
           }
           // eslint-disable-next-line @typescript-eslint/semi
           this.attendanceList = this.attendanceList.sort((a, b) => a.TxnDate - b.TxnDate)
           }, error => {
           // eslint-disable-next-line @typescript-eslint/quotes
           console.log("error : "+JSON.stringify(error));
           });
   }

   getDateObj(value){
     // eslint-disable-next-line no-var
     var split = value.split('/');
     // eslint-disable-next-line no-var
     var date = new Date(split[1] + '/' + split[0] + '/' + split[2]);
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

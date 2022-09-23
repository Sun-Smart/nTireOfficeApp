import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-attendance-notification',
  templateUrl: './attendance-notification.page.html',
  styleUrls: ['./attendance-notification.page.scss'],
})

export class AttendanceNotificationPage implements OnInit {
  userid;
  usertoken;
  notification1;
  notification=[];
  TUM_USER_CODE;
  token;
  notify=[];
  checklist;
  new_array1=[];
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private router: Router,private datepipe: DatePipe,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.TUM_USER_CODE = localStorage.getItem('TUM_USER_CODE');
    this.token=window.localStorage['token'];
    this.userid= window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.getNotification();
  }

  ngOnInit() {
  }
  getNotification(){
    var dorefreshobj={

      userid:this.userid,
      usertoken:this.usertoken,
      access_token:this.token
}
this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+"get_daily_attendance/",dorefreshobj).then(resp=>{
  this.notification1 = resp;
  // var self= this;
  this.notification1.forEach(element => {
    this.notification.push(element);
  });
  var obj={
   user_code:this.TUM_USER_CODE,
   userid:this.userid,
   usertoken:this.usertoken,
   access_token:this.token
  }
  this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+"get_all_notify_users/",obj).then(resp=>{
    this.checklist = resp;

    this.notify = [];
    for (var i = 0; i < this.checklist.length; i++) {
      var result:any;
      result = this.arraycheck(this.notification, 'EM_EMP_CODE', this.checklist[i].Notify_Emp_Code);
     console.log(result)
     console.log(this.notification)
     // console.log(this.checklist[i].In_Notify);
     if(result>-1){
      if(this.checklist[i].In_Notify == "true      "){
         this.notification[result].Innotify_flag = 'true';
      }
      if(this.checklist[i].Out_Notify == "true      "){
         this.notification[result].Outnotify_flag = 'true';
      }
      console.log(this.notification)
    }else{
      console.log("no record in array");
    }
    }
  }, error => {
  console.log("error : "+JSON.stringify(error));
  });
}, error => {

console.log("error : "+JSON.stringify(error));

});
  }
  arraycheck(array, attr, value) {
    var initial_array = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i][attr] == value) {
        return i;
      }
    }
    if (initial_array.length > 0) {
      return initial_array;
    } else {
      return -1;
    }
  };
  checkAll(){
    for(let i =0; i <= this.notification.length; i++) {
      this.notification[i].checked = true;
    }
   console.log(this.notification);
  }
  Save(){
    this.new_array1 =[];
     var testarray = $('input[name="checkindex"]:checked');
    for (var i = 0; i < testarray.length; i++) {
     this.new_array1.push(this.notification[testarray[i].CDATA_SECTION_NODE]);
    }

    var temp_array = [];
    for (var i = 0; i < this.new_array1.length; i++) {
      var obj = {
        'user_code': this.TUM_USER_CODE,
        'users_array': [{
          'Emp_Code': this.new_array1[i].EM_EMP_CODE,
          'in_notify': this.new_array1[i].checkin == undefined ? false : true,
          'out_notify': this.new_array1[i].checkout == undefined ? false : true
        }]
      }
      temp_array.push(obj);
    }

    var reqData = {
      "dataBack": temp_array,
      "userid":this.userid,
      "usertoken":this.usertoken,
      "access_token":window.localStorage['token']
    };

    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"set_notification_configure/",reqData).then(resp=>{
      this.toastmessageService.presentAlert1("Attendance Notification","Sucessfully Saved");
    }, error => {
    console.log("error : "+JSON.stringify(error));
    });
  }
}


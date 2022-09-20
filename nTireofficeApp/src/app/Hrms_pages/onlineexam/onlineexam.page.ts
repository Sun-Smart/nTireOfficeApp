import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onlineexam',
  templateUrl: './onlineexam.page.html',
  styleUrls: ['./onlineexam.page.scss'],
})
export class OnlineexamPage implements OnInit {
  usertype;
  userId;
  usertoken;
  token;
  Exam_List1;
  Exam_List=[];
  time;
  DURATION;
  ExamDetailsobj;
  exampage;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private router: Router,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.usertype=window.localStorage['TUM_USER_TYPE'];
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];

    this.getExamlist();
  }

  ngOnInit() {
  }
  getExamlist(){
    var examlistobj={
      APPLICANT_ID:this.userId,
      userid:this.userId,
      usertoken:this.usertoken,
      access_token:this.token
     }
     this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"get_testExam_list/",examlistobj).then(resp=>{
      if(resp==''){
       this.Exam_List=[];
     }else{
      this.Exam_List1 = resp;
      this.Exam_List1.forEach(element => {
        this.time=element.DURATION.split('T');
        this.DURATION=this.time[1].split(':');
        element.Exam_DURATION=this.DURATION;
        this.Exam_List.push(element);
      });

     }
    }, error => {

    console.log("error : "+JSON.stringify(error));

    });
  }
  goToExamStart(obj){
    this.time=obj.DURATION.split('T');
		this.DURATION=this.time[1].split(':');
		this.ExamDetailsobj={};
		obj.Exam_DURATION=this.DURATION;
		console.log(obj)
    this.exampage=0;
     this.router.navigate(['/hrmsexamdetails', {
      time:this.time,
      DURATION:this.DURATION,
      ExamDetailsobj:obj,
            }])

  }
}

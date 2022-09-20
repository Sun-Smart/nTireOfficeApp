import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';

@Component({
  selector: 'app-questionreport',
  templateUrl: './questionreport.page.html',
  styleUrls: ['./questionreport.page.scss'],
})
export class QuestionreportPage implements OnInit {
  urldata;
  reportData;
  userId;
  usertoken;
  token;
  QusetionAnsDetails1;
  QusetionAnsDetails=[];
  constructor(private router:Router,private route:ActivatedRoute,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService) {
    this.urldata = this.route.params.subscribe(params => {

      this.reportData=JSON.parse(params.reportData);
      this.userId=window.localStorage['TUM_USER_ID'];
      this.usertoken=window.localStorage['usertoken'];
      this.token=window.localStorage['token'];
      this.getQuestionReport();
   });



   }

  ngOnInit() {
  }
  getQuestionReport(){
  	var QuestAnsDetailobj={
			COURSE_ID:this.reportData.COURSE_ID,
			LESSON_ID:this.reportData.LESSON_ID,
			TOPIC_ID:this.reportData.TOPIC_ID,
			TEST_TYPE_ID:this.reportData.TEST_TYPE_ID,
			START_TIME:this.reportData.START_TIME,
			APPLICANT_ID:this.userId,
		  	userid:this.userId,
		    usertoken:this.usertoken,
		    access_token:this.token
			}
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + 'get_questionDetailCorrection/',QuestAnsDetailobj).then(resp => {
      this.QusetionAnsDetails1=resp;
      this.QusetionAnsDetails1.forEach(element => {
        this.QusetionAnsDetails.push(element);
      });
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
}

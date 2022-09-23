import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';

@Component({
  selector: 'app-onlineexamtimer',
  templateUrl: './onlineexamtimer.page.html',
  styleUrls: ['./onlineexamtimer.page.scss'],
})
export class OnlineexamtimerPage implements OnInit {
  Marks;
  indexval;
  exampage;
  AnswersList;
  QAns1=[];
  allAnsArray=[];
  urldata;
  item;
  userId;
  usertoken;
  token;
  QAns=[];
  QAnsLength;
  StartTime;
  UNIQUEID;
  ans;
  ans1;
  QAns2;
  endtime;
  COURSE_ID;
  LESSON_ID;
  TOPIC_ID;
  TEST_TYPE_ID;
  START_TIME;
  END_TIME;
  countreport;
  NO_WRONG_ANSWER;
  insertreportcountobj1;
  ExamDetailsobj;
  constructor(private route:ActivatedRoute,private router: Router,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.urldata = this.route.params.subscribe(params => {
     this.item=params.data;
     this.ExamDetailsobj=params.ExamDetailsobj;
      });
      this.userId=window.localStorage['TUM_USER_ID'];
      this.usertoken=window.localStorage['usertoken'];
      this.token=window.localStorage['token'];
    this.examDetails();
   }

  ngOnInit() {
  }
  examDetails(){
    this.exampage=1;
    console.log("hello")
      this.AnswersList=[];
      this.QAns1=[];
      this.allAnsArray=[];
    var examlistobj1={
      COURSE_ID:this.item.COURSE_CATEGORYID,
      TEST_TYPE_ID:this.item.TEST_TYPE_ID,
      LESSON_ID:this.item.COURSE_ID,
      TOPIC_ID:this.item.CHAPTER_ID,
         userid:this.userId,
         usertoken:this.usertoken,
         access_token:this.token
        }

        console.log(examlistobj1)

        this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"get_questionAnswer_list/",examlistobj1).then(resp=>{
          this.QAns2=resp;
          this.QAns2.forEach(element => {
            this.QAns.push(element)
          });

          this.QAnsLength=this.QAns.length;
          for(var i=0;i<this.QAns.length;i++){
            this.QAns[i].START_TIME=this.StartTime;
            this.QAns[i].UNIQUEID=this.UNIQUEID;
            this.QAns[i].Choosen='False';
            this.QAns[i].ChooseAnsVal='';
            this.QAns[i].ChooseAnsID='';
            this.QAns[i].CorrectAnswer='';
            this.ans=this.QAns[i].Answers.split('///');
            console.log(this.ans);
            console.log(this.ans.length);

            // console.log(this.aftersplit);
            for(var j=0;j<this.ans.length;j++){
              if(this.ans[j])
              {
              this.ans1=this.ans[j].split('---');
              console.log(this.ans1);
             this.AnswersList={
               'TEST_QUESTION_ID':this.QAns[i].TEST_QUESTION_ID,
               'AnswerID':this.ans1[0],
               'CorrectAnswer':this.ans1[1],
               'Answer':this.ans1[2]
              };
             console.log(this.AnswersList)
             var objvalue={
               'TEST_QUESTION_ID':this.QAns[i].TEST_QUESTION_ID,
               'Answer':[this.AnswersList]
               };
var index:any;
            index = this.getIndexIfObjWithOwnAttr(this.allAnsArray,'TEST_QUESTION_ID',this.QAns[i].TEST_QUESTION_ID);
           console.log(index)
           if(index == -1){
             console.log("Not match");
             this.allAnsArray.push(objvalue);
             // this.allAnsArray.push(this.AnswersList);
           }else{
               console.log("Coming match")
               this.allAnsArray[index].Answer.push(this.AnswersList);

           }

            }
          }

          }

        }, error => {

        console.log("error : "+JSON.stringify(error));

        });



        setTimeout(function()
        {
          console.log(this.allAnsArray)
          console.log(this.QAns)
          if(this.QAns!=[]){
            this.Marks=this.QAns[0].TEST_QUESTION_MARK;
          }


        },500)
  }

  SubmitTestAnswer(){
    this.exampage=0;
	console.log(this.QAns);

	console.log(this.QAns.length)
	if(this.QAns.length==0){
	  this.router.navigateByUrl("hrmsonlineexamportal");
		alert("Something went wrong")

		location.reload();

	}else{
	this.endtime=new Date();
	for(var i=0;i<this.QAns.length;i++){
		this.QAns[i].END_TIME=this.endtime;
		if(this.QAns[i].CorrectAnswer=='Y'){
			// alert("correct")
			this.QAns[i].TEST_MARK=this.QAns[i].TEST_QUESTION_MARK;
		}else{
			this.QAns[i].TEST_MARK=0;
			// alert("wrong")
		}

		this.COURSE_ID=this.QAns[i].COURSE_ID;
		this.LESSON_ID=this.QAns[i].LESSON_ID;
		this.TOPIC_ID=this.QAns[i].UNIQUEID;
		this.TEST_TYPE_ID=this.QAns[i].TEST_TYPE_ID;
		this.START_TIME=this.QAns[i].START_TIME;
		this.END_TIME=this.QAns[i].END_TIME;

	var ansobj={
		FUNCTION_ID:window.localStorage['FUNCTION_ID'],
		COURSE_ID:this.QAns[i].COURSE_ID,
		LESSON_ID:this.QAns[i].LESSON_ID,
		TOPIC_ID:this.QAns[i].UNIQUEID,
		TEST_TYPE_ID:this.QAns[i].TEST_TYPE_ID,
		TEST_DATE:new Date(),
		APPLICANT_ID:window.localStorage['TUM_USER_ID'],
		ANSWER_DESC:this.QAns[i].ChooseAnsVal,
		START_TIME:this.QAns[i].START_TIME,
		END_TIME:this.QAns[i].END_TIME,
		CREATED_BY:window.localStorage['TUM_USER_ID'],
		CREATED_ON:new Date(),
		UPDATED_BY:window.localStorage['TUM_USER_ID'],
		UPDATED_ON:new Date(),
		TEST_MARK:this.QAns[i].TEST_MARK,
		TEST_QUESTION_ID:this.QAns[i].TEST_QUESTION_ID,
		correct_answer:this.QAns[i].CorrectAnswer,
       userid:window.localStorage['TUM_USER_ID'],
       usertoken:window.localStorage['usertoken'],
       access_token:window.localStorage['token']
      }

      console.log(ansobj);
      this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"inserttestAnswers/",ansobj).then(resp=>{
      	this.exampage=0;
      }, error => {

      console.log("error : "+JSON.stringify(error));

      });

	 }



	 var getreportcountobj1={
			APPLICANT_ID:window.localStorage['TUM_USER_ID'],
			COURSE_ID:this.COURSE_ID,
			LESSON_ID:this.LESSON_ID,
			TOPIC_ID:this.TOPIC_ID,
			TEST_TYPE_ID:this.TEST_TYPE_ID,
			START_TIME:this.START_TIME,
			END_TIME:this.END_TIME,
	       userid:window.localStorage['TUM_USER_ID'],
	       usertoken:window.localStorage['usertoken'],
	       access_token:window.localStorage['token']
	      }
        this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"GETReportCountAnswers/",getreportcountobj1).then(resp=>{
          this.countreport=resp;

          this.NO_WRONG_ANSWER=this.countreport[0].NO_WRONG_ANSWER;

      this.insertreportcountobj1={
          FUNCTION_ID:window.localStorage['FUNCTION_ID'],
          BRANCH_ID:window.localStorage['TUM_BRANCH_ID'],
         COURSE_ID:this.countreport[0].COURSE_ID,
         LESSON_ID:this.countreport[0].LESSON_ID,
         TOPIC_ID:this.countreport[0].TOPIC_ID,
         TEST_TYPE_ID:this.countreport[0].TEST_TYPE_ID,
         TEST_DATE:this.countreport[0].START_TIME,
         APPLICANT_ID:window.localStorage['TUM_USER_ID'],
         START_TIME:this.countreport[0].START_TIME,
         END_TIME:this.countreport[0].END_TIME,
         TOTAL_NO_QUESTIONS:this.countreport[0].TOTAL_QUESTION,
         NO_QUESTIONS_ATTENDED:this.countreport[0].NO_ATTENDED_ANS,
         NO_QUESTIONS_CORRECT:this.countreport[0].COUNT_CORRECT_ANS,
         CREATED_BY:window.localStorage['TUM_USER_ID'],
         CREATED_ON:new Date(),
         UPDATED_BY:window.localStorage['TUM_USER_ID'],
         UPDATED_ON:new Date(),
         TEST_MARK:this.countreport[0].SCORE_MARKS,
           userid:window.localStorage['TUM_USER_ID'],
           usertoken:window.localStorage['usertoken'],
           access_token:window.localStorage['token']
           }

           this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"insertFinalResult/",this.insertreportcountobj1).then(resp=>{
            if(resp="Inserted Successfully"){

              this.router.navigate(['/hrmsonline-exam-ctrl', {
                insertreportcountobj1:this.insertreportcountobj1,
                ExamDetailsobj:this.ExamDetailsobj,

                      }])
            }
          }, error => {

            if(error.error.text="Inserted Successfully"){

              this.router.navigate(['/hrmsonline-exam-ctrl', {
                insertreportcountobj1:this.insertreportcountobj1,
                ExamDetailsobj:this.ExamDetailsobj,
                      }])
            }

          });


        }, error => {

        console.log("error : "+JSON.stringify(error));

        });



}

  }
  getIndexIfObjWithOwnAttr(array, attr, value) {

    var initial_array = [];
      for(var i = 0; i < array.length; i++) {

          if(array[i][attr] == value) {
              initial_array.push(i);
             return i;
             // console.log(i)
          }
      }
      if(initial_array.length > 0){
        return initial_array;
        console.log("hello")
      }else{
        return -1;
        console.log("-1")
      }

       console.log(initial_array)
  }
}


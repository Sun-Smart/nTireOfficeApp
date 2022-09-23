import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-applicantsummary',
  templateUrl: './applicantsummary.page.html',
  styleUrls: ['./applicantsummary.page.scss'],
})
export class ApplicantsummaryPage implements OnInit {
  from;
  Mobile;
  name;
  todate;
  applicantref;
  token;
  userID;
  usertoken;
  FUNCTION_ID;
  hrmjobcategory1;
  hrmjobcategory=[];
  applicantstatus;
  applicanthistorydetail=[];
  applicanthistorydetail2=[];
  applicanthistorydetail1;
  jobCategory;
  company;
  username = window.localStorage.getItem('TUM_USER_NAME');

  constructor(private alertController:AlertController,private router: Router,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.token=window.localStorage['token'];
   this.userID=window.localStorage['TUM_USER_ID'];
   this.usertoken = window.localStorage['usertoken'];
   this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
   this.company = window.localStorage['FUNCTION_DESC'];
   this.jobCategory="";

    this.getJObCategory();
    this.getApplicant();
  }

  ngOnInit() {
  }
  getJObCategory(){
    var jobdata = {
     access_token:this.token,
      userid:this.userID,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "hrmjobcategory/",jobdata).then(resp=>{
      this.hrmjobcategory1=resp;
      this.hrmjobcategory1.forEach(element => {
        this.hrmjobcategory.push(element);
      });
    }, error => {
    alert('Server Error, Data not loaded.')
    console.log("error : "+JSON.stringify(error));

    });
  }
  getApplicant(){
    this.applicantstatus='A'

    var datamd = {

          //functionid:this.functionid,
          access_token:this.token,
          userid:this.userID,
           usertoken:this.usertoken,
           functid:this.FUNCTION_ID

         };
     this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "getapplicanthistory/",datamd).then(resp=>{
      if(resp == "EREQUEST"){
        // console.log("Error Processing request");
      }else{
        // console.log(response.data);
        this.applicanthistorydetail1=resp;
        this.applicanthistorydetail1.forEach(element => {
          this.applicanthistorydetail.push(element);
          this.applicanthistorydetail2.push(element);
        });

      }
     }, error => {
     alert('Server Error, Data not loaded.')
     console.log("error : "+JSON.stringify(error));

     });
  }

  filerchange(data){
    this.applicanthistorydetail = this.applicanthistorydetail2.filter((resp) => {

      return resp.amd_reference_no.toLowerCase().indexOf(data.toLowerCase()) > -1;

    });
  }
  filerchange1(data){
    this.applicanthistorydetail = this.applicanthistorydetail2.filter((resp) => {

      return resp.amd_firstname.toLowerCase().indexOf(data.toLowerCase()) > -1;

    });
  }
  filerchange2(data){
    this.applicanthistorydetail = this.applicanthistorydetail2.filter((resp) => {

      return resp.amd_job_category.toLowerCase().indexOf(data.toLowerCase()) > -1;

    });
  }
  filerchange3(data){
    this.applicanthistorydetail = this.applicanthistorydetail2.filter((resp) => {

      return resp.amd_mobile.toLowerCase().indexOf(data.toLowerCase()) > -1;

    });
  }
  statusChange(data){

    var datamd = {

      //functionid:this.functionid,
      access_token:this.token,
      userid:this.userID,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID

     };

     if(data=='A'){
      this.applicanthistorydetail=[];
      this.applicanthistorydetail1="";
      this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "getapplicanthistory/",datamd).then(resp=>{
        // console.log(response.data);
          this.applicanthistorydetail1=resp;
          this.applicanthistorydetail1.forEach(element => {
            this.applicanthistorydetail.push(element);

          });
          console.log("applicanthistorydetail : "+JSON.stringify(this.applicanthistorydetail));
          }, error => {
       alert('Server Error, Data not loaded.')
       console.log("error : "+JSON.stringify(error));

       });
     }
     else{
      this.applicanthistorydetail=[];
      this.applicanthistorydetail1="";
      this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "getapplicanthistoryinactive/",datamd).then(resp=>{
        // console.log(response.data);
          this.applicanthistorydetail1=resp;
          this.applicanthistorydetail1.forEach(element => {
            this.applicanthistorydetail.push(element);

          });
          }, error => {
       alert('Server Error, Data not loaded.')
       console.log("error : "+JSON.stringify(error));

       });
     }

  }
  applicantView(applicantdata){
    console.log(applicantdata);
    localStorage.setItem('refno',applicantdata.amd_reference_no);
      this.router.navigate(['/hrmsapplicanttab'],{
        queryParams: applicantdata,
        });
  }
  goToApplicantDetails(){
    localStorage.setItem('refno',null);
    this.router.navigateByUrl('hrmsapplicanttab');

  }

 async deleteapplicant(obj){
    var alert1 = await this.alertController.create({

      message: 'Are you sure want to delete?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',

          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',

          handler: () => {
            var datamdd = {

              //functionid:$scope.functionid,
              access_token:this.token,
              userid: this.userID,
               usertoken:this.usertoken,
               functid:this.FUNCTION_ID,
               refmainid:obj.amd_reference_no

             };
            this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "applicantdelete/",datamdd).then(resp=>{
              // console.log(response.data);
              this.toastmessageService.presentAlert1("Delete","Deleted Successfully")
                }, error => {

             console.log("error : "+JSON.stringify(error));

             });
          }
        }
      ]
    });

    await alert1.present();

  }

  async activeeapplicant(obj){
    var alert1 = await this.alertController.create({

      message: 'Are you sure want to Activate?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',

          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',

          handler: () => {
            var datamdd = {

              //functionid:$scope.functionid,
              access_token:this.token,
              userid: this.userID,
               usertoken:this.usertoken,
               functid:this.FUNCTION_ID,
               refmainid:obj.amd_reference_no

             };
            this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "applicantactive/",datamdd).then(resp=>{
              // console.log(response.data);
              this.toastmessageService.presentAlert1("Activate","Activated Successfully")
                }, error => {

             console.log("error : "+JSON.stringify(error));

             });
          }
        }
      ]
    });

    await alert1.present();
  }
}

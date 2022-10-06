import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-open-add-education',
  templateUrl: './open-add-education.page.html',
  styleUrls: ['./open-add-education.page.scss'],
})
export class OpenAddEducationPage implements OnInit {
  educationdetails=[];
  item;
  userId: any;
  usertoken: any;
  FUNCTION_ID: any;
  token: any;
  hrmedudetaiscat1;
  hrmedudetaiscat=[];
  tempID: string;
  addEducationObject={
    Category:"",
    empID1:"",
    Type:"",
    Specialization:"",
    From:"",
    To:"",
    Institute:"",
    Percentage1:"",
    ID:"",
  }
  education={
    ID:"",
    Specialization:"",
    Institute:"",
    Percentage:"",
    empID:"",
  }
  emp={
    qualification:"",
  }
  from: any;
  to: any;
  specialization: any;
  fromdate: any;
  toDate: any;
  institution: any;
  percentage: any;
  category: any;
  // resp: any;
  response: any;
  repsonse1: any;
  EducationLabel: string;
  educationID: any;


  constructor(private model:ModalController,navParams: NavParams,public toastmessageService:ToastmessageService,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,private http: HttpClient) {
    this.userId=parseInt(window.localStorage['TUM_USER_ID']);
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.FUNCTION_ID=parseInt(window.localStorage['FUNCTION_ID']);
    this.getHighestQualification();
    this.item=navParams.get('item');


    if(this.item!=undefined){
      this.tempID = "1";
      this.specialization=this.item.Specialization;
      this.fromdate=new Date(this.item.From).toISOString().substring(0, 10);;
      console.log(""+this.fromdate)
      this.fromdate = this.fromdate.split('-');
      this.fromdate = this.fromdate[0]+'-'+this.fromdate[1];

      console.log(""+this.fromdate)
      this.toDate=new Date(this.item.To).toISOString().substring(0, 10);;
      console.log(""+this.fromdate)
      this.toDate = this.toDate.split('-');
      this.toDate = this.toDate[0]+'-'+this.toDate[1];
      this.institution=this.item.Institute;
      this.percentage=this.item.Percentage;
      this.educationID = this.item.ID;
    }
    else{
      this.category="";
      this.tempID = "0";
    }



    // console.log($scope.education.ID);
    this.EducationLabel = "Update Education";


   }
   dat_valid = {
    currentDate: new Date()
  };
  ngOnInit() {
  }
  getHighestQualification(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmeducationcategory/",datag).then(resp=>{
      this.hrmedudetaiscat1 =resp;
      this.hrmedudetaiscat1.forEach(element => {
        this.hrmedudetaiscat.push(element);
        if(this.item!=undefined){
        for(var i=0; i<this.hrmedudetaiscat.length; i++){

          if(this.hrmedudetaiscat[i].VAL==this.item.CategoryID){
            this.category= this.hrmedudetaiscat[i].VAL;
          }
        }
      }
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }


  addEducationModal() {

  var id="";
    if (this.tempID == "0") {
       id = "0";
      console.log(this.tempID);
    } else {
       id = this.educationID;
      console.log(this.tempID);
    }
    var date = this.fromdate.split('-');
    this.fromdate = date[0]+"-"+date[1];
    console.log(""+this.fromdate)



var date1 = this.toDate.split('-');
this.toDate = date1[0]+"-"+date1[1] ;

    this.addEducationObject = {
      empID1: window.localStorage['empid'],
      Type: "EducationDetails",
      //Category: this.education.Category,
      Category: this.category,
      Specialization:this.specialization,
      From: this.fromdate,
      To: this.toDate,
      Institute: this.institution,
      Percentage1: this.percentage,
      ID: id
    }
    console.log(this.addEducationObject);


    // http://sunsmart.in/mobileapi/HRMS/HRMS.svc/EmployeeUpdate


    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"EmployeeUpdate/"+window.localStorage['empid']+'/'+ 'EducationDetails'+"/"+this.addEducationObject.Category+"/"+this.addEducationObject.Specialization+"/"+this.addEducationObject.From +"/"+this.addEducationObject.To+"/"+this.addEducationObject.Institute+"/"+this.addEducationObject.Percentage1+"/"+this.addEducationObject.ID+"/"+0).then(resp=>{
      console.log(""+JSON.stringify(resp));
      // this.response = JSON.parse(resp);
      this.response = resp;
      this.repsonse1 = JSON.parse(this.response);
      // console.log(""+JSON.parse(resp))
      console.log(""+this.repsonse1[0]['Column1']);


      if(this.repsonse1[0]['Column1'] == "Successfully Saved" || this.repsonse1[0]['Column1'] == "Successfully Updated" )
      {

    //  alert("Education Added Successfully");
    if (this.tempID == "0") {
      this.toastmessageService.presentAlert1("","Education Added Successfully");
   } else {
    this.toastmessageService.presentAlert1("","Education Updated Successfully");
   }

     this.model.dismiss();
      }
    }, error => {

    console.log("error : "+JSON.stringify(error));

    this.toastmessageService.presentAlert1("","Error updating profile");
    });



    // sendToAPI.addEducationDetails(this.addEducationObject)
    //   .success(function(response) {
    //      console.log(response);
    //     response = JSON.parse(response);
    //     console.log(response[0].Column1);
    //     if (response[0].Column1 == "Successfully Saved" || response[0].Column1 == "Successfully Updated") {
    //     alert("Education Updated Successfully");
    //       // this.showToast("Education Updated Successfully");
    //       this.educationDetails();
    //       // this.openAddEducation.hide();
    //     } else {
    //       this.showToast("Error updating profile");
    //     }
    //     this.hide();
    //   })
    //   .error(function(response) {
    //     this.showToast("Error updating profile");
    //   });
  };
  closemodel(){

    this.model.dismiss();
  }

}

import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {ReapplyloanPage} from '../reapplyloan/reapplyloan.page';
declare var $;

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.page.html',
  styleUrls: ['./loan-summary.page.scss'],
})
export class LoanSummaryPage implements OnInit {

  display=[];
  display1;
  error;
  userid;
  empcode;
  usertoken;
  token;
  empCode;
  usertype;
  company;
  request_type;
  designationemp;
  empname;
  department;
  designation;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(public modalController: ModalController,private router: Router,public alertController: AlertController,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.userid = window.localStorage['TUM_USER_ID'];
    this.usertoken = window.localStorage['usertoken'];
    this.token=window.localStorage['token'];

    this.empCode= window.localStorage['TUM_EMP_CODE'];
    this.usertype =parseInt(  window.localStorage['TUM_USER_TYPE']);
    this.company = window.localStorage['FUNCTION_DESC'];
    this.request_type="";
    this.allloandetails();
    this.getDesignation();
  }

  ngOnInit() {
  }

  cancel(){
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/loan-request'])
  }

  allloandetails(){
    var obj={
      empcode:this.empCode,
      usertype:this.usertype,
      userid: parseInt(this.userid),
      usertoken:this.usertoken,
      access_token:this.token
      }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "LoanRequestSummary",obj).then(resp=>{
      if (resp != "No Records found") {

        this.display1 = resp;



        this.display1.forEach(element => {
          this.display.push(element);
        });




        // this.display1=JSON.parse(resp.toString());
        console.log(this.display)
        console.log(this.display1)
        var status = this.display[0].Status;
        this.error = "";
      } else {


        this.display = [];
        this.error = "No Records Found";
      }
    }, error => {
    // alert('Server Error, Data not loaded.')
    console.log("error : "+JSON.stringify(error));

    });
  }

  async openModal(value){

   console.log(""+JSON.stringify(value));
   // this.tempID = "1";
   const modal = await this.modalController.create({
     component: ReapplyloanPage,
     componentProps: {
       'item':value,


     }

   });
   modal.onDidDismiss()
   .then((data) => {

 });

   return await modal.present();

 }


  showmoreloan(data){

    $('#dividvals'+data).show();
    $('#imageidvals'+data).hide();

  }
  showlessnewloan(data){
    $('#dividvals'+data).hide();
    $('#imageidvals'+data).show();
  }
  getDesignation(){

    var obj1={
      emp_code:this.empCode,
      userid: parseInt(this.userid),
     usertoken:this.usertoken,
     access_token:this.token
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getdesignation",obj1).then(resp=>{
      this.designationemp = resp;
      console.log(""+this.designationemp );
      this.empname = this.designationemp[0].em_emp_name;
      this.department = this.designationemp[0].TEXT;
      this.designation = this.designationemp[0].DESCRIPTION;
      console.log( this.designation)
      // console.log( this.department)

    }, error => {

    console.log("error : "+JSON.stringify(error));

    });
  }
  changeOrder(){
    this.error=''
    this.display = this.display1.filter(t=>t.request_type == this.request_type);
    if(this.display.length==0){

      this.error='No Data Found'
    }
    return this.display
  }
  async cancelRequest(loanData){
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do you want to cancel?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+ "CancelRequest/" + loanData.ReqRef + "/" + 'L').then(resp=>{
              this.toastmessageService.presentAlert1("","Request Cancelled");
            }, error => {

            console.log("error : "+JSON.stringify(error));

            });
          }
        }
      ]
    });

    await alert.present();
  }

}

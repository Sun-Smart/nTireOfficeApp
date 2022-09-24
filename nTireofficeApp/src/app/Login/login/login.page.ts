/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-debugger */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit ,OnDestroy } from '@angular/core';
import {IpaddressService} from '../../service/ipaddress.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {HttprequestService} from '../../service/httprequest.service';
import { MenuController, IonSlides ,NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { json } from '@angular-devkit/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username;
  password;
  callpriorityarray;
  showValue:any;
  usertype:any;
  validityToDate:any;
  timeDiff:any;
  today:any;
  // backButtonSubscription: any;
   isLoading = false;
  constructor(private platform: Platform,
    private httpresponse:HttprequestService,
    public loadingController: LoadingController,private  route: Router,public alertController: AlertController,private http: HttpClient,
    public Ipaddressservice:IpaddressService,
    private  menuCtrl: MenuController,private  navCtrl: NavController) {
    this.menuCtrl.enable(false, 'first');
    this.showValue = { "type": "password", "text": "Show" };

  }

  ngOnInit() {
  }




  Loginevent(){
    if(this.username!=undefined && this.password!=undefined){
    this.presentLoadingWithOptions();
    // var body = JSON.stringify(parameters);
    var ip=5;
    var companyname="1";
    var sessionid="1234567";
    var username=this.username.toUpperCase();
    var password=this.password;


    var credentials = {
      functionid: 1,
       user_lower: username,
        password: password,
         sessionid: sessionid,
         companyname: companyname,
          ip: ip
         };
         debugger
         this.httpresponse.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.getLoginLink+'/loginMobileLos/',credentials,).then(resp=>{
         debugger
          // console.log(resp);
          // console.log(resp.data.data);
          console.log(resp['data']);
          var data1 = resp['data'];
          var userdata = resp['data'];
          // this.loadingdismiss();

          if(resp['data']['Column1']!=undefined)
          {

            var b = resp['data']['Column1'];
            setTimeout(() => {
            this.loadingdismiss();
            this.presentAlert('Alert1',b);

            console.log(""+resp['data']['Column1'])




              }, 5000);


          }

          // this.loadingdismiss();
          // if(userdata['TUM_FORCE_LOGON']=='Y'){

          // }else{
            localStorage.setItem('expires', resp['expires'].toString());

            localStorage.setItem('token', resp['token'].toString());
            localStorage.setItem('usertoken', resp['usertoken'].toString());

            if (window.localStorage['TUM_USER_TYPE'] == 8) {

              this.usertype = true;
            } else {
              this.usertype = false;
              // $state.go('app.dashboard');
            }

            this.validityToDate = new Date(window.localStorage['TUM_VALIDITY_TO']);
            //  console.log(validityToDate);
             this.today = new Date();
            //  console.log(today);
             // var today=new Date("04/23/2019");
             // console.log(today);
             // var formattedDate =   $filter('date')(today, "yyyy-MM-dd");
             // var formattedTime =   $filter('date')(today, "HH:mma");

             if (this.validityToDate < this.today) {
               console.log("validate date is small");

             } else {
               console.log("validate date is big");
               var diff = this.validityToDate - this.today;
               console.log(diff);
               this.timeDiff = Math.abs(this.validityToDate.getTime() - this.today.getTime());
               var diffDays = Math.ceil(this.timeDiff / (1000 * 3600 * 24));
               console.log(diffDays)

               if (diffDays == 3) {
                this.presentAlert('Note','You have 3 days validity. Kindly reach your system administrator to extend.');
                //  var alertPopup = $ionicPopup.alert({
                //   this.presentAlert('Note','You have 3 days validity. Kindly reach your system administrator to extend.');
                //    title: 'Note',
                //    template: 'You have 3 days validity. Kindly reach your system administrator to extend.',
                //    buttons: [{
                //      text: 'OK',
                //      type: 'button button-clear button-calm'
                //    }, ]
                //  });
               } else if (diffDays == 1) {
                this.presentAlert('Note','Your validity is going to expire tomorrow. Kindly reach your system administrator to extend.');

              //    var alertPopup = $ionicPopup.alert({
              //      title: 'Note',
              //      template: 'Your validity is going to expire tomorrow. Kindly reach your system administrator to extend.',
              //      buttons: [{
              //        text: 'OK',
              //        type: 'button button-clear button-calm'
              //      }, ]
              //    });
              //  }

             }


     if (typeof (userdata['TUM_USER_NAME']) == 'undefined') {
      this.presentAlert('','Wrong Credential');
            }


              else if (userdata['TUM_USER_STATUS'] == 'A') {
                if (userdata['TUM_USER_NAME'].toUpperCase() === username || userdata['TUM_USER_CODE'].toUpperCase() ===username) {

                  localStorage.setItem('TUM_USER_ID', userdata['TUM_USER_ID']);
                  localStorage.setItem('TUM_USER_TYPE', userdata['TUM_USER_TYPE']);
                  localStorage.setItem('TUM_BRANCH_ID', userdata['TUM_BRANCH_ID']);
                  localStorage.setItem('TUM_BRANCH_CODE', userdata['BRANCH_CODE']);
                  localStorage.setItem('TUM_USER_CODE', userdata['TUM_USER_CODE']);
                  localStorage.setItem('TUM_USER_NAME', userdata['TUM_USER_NAME']);
                  localStorage.setItem('TUM_EMP_CODE', userdata['TUM_USER_CODE']);
                  localStorage.setItem('FUNCTION_DESC', userdata['FUNCTION_DESC']);
                  localStorage.setItem('FUNCTION_ID', userdata['FUNCTION_ID']);
                  localStorage.setItem('BRANCH_LATLONG', userdata['BRANCH_LATLONG']);
                  localStorage.setItem('DashName', userdata['TUM_USER_NAME']);


                  this.route.navigate(['/dashboardCams']);
                } else {
                  this.loadingdismiss();
                  this.presentAlert('Login failed!','Please check your username & Password!');
                  // this.loadingdismiss();
                }
                // this.loadingdismiss();
              } else {
                this.loadingdismiss();
                this.presentAlert('Login failed!','Please check your username & Password!');
              }








            }

        }, error => {
          this.loadingdismiss();
          this.presentAlert('Login failed!','Server Error, Please try after sometime!');

        });
      }
      else{
        this.presentAlert('','Enter both Username & Password');
      }
  }
  async presentAlert(heading,tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass:'buttonCss',
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
   //show password
   showPassword() {
    if (this.showValue.type == "password") {
      this.showValue = { "type": "text", "text": "Hide" }
    } else {
      this.showValue = { "type": "password", "text": "Show" }
    }
  };

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'lines-sharp',
      duration: 10000,
      // message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',


    });
    return await loading.present();
  }
  async   loadingdismiss() {

     return await this.loadingController.dismiss();
  }

  onPageDidEnter() {
    // the left menu should be disabled on the login page
    // this.menuCtrl.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the login page
    // this.menuCtrl.enable(true);
  }


  ngOnDestroy() {
    //this.backButtonSubscription.unsubscribe();
  }
}




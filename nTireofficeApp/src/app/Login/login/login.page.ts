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
  //  userdata=[]
  data1=[]

suneel=[
  {"BranchAccess":"1,10094","FunAccess":"1,10088,10095,10096,10097,10101,10102,10103,10104,","DepartmentAccess":"30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30","DesignationAccess":"1,3,4,5,6,7,8,9,10,11,14,16,17,19,21,22,23,24,26,1","Passworddate":"5","TUM_USER_ID":"1","CurrentDate":"10/2/2022 11:36:27 PM","FUNCTION_ID":"1","TUM_USER_PWD":"0x09","TUM_USER_TYPE":"1","TUM_USER_STATUS":"A","TUM_VALIDITY_TO":"1/5/2023 12:00:00 AM","TUM_USER_CODE":"E0001","TUM_USER_NAME":"SundarRajan","TUM_FORCE_LOGON":"N","TUM_BRANCH_ID":"1","CurrentDeviceID":"","TUM_USER_MOBILE":"971-","FUNCTION_DESC":"SSTPL","BRANCH_CODE":"DUBAI","BRANCH_LATLONG":"12.9801,80.2184","is_inbound":"","ZONE_ID":"3","THEME":"Mystic Black","TUM_USER_SETTING":"3","USERDATEFORMAT":"2","DATEFORMATCODE":"","DATEFORMATTEXT":"","LANGUAGE":"English","TUM_DF_PROJECT_ID":"","UPDATED_ON":"02/10/2022 23:36:27","tum_user_photo":"","USERTYPE_DESC":"administrator","TUM_REPORTING_TO":"1","em_emp_id":"30302","em_emp_name":"SUNDAR","em_branch_id":"1","em_emp_department":"4","em_emp_designation":"1",}
]



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
         this.httpresponse.PostRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.getLoginLink+'/loginMobileLos',credentials,).then(resp=>{
         debugger
          // console.log(this.suneel);
          // console.log(this.suneel[0].BranchAccess);

          console.log(resp["data"]["TUM_FORCE_LOGON"]);
          console.log(resp['data']);
           this.data1 = resp['data'];
         var userdata = this.data1
          // userdata=JSON.parse(userdata);
          userdata=this.suneel;
          console.log(userdata[0].BranchAccess)
          // this.suneel=userdata
          console.log(this.suneel[0].BranchAccess)
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
            localStorage.setItem('expires', resp['expires']);
            localStorage.setItem('token', resp['token']);
            localStorage.setItem('usertoken', resp['usertoken']);

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


     if (typeof (userdata[0]['TUM_USER_NAME']) == 'undefined') {
      this.presentAlert('','Wrong Credential');
            }


              else if (userdata[0]['TUM_USER_STATUS'] == 'A') {
                if (userdata[0]['TUM_USER_NAME'].toUpperCase() === username || userdata[0]['TUM_USER_CODE'].toUpperCase() ===username) {

                  localStorage.setItem('TUM_USER_ID', userdata[0]['TUM_USER_ID']);
                  localStorage.setItem('TUM_USER_TYPE', userdata[0]['TUM_USER_TYPE']);
                  localStorage.setItem('TUM_BRANCH_ID', userdata[0]['TUM_BRANCH_ID']);
                  localStorage.setItem('TUM_BRANCH_CODE', userdata[0]['BRANCH_CODE']);
                  localStorage.setItem('TUM_USER_CODE', userdata[0]['TUM_USER_CODE']);
                  localStorage.setItem('TUM_USER_NAME', userdata[0]['TUM_USER_NAME']);
                  localStorage.setItem('TUM_EMP_CODE', userdata[0]['TUM_USER_CODE']);
                  localStorage.setItem('FUNCTION_DESC', userdata[0]['FUNCTION_DESC']);
                  localStorage.setItem('FUNCTION_ID', userdata[0]['FUNCTION_ID']);
                  localStorage.setItem('BRANCH_LATLONG', userdata[0]['BRANCH_LATLONG']);
                  localStorage.setItem('DashName', userdata[0]['TUM_USER_NAME']);
                  localStorage.setItem('EmployeeID', userdata[0]['em_emp_id']);
                  localStorage.setItem('EmployeeName', userdata[0]['em_emp_name']);
                  localStorage.setItem('EmpDesignation', userdata[0]['em_emp_designation']);
                  localStorage.setItem('EmpDepartment', userdata[0]['em_emp_department']);
                  this.route.navigate(['/dashboardCams']);
                }
                else
                {
                  this.loadingdismiss();
                  this.presentAlert('Login failed!','Please check your username & Password!');
                  // this.loadingdismiss();
                }
                // this.loadingdismiss();
              }
              else
              {
                this.loadingdismiss();
                this.presentAlert('Login failed!','Please check your username & Password!');
              }
            }
        }, error => {
          this.loadingdismiss();
          this.presentAlert('Login failed!','Server Error, Please try after sometime!');
        });
      }
      else
      {
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

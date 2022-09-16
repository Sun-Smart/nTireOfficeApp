import { Component, ViewChild } from '@angular/core';

// import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController,MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IpaddressService} from './service/ipaddress.service';
// import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  name;
  isLogin;
  currentRoute;
  logoutbtn;
  user_name: string;
  list: boolean;
  list1: boolean;
  list2: boolean;
  list3: boolean;
  list5: boolean;
  list6: boolean;
  CamsList: boolean;
  pms: boolean;
  user_role: any;
  chkadmin: boolean;
  username: any = window.localStorage.getItem('TUM_USER_NAME');


  public salespages = [

    {
      title: 'Sales Dashboard',
      url: '/salesdashboard',
      icon: 'map'
    },
    {
      title: 'New Lead-Retail ',
      url: '/newlead-retail',
      icon: 'person-add'
    },
    {
      title: 'Add Corporate',
      url: '/addnewcorporate',
      icon: 'briefcase'
    },

    {
      title: 'New Lead-Corporate',
      url: '/newleadcorporate',
      icon: 'person-add'
    },
    {
      title: 'Pending Leads',
      url: '/pendingleads',
      icon: 'hourglass'
    },
    {
      title: 'Closed Leads',
      url: '/closedleads',
      icon: 'hourglass'
    },
    {
      title: 'Location',
      url: '/location',
      icon: 'pin'
    },
    {
      title: 'Heat Map',
      url: '/heatmap',
      icon: 'map'
    },
    {
      title: 'My Meetings',
      url: '/mymeeting',
      icon: 'today'
    },
    {
      title: 'Team Meetings',
      url: '/teammeetings',
      icon: 'people'
    },
    {
      title: 'Expense Details',
      url: '/expensedetails',
      icon: 'contrast'
    },
    {
      title: 'My Clients',
      url: '/myclients',
      icon: 'people-outline'
    },
  ];


  public cobapages = [

    // {
    //   title: 'New Lead-Retail ',
    //   url: '/coba-new-lead',
    //   icon: 'person-add'
    // },
    // {
    //   title: 'Add Corporate',
    //   url: '/addnewcorporate',
    //   icon: 'add-circle'
    // },
    // {
    //   title: 'New Lead-Corporate',
    //   url: '/newleadcorporate',
    //   icon: 'person-add'
    // },
    // {
    //   title: 'Pending Leads',
    //   url: '/cobapendingleads',
    //   icon: 'hourglass'
    // },
    // {
    //   title: 'Pending Clients',
    //   url: '/convertedlead',
    //   icon: 'pin'
    // },
    // {
    //   title: 'Documents',
    //   url: '/coba-document-verification',
    //   icon: 'map'
    // },
    // {
    //   title: 'Rejected',
    //   url: '/rejecteddocument',
    //   icon: 'today'
    // },
    // {
    //   title: 'Pending Process',
    //   url: '/cobapendingprocess',
    //   icon: 'people'
    // },
    // {
    //   title: 'Rejected Process',
    //   url: '/coba-rejected-process',
    //   icon: 'contrast'
    // },
    // {
    //   title: 'Completed Process',
    //   url: '/coba-completed-process',
    //   icon: 'contact'
    // },
  ];


  public hrmsPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'My Profile',
      url: '/myprofile',
      icon: 'person'
    },
    {
      title: 'Employees',
      url: '/employees',
      icon: 'person-add'
    },
    {
      title: 'Attendance',
<<<<<<< Updated upstream
      url: '/attendance',
      icon: 'list-box'
=======
      url: '/hrmsattendance',
      icon: 'expand-outline'
>>>>>>> Stashed changes
    },
    {
      title: 'Processed Attendance',
      url: '/processed-attendance',
      icon: 'checkmark-circle'
    },
    {
      title: 'Pay Slip',
<<<<<<< Updated upstream
      url: '/payslip',
      icon: 'list-box'
    },
    {
      title: 'COFF Request',
      url: '/coff-request',
      icon: 'logo-usd'
=======
      url: '/hrmspayslip',
      icon: 'document-outline'
>>>>>>> Stashed changes
    },
    // {
    //   title: 'COFF Request',
    //   url: '/hrmscoff-request',
    //   icon: 'logo-usd'
    // },
    {
      title: 'OD Request',
      url: '/od-request',
      icon: 'briefcase'
    },
    {
      title: 'Claims',
      url: '/claimsrequest',
      icon: 'cash'
    },
    {
      title: 'Leave Request',
<<<<<<< Updated upstream
      url: '/leave-request',
      icon: 'jet'
=======
      url: '/hrmsleave-request',
      icon: 'calendar-number-outline'
>>>>>>> Stashed changes
    },
    {
      title: 'Permission Request',
      url: '/permission-request',
      icon: 'create'
    },
    {
      title: 'Asset Request',
      url: '/assetrequest',
      icon: 'laptop'
    },
<<<<<<< Updated upstream
    {
      title: 'PushNotifiction Config',
      url: '/attendance-notification',
      icon: 'notifications'
    },
=======
    // {
    //   title: 'PushNotifiction Config',
    //   url: '/hrmsattendance-notification',
    //   icon: 'notifications'
    // },
>>>>>>> Stashed changes
    {
      title: 'Loan Request',
      url: '/loan-request',
      icon: 'cash'
    },
    {
      title: 'Asset Returns',
      url: '/assetreturn',
      icon: 'laptop'
    },
<<<<<<< Updated upstream
    {
      title: 'Online Exam Portal',
      url: '/onlineexamportal',
      icon: 'paper'
    },
    {
      title: 'Applicant Detail',
      url: '/applicantsummary',
      icon: 'apps'
    },
=======
    // {
    //   title: 'Online Exam Portal',
    //   url: '/hrmsonlineexamportal',
    //   icon: 'laptop-outline'
    // },
    // {
    //   title: 'Applicant Detail',
    //   url: '/hrmsapplicantsummary',
    //   icon: 'apps'
    // },
>>>>>>> Stashed changes
    {
      title: 'Letter Request',
      url: '/letterrequest',
      icon: 'document'
    }
  ];


  public erppages=[
    {
      title: 'Physcial Inventory',
      url: '/pyscialinvetory',
      icon: 'home'
    },
    {
      title: 'ILT',
      url: '/intralocationtransfer',
      icon: 'person'
    },
  ]
  public CamsPage = [
    {
      title: 'Dashboard',
      url: '/dashboardCams',
      icon: 'home'
    },
    // {
    //     title: 'Asset Details',
    //     url: '/asset-details',
    //     icon: 'folder-open-outline'
    //   }
    {
      title: 'Pending Jobs',
      url: '/pending-jobs',
      icon: 'hourglass'
    },{
      title: 'Completion of Jobs',
      url: '/completion-jobs',
      icon: 'briefcase'
    },{
      title: 'Asset Reconciliation',
      url: '/asset-reconcil',
      icon: 'book'
    },{
      title: 'Asset Details',
      url: '/asset-details',
      icon: 'folder-open-outline'
    },{
      title: 'User Request',
      url: '/user-request',
      icon: 'person'
    },{
      title: 'Service Request',
      url: '/service-request',
      icon: 'cog'
    },{
      title: 'LocationWise Asset Report',
      url: '/location-wise-asset',
      icon: 'pin'
    },{
      title: 'Asset Transfer',
      url: '/asset-transfer',
      icon: 'document-outline'
    },{
      title: 'Reconciliation Report',
      url: '/reconciliation-report',
      icon: 'list'
    },{
      title: 'Department Location Wise Report',
      url: '/department-wise',
      icon: 'laptop'
    }

  ];

  public procurement= [
    // {
    //   title: 'Update Vendor Item',
    //   url: '/updatevendoritem',
    //   icon: 'pricetag'
    // },
    // {
    //   title: 'Update Vendor Quotation',
    //   url: '/updatevendorquot',
    //   icon: 'create'
    // },
    {
      title: 'Vendor Master',
      url: '/vendormaster',
      icon: 'person'
    },
    // {
    //   title: 'Vendor Payments',
    //   url: '/vendorpayments',
    //   icon: 'cash'
    // },
    {
      title: 'Vendor PO Confirm',
      url: '/vendorpoconfirm',
      icon: 'checkmark'
    },
    {
      title: 'Vendor Quotation',
      url: '/vendorquotation',
      icon: 'clipboard'
    },
    {
      title: 'Vendor Details',
      url: '/vendorsdetails',
      icon: 'list'
    },
    {
      title: 'Vendor Item',
      url: '/vendorsitems',
      icon: 'flame'
    },
  ];

  public Dmspage =[

  ];

  public Property = [
    {
      title: 'Dashboard',
      url: '/pmsdashboard',
      icon: 'home'
    },
    {
      title: 'Customer',
      url: '/pmscustomer',
      icon: 'people'
    },
    {
      title: 'Employees',
      url: '/pmsemployees',
      icon: 'person-add'
    },
    {
      title: 'Reports',
      url: '/pmsreports',
      icon: 'create'
    }
  ];

  showSubmenu: boolean = false;

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  constructor(private locationAccuracy: LocationAccuracy,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,private androidPermissions: AndroidPermissions,
    private statusBar: StatusBar,public alertController: AlertController,private http: HttpClient,
    public Ipaddressservice: IpaddressService,
    public menuCtrl: MenuController
  ) {

    // this.platform.backButton.subscribeWithPriority(0, () => {

    //   if (this.routerOutlet && this.routerOutlet.canGoBack()) {
    //     this.routerOutlet.pop();
    //   } else if (this.router.url === '/LoginPage') {

    //     navigator['app'].exitApp();
    //   } else {

    //     this.logout();
    //   }
    // });

    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      androidPermissions.requestPermissions(
        [
          androidPermissions.PERMISSION.RECORD_AUDIO

        ]
      );
    });

    if (this.splashScreen) {
      setTimeout(() => {
          this.splashScreen.hide();
      }, 100);
  }

    this.user_name=localStorage.getItem('TUM_USER_NAME');
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.name = (<any>event).url.split("/").slice(-1)[0];

        console.log("event.constructor.name :"+event.constructor.name)

        if(this.name =='login'){
        this.logoutbtn=true;
        //navigator['app'].exitApp();

        }
        else if(this.name ==''){
          this.logoutbtn=true;
        }
        else{
          this.logoutbtn=false;
        }

      }
    });
    this.initializeApp();
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {

      }
    );

  }

  ngOnInit(){
    this.user_role  = window.localStorage.getItem('TUM_USER_TYPE');
    console.log(this.user_role);
    if(this.user_role == '1'||this.user_role == '46'||this.user_role == '37'||this.user_role == '44'||this.user_role == '47'||this.user_role == '45'){
      this.chkadmin = true;
    }
  }

  ionViewWillEnter(){

  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('Please turn on the location for further purpose');
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
     //   this.getLocationCoordinates()
      },
      error => alert('Please turn on the location for further purpose')
    );
  }
  // Methos to get device accurate coordinates using device GPS
  // getLocationCoordinates() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.locationCoords.latitude = resp.coords.latitude;
  //     this.locationCoords.longitude = resp.coords.longitude;
  //     this.locationCoords.accuracy = resp.coords.accuracy;
  //     this.locationCoords.timestamp = resp.timestamp;
  //   }).catch((error) => {
  //     alert('Error getting location' + error);
  //   });
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);

    });
  }

  ionViewDidEnter() {

    if (this.platform.is('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        success => console.log('Succes granted the permissions'),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    }
  }

 async logout(): Promise<void>{
    var alert1 = await this.alertController.create({

      message: 'Are you sure you want to logout',
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

          var logout_obj = {
              access_token: localStorage.getItem('token'),
              userid: localStorage.getItem('TUM_USER_ID'),
              usertoken: localStorage.getItem('usertoken'),

            };

            const header = new Headers();
           header.append("Content-Type", "application/json");
         let options = new HttpHeaders().set('Content-Type', 'application/json');
           this.http.post(this.Ipaddressservice.ipaddress + '/Collections/Collections/logout/', logout_obj, {
             headers: options,
           }).subscribe(resp => {

            localStorage.clear();
            this.router.navigate(['/login']);

       }, error => {
        localStorage.clear();
        this.router.navigate(['/login']);

           });

          }
        }
      ]
    });

    await alert1.present();
  }
  menutoogle(){

    if(this.list==true){
      this.list=false;
    }
    else{
      this.list=true;
    }


  }
  menutoogle1(){

    if(this.list1==true){
      this.list1=false;
    }
    else{
      this.list1=true;
    }


  }
  menutoogle2(){

    if(this.list2==true){
      this.list2=false;
    }
    else{
      this.list2=true;
    }


  }
  menutoogle3(){

    if(this.list3==true){
      this.list3=false;
    }
    else{
      this.list3=true;
    }


  }

  menutoogle5(){

    if(this.list5==true){
      this.list5=false;
    }
    else{
      this.list5=true;
    }


  }


  menutoogle6(){

    if(this.list6==true){
      this.list6=false;
    }
    else{
      this.list6=true;
    }


  }

  menutoogle4(){
    this.router.navigateByUrl('/hrmsmyapprovals');
    this.menuCtrl.close();
  }

  menutoogleCams(){

    if(this.CamsList==true){
      this.CamsList=false;
    }
    else{
      this.CamsList=true;
    }
  }


  menutooglepms(){

    if(this.pms==true){
      this.pms=false;
    }
    else{
      this.pms=true;
    }
  }




//   menutoogle(data){

//     this.showSubmenu = !this.showSubmenu;
// if(data==5){
//   this.router.navigateByUrl('/hrmsmyapprovals');

// }
// else{
//   this.list=data;
// }
//   }

}


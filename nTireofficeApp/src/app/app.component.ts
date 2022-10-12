/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
import { Component, ViewChild } from '@angular/core';

// import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from './service/ipaddress.service';
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
  pmssubmenu: boolean = false
  pms: boolean;
  user_role: any;
  chkadmin: boolean;
  username: any = window.localStorage.getItem('TUM_USER_NAME');

  reportMenu: any;
  showSubmenu: boolean = false;
  showForce: boolean;

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
      icon: 'person-outline'

    },
  ];


  public cobapages = [

    {
      title: 'New Lead-Retail ',
      url: '/coba-new-lead',
      icon: 'person-add'
    },
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
    {
      title: 'Pending Leads',
      url: '/cobapendingleads',
      icon: 'hourglass'
    },
    {
      title: 'Pending Clients',
      url: '/convertedlead',
      icon: 'pin'
    },
    {
      title: 'Documents',
      url: '/coba-document-verification',
      icon: 'map'
    },
    {
      title: 'Rejected',
      url: '/rejecteddocument',
      icon: 'today'
    },
    {
      title: 'Pending Process',
      url: '/cobapendingprocess',
      icon: 'people'
    },
    {
      title: 'Rejected Process',
      url: '/coba-rejected-process',
      icon: 'contrast'
    },
    {
      title: 'Completed Process',
      url: '/coba-completed-process',
      icon: 'contact'
    },
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
      url: '/attendance',
      icon: 'reader-outline'
    },
    {
      title: 'Processed Attendance',
      url: '/processed-attendance',
      icon: 'checkmark-circle'
    },
    {
      title: 'Pay Slip',
      url: '/payslip',
      icon: 'receipt-outline'
    },
    // {
    //   title: 'COFF Request',
    //   url: '/coff-request',
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
      url: '/leave-request',
      icon: 'reader-outline'
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
    // {
    //   title: 'PushNotifiction Config',
    //   url: '/attendance-notification',
    //   icon: 'notifications'
    // },
    {
      title: 'Loan Request',
      url: '/loan-request',
      icon: 'cash'
    },
    // {
    //   title: 'Asset Returns',
    //   url: '/assetreturn',
    //   icon: 'laptop'
    // },
    // {
    //   title: 'Online Exam Portal',
    //   url: '/onlineexamportal',
    //   icon: 'receipt-outline'
    // },
    // {
    //   title: 'Applicant Detail',
    //   url: '/applicantsummary',
    //   icon: 'apps'
    // },
    {
      title: 'Letter Request',
      url: '/letterrequest',
      icon: 'document'
    }

  ];


  public erppages = [
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
    {
      title: 'Asset Details',
      url: '/asset-details',
      icon: 'document-outline'
    }
    , {
      title: 'Pending Jobs',
      url: '/pending-jobs',
      icon: 'hourglass'
    }, {
      title: 'Completion of Jobs',
      url: '/completion-jobs',
      icon: 'briefcase'
    }, {
      title: 'Asset Reconciliation',
      url: '/asset-reconcil',
      icon: 'book'
    },
    // {
    //   title: 'Asset Details',
    //   url: '/asset-details',
    //   icon: 'document-outline'
    // },
    {
      title: 'User Request',
      url: '/user-request',
      icon: 'person'
    }, {
      title: 'Service Request',
      url: '/service-request',
      icon: 'cog'
    }, {
      title: 'LocationWise Asset Report',
      url: '/location-wise-asset',
      icon: 'pin'
    }, {
      title: 'Asset Transfer',
      url: '/asset-transfer',
      icon: 'newspaper-outline'
    }, {
      title: 'Reconciliation Report',
      url: '/reconciliation-report',
      icon: 'list'
    }, {
      title: 'Department Location Wise Report',
      url: '/department-wise',
      icon: 'laptop'
    }

  ];

  public procurement = [

    {
      title: 'Purchase Request',
      url: '/purchase-request',
      icon: 'pricetag-sharp'
    },
    {
      title: 'PRS Status',
      url: '/prsstatus',
      icon: 'stats-chart-sharp'

    },
    // {
    //   title: 'RFP',
    //   url: '/rfp',
    //   icon: 'logo-steam'
    // },

    // {
    //   title: 'RFQ',
    //   url: '/manage-rfq',
    //   icon: 'logo-stencil'
    // },

    {
      title: 'RFQ',
      url: '/rfq',
      icon: 'logo-stencil'
    },
    {
      title: 'My Approval',
      url: '/myapprovals',
      icon: 'code-working-sharp'
    },
    {
      title: 'Vendor Quotation',
      url: '/vendor-quotation',
      icon: 'clipboard'
    },
    {
      title: 'Update Vendor Quotation',
      url: '/updatevendorquot',

      icon: 'create'
    },

    {
      title: 'Material Request',
      url: '/material-request',
      icon: 'git-network-sharp'
    },
    {
      title: 'Material Issue',
      url: '/material-issue',
      icon: 'bag-handle-outline'
    },
    {
      title: 'Physcial Inventory',
      url: '/physical-inventory',
      icon: 'card-sharp'
    },
    {
      title: 'PI Mismatch',
      url: '/pi-mismatch',
      icon: 'shield-sharp'
    },
    {
      title: 'Inter Location Transfer',
      url: '/inter-location-transfer',
      icon: 'compass-sharp'
    },
    {
      title: 'Pending Quotation',
      url: '/vendorpending-quotations',
      icon: 'bag-handle-outline'
    },
    {
      title: 'Upload Invoice',
      url: '/upload-invoice',
      icon: 'cash-outline'
    },
    {
      title: 'View PO PDF File',
      url: '/view-popdffile',
      icon: 'eye-sharp'
    },
    {
      title: 'View Invoice Status',
      url: '/view-invoice-status',
      icon: 'cash-outline'
    },
    {
      title: 'Vendor Master',
      url: '/vendormaster',
      icon: 'person'
    },
    {
      title: 'Vendor PO Confirm',
      url: '/vendorpoconfirm',
      icon: 'checkmark'
    },

    // {
    //   title: 'Vendor Details',
    //   url: '/vendorsdetails',
    //   icon: 'list'
    // },
    // {
    //   title: 'Vendor Item',
    //   url: '/vendorsitems',
    //   icon: 'flame'
    // },
    // {
    //   title: 'Vendor Payments',
    //   url: '/vendorpayments',
    //   icon: 'cash'
    // },


    // new

    // {
    //   title: 'Update Vendor Item',
    //   url: '/updatevendoritem',
    //   icon: 'pricetag'
    // },
  ];

  public Dmspage = [

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
      // url: '',
      icon: 'create',
      subPages: [
        {
          title: 'Property List',
          url: '/pms-list',
          icon: 'list-circle'
        },
        {
          title: 'Payment Details',
          url: '/payment-details',
          icon: 'document-text'
        },
        {
          title: 'Issue Ledger',
          url: '/issue-ledger',
          icon: 'newspaper'
        },
        {
          title: 'Document Expiry Report',
          url: '/document-expiry-report',
          icon: 'documents'
        },
        {
          title: 'Property Contact List',
          url: '/property-condact-list',
          icon: 'call'
        },

      ]
    }
  ];



  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  parentMenu: Object;
  getParentMenu: any;
  showParentMenu: any;
  listParentMenu: string;
  listParentMenu1: string;
  listParentMenu2: string;
  listParentMenu3: string;
  listParentMenu4: string;
  listParentMenu5: string;
  getParent: any;
  getParse: any;
  constructor(private locationAccuracy: LocationAccuracy,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen, private androidPermissions: AndroidPermissions,
    private statusBar: StatusBar, public alertController: AlertController, private http: HttpClient,
    public Ipaddressservice: IpaddressService,
    public menuCtrl: MenuController
  ) {
    this.getParent = localStorage.getItem('ParentMenu');
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
      this.checkMenu();
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

    this.user_name = localStorage.getItem('TUM_USER_NAME');
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.name = (<any>event).url.split("/").slice(-1)[0];

        console.log("event.constructor.name :" + event.constructor.name);

        if (this.name == 'login') {
          this.logoutbtn = true;
          //navigator['app'].exitApp();

        }
        else if (this.name == '') {
          this.logoutbtn = true;
        }
        else {
          this.logoutbtn = false;
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
  checkMenu() {
    this.getParse = JSON.parse(this.getParent);
    this.getParse.forEach(element => {
      this.showParentMenu = element.MENU_DESC;
      if (element.MENU_DESC == "HRMS") {
        this.listParentMenu1 = "HRMS";
      } else if (element.MENU_DESC == "Sales Leads") {
        this.listParentMenu2 = "Sales Leads";
      } else if (element.MENU_DESC == "CAMS") {
        this.listParentMenu3 = "CAMS";
      } else if (element.MENU_DESC == "eProcure") {
        this.listParentMenu4 = "Procurement";
      } else if (element.MENU_DESC == "FM") {
        this.listParentMenu5 = "Property";
      }
    });
  }
  ngOnInit() {
    debugger;
    this.user_role = window.localStorage.getItem('TUM_USER_TYPE');
    var userid = window.localStorage.getItem('TUM_EMP_CODE');
    console.log(this.user_role);
    if (this.user_role == '1' || this.user_role == '46' || this.user_role == '37' || this.user_role == '44' || this.user_role == '47' || this.user_role == '45') {
      this.chkadmin = true;
    }





  }

  ionViewWillEnter() {

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

  async logout(): Promise<void> {
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
  menutoogle() {

    if (this.list == true) {
      this.list = false;
    }
    else {
      this.list = true;
    }


  }
  menutoogle1() {

    if (this.list1 == true) {
      this.list1 = false;
    }
    else {
      this.list1 = true;
    }


  }
  menutoogle2() {

    if (this.list2 == true) {
      this.list2 = false;
    }
    else {
      this.list2 = true;
    }


  }
  menutoogle3() {

    if (this.list3 == true) {
      this.list3 = false;
    }
    else {
      this.list3 = true;
    }


  }

  menutoogle5() {

    if (this.list5 == true) {
      this.list5 = false;
    }
    else {
      this.list5 = true;
    }


  }


  menutoogle6() {

    if (this.list6 == true) {
      this.list6 = false;
    }
    else {
      this.list6 = true;
    }


  }

  menutoogle4() {
    this.router.navigateByUrl('/hrmsmyapprovals');
    this.menuCtrl.close();
  }

  menutoogleCams() {

    if (this.CamsList == true) {
      this.CamsList = false;
    }
    else {
      this.CamsList = true;
    }
  }


  menutooglepms() {
    debugger
    if (this.pms == true) {
      this.pms = false;
    }
    else {
      this.pms = true;
    }
  }





  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  showreports() {
    alert("567")





    this.pmssubmenu = !this.pmssubmenu
    this.pmssubmenu = true
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


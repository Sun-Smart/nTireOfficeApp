import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from 'src/app/ipaddress.service';
import { PmsCreateIssuePage } from '../pms-create-issue/pms-create-issue.page';
import { PmsIssueStatusPage } from '../pms-issue-status/pms-issue-status.page';
declare var google: any;

@Component({
  selector: 'app-pmscustomer',
  templateUrl: './pmscustomer.page.html',
  styleUrls: ['./pmscustomer.page.scss'],
})
export class PmscustomerPage implements OnInit {

  name: string = '';
  username: any;
  filterTerm: string;
  showfilter: boolean = true;

  propertyBranch:any;
  propertyLocation:any;
  Propertyname:any;
  propertyCode:any;
  propertyDescription:any;
  uniqueRef;
  branchcode: any;
  branchid: any;
  userId: any;

  strFunctionId
  strLocationId
  strPropertyId
  strPropertyDesc
  rentelCode
  strStatus
  pageIndex
  pageSize
  sortExpression
  alphaname
  Split_ID
  strusertype

  userID:any;
  usertype: any;
  function: any;
  branch: any;
  functionID: any;
  branchID:any;
  Location: any;
  Propertycode: any;
  assetcode: any;
  details1 = [];
  isItemAvailable: boolean;
  assetcode1: any[];
  accessToken: any;
  propertyCodeResult: any;
  propertyCodeResult1: any;
  userToken: any;



  constructor(private modalCtrl: ModalController, 
    public alertController: AlertController, 
    private http: HttpClient, 
    public Ipaddressservice: IpaddressService) 
    {
      this.branchID = localStorage.getItem('TUM_BRANCH_ID');
      this.functionID = localStorage.getItem('FUNCTION_ID');
      this.branch = localStorage.getItem('TUM_BRANCH_CODE');
      this.userID = localStorage.getItem('TUM_USER_ID');
      this.usertype = localStorage.getItem('TUM_USER_TYPE');
      this.accessToken = localStorage.getItem('token');
    }


  ngOnInit() {
this.getItems("");
    this.assetcode = "";
    this.details1 = [];

    this.userId = window.localStorage['TUM_USER_ID'],
    this.branchcode = window.localStorage['TUM_BRANCH_CODE']
    this.branchid = window.localStorage['TUM_BRANCH_ID']
    this.strFunctionId = window.localStorage['FUNCTION_ID']
    this.strusertype = window.localStorage['TUM_USER_TYPE']

  }
  async createModal() {

    const model = await this.modalCtrl.create({

      component: PmsCreateIssuePage,
    });
    return await model.present();
    const { data, role } = await model.onWillDismiss();

    if (role === 'confirm') {
      this.name = data;

    }
  }

  async viewModal() {
    const model = await this.modalCtrl.create({

      component: PmsIssueStatusPage,
    });
    return await model.present();
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  }

  doRefresh(event) {
    this.details1 = [];
    this.assetcode = '';
    event.target.complete();
  }


  getItems(e:any) {
    console.log(e);

    this.assetcode1 = [];
    // if (e.target.value == "") {
    //   this.assetcode1 = [];
    //   this.isItemAvailable = false;
    // };

    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    var params = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      usertoken: window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
    };
    this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/' + this.strFunctionId + '/' + this.branchid + '/' + this.branchcode
      + '/' + this.Propertycode + '/' + this.strPropertyDesc + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + this.strusertype + '/' + this.userId, {
        headers: options,
      }
    ).subscribe((resp: any) => {
      console.log(resp);
      
      this.propertyCodeResult = resp;

      this.propertyCodeResult1 = this.propertyCodeResult;

      for(var i = 0; i < this.propertyCodeResult1.length; i++ ){
        this.assetcode1.push(this.propertyCodeResult1[i].ASSET_CODE);
      };
      const val = e.target.value;

      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.assetcode1 = this.assetcode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    })

  };

  // propertyCodE(assetcode:any){
  //   this.details1 = [];
  //   this.assetcode = assetcode;
  //   this.isItemAvailable = false;

  //   var data = {
  //     'assetcode': assetcode,
  //     'branchid': this.branchID,
  //     'access_token': this.accessToken,
  //     'userid': this.userID,
  //     'usertoken': this.userToken
  //   };
  //   console.log(data);

  //   const header = new Headers();
  //   header.append("Content-Type", "application/json");

  //   let options = new HttpHeaders().set('Content-Type', 'application/json');
    
  // }



}

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

  propertyBranch: any;
  userId: any;
  functionID: string;
  userID: string;
  usertype: string;
  accessToken: string;
  strFunctionId: any;
  strusertype: any;
  Propertycode: any;
  propertyCodeResult: any;
  params: { access_token: any; usertoken: any; USER_ID: any; };
  user: any;
  strBranchId: string;
  strLocationId: string;
  strPropertyId: string;
  strPropertyDesc: string;
  userid: string;
  branchid: any;
  branchID: string;








  constructor(private modalCtrl: ModalController,
    public alertController: AlertController,
    private http: HttpClient,
    public Ipaddressservice: IpaddressService) {
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
  }


  ngOnInit() {
    this.getItems("");

    this.userid = window.localStorage['TUM_USER_ID'],
    console.log(this.userid);
    
    this.strBranchId = window.localStorage['TUM_BRANCH_ID'],
    console.log(this.strBranchId);
    
    this.strFunctionId = window.localStorage['FUNCTION_ID'],
    console.log(this.strFunctionId);
    
    this.strusertype = window.localStorage['TUM_USER_TYPE'],
    console.log(this.strusertype);
    

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




  getItems(e: any) {

    console.log(e);

    // if (this.strPropertyId == null || this.strPropertyId == undefined) {
    //   this.strPropertyId = "0"
    // }
    // if (this.strPropertyDesc == null || this.strPropertyDesc == undefined) {
    //   this.strPropertyDesc = "0"
    // }
    // //  console.log(this.  );
    // if (this.strLocationId == null || this.strLocationId == "" || this.strLocationId == undefined) {
    //   this.strLocationId = "0"
    // }
    // if (this.strBranchId == null || this.strBranchId == undefined) {
    //   this.strBranchId = "0"
    // }


    // const header = new Headers();
    // // header.append("Content-Type", "application/json");
    // let options = new HttpHeaders().set('Content-Type', 'application/json');


    // this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/' + this.strFunctionId + '/' + this.branchid + '/' + this.branchcode
    //   + '/' + this.Propertycode + '/' + this.strPropertyDesc + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + this.strusertype + '/' + this.userId, {

    this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/' + this.strFunctionId + '/' + this.strBranchId + '/' + this.strLocationId
      + '/' + this.strPropertyId + '/' + this.strPropertyDesc + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + this.strusertype + '/' + this.userid, {

    }).subscribe((resp: any) => {
      console.log(resp);

      this.propertyCodeResult = resp;

    })

  };



}

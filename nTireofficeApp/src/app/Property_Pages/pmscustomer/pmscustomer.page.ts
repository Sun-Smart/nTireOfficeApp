import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IonSearchbar } from '@ionic/core/components';
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

  username = window.localStorage.getItem('TUM_USER_NAME');

  name: string = '';
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
  propertyCodeResultLength: any;
  showdata: any;




  constructor(private modalCtrl: ModalController,
    public alertController: AlertController,
    private http: HttpClient,
    public Ipaddressservice: IpaddressService) {

    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.accessToken = localStorage.getItem('token');
    };


  ngOnInit() {
    this.getItems();

  };

  async createModal() {

    const model = await this.modalCtrl.create({

      component: PmsCreateIssuePage,
    });
    return await model.present();
    const { data, role } = await model.onWillDismiss();

    if (role === 'confirm') {
      this.name = data;

    }
  };

  async viewModal() {
    const model = await this.modalCtrl.create({

      component: PmsIssueStatusPage,
    });
    return await model.present();
  };
  togglefilter() {
    this.showfilter = !this.showfilter;
  };




  getItems() {

   

    this.userid = window.localStorage['TUM_USER_ID'],
      console.log(this.userid);

    this.strBranchId = window.localStorage['TUM_BRANCH_ID'],
      console.log(this.strBranchId);

    this.strFunctionId = window.localStorage['FUNCTION_ID'],
      console.log(this.strFunctionId);

    this.strusertype = window.localStorage['TUM_USER_TYPE'],
      console.log(this.strusertype);

    
    // this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/' + this.strFunctionId + '/' + this.strBranchId + '/' + this.strLocationId
    //   + '/' + this.strPropertyId + '/' + this.strPropertyDesc + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + this.strusertype + '/' + this.userid, {

    this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/' + 0 + '/' + 0 + '/' + 0
      + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + this.userid,)
      .subscribe((resp: any) => {
        console.log(resp);

        this.propertyCodeResult = resp;

      })


    // const header = new Headers();
    // // header.append("Content-Type", "application/json");
    // let options = new HttpHeaders().set('Content-Type', 'application/json');


    // this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/' + this.strFunctionId + '/' + this.branchid + '/' + this.branchcode
    //   + '/' + this.Propertycode + '/' + this.strPropertyDesc + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + this.strusertype + '/' + this.userId, {

    this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/1/1/0/0/0/0/0/0/20/0/0/0/1/1')

    .subscribe((resp: any) => {
      console.log(resp);
      this.propertyCodeResult=resp
    
    if(this.propertyCodeResult==null ){
     alert("hh")
      this.showdata="No Data Found"
    }
    else{
      this.showdata=this.propertyCodeResult.length;
    }
    })


}

// search(){
//   this.propertyCodeResult.filter(u=> u.nation == 'England' && u.name == 'Marlin');
 
// }

}


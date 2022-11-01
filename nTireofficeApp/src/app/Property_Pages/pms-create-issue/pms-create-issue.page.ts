import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { IpaddressService } from '../../service/ipaddress.service';
@Component({
  selector: 'app-pms-create-issue',
  templateUrl: './pms-create-issue.page.html',
  styleUrls: ['./pms-create-issue.page.scss'],
})
export class PmsCreateIssuePage implements OnInit {

  name: string;
  username = window.localStorage.getItem('TUM_USER_NAME');
  dataStatus: any;
  contact_array = [];
  assetData: any[];
  isItemAvailable: boolean;
  companiesstr: any;
  propertycode: any;
  property_code: any;
  respContact: any;
  property_desc: string;
  assetDesc: any;
  assetCode: any;
  function: string;
  branch: any;
  userID: string;
  usertype: string;
  userToken: string;
  accessToken: string;
  branchID: string;
  functionID: string;
  priority: any;
  createDate: any;
  textDetails: any;
  user_ID: any;
  function_ID: any;
  branch_desc: any;
  branch_id: any;
  ASSET_CODE: any;

  department: any;
  gatagory: any;
  subGatagory: any;
  gatagoryDetails: any;
  categoryissue: any;
  refNum: Promise<void>;
  assetid: any;
  assetownerid: any;
  categoryid: any;

  constructor(private modalCtrl: ModalController,
    private http: HttpClient,
    public alertController: AlertController,
    public Ipaddressservice: IpaddressService,) {

    this.isItemAvailable = false;


    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');

    this.userID = localStorage.getItem('TUM_USER_ID');
    this.user_ID = JSON.parse(this.userID);

    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');

    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.branch_id = JSON.parse(this.branchID);

    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.function_ID = JSON.parse(this.functionID);

    this.username = localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  getItems(ev: any) {

    this.assetData = [];
    if (ev.target.value == "") {
      this.assetData = [];
      this.isItemAvailable = false;
    }

    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindproperty/' + this.functionID + '/' + this.branchID + '/' + ev.target.value, {
      headers: options,
    }).subscribe(resp => {
      this.assetData = [];
      this.isItemAvailable = false;
      // set val to the value of the searchbar
      this.companiesstr = resp;
      console.log('dfkjbsdkfj', this.companiesstr);

      // this.companiesstr = JSON.parse(this.companiesstr);
      // this.companiesstr = JSON.parse(resp.toString());

      for (var i = 0; i < this.companiesstr.length; i++) {
        this.assetData.push(this.companiesstr[i].ASSET_CODE);
      }
      const val = ev.target.value;

      this.gatagory = this.assetData[0]['ASSET_CATEGORY'];

      this.subGatagory = this.assetData[0]['ASSET_TYPE'];




      // if the value is an empty string don't filter the items

      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.assetData = this.assetData.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      // console.log("error : " + JSON.stringify(error));
    });
  }


  addPropertycode(item: any) {

    this.assetCode = item;
    this.isItemAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.assetCode == this.companiesstr[i].companyName) {
        this.ASSET_CODE = this.companiesstr[i].id;
        console.log(this.ASSET_CODE);
      }
    }
    // window.localStorage['old_company_status'] = 'true';
    // this.old_company = 'true';
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindproperty' + '/' + this.functionID + '/' + this.branchID + '/' + this.assetCode, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;

      console.log(this.respContact);

      this.assetDesc = this.respContact[0]['ASSET_DESCRIPTION'];
      this.department = this.respContact[0]['Department'];
      this.assetid = this.respContact[0]['ASSET_ID'];
      this.assetownerid = this.respContact[0]['ASSET_OWNER_ID'];
      
      // this.assetCode = this.respContact[0]['property_desc'];

      this.gatagory = this.respContact[0]['ASSET_CATEGORY'];
      console.log(this.gatagory);
      this.subGatagory = this.respContact[0]['ASSET_TYPE'];
      console.log(this.subGatagory);
      this.issueGatagory();
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }

  issueGatagory() {

    this.gatagory = this.respContact[0]['ASSET_CATEGORY'];
    console.log(this.gatagory);

    this.subGatagory = this.respContact[0]['ASSET_TYPE'];
    console.log(this.subGatagory);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindcategory/' + this.gatagory + '/' + this.subGatagory, {
      headers: options,
    }).subscribe(resp => {
      this.gatagoryDetails = resp;
      this.categoryid = this.gatagoryDetails[0]['VAL'];
      console.log(this.categoryid);
      
      console.log(this.gatagoryDetails);

    })
  }

  // postmethod create issue,

  createissue() {

    const header = new Headers().set('Content-Type', 'text/plain; charset=utf-8');

    let data = {

      "userid": this.user_ID,
      "functionid": this.function_ID,
      "branchid": this.branch_id,
      "Priority": this.priority,
      "pm_due_date": this.createDate,
      "drpPMType": this.categoryid,
      "txtDetails": this.textDetails,
      "assetownerid": "1",
      "assetid": this.assetid,
      "assetcode": this.assetCode,

    }
    let options = new HttpHeaders().set('Content-Type', 'application/json')

    this.http.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'get_training_details/', data, {
      headers: options, responseType: 'text'
    }).subscribe(resp => {
     
      this.dataStatus =JSON.parse(resp);
      console.log(this.dataStatus);

      this.refNum = this.dataStatus[0].Column1;
      // this.refNum =  this.dataStatus.map(({Column1}) => [Column1]);
      console.log(this.refNum);


      this.presentAlert("Success", "Issue Raised Sucessfully.. Issue Ref Number :" + this.refNum + "");
      this.reset();

    })
  };

  reset() {
    this.assetCode = '';
    this.assetDesc = '';
    this.department = '';
    this.createDate = '';
    this.gatagoryDetails = [];
    this.priority = '';
    this.textDetails = '';
  }

}

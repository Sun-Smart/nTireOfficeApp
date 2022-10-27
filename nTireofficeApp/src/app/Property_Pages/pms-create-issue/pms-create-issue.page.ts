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
  contact1: any;
  property_desc: string;
  propertyDesc: any;
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
    console.log("one");
    this.assetData = [];
    if (ev.target.value == "") {
      this.assetData = [];
      this.isItemAvailable = false;
    }

    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindproperty' + '/' + this.functionID + '/' + this.branchID + '/' + ev.target.value, {
      headers: options,
    }).subscribe(resp => {
      this.assetData = [];
      this.isItemAvailable = false;
      // set val to the value of the searchbar
      this.companiesstr = resp;
      console.log(this.companiesstr);

      // this.companiesstr = JSON.parse(this.companiesstr);
      // this.companiesstr = JSON.parse(resp.toString());

      for (var i = 0; i < this.companiesstr.length; i++) {
        this.assetData.push(this.companiesstr[i].property_code);
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items

      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.assetData = this.assetData.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    });
  }


  addPropertycode(item: any) {
    this.assetCode = item;
    this.isItemAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.assetCode == this.companiesstr[i].companyName) {
        this.property_code = this.companiesstr[i].id;
        console.log(this.property_code);
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

      this.propertyDesc = this.respContact[0]['property_desc'];
      this.assetCode = this.respContact[0]['property_desc'];

      this.contact1 = JSON.parse(this.respContact);
      console.log(this.contact1);

    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }


  // postmethod create issue,

  createissue() {
    var data = {

      "userid": this.user_ID,
      "functionid": this.function_ID,
      "branchid": this.branch_id,
      "Priority": this.priority,
      "pm_due_date": this.createDate,
      // "drpPMType": "15",
      "txtDetails": this.textDetails,
      // "assetownerid": "1",
      // "assetid": "55",
      "assetcode": this.assetCode,


    }
    this.http.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'get_training_details', data).subscribe((res: any) => {
      console.log(res)
      this.dataStatus = res
      console.log(res.recordsets.Column1);
      
      if (res) {
        // this.presentAlert("Success", "Issue raised successfully. Issue ref number :{ recordsets = [{"Column1":"382"}] }");
      }
    })
  }
}

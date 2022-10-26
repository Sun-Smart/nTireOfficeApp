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
  propertyCode1: any[];
  isItemAvailable: boolean;
  companiesstr: any;
  propertycode: any;
  property_code: any;
  respContact: any;
  contact1: any;
  property_desc: string;
  propertyDesc: any;


  constructor(private modalCtrl: ModalController, 
    private http: HttpClient,  
    public alertController: AlertController,
    public Ipaddressservice: IpaddressService,) {
      this.isItemAvailable = false;
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
    this.propertyCode1 = [];
    if (ev.target.value == "") {
      this.propertyCode1 = [];
      this.isItemAvailable = false;
    }

    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + ev.target.value, {
      headers: options,
    }).subscribe(resp => {
      this.propertyCode1 = [];
      this.isItemAvailable = false;
      // set val to the value of the searchbar
      this.companiesstr = resp;
      console.log(this.companiesstr);
      
      // this.companiesstr = JSON.parse(this.companiesstr);
      // this.companiesstr = JSON.parse(resp.toString());

      for (var i = 0; i < this.companiesstr.length; i++) {
        this.propertyCode1.push(this.companiesstr[i].property_code); 
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items

      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.propertyCode1 = this.propertyCode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    });
  }
  addPropertycode(item:any) {

    this.propertycode = item;
    this.isItemAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.propertycode == this.companiesstr[i].companyName) {
        this.property_code = this.companiesstr[i].id;
        console.log(this.property_code);
      }
    }
    // window.localStorage['old_company_status'] = 'true';
    // this.old_company = 'true';
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + this.propertycode, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;

      console.log(this.respContact);
      
      this.propertyDesc =  this.respContact[0]['property_desc'];

      this.contact1 = JSON.parse(this.respContact);
      console.log(this.contact1);
      if (this.contact1.length == 0) {
        this.presentAlert('Alert', 'Add company Contact Number!');

      } else {

        this.contact_array = this.contact1;
      }
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }


  // postmethod create issue,

  createissue() {
    var data = {

      "userid": 1,
      "functionid": 1,
      "branchid": 1,
      "Priority": "4",
      "pm_due_date": "11/10/2022",
      "drpPMType": "15",
      "txtDetails": "TEST",
      "assetownerid": "1",
      "assetid": "55",
      "assetcode": "PROCOM3327052022"


    }
    this.http.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'get_training_details', data).subscribe((res: any) => {
      console.log(res)
      this.dataStatus = res
    })
  }
}

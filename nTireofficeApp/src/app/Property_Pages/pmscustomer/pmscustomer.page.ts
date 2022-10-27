import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AlertController, ModalController } from '@ionic/angular';

import { IpaddressService } from '../../service/ipaddress.service';
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

  customerbranch: any;
  isItemAvailable: boolean = false;
  branchcode1: any[] = [];
  branchcode: any;
  customerlocation: any;
  locationcode1: any[] = [];
  locationcode: string;
  islocItemAvailable: boolean = false;
  selectbranch: any;
  contact_array = [];
  propertyCode1: any[];
  companiesstr: any;
  propertycode: any;
  property_code: any;
  respContact: any;
  propertyDesc: any;
  contact1: any;
  isPropertycodeAvailable: boolean = false;





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
    this.branchcode = ('')
    this.locationcode = ('')
    this.getbranch();
    this.getcustomerItems();
    this.getlocation();



  };

  async createModal() {

    const model = await this.modalCtrl.create({

      component: PmsCreateIssuePage,
    });
    return await model.present();

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

  propertyBrancH(data: any) {

    console.log(data);


    this.http.get("https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/getbranchid").subscribe((resp: any) => {

      console.log(resp);

      this.propertyBranch = resp;

      console.log(this.propertyBranch);





    });
  }


  getcustomerItems() {

    this.userid = window.localStorage['TUM_USER_ID'],
      console.log(this.userid);

    this.strBranchId = window.localStorage['TUM_BRANCH_ID'],
      console.log(this.strBranchId);
      
      // this.strBranchcode = window.localStorage['TUM_BRANCH_CODE'],
      console.log(this.strBranchcode);

    this.strFunctionId = window.localStorage['FUNCTION_ID'],
      console.log(this.strFunctionId);

    this.strusertype = window.localStorage['TUM_USER_TYPE'],
      console.log(this.strusertype);


    this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/1/1/0/0/0/0/0/0/20/0/0/0/1/1')

      .subscribe((resp: any) => {
        console.log(resp);
        this.propertyCodeResult = resp

        if (this.propertyCodeResult == null) {
          alert("hh")
          this.showdata = "No Data Found"
        }
        else {
          this.showdata = this.propertyCodeResult.length;
        }
      })


  }
  strBranchcode(strBranchcode: any) {
    throw new Error('Method not implemented.');
  }


  getbranch() {
    this.http.get("https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/getbranchid").subscribe((res) => {
      console.log("branch", res);
      this.customerbranch = res
      for (var i = 0; i < this.customerbranch.length; i++) {

        this.branchcode1.push(this.customerbranch[i].BRANCH_DESC);

      }
      console.log(this.branchcode1, 'fyttr')
    })
  }
  getItems(ev: any) {
    let data = ev.target.value;
    console.log(data);
    this.selectbranch = data;

    // Reset items back to all of the items
    this.getbranch()

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.branchcode1 = this.branchcode1.filter((item) => {

        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
      console.log(this.branchcode1, "hfghfg");
    } else {
      this.isItemAvailable = false;
    }
  }

  processbranch(e: any) {
    console.log(e);

    this.branchcode = this.branchcode
    console.log(this.branchcode, "gggg");

    this.isItemAvailable = false;
  }


  getlocation() {
    this.http.get("https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/getlocation").subscribe((res) => {
      console.log("location", res);
      this.customerlocation = res
      for (var i = 0; i < this.customerlocation.length; i++) {

        this.locationcode1.push(this.customerlocation[i].LOCATION_DESC);

      }
      console.log(this.locationcode1, 'fyttr')
    })
  }
  getlocationItems(ev: any) {
    // Reset items back to all of the items
    this.getlocation()

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.islocItemAvailable = true;
      this.locationcode1 = this.locationcode1.filter((item) => {

        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
    } else {
      this.islocItemAvailable = false;
    }
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


  getPropertyCode(ev: any) {
    console.log("one");
    this.propertyCode1 = [];
    if (ev.target.value == "") {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
    }

    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + ev.target.value, {
      headers: options,
    }).subscribe(resp => {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
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
        this.isPropertycodeAvailable = true;
        this.propertyCode1 = this.propertyCode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    });
  }
  addPropertycode(item: any) {
    this.propertycode = item;
    this.isPropertycodeAvailable = false;
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

      this.propertyDesc = this.respContact[0]['property_building_name'];


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


}

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
  showdata: any;
  showAllrecords: any = [];


  propertyBranch: any;
  userId: any;
  functionID: string;
  userID: any;
  usertype: string;
  accessToken: string;
  strFunctionId: any;
  strusertype: any;
  Propertycode: any;
  // propertyCodeResult: any;
  params: { access_token: any; usertoken: any; USER_ID: any; };
  user: any;
  strBranchId: string;
  strLocationId: string;
  strPropertyId: string;
  strPropertyDesc: string;
  userid: any;
  branchid: any;
  branchID: string;
  propertyCodeResultLength: any;


  customerbranch: any;
  isItemAvailable: boolean = false;
  branchcode: any;
  customerlocation: any;
  locationcode: string;
  islocItemAvailable: boolean = false;
  selectbranch: any;
  contact_array = [];
  propertyCode1 = [];
  companiesstr: any;
  propertycode: any;
  property_code: any;
  respContact: any;
  propertyDesc: any;
  contact1: any;
  isPropertycodeAvailable: boolean = false;


  branchlist: any;
  branchlist1: any = [];
  branchlocationlist: any = [];
  branch: any;
  branchlocation: any;
  norecordsfound: boolean;
  filterPropertyCode: any;
  propertycodeDesc: any;
  location: any;
  Location: any;
  getBID: any;
  branchId: any = [];
  get_Bid: any;
  loca_id: any;
  propertyCodeResult: any = [];
  showRecords: boolean;


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
    // this.Getbranches();
    this.getcustomerItems();
    // this.getlocation();
    this.BranchLocationdata();

  };

  showmore(idvalue) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "block");
    $("#imageidvalsp" + idvalue).hide();
  }
  showless(idvalue) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "none");
    $("#imageidvalsp" + idvalue).show();
  };

  async createModal() {
    const model = await this.modalCtrl.create({
      component: PmsCreateIssuePage,
    });
    return await model.present();
  };

  async viewModal(item: any) {
    console.log(item);
    const model = await this.modalCtrl.create({
      component: PmsIssueStatusPage,
      componentProps: { Data: item }
    });
    return await model.present();
  };
  togglefilter() {
    this.showfilter = !this.showfilter;
  };

  filterRecords() {
    if (this.branch == "undefined" || this.branch == null || this.branch == "") {
      this.presentAlert1("", "Please select Branch");
      return;
    } else {
      debugger;
      const header = new Headers();
      header.append("Content-Type", "application/json");

      let data = {
        functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
        branchids: this.branchid ? this.branchid : 0,
        locationid: this.branchlocation ? this.branchlocation : 0,
        strPropertyCode: this.propertycodeDesc ? this.propertycodeDesc : 0,
        strPropertyDesc: 0,
        rentelCode: 0,
        strStatus: 0,
        pageIndex: 0,
        pageSize: 50,
        sortExpression: 0,
        alphaname: 0,
        Split_ID: 0,
        strusertype: parseInt(localStorage.getItem('TUM_USER_TYPE')),
        userid: parseInt(localStorage.getItem('TUM_USER_ID'))
      };

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'fm_rental_summary/' + data.functionid + '/' + data.branchids + '/' + data.locationid + '/' + data.strPropertyCode + '/' + data.strPropertyDesc + '/' + data.rentelCode + '/' + data.strStatus + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.Split_ID + '/' + data.strusertype + '/' + data.userid, {
        headers: options,
      }).subscribe(resp => {
        this.propertyCodeResult = [];
        this.propertyCodeResult = resp;
        debugger
        if (resp == null) {
          this.showRecords = true;
        } else {
          this.showRecords = false;
          this.propertyCodeResult = resp;
        }
        // console.log('this.showAllrecords ', this.showAllrecords);

      });
    }
  };

  
  // Getbranches() {

  //   let data = {
  //     functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
  //     userid: parseInt(localStorage.getItem('TUM_USER_ID')),
  //   };

  //   const header = new Headers();
  //   header.append("Content-Type", "application/json");

  //   let options = new HttpHeaders().set('Content-Type', 'application/json');
  //   this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + data.functionid + '/' + data.userid , {
  //     headers: options,
  //   }).subscribe(resp => {
  //     this.branchlist = resp;
      
  //     console.log(this.branchlist);
  //     for (var i = 0; i < this.branchlist.length; i++) {
  //       this.branchid = this.branchlist[i].BRANCH_ID; 
  //     };
  //     console.log(this.branchid);


  //   }, error => {
  //   });
  // };

  getcustomerItems() {

    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      branchids : 0,
      locationid:  0,
      strPropertyId: 0,
      strPropertyDesc: 0,
      rentelCode: 0,
      strStatus: 0,
      pageIndex: 0,
      pageSize: 50,
      sortExpression: 0,
      alphaname: 0,
      Split_ID: 0,
      strusertype: this.usertype ? this.usertype : 0,
      userid: this.userID ? this.userID : 0,
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'fm_rental_summary/' + data.functionid + '/' + data.branchids + '/' + data.locationid + '/' + data.strPropertyId + '/' + data.strPropertyDesc + '/' + data.rentelCode + '/' + data.strStatus + '/' + data.pageIndex + '/' + data.pageSize + '/' + data.sortExpression + '/' + data.alphaname + '/' + data.Split_ID + '/' + data.strusertype + '/' + data.userid, {
      headers: options,
    }).subscribe((resp: any) => {
      console.log(resp);
      this.propertyCodeResult = resp;

      for (var i = 0; i < this.propertyCodeResult.length; i++) {
        this.branchlocation = this.propertyCodeResult[i].location_id;
      }
      console.log( this.branchlocation);
    
      if (this.propertyCodeResult == null) {
        this.showdata = "No Data Found"
      }
      else {
        this.showdata = this.propertyCodeResult.length;
      }
    }, error => {
      // console.log("showAllrecords : " + JSON.stringify(error));
    });

  };

  BranchLocationdata() {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    let userId = parseInt(localStorage.getItem('TUM_USER_ID'));

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + userId, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 = resp;
      // this.branchlocationlist = JSON.stringify(resp);
      // this.branchlocationlist = JSON.parse(this.branchlocationlist);
      console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));
      for (var i = 0; i < this.branchlist1.length; i++) {
        this.getBID = this.branchId.push(this.branchlist1[i].BRANCH_ID);
      }
      console.log('getBID', this.getBID);

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  };

  
  getLocationdata(branch:any) {
    console.log(branch);
    
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

    this.get_Bid = branch;
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branch, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      this.customerlocation = resp;
      for (var i = 0; i < this.customerlocation.length; i++) {
        this.loca_id = this.customerlocation[i].LOCATION_ID;
      }
    });
  };

  newPropertyCode(branchlocation) {

    let data = {
      strFunctionId: parseInt(localStorage.getItem('FUNCTION_ID')),
      propertyCode: 0,
      branch_Id: this.get_Bid,
      loca_Id: this.loca_id
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + data.propertyCode + "/" + data.strFunctionId + "/" + data.branch_Id + "/" + data.loca_Id, {
      headers: options,
    }).subscribe(resp => {
      console.log('click t  call', resp);

      // set val to the value of the searchbar

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    });

  }

    getPropertyCode(ev: any) {

    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

    // console.log("one");
    this.propertyCode1 = [];
    if (ev.target.value == "") {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
    }

    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + ev.target.value + "/" + strFunctionId + "/" + this.branch + "/" + this.branchlocation, {
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
        // this.propertyCode1.push(this.companiesstr[i].property_code);
        this.propertyCode1.push({
          property_code: this.companiesstr[i].property_code,
          binding: this.companiesstr[i].property_code + "-" + this.companiesstr[i].property_building_name
        });
      };
      // for (var i = 0; i < this.companiesstr.length; i++) {
      //   this.propertyCode1.push(this.companiesstr[i].property_code);
      // }
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
  };

  addPropertycode(item: any) {

    this.propertycode = item.binding;
    this.propertycodeDesc = item.property_code;
    this.isPropertycodeAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.propertycode == this.companiesstr[i].companyName) {
        this.property_code = this.companiesstr[i].id;
        console.log(this.property_code);
      }
    };

    let data = {
      functionid: parseInt(localStorage.getItem('FUNCTION_ID')),
      branchids: this.branchid ? this.branchid : 1,
      locationid: this.branchlocation ? this.branchlocation : 1,
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + this.propertycodeDesc + "/" + data.functionid + "/" + data.branchids + "/" + data.locationid, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respContact);

      this.propertyDesc = this.respContact[0]['property_building_name'];
    }, error => {
      console.log("error : " + JSON.stringify(error));
    });
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
  };
  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });
    await alert.present();
  }

}

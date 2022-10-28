import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-pms-list',
  templateUrl: './pms-list.page.html',
  styleUrls: ['./pms-list.page.scss'],
})
export class PmsListPage implements OnInit {
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
  userid: any;
  branchid: any;
  branchID: string;
  propertyCodeResultLength: any;
  showdata: any;

  customerbranch: any;
  isItemAvailable: boolean = false;
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


  branchlist: any;
  branchlist1: any = [];
  branchlocationlist: any = [];
  branch: any;
  branchlocation: any;
  nodatafound: string;
  reportpropertylist: any;
  status: string;
  PropertyType: any;
  propertynature: any;




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
    this.branchcode = ('')
    this.locationcode = ('')
    this.Getbranches();
   
    this.getpropertylistreport()
  }
  togglefilter(){
    this.showfilter = !this.showfilter
  }


 ;
  strBranchcode(strBranchcode: any) {
    throw new Error('Method not implemented.');
  };


  Getbranches() {

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getbranchid', {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = JSON.stringify(resp);
      this.branchlist = JSON.parse(this.branchlist);
      this.branchlist.forEach(element => {
        this.branchlist1.push(element);
        console.log("branchlist1 : " + JSON.stringify(this.branchlist1));
      });
    }, error => {
    });
  };

  BranchLocationdata(branchid) {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'bindbranch/' + strFunctionId + "/" + branchid, {
      headers: options,
    }).subscribe(resp => {
      this.branchlocationlist = JSON.stringify(resp);
      this.branchlocationlist = JSON.parse(this.branchlocationlist);
      console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }





  getLocationdata(branchlocation) {
    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getlocation/' + strFunctionId + "/" + branchlocation, {
      headers: options,
    }).subscribe(resp => {
      console.log("location", resp);
      this.customerlocation = resp
      for (var i = 0; i < this.customerlocation.length; i++) {

        this.locationcode1.push(this.customerlocation[i].LOCATION_DESC);

      }
      console.log(this.locationcode1, 'fyttr')
    })
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

    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));
    
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

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + ev.target.value + "/" + strFunctionId + "/" + this.branch + "/" + this.branchlocation, {
      headers: options,
    }).subscribe(resp => {
      this.propertyCode1 = [];
      this.isPropertycodeAvailable = false;
      // set val to the value of the searchbar
      this.companiesstr = resp;
      console.log(this.companiesstr);
if(this.companiesstr=="No data found"){
  this.nodatafound="No data found"

}
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
  };

  addPropertycode(item: any) {

    let strFunctionId = parseInt(localStorage.getItem('FUNCTION_ID'));

    this.propertycode = item;
    this.isPropertycodeAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.propertycode == this.companiesstr[i].companyName) {
        this.property_code = this.companiesstr[i].id;
        console.log(this.property_code);
      }
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getPropertycode/' + this.propertycode + "/" + strFunctionId + "/" + this.branch + "/" + this.branchlocation , {
      headers: options,
    }).subscribe(resp => {
      this.respContact = resp;
      console.log(this.respContact);

      this.propertyDesc = this.respContact[0]['property_building_name'];
      // this.contact1 = JSON.parse(this.respContact);
      // console.log(this.contact1);
      // if (this.contact1.length == 0) {
      //   this.presentAlert('Alert', 'Add company Contact Number!');

      // } else {

      //   this.contact_array = this.contact1;
      // }
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }



// total get

getpropertylistreport(){
  const header = new Headers();
  header.append("Content-Type", "application/json");
  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertylistreports/'+ this.functionID + "/" + this.branchID + "/" +"0/0/0/0/0/0/0/0/0", {
    headers: options,
  }).subscribe((res:any)=>{
    console.log(res,"reportlist");
   this.reportpropertylist=res


   
   if (this.reportpropertylist == null) {

    this.showdata = "No Data Found"
  }
  else {
    this.showdata = this.reportpropertylist.length;
  }
    
  })

}

filterpropertylistreport(){
  const header = new Headers();
  header.append("Content-Type", "application/json");
  let options = new HttpHeaders().set('Content-Type', 'application/json');
  let data ={
    functionID: localStorage.getItem('FUNCTION_ID'),
    branchid: this.branch ? this.branch : 1,
    locationid: this.branchlocation ? this.branchlocation : 1,
    propertyID: this.propertycode ? this.propertycode : 0,
    status: this.status ? this.status : 0,
    propertytype: this.PropertyType ? this.PropertyType : 0,
    propertynature: this.propertynature ? this.propertynature : 0,

  }
  this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getpropertylistreports/'+ data.functionID + "/" + data.branchid + "/" + data.locationid + "/" + data.propertyID + "/" +"0/0/0/" + data.status +"/" + data.propertytype +"/0" +"/" + data.propertynature, {
    headers: options,
  }).subscribe((res:any)=>{
    console.log(res,"reportlist");
   this.reportpropertylist=res


   
   if (this.reportpropertylist == null) {

    this.showdata = "No Data Found"
  }
  else {
    this.showdata = this.reportpropertylist.length;
  }
    
  })

}





}

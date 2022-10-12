/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable curly */
/* eslint-disable guard-for-in */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
declare var google: any;
import { NavParams } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var $: any;
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
@Component({
  selector: 'app-locationupdateleads',
  templateUrl: './locationupdateleads.page.html',
  styleUrls: ['./locationupdateleads.page.scss'],
})
export class LocationupdateleadsPage implements OnInit,OnDestroy {
  showmap;
  currentlocation;
  currentlatlon;
  map: any;
  service = new google.maps.places.AutocompleteService();
  callpriorityarray = [];

  callratingarray = [];
  callnaturearray = [];
  callstagearray = [];
  leadsourcearray = [];
  nextactionarray = [];
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  ntireoffice_image;
  followtime;
  @ViewChild('map') mapElement: ElementRef;
  dataobjs = {
    leadstatusval: "",
    callratingval: "",
    callnatureval: "",
    callstageval: "",
    leadsrc: "",
    ClosedDate: "",
    ExpctedAmount: "",
    pendleadremarks: "",
    pendleadactreq: "",
    nextactionval: "<< Select >>",
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    EmailID: "",
    schedmeetdate: "",
    schedmeettime: "",
    schedleadareaname: "",
  };
  BaseArea;
  schedleadareaname;
  item;
  itemupd;
  audiofilename;
  meetaddress;
  objdataupd = {
    callnatureval: "",
    callratingval: "",
    callstageval: "",
    leadstatusval: "",
    nextactionval: "",
    LeadSource: "",
    Remarks: "",
    ActReq: "",

    ClosedDate: "",
    ExpctedAmount: "",
    Meeting_address: "",
    TCC_LOCATION_TO_MEET: "",
    TCC_NEXT_CALL_DATE: "",
    CUST_LNAME: "",
    TCC_LEAD_PRIORITY: "",
    TCC_LEAD_BY: "",

    TCC_CUST_LEAD_ID: "",
    TCC_CUSTOMER_ID: "",
    customer_lead_id: "",
    CALL_ID: ""
  };
  addbaselocno;
  token;
  barval;
  lead_id;
  appointmentByLead;
  priority;
  private backbuttonSubscription: Subscription;
  username:any;
  constructor(public alertController: AlertController, private model: ModalController, private datePipe: DatePipe, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, navParams: NavParams, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.showmap = true;
    this.ntireoffice_image = 'http://heribeai.com/MyDesk/UploadDocu/SSTPL/';
    this.Getcallpriority();
    this.Getcallrating();
    this.Getcallnature();
    this.Getcallstage();
    this.Getleadsource();
    console.log(navParams.get('item'));
    this.item = navParams.get('item');
    this.barval = navParams.get('barval');
    this.lead_id = navParams.get('lead_id');
    this.getdetaills();
    this.username=localStorage.getItem('TUM_USER_NAME');
  }
  getdetaills() {
    this.token = window.localStorage['token'];
    var tokenJSON = { access_token: this.token, userid: window.localStorage['TUM_USER_ID'], 'usertoken': window.localStorage['usertoken'] };

    var getappbyleadJSONtmp = { user_id: localStorage['TUM_USER_ID'], lead_id: this.lead_id };
    var getappbyleadJSON = Object.assign(getappbyleadJSONtmp, tokenJSON);

    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/getappointmentsbylead/', getappbyleadJSON, {
      headers: options,
    }).subscribe(resp => {
      this.appointmentByLead = resp;
      for (var i = 0; i < this.appointmentByLead.length; i++) {
        this.dataobjs.nextactionval = "" + this.appointmentByLead[i].TCC_RESPONSE;
        this.dataobjs.leadstatusval = this.appointmentByLead[i].LEADSTATUS;
        this.priority = this.appointmentByLead[i].priority;
        this.dataobjs.callratingval = "" + this.appointmentByLead[i].TCC_LEAD_RATING;

        this.dataobjs.callnatureval = "" + this.appointmentByLead[i].TCC_LEAD_NATURE;
        this.dataobjs.callstageval = "" + this.appointmentByLead[i].TCC_LEAD_STAGE;
        this.dataobjs.leadsrc = "" + this.appointmentByLead[i].TCC_LEAD_SOURCE;
        this.dataobjs.FirstName = this.appointmentByLead[i].CUSTOMER_FNAME;
        this.dataobjs.LastName = this.appointmentByLead[i].CUSTOMER_LNAME;
        this.dataobjs.MobileNumber = this.appointmentByLead[i].MOBILE;
        this.dataobjs.pendleadremarks = this.appointmentByLead[i].Remarks;
        this.dataobjs.pendleadactreq = this.appointmentByLead[i].Action_req;
        this.objdataupd.TCC_CUSTOMER_ID = this.appointmentByLead[i].TCC_CUSTOMER_ID;
        this.objdataupd.customer_lead_id = this.appointmentByLead[i].customer_lead_id;
        this.objdataupd.CALL_ID = this.appointmentByLead[i].CALL_ID;
        //this.dataobjs.schedmeetdate = new Date(this.appointmentByLead[i].TCC_NEXT_CALL_DATE);
        //this.dataobjs.schedmeettime = new Date(this.appointmentByLead[i].TCC_NEXT_CALL_DATE);


      }
    }, error => {

    });
  }
  dat_valid = {
    currentDate: new Date()
  };
  ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.backbuttonSubscription = event.subscribe(async () => {

     this.model.dismiss(this.barval);
    });
  }
  ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
}
  Getcallpriority(){
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 +'/mobileapi/LMS/LMS.svc/callpriority', {
      headers: options,
    }).subscribe(resp => {

     this.callpriorityarray=JSON.parse(resp.toString());
     console.log("callpriorityarray: "+JSON.stringify(this.callpriorityarray));

    }, error => {

      console.log("branchlist1 : "+JSON.stringify(error));
    });
  }
  Getcallrating(){
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 +'/mobileapi/LMS/LMS.svc/callrating', {
      headers: options,
    }).subscribe(resp => {

     this.callratingarray=JSON.parse(resp.toString());
     console.log("callratingarray: "+JSON.stringify(this.callratingarray));

    }, error => {

      console.log("branchlist1 : "+JSON.stringify(error));
    });
  }
  Getcallnature(){
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 +'/mobileapi/LMS/LMS.svc/callnature', {
      headers: options,
    }).subscribe(resp => {

     this.callnaturearray=JSON.parse(resp.toString());
     console.log("callnaturearray: "+JSON.stringify(this.callnaturearray));

    }, error => {

      console.log("branchlist1 : "+JSON.stringify(error));
    });
  }
  Getcallstage(){
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 +'/mobileapi/LMS/LMS.svc/callstage', {
      headers: options,
    }).subscribe(resp => {

     this.callstagearray=JSON.parse(resp.toString());
     console.log("callstagearray: "+JSON.stringify(this.callstagearray));

    }, error => {

      console.log("branchlist1 : "+JSON.stringify(error));
    });
  }
  Getleadsource(){
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 +'/mobileapi/LMS/LMS.svc/Leadsource', {
      headers: options,
    }).subscribe(resp => {

     this.leadsourcearray=JSON.parse(resp.toString());
     console.log("leadsourcearray: "+JSON.stringify(this.leadsourcearray));

    }, error => {

      console.log("branchlist1 : "+JSON.stringify(error));
    });
  }
  handleAddressChange(event){
    this.showmap=false;
    console.log(event.geometry.location.lat());
    console.log(event.geometry.location.lng());
    this.meetaddress=event.formatted_address;
    this.addbaselocno = event.geometry.location.lat() + "," + event.geometry.location.lng();
    //this.appointmentLatLong=event.geometry.location.lat()+","+event.geometry.location.lng();
    let latLng = new google.maps.LatLng(event.geometry.location.lat(), event.geometry.location.lng());

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      animation: google.maps.Animation.DROP,
      // position: map.getCenter()
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.setCenter(latLng);
    this.map.setZoom(16);
    this.addMarker1(this.map);

  }
  addMarker1(map: any) {

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });



  }

  Updateschedulemeet(data,address){
    console.log(data);
    console.log(address);
    if(data.leadstatusval==''){
      this.presentAlert("","Please Select Priority");
    }
    else if(data.callratingval==''){
      this.presentAlert("","Please Select Call Rating");
    }
    else if(data.callnatureval==''){
      this.presentAlert("","Please Select Call Nature");
    }
    else if(data.callstageval==''){
      this.presentAlert("","Please Select Call Stage");
    }
    else if(data.nextactionval=='<< Select >>'){
      this.presentAlert("","Please Select Next Action");
    }
    else if(data.nextactionval == '2' && (data.schedmeetdate==undefined || this.followtime==undefined)){
      this.presentAlert("","Please Enter Date & Time");
    }
    else if(data.nextactionval == '1' && (this.schedleadareaname ==undefined ||data.schedmeetdate==undefined || this.followtime==undefined)){
      this.presentAlert("","Please Enter Place To Meet & Meeting Date & Meeting Time");
    }
    else{
    this.objdataupd.callnatureval =data.callnatureval;
    this.objdataupd.callratingval = data.callratingval;
    this.objdataupd.callstageval =data.callstageval;
    this.objdataupd.leadstatusval = data.leadstatusval;
    this.objdataupd.nextactionval =data.nextactionval;
    this.objdataupd.LeadSource = data.leadsrc;
    this.objdataupd.Remarks = data.pendleadremarks;
    this.objdataupd.ActReq = data.pendleadactreq;

if(data.ClosedDate!=undefined && data.ClosedDate!=""){
    var closeddate= new Date(data.ClosedDate);
      var meetClosedate = this.datePipe.transform(closeddate, 'yyyy-MM-dd');
      this.objdataupd.ClosedDate = meetClosedate;
    }
    else{
      var meetClosedate ="";
      this.objdataupd.ClosedDate = meetClosedate;
    }

    this.objdataupd.ExpctedAmount = data.ExpctedAmount;
    if (data.nextactionval == '2' || data.nextactionval == '1') {
      var schedmeetdate= new Date(data.schedmeetdate);

        var meetdate = this.datePipe.transform(schedmeetdate, 'yyyy-MM-dd');

        var meettime =this.tConv24(this.followtime);

        meettime = meetdate + " " + meettime;
        this.objdataupd.TCC_NEXT_CALL_DATE = meettime;
        this.objdataupd.TCC_LOCATION_TO_MEET = this.addbaselocno;
        this.objdataupd.Meeting_address = this.meetaddress;
    }
    this.token = window.localStorage['token'];
    var tokenJSON = {access_token :this.token,userid: window.localStorage['TUM_USER_ID'],'usertoken' : window.localStorage['usertoken']};

    var updateleadJSON = Object.assign(this.objdataupd,tokenJSON);

  console.log(updateleadJSON);
           const header = new Headers();
           header.append("Content-Type", "application/json");
         let options = new HttpHeaders().set('Content-Type', 'application/json');
           this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/updpendleadsdata/', updateleadJSON, {
             headers: options,
           }).subscribe(resp => {
            if (resp == 'Updated Successfully') {
              this.presentAlertConfirm("","Saved Successfully");
             }
       }, error => {
        this.presentAlertConfirm("","Saved Successfully");
           });
          }
  }
  async presentAlert(heading,tittle) {
    var alert = await this.alertController.create({
      header: heading,
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
  timeValidation(val){

    var element =val;
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    var compare_dates = function(date1,date2){
       if (date1>date2) return true;
     else if (date1<date2) return false;
     else return false;
    }
  console.log("chck "+new Date(this.dataobjs.schedmeetdate+" "+element))

  if(compare_dates(new Date(this.dataobjs.schedmeetdate+" "+element), new Date())!=true){

  alert("Time should not be past");
  this.dataobjs.schedmeettime=undefined;

  }
  }
   tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10)?(0+h):h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;

    return ts;
  };
  async presentAlertConfirm(heading, tittle) {
    const alert = await this.alertController.create({
      header: heading,
      message: tittle,
      backdropDismiss:false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.model.dismiss(this.barval);
            }
        }
      ]
    });

    await alert.present();
  }
    generateAddress(addressObj){
      let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(0, -2);
    }
    callfuncforareaname(placename) {
      var addresssplit = placename.split(",");
      var baseareaname = "";
      if (addresssplit[addresssplit.length - 1] == " India") {
        if (addresssplit.length == 3) {
          baseareaname = addresssplit[0];
        } else if (addresssplit.length == 4) {
          baseareaname = addresssplit[addresssplit.length - 4] + "," + addresssplit[addresssplit.length - 3];
        } else if (addresssplit.length == 5) {
          baseareaname = addresssplit[addresssplit.length - 4] + "," + addresssplit[addresssplit.length - 3];
        } else {
          if (addresssplit.length >= 6) {
            baseareaname = addresssplit[addresssplit.length - 5] + "," + addresssplit[addresssplit.length - 4];
          }
        }
      } else if (addresssplit[addresssplit.length - 1] == " USA") {
        if (addresssplit.length == 3) {
          baseareaname = addresssplit[0] + "," + addresssplit[1];
        } else {
          if (addresssplit.length >= 4) {
            baseareaname = addresssplit[addresssplit.length - 3] + "," + addresssplit[addresssplit.length - 2];
          }
        }
      } else if (addresssplit[addresssplit.length - 1] == " UK") {
        if (addresssplit.length == 3) {
          baseareaname = addresssplit[0] + "," + addresssplit[1];
        } else {
          if (addresssplit.length >= 4) {
            baseareaname = addresssplit[addresssplit.length - 3] + "," + addresssplit[addresssplit.length - 2];
          }
        }
      } else {
        addresssplit = addresssplit[0].split(" - ");
        if (addresssplit[addresssplit.length - 1] == "United Arab Emirates") {
          if (addresssplit.length >= 3) {
            baseareaname = addresssplit[addresssplit.length - 3] + "," + addresssplit[addresssplit.length - 2];
          }
        }
      }
      return baseareaname;
    };
    closemodel(){
      this.model.dismiss();
    }






}

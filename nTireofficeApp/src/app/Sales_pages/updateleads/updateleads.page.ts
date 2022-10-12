/* eslint-disable radix */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-debugger */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable curly */
/* eslint-disable guard-for-in */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
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
import { ModalController } from '@ionic/angular';

import { AlertController, LoadingController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-updateleads',
  templateUrl: './updateleads.page.html',
  styleUrls: ['./updateleads.page.scss'],
})
export class UpdateleadsPage implements OnInit, OnDestroy {
  showmap;
  currentlocation;
  currentlatlon;
  map: any;
  service = new google.maps.places.AutocompleteService();
  callpriorityarray: any = [];

  callratingarray: any = [];
  callnaturearray: any = [];
  callstagearray: any = [];
  leadsourcearray: any = [];
  nextactionarray: any = [];
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  ntireoffice_image;
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
    Action_req: "",
    BRANCH_DESC: "",
    BRANCH_ID: "",
    CALL_ID: "",
    CUSTACCNO: "",
    CUSTOMER_FNAME: "",
    CUSTOMER_LNAME: "",
    CUSTOMER_NAME: "",
    CUST_CONT_PER: "",
    CUST_LEAD_ID: "",

    Campaign: "",

    ClosedDate1: null,
    CreatedOn: "",
    CreatedOn1: "",
    Current_Caller: "",
    CustFullName: "",
    DNC_Continue: "",
    END_TIME: null,

    FUNCTION_ID: "",
    GroupId: 1,
    IMAGE: null,
    LEADSTATUS: "",
    LEAD_id: 10129,
    LOCATION_DESC: "",
    LOCATION_ID: 3,
    LeadBy: "",
    MOBILE: "",
    NEXT_CALL_DATE: null,
    Nature: "",
    OFFPHONE: "",
    PRODUCTTYPE: "",
    PRODUCT_MODE: "",
    PriorityText: "",
    ProdAndCamp: "",
    RESPHONE: "",
    RatingVal: "",
    Ratingtext: "",
    Remarks: "",
    SKYPENAME: "",
    START_TIME: "",
    Stage: "",
    TCC_CALLER_ID: "",
    TCC_CAMPAIGN_ID: parseInt(""),
    TCC_CUSTOMER_ID: parseInt(""),
    TCC_LAST_CALLED: parseInt(""),
    TCC_LEAD_NATURE: parseInt(""),
    TCC_LEAD_RATING: parseInt(""),
    TCC_LEAD_SOURCE: parseInt(""),
    TCC_LEAD_STAGE: parseInt(""),

    TCC_RESPONSE: "",
    TCM_CAMPAIGN_SHORTDESC: "",
    TCM_PRODUCT_CODE: "",
    TCM_PRODUCT_DESC: "",
    customer_lead_id: parseInt(""),
    priority: "",
    producttypeTEXT: "Banking"
  };
  remarks;
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
    response: "",
    offset: "0",
    limit: "50",
    TCC_CUST_LEAD_ID: ""
  };
  addbaselocno;
  token;
  barval;
  followtime;
  isLoading = false;
  private backbuttonSubscription: Subscription;
  constructor(public loadingController: LoadingController, public alertController: AlertController, private model: ModalController, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, navParams: NavParams, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.showmap = true;
    this.ntireoffice_image = 'https://herbieai.com/MyDesk/UploadDocu/SSTPL/';
    this.Getcallpriority();
    this.Getcallrating();
    this.Getcallnature();
    this.Getcallstage();
    this.Getleadsource();
    console.log(navParams.get('item'));
    this.item = navParams.get('item');
    this.audiofilename = this.item.FileName;
    // console.log(this.filename);
    this.dataobjs.leadstatusval = "" + this.item.priority;
    /* console.log(this.item.LEADSTATUS)*/
    this.dataobjs.callratingval = "" + this.item.TCC_LEAD_RATING;
    this.dataobjs.callnatureval = "" + this.item.TCC_LEAD_NATURE;
    this.dataobjs.callstageval = this.item.TCC_LEAD_STAGE;
    //console.log(this.dataobjs.callstageval);
    this.dataobjs.leadsrc = this.item.TCC_LEAD_SOURCE;
    // console.log(this.item.TCC_LEAD_SOURCE);
    this.dataobjs.FirstName = this.item.CUSTOMER_FNAME;
    this.dataobjs.LastName = this.item.CUSTOMER_LNAME;
    this.dataobjs.MobileNumber = this.item.MOBILE;

    // this.dataobjs.nextactionval=="";
    this.barval = navParams.get('barval');
    this.dataobjs.EmailID = this.item.EmailID;
    this.dataobjs.Action_req = "";
    this.dataobjs.BRANCH_DESC = "";
    this.dataobjs.BRANCH_ID = "";
    this.dataobjs.CALL_ID = this.item.CALL_ID;
    this.dataobjs.CUSTACCNO = this.item.CUSTACCNO;
    this.dataobjs.CUSTOMER_FNAME = this.item.CUSTOMER_FNAME;
    this.dataobjs.CUSTOMER_LNAME = this.item.CUSTOMER_LNAME;
    this.dataobjs.CUSTOMER_NAME = this.item.CUSTOMER_NAME;
    this.dataobjs.CUST_CONT_PER = this.item.CUST_CONT_PER;
    this.dataobjs.CUST_LEAD_ID = this.item.CUST_LEAD_ID;
    this.dataobjs.CUST_LEAD_ID = this.item.CUST_LEAD_ID;
    this.dataobjs.Campaign = this.item.Campaign;
    this.dataobjs.ClosedDate = this.item.ClosedDate;
    this.dataobjs.ClosedDate1 = this.item.ClosedDate1;
    this.dataobjs.CreatedOn = this.item.CreatedOn;
    this.dataobjs.CreatedOn1 = this.item.CreatedOn1;
    this.dataobjs.Current_Caller = this.item.Current_Caller;
    this.dataobjs.CustFullName = this.item.CustFullName;
    this.dataobjs.DNC_Continue = this.item.DNC_Continue;
    this.dataobjs.END_TIME = this.item.END_TIME;
    this.dataobjs.ExpctedAmount = this.item.ExpctedAmount;
    this.dataobjs.FUNCTION_ID = this.item.FUNCTION_ID;
    this.dataobjs.GroupId = this.item.GroupId;
    this.dataobjs.IMAGE = this.item.IMAGE;
    this.dataobjs.LEADSTATUS = this.item.LEADSTATUS;
    this.dataobjs.LEAD_id = this.item.LEAD_id;
    this.dataobjs.LOCATION_DESC = this.item.LOCATION_DESC;
    this.dataobjs.LOCATION_ID = this.item.LOCATION_ID;
    this.dataobjs.LeadBy = this.item.LeadBy;
    this.dataobjs.MOBILE = this.item.MOBILE;
    this.dataobjs.NEXT_CALL_DATE = this.item.NEXT_CALL_DATE;
    this.dataobjs.Nature = this.item.Nature;
    this.dataobjs.OFFPHONE = this.item.OFFPHONE;
    this.dataobjs.PRODUCTTYPE = this.item.PRODUCTTYPE;
    this.dataobjs.PRODUCT_MODE = this.item.PRODUCT_MODE;
    this.dataobjs.PriorityText = this.item.PriorityText;
    this.dataobjs.ProdAndCamp = this.item.ProdAndCamp;
    this.dataobjs.RESPHONE = this.item.RESPHONE;
    this.dataobjs.RatingVal = this.item.RatingVal;
    this.dataobjs.Ratingtext = this.item.Ratingtext;

    this.dataobjs.SKYPENAME = this.item.SKYPENAME;
    this.dataobjs.START_TIME = this.item.START_TIME;
    this.dataobjs.Stage = this.item.Stage;
    this.dataobjs.TCC_CALLER_ID = this.item.TCC_CALLER_ID;
    this.dataobjs.TCC_CAMPAIGN_ID = parseInt(this.item.TCC_CAMPAIGN_ID);
    this.dataobjs.TCC_CUSTOMER_ID = parseInt(this.item.TCC_CUSTOMER_ID);
    this.dataobjs.TCC_LAST_CALLED = parseInt(this.item.TCC_LAST_CALLED);
    this.dataobjs.TCC_LEAD_NATURE = parseInt(this.item.TCC_LEAD_NATURE);
    this.dataobjs.TCC_LEAD_RATING = parseInt(this.item.TCC_LEAD_RATING);
    this.dataobjs.TCC_LEAD_SOURCE = parseInt(this.item.TCC_LEAD_SOURCE);
    this.dataobjs.TCC_LEAD_STAGE = this.item.TCC_LEAD_STAGE;

    if (this.item.Remarks != null) {
      this.remarks = this.item.Remarks;
    }

    this.dataobjs.nextactionval == this.item.TCC_RESPONSE;
    this.dataobjs.TCC_RESPONSE = this.item.TCC_RESPONSE;
    this.dataobjs.TCM_CAMPAIGN_SHORTDESC = this.item.TCM_CAMPAIGN_SHORTDESC;
    this.dataobjs.TCM_PRODUCT_CODE = this.item.TCM_PRODUCT_CODE;
    this.dataobjs.TCM_PRODUCT_DESC = this.item.TCM_PRODUCT_DESC;
    this.dataobjs.customer_lead_id = parseInt(this.item.customer_lead_id);
    this.dataobjs.priority = this.item.priority;
    this.dataobjs.producttypeTEXT = this.item.producttypeTEXT;


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
  Getcallpriority() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callpriority', {
      headers: options,
    }).subscribe(resp => {

      // this.callpriorityarray = JSON.parse(resp.toString());
      this.callpriorityarray = JSON.stringify(resp);
      this.callpriorityarray = JSON.parse(this.callpriorityarray);
      // console.log("callpriorityarray: " + JSON.stringify(this.callpriorityarray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  Getcallrating() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callrating', {
      headers: options,
    }).subscribe(resp => {

      // this.callratingarray = JSON.parse(resp.toString());
      this.callratingarray = JSON.stringify(resp);
      this.callratingarray = JSON.parse(this.callratingarray);
      console.log("callratingarray: " + JSON.stringify(this.callratingarray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  Getcallnature() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callnature', {
      headers: options,
    }).subscribe(resp => {

      // this.callnaturearray = JSON.parse(resp.toString());
      this.callnaturearray = JSON.stringify(resp);
      this.callnaturearray = JSON.parse(this.callnaturearray);
      console.log("callnaturearray: " + JSON.stringify(this.callnaturearray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  Getcallstage() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callstage', {
      headers: options,
    }).subscribe(resp => {

      // this.callstagearray = JSON.parse(resp.toString());
      this.callstagearray = JSON.stringify(resp);
      this.callstagearray = JSON.parse(this.callstagearray);
      console.log("callstagearray: " + JSON.stringify(this.callstagearray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  Getleadsource() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'Leadsource', {
      headers: options,
    }).subscribe(resp => {

      // this.leadsourcearray = JSON.parse(resp.toString());
      this.leadsourcearray = JSON.stringify(resp);
      this.leadsourcearray = JSON.parse(this.leadsourcearray);
      console.log("leadsourcearray: " + JSON.stringify(this.leadsourcearray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  handleAddressChange(event, schedleadareaname) {

    this.showmap = false;
    console.log(event.geometry.location.lat());
    console.log(event.geometry.location.lng());
    this.meetaddress = event.formatted_address;
    this.addbaselocno = event.geometry.location.lat() + "," + event.geometry.location.lng();
    //this.appointmentLatLong=event.geometry.location.lat()+","+event.geometry.location.lng();
    let latLng = new google.maps.LatLng(event.geometry.location.lat(), event.geometry.location.lng());

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      animation: google.maps.Animation.DROP,
      // position: map.getCenter()
    };

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
  Updateschedulemeet(objdatval, address) {
    debugger;
    console.log(objdatval);
    console.log(address);
    this.presentLoadingWithOptions();
    if (objdatval.leadstatusval == '') {
      this.presentAlert("", "Please Select Priority");
    }
    else if (objdatval.callratingval == '') {
      this.presentAlert("", "Please Select Call Rating");
    }
    else if (objdatval.callnatureval == '') {
      this.presentAlert("", "Please Select Call Nature");
    }
    else if (objdatval.callstageval == '') {
      this.presentAlert("", "Please Select Call Stage");
    }
    else if (objdatval.nextactionval == '<< Select >>') {
      this.presentAlert("", "Please Select Next Action");
    }
    else if (objdatval.remarks == '<< Select >>') {
      this.presentAlert("", "Enter Remarks");
    }
    else if (objdatval.nextactionval == '2' && (objdatval.schedmeetdate == undefined || this.followtime == undefined)) {
      this.presentAlert("", "Please Enter Date & Time");
    }
    // else if (objdatval.nextactionval == '1' && (this.schedleadareaname == undefined || objdatval.schedmeetdate == undefined || this.followtime == undefined)) {
    else if (objdatval.nextactionval == '1' && (objdatval.schedmeetdate == undefined || this.followtime == undefined)) {
      debugger;
      this.presentAlert("", "Please Enter Place To Meet & Meeting Date & Meeting Time");
    }
    else {

      this.objdataupd.callnatureval = objdatval.callnatureval;
      this.objdataupd.callratingval = objdatval.callratingval;
      this.objdataupd.callstageval = objdatval.callstageval;
      this.objdataupd.leadstatusval = objdatval.leadstatusval;
      this.objdataupd.nextactionval = objdatval.nextactionval;
      this.objdataupd.LeadSource = objdatval.leadsrc;

      this.dataobjs.Remarks = this.remarks;
      this.objdataupd.ActReq = objdatval.pendleadactreq;

      this.objdataupd.TCC_CUST_LEAD_ID = this.item.customer_lead_id;

      var date1 = new Date(objdatval.ClosedDate);
      var day1 = date1.getDate();
      var month1 = date1.getMonth() + 1;
      var year1 = date1.getFullYear();
      this.objdataupd.ClosedDate = [year1, month1, day1].join('-');
      if (this.objdataupd.ClosedDate == "NaN-NaN-NaN" || this.objdataupd.ClosedDate == '') {

        this.objdataupd.ClosedDate = ' ';


      }
      this.objdataupd.ExpctedAmount = objdatval.ExpctedAmount;
      if (objdatval.nextactionval == '2' || objdatval.nextactionval == '1') {
        var date2 = new Date(objdatval.schedmeetdate);
        var day2 = date2.getDate();
        var month2 = date2.getMonth() + 1;
        var year2 = date2.getFullYear();

        var time = new Date(objdatval.schedmeettime);
        var time1 = time.getTime();
        var meetdate = [year2, month2, day2].join('-');
        var meettime = this.tConv24(this.followtime);

        meettime = meetdate + " " + meettime;
        this.objdataupd.TCC_NEXT_CALL_DATE = meettime;

        this.objdataupd.Meeting_address = this.meetaddress;

        this.objdataupd.TCC_LOCATION_TO_MEET = this.addbaselocno;
        // console.log(objdataupd.TCC_LOCATION_TO_MEET);
      }
      this.token = window.localStorage['token'];
      var userid = parseInt(window.localStorage['TUM_USER_ID'])
      var tokenJSON = { access_token: this.token, userid: userid, 'usertoken': window.localStorage['usertoken'] };

      console.log(this.objdataupd);
      if (this.barval == 1) {
        var objdatvals = { FirstName: this.dataobjs.FirstName, LastName: this.dataobjs.LastName, MobileNumber: this.dataobjs.MobileNumber, EmailID: this.dataobjs.EmailID };

      }
      // console.log("follow up")

      var updateleadJSON = Object.assign(this.objdataupd, tokenJSON);
      var updateleadJSON1 = Object.assign(updateleadJSON, this.dataobjs);

      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'updpendleadsdata/', updateleadJSON1, {
        headers: options,
      }).subscribe(resp => {
        if (resp == 'Updated Successfully') {

          this.presentAlertConfirm("", "Saved Successfully");
          this.loadingdismiss();
        }
      }, error => {
        this.presentAlertConfirm("", "Saved Successfully");
      });
    }
  }
  async presentLoadingWithOptions() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
      message: 'Please wait...',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async loadingdismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  Updateschedulemeet1(data) {

    if (this.item.START_TIME == '' || this.item.START_TIME == undefined || this.item.END_TIME != undefined) {

      this.BaseArea = "";
      this.schedleadareaname = "";
      // $("#showdivs").css("display", "none");
      // $("#showdivs1").css("display", "none");
      this.itemupd = this.item;
      this.audiofilename = this.item.FileName;
      // console.log(this.filename);
      this.dataobjs.leadstatusval = "" + this.item.priority;
      /* console.log(this.item.LEADSTATUS)*/
      this.dataobjs.callratingval = "" + this.item.TCC_LEAD_RATING;
      this.dataobjs.callnatureval = "" + this.item.TCC_LEAD_NATURE;
      this.dataobjs.callstageval = this.item.TCC_LEAD_STAGE;
      //console.log(this.dataobjs.callstageval);
      this.dataobjs.leadsrc = this.item.TCC_LEAD_SOURCE;
      // console.log(this.item.TCC_LEAD_SOURCE);
      this.dataobjs.FirstName = this.item.CUSTOMER_FNAME;
      this.dataobjs.LastName = this.item.CUSTOMER_LNAME;
      this.dataobjs.MobileNumber = this.item.MOBILE;
      this.dataobjs.EmailID = '';
      this.remarks = '';
      this.dataobjs.pendleadactreq = '';
      //this.dataobjs.pendleadactreq = '';
      this.dataobjs.schedmeetdate = '';
      this.dataobjs.schedmeettime = '';
      this.dataobjs.schedleadareaname = '';
      this.dataobjs.nextactionval = '';

    } else {

      var customerid = this.item.TCC_CUSTOMER_ID;
      var custleadid = parseInt(this.item.customer_lead_id);
      var callid = this.item.CALL_ID;
      var idvals = 2;
      var btnval = '';
      var meetLatLong = this.item.TCC_LOCATION_TO_MEET;
      // alert("dfghdh")
      //console.log()

      this.updstrtmeettime(customerid, custleadid, callid, idvals, btnval, meetLatLong, this.item);

      this.BaseArea = "";
      this.schedleadareaname = "";
      // $("#showdivs").css("display", "none");
      // $("#showdivs1").css("display", "none");
      this.itemupd = this.item;
      this.audiofilename = this.item.FileName;
      // console.log(this.filename);
      this.dataobjs.leadstatusval = "" + this.item.priority;
      /* console.log(this.item.LEADSTATUS)*/
      this.dataobjs.callratingval = "" + this.item.TCC_LEAD_RATING;
      this.dataobjs.callnatureval = "" + this.item.TCC_LEAD_NATURE;
      this.dataobjs.callstageval = this.item.TCC_LEAD_STAGE;
      //console.log(this.dataobjs.callstageval);
      this.dataobjs.leadsrc = this.item.TCC_LEAD_SOURCE;
      // console.log(this.item.TCC_LEAD_SOURCE);
      this.dataobjs.FirstName = this.item.CUSTOMER_FNAME;
      this.dataobjs.LastName = this.item.CUSTOMER_LNAME;
      this.dataobjs.MobileNumber = this.item.MOBILE;
      this.dataobjs.EmailID = '';
      this.remarks = '';
      this.dataobjs.pendleadactreq = '';
      //this.dataobjs.pendleadactreq = '';
      this.dataobjs.schedmeetdate = '';
      this.dataobjs.schedmeettime = '';
      this.dataobjs.schedleadareaname = '';
      this.dataobjs.nextactionval = '';

    }
  }
  updstrtmeettime(customerid, custleadid, callid, idvals, btnval, meetinglatlong, items) {
    console.log(meetinglatlong);
    console.log(custleadid);
    console.log(callid);
    console.log(idvals);
    console.log(btnval);
    //  alert("welcome")
    var today = new Date();
    console.log(today);
    var nextcall = new Date(items.TCC_NEXT_CALL_DATE);

    var appdate = items.TCC_NEXT_CALL_DATE.split('T');
    console.log(appdate);
    // var time=$filter('date')(response.data[j].TCC_NEXT_CALL_DATE, "hh:mm a");
    var time = appdate[1].split(':');
    console.log(time);
    var d1 = appdate[0].split('-');
    console.log(d1);
    var appdate1 = d1[0] + '-' + d1[1] + '-' + d1[2] + ' ' + time[0] + ':' + time[1];
    var meetcurTime = new Date(appdate1);

    if (meetinglatlong == undefined || meetinglatlong == null) {
      alert("Invalid Meeting Location");
    } else {
      var tyear = today.getFullYear();
      var tmonth = today.getMonth();
      var tday = today.getDay();
      console.log(nextcall);
      var myear = nextcall.getFullYear();
      var mmonth = nextcall.getMonth();
      var mday = nextcall.getDay();

      if ((tyear == myear) && (tmonth == mmonth) && (tday == mday)) {
        // alert("today date")
        var ttime = today.getTime();
        // var mtime=nextcall.getTime();
        var mtime = meetcurTime.getTime();
        if (ttime >= mtime) {
          this.geolocation.getCurrentPosition().then((res) => {

            this.currentlatlon = res.coords.latitude + "," + res.coords.longitude;
            let location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
            console.log("location :n" + location);
            this.nativeGeocoder.reverseGeocode(res.coords.latitude, res.coords.longitude, this.geoencoderOptions)
              .then((result) => {
                //this.currentlocation = this.generateAddress(result[0]);
                if (status == google.maps.GeocoderStatus.OK) {
                  if (result[1]) {
                    var areaname = this.callfuncforareaname(result[0]);

                  } else {
                    var areaname = 'Not Captured';
                  }
                } else {
                  var areaname = 'Not Captured';
                }
                var rad = function (x) {
                  return x * Math.PI / 180;
                };
                var meetinglatlongarray = meetinglatlong.split(',');
                var curr_lat_lngarray = this.currentlatlon.split(',');
                var R = 6378137;
                var dLat = rad(meetinglatlongarray[0] - curr_lat_lngarray[0]);
                var dLong = rad(meetinglatlongarray[1] - curr_lat_lngarray[1]);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(rad(curr_lat_lngarray[0])) * Math.cos(rad(meetinglatlongarray[0])) *
                  Math.sin(dLong / 2) * Math.sin(dLong / 2);
                console.log(a);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                console.log(d);
                if (d < 200) {
                  var time = new Date();
                  var datevalue = time.toJSON().split("T");
                  var timehrs = (time.getHours() < 10 ? '0' : '') + time.getHours();
                  var timemins = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
                  var currenttime = timehrs + ':' + timemins;

                  var objdataupdtime = {
                    TCC_CUST_ID: "",
                    TCC_CUST_LEAD_ID: "",
                    TCC_CALL_ID: "",
                    OBJ_ID: "",
                    START_TIME: "",
                    END_TIME: "",
                    Location_Desc: "",
                    access_token: "",
                    userid: parseInt(""),
                    usertoken: "",
                  };
                  objdataupdtime.TCC_CUST_ID = customerid;
                  objdataupdtime.TCC_CUST_LEAD_ID = custleadid;
                  objdataupdtime.TCC_CALL_ID = callid;
                  objdataupdtime.OBJ_ID = idvals;
                  objdataupdtime.START_TIME = currenttime;
                  objdataupdtime.END_TIME = currenttime;
                  objdataupdtime.Location_Desc = areaname;
                  objdataupdtime.access_token = window.localStorage['token'];
                  objdataupdtime.userid = parseInt(window.localStorage['TUM_USER_ID']);
                  objdataupdtime.usertoken = window.localStorage['usertoken'];

                  console.log(objdataupdtime);
                  const header = new Headers();
                  header.append("Content-Type", "application/json");
                  let options = new HttpHeaders().set('Content-Type', 'application/json');
                  this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'updstendtime/', objdataupdtime, {
                    headers: options,
                  }).subscribe(resp => {
                    if (resp == 'start time updated') {

                      // document.getElementById("stbtn" + btnval).disabled = true;
                      // document.getElementById("stbtn" + btnval).style.backgroundColor = 'grey';
                      this.presentAlert("", "Meeting Started Successfully");

                      this.model.dismiss(this.barval);


                    }
                    if (resp == 'end time updated') {

                    }

                  }, error => {


                  });

                } else {
                  this.presentAlert("", "Invalid Meeting Location");
                }
              })
              .catch((error: any) => {
                this.presentAlert("", 'Error getting location');
                //   alert('Error getting location'+ JSON.stringify(error));
              });


          }).catch((error) => {
            console.log('Error getting location', error);
          });

        } else {
          this.presentAlert("", "Invalid meeting Time");

        }

      } else {
        //alert("Meeting is not scheduled")
        this.presentAlert("", "Meeting is not scheduled");
      }
      return false;
    }
  }
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
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
  ionViewCanLeave() {
    this.model.dismiss();
  }
  closemodel() {

    this.model.dismiss();
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertConfirm(heading, tittle) {

    const alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss:false,
      message: tittle,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            console.log(this.barval);
            this.model.dismiss(this.barval);
          }
        }
      ],

    });

    await alert.present();
  }
  timeValidation(val) {

    var element = val;
    var compare_dates = function (date1, date2) {
      if (date1 > date2) return true;
      else if (date1 < date2) return false;
      else return false;
    };
    console.log("chck " + new Date(this.dataobjs.schedmeetdate + " " + element));

    if (compare_dates(new Date(this.dataobjs.schedmeetdate + " " + element), new Date()) != true) {

      alert("Time should not be past");
      this.dataobjs.schedmeettime = undefined;

    }
  }

  tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? (0 + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;

    return ts;
  };

}

/* eslint-disable use-isnan */
/* eslint-disable id-blacklist */
/* eslint-disable curly */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable no-var */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Diagnostic } from '@ionic-native/diagnostic';
declare var google: any;
declare var jquery: any;
declare var $: any;
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { ModalController } from '@ionic/angular';
import { HistotydetailsPage } from '../histotydetails/histotydetails.page';
import { UpdateleadsPage } from '../updateleads/updateleads.page';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as RecordRTC from 'recordrtc';
import { Observable, of, Subject } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { isNullOrUndefined } from 'util';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageviewPage } from '../imageview/imageview.page';

declare var window: any;
interface RecordedAudioOutput {
  index: number,
  blob: Blob;
  title: string;

}
@Component({
  selector: 'app-closedleads',
  templateUrl: './closedleads.page.html',
  styleUrls: ['./closedleads.page.scss'],
})
export class ClosedleadsPage implements OnInit, OnDestroy {
  segment;
  everybody;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  TCC_CUST_LEAD_ID;
  audioList: any[] = [];
  private stream;
  private recorder;
  private interval;
  private startTime;
  private _recorded = new Subject<any>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();
  imagecif: number;
  getcustid: any;
  getbranchid: any;
  BRANCH_IDs: any;
  showData: string;
  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }
  image = [];
  isRecording = false;
  recordedTime;
  blobUrl;
  audioName;
  latlngvals;
  commonapi_sales;
  branchlist: any;
  branchlist1 = [];
  products: any;
  products1: any = [];
  callpriority: any;
  callpriority1: any = [];
  callrating: any;
  callrating1: any = [];
  userdata: any;
  userdata1 = [];
  usertype: any;
  usertype1 = [];
  latlog = [];
  meetlatlongval;
  formattedadd = [];

  filename1 = [];
  token;
  pendleaddetails = [];
  pendleaddetails1 = [];
  pendingleadsdatalength: any;

  penleadfilter = {
    TCC_CUSTOMER_ID: 0,
    TCC_CUST_LEAD_ID: "",
    CUST_LNAME: "",
    MOBILE: "",
    TCC_LEAD_PRIORITY: "",
    TCC_LEAD_RATING: "",
    TCM_CAMPAIGN_SHORTDESC: "",
    TCC_LEAD_BY: "",
    branchid: parseInt(window.localStorage['id']),
    CUST_FNAME: "",
  };
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  filename = [];
  branch;
  segmentdata;
  stbtn: boolean;
  source;
  destination;
  isLoading = false;
  reporting: boolean;
  user_type_val;
  imagename: any;
  username: any;
  branch_id:any;
  private backbuttonSubscription: Subscription;
  constructor(private sanitizer: DomSanitizer, public platform: Platform, public media: Media, private datePipe: DatePipe, public loadingController: LoadingController, private router: Router, private geolocation: Geolocation, public alertController: AlertController, public modalController: ModalController, private callNumber: CallNumber, private file: File, private transfer: FileTransfer, private nativeGeocoder: NativeGeocoder, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.segmentdata = 'new';
    // this.commonapi_sales = 'http://herbieai.com:88/COMMONAPI/uploads/sales/';
    this.commonapi_sales = 'https://demo.herbieai.com/Testntiremydesk/Uploaddocu/SSTPL/';
    this.penleadfilter.branchid = parseInt(window.localStorage['id']);
    this.penleadfilter.TCC_CUST_LEAD_ID = '';
    this.penleadfilter.TCC_CUSTOMER_ID = 0;
    this.penleadfilter.CUST_LNAME = '';
    this.penleadfilter.MOBILE = '';
    this.penleadfilter.TCM_CAMPAIGN_SHORTDESC = '';
    this.penleadfilter.TCC_LEAD_PRIORITY = '';
    this.penleadfilter.TCC_LEAD_RATING = '';
    this.penleadfilter.TCC_LEAD_BY = '';
    this.Getbranches();
    this.Getcallpriority();
    this.GetProduct();
    this.Getcallrating();
    this.Getusertype();
    this.callfuncresp(4, '0%');
    this.reporting = false;
    this.user_type_val = "";
    this.platform.pause.subscribe(() => {
      //inside the app
      //what you need to do
      console.log("pause subscribe");
      this.startRecord1();
      // this.startRecording(0);
      //this.userservice.Updateofflinestatus("offline");

    });
    this.branch_id = localStorage.getItem('id');
    this.username = localStorage.getItem('TUM_USER_NAME');
    this.phonecalls();
    // this.checkPermissionCall();


    this.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.getRecordedBlob().subscribe((data) => {

      // localStorage.setItem("blobname",this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob)).toString());
      // this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.pendleaddetails[data.index].blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      var imagename = "salesvoice" + this.imagecif + ".wav";
      this.imagename = "salesvoice" + this.imagecif + ".wav";
      this.audioName = imagename;
      var file = this.blobToFile(data.blob, imagename);
      console.log(file);
      this.imageupload(file, imagename);

    });
  }
  imageupload(file, image) {
    // alert('imageupload');

    var url = this.Ipaddressservice.ipaddress + '/los/uploadfile';
    const formData: any = new FormData();
    formData.append("upload", file, image);

    console.log('form data variable :   ' + formData.toString());
    this.http.post(url, formData)
      .subscribe(files => console.log('files', files));

  }
  ngOnInit() {
    this.Getusertype();

  }
  Getbranches() {
    var params = {
      access_token: window.localStorage['token'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      'usertoken': window.localStorage['usertoken'],
      USER_ID: parseInt(window.localStorage['TUM_USER_ID'])
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'branch_list_get', params, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = resp;
      this.branchlist.forEach(element => {
        this.branchlist1.push(element);
        console.log(this.branchlist1);
        this.branchlist1.forEach((item, index) => {
          if (index !== this.branchlist1.findIndex(i => i.BRANCH_DESC.toUpperCase() == item.BRANCH_DESC.toUpperCase())) {
            this.branchlist1.splice(index, 1);
          }

        });
        this.branchlist1.sort(function (a, b) {
          var nameA = a.BRANCH_DESC.toUpperCase(); // ignore upper and lowercase
          var nameB = b.BRANCH_DESC.toUpperCase(); // ignore upper and lowercase

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });

        console.log(this.branchlist1);
      });
    }, error => {


    });
    this.penleadfilter.branchid = parseInt(window.localStorage['id']);
  }

  GetProduct() {

    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'getProduct', {
      headers: options,
    }).subscribe(resp => {
      this.products1 = resp;
      this.products1 = this.products1;

      this.products1.sort(function (a, b) {
        var c = a.productName.toUpperCase();
        var d = b.productName.toUpperCase();
        return c > d ? 1 : -1;
      });

    }, error => {


    });
  }
  Getcallpriority() {

    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callpriority', {
      headers: options,
    }).subscribe(resp => {
      this.callpriority1 = resp;
      this.callpriority1 = this.callpriority1;
      // this.callpriority1 = JSON.parse(resp.toString());
      this.callpriority1.sort(function (a, b) {
        var c = a.text.toUpperCase();
        var d = b.text.toUpperCase();
        return c > d ? 1 : -1;
      });

    }, error => {


    });
  }
  Getcallrating() {

    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callrating', {
      headers: options,
    }).subscribe(resp => {
      this.callrating1 = resp;
      this.callrating1 = this.callrating1;
      // this.callrating1 = JSON.parse(resp.toString());
      this.callrating1.sort(function (a, b) {
        var c = a.text.toUpperCase();
        var d = b.text.toUpperCase();
        return c > d ? 1 : -1;
      });
    }, error => {


    });
  }

  Getusertype() {
    var params = {
      access_token: window.localStorage['token'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      'usertoken': window.localStorage['usertoken'],
      USER_ID: parseInt(window.localStorage['TUM_USER_ID']),

    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'user_type_get/', params, {
      headers: options,
    }).subscribe(resp => {
      //alert(""+JSON.st)
      console.log(resp);
      this.usertype = resp;

      this.usertype.forEach(element => {
        if (element.DESCRIPTION != 'நிர்வாகி') {
          this.usertype1.push(element);
          console.log(this.usertype1);
        }


      });
      this.usertype1.sort(function (a, b) {
        var c = a.DESCRIPTION.toUpperCase();
        var d = b.DESCRIPTION.toUpperCase();
        return c > d ? 1 : -1;
      });
    }, error => {


    });
  }
  getuserlist(type_id, branch_id) {
    this.userdata;
    this.userdata1 = [];
    var params = {
      access_token: window.localStorage['token'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      'usertoken': window.localStorage['usertoken'],
      USER_ID: parseInt(window.localStorage['TUM_USER_ID']),
      type_id: type_id,
      branchid: parseInt(this.branch_id)
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'user_list_get/', params, {
      headers: options,
    }).subscribe(resp => {

      this.userdata = resp;
      console.log(this.userdata);

      this.userdata.forEach(element => {
        this.userdata1.push(element);
        console.log(this.usertype1);

      });
      this.userdata1.sort(function (a, b) {
        var c = a.TUM_USER_NAME.toUpperCase();
        var d = b.TUM_USER_NAME.toUpperCase();
        return c > d ? 1 : -1;
      });
    }, error => {


    });
  }
  showfilter() {
    $('.fadeInDown').toggle();
  }


  callfuncresp(values, percent) {
    console.log('test' + values);
    this.penleadfilter.TCC_CUSTOMER_ID = undefined;
    this.penleadfilter.TCC_CUST_LEAD_ID = undefined;

    this.penleadfilter.CUST_LNAME = "";
    this.penleadfilter.MOBILE = "";
    this.penleadfilter.TCM_CAMPAIGN_SHORTDESC = "";
    this.penleadfilter.TCC_LEAD_PRIORITY = "";
    this.penleadfilter.TCC_LEAD_RATING = "";
    this.user_type_val = "";
    this.penleadfilter.TCC_LEAD_BY = "";
    this.callforalldetails(values);
  }

  showless(idvalue) {
    $("#dividvals" + idvalue).css("display", "none");
    $("#imageidvals" + idvalue).show();

  };
  downloadImage(imageName) {
    const fileTransfer: FileTransferObject = this.transfer.create();

    var imgURL = this.commonapi_sales + imageName;
    console.log(imgURL);
    var filename = imageName;
    // alert(filename);
    console.log(filename);

    var folderpath = this.file.dataDirectory + "Download/" + filename;
    var url = encodeURI(imgURL);

    fileTransfer.download(url, folderpath).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  };
  makeCall(number, i) {

    this.callNumber.callNumber(number, true)
      .then((

      ) =>
        this.startRecording(i)


      );

  }
  //Called when view is loaded as ionViewDidLoad() removed from Ionic v4


  callforalldetails(values) {
    debugger;
    this.penleadfilter.TCC_CUST_LEAD_ID = undefined;
    this.presentLoadingWithOptions();
    this.segment = values;
    console.log('pendleaddetails : ' + this.penleadfilter.TCC_CUSTOMER_ID);
    if (this.penleadfilter.TCC_CUSTOMER_ID != undefined) {
      this.pendleaddetails.forEach(element => {
        if (element.TCC_CUSTOMER_ID == this.penleadfilter.TCC_CUSTOMER_ID) {
          console.log('TCC_CUST_LEAD_ID' + element.CUST_LEAD_ID);
          this.penleadfilter.TCC_CUST_LEAD_ID = element.CUST_LEAD_ID;
        }
      });

    }
    this.pendleaddetails = [];

    if (this.penleadfilter.TCC_CUSTOMER_ID == null || this.penleadfilter.TCC_CUSTOMER_ID == undefined) {
      this.penleadfilter.TCC_CUSTOMER_ID = 0;
    }
    if (this.penleadfilter.TCC_CUST_LEAD_ID == null || this.penleadfilter.TCC_CUST_LEAD_ID == undefined) {
      this.penleadfilter.TCC_CUST_LEAD_ID = '';
    }

    if (this.penleadfilter.CUST_LNAME == null || this.penleadfilter.CUST_LNAME == undefined) {
      this.penleadfilter.CUST_LNAME = '';
    }
    if (this.penleadfilter.MOBILE == null || this.penleadfilter.MOBILE == undefined) {
      this.penleadfilter.MOBILE = '';
    }
    if (this.penleadfilter.TCC_LEAD_PRIORITY == null || this.penleadfilter.TCC_LEAD_PRIORITY == undefined) {
      this.penleadfilter.TCC_LEAD_PRIORITY = '';
    }
    if (this.penleadfilter.TCC_LEAD_RATING == null || this.penleadfilter.TCC_LEAD_RATING == undefined) {
      this.penleadfilter.TCC_LEAD_RATING = '';
    }
    if (this.penleadfilter.TCM_CAMPAIGN_SHORTDESC == null || this.penleadfilter.TCM_CAMPAIGN_SHORTDESC == undefined) {
      this.penleadfilter.TCM_CAMPAIGN_SHORTDESC = '';
    }
    if (this.penleadfilter.TCC_LEAD_BY == null || this.penleadfilter.TCC_LEAD_BY == undefined) {
      this.penleadfilter.TCC_LEAD_BY = '';
    }



    this.token = window.localStorage['token'];

    var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };

    var pendJSON;
    pendJSON = Object.assign(tokenJSON, this.penleadfilter);
    var user_id_nw = parseInt(window.localStorage['TUM_USER_ID']);


    this.getcustid = this.TCC_CUST_LEAD_ID;
    console.log(this.getcustid);

    if (this.getcustid == undefined || this.getcustid == null || this.getcustid == NaN) {
      this.getcustid = 0;
    }
    localStorage.setItem('setcustid', this.getcustid);
    if (this.getcustid == undefined || this.getcustid == null || this.getcustid == NaN) {
      this.getcustid = 0;
    }
    this.getbranchid = this.BRANCH_IDs;
    if (this.getbranchid == undefined || this.getbranchid == null || this.getbranchid == NaN) {
      this.getbranchid = 1;
    }
    localStorage.setItem('setbranchid', this.getbranchid);

    console.log(this.getcustid);
    var tmpPendJson = {
      user_id: user_id_nw,
      userid: user_id_nw,
      response: values.toString(),
      offset: this.pendleaddetails.length.toString(),
      limit: "50",
      Name: "",
      CAMPAIGNNAME: "",
      PRIORITY: "",
      RATING: "",
      LEADBY: "",
      branchid: parseInt(window.localStorage['id']),
      CUST_FNAME: "",
      CUST_LNAME: this.penleadfilter.CUST_LNAME,
      MOBILE: this.penleadfilter.MOBILE,
      access_token: this.token,


      'usertoken': window.localStorage['usertoken'],
      // this.penleadfilter.TCC_CUST_LEAD_ID.toString()
      
      TCC_CUST_LEAD_ID:window.localStorage['setcustid'] ,
      TCC_LEAD_BY: this.penleadfilter.TCC_LEAD_BY.toString(),
      TCC_LEAD_PRIORITY: this.penleadfilter.TCC_LEAD_PRIORITY.toString(),
      TCC_LEAD_RATING: this.penleadfilter.TCC_LEAD_RATING.toString(),
      TCM_CAMPAIGN_SHORTDESC: this.penleadfilter.TCM_CAMPAIGN_SHORTDESC,
      TCC_CUSTOMER_ID: 0,
      BRANCH_ID: parseInt(window.localStorage['setbranchid']),


    };
    console.log(tmpPendJson);
    pendJSON = Object.assign(tokenJSON, tmpPendJson);
    console.log(pendJSON);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'pendleadsdatalength', pendJSON, {
      headers: options,
    }).subscribe((resp: any) => {
      if (resp == "No data found") {
        this.showData = "No data found";
        this.pendingleadsdatalength = 0;
      } else {
        console.log("pendleadsdatalength : " + JSON.stringify(resp));
        this.pendingleadsdatalength = resp.length;
        this.pendleaddetails = resp;
      }
    }, error => {


    });

    // this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'pendleadsdata', pendJSON, {
    //   headers: options,
    // }).subscribe(resp => {
    //   console.log(resp);
    //   if (resp == "No data found") {
    //     this.showData = "No data found";
    //     this.pendingleadsdatalength = 0;
    //   } else {

    //     console.log(resp);
    //     this.loadingdismiss();
    //     this.pendleaddetails1.push(resp);
    //     this.pendleaddetails1.forEach(element => {
    //       this.pendleaddetails = element;
    //       console.log(element);

    //     });

    //     for (var i = 0; i < this.pendleaddetails.length; i++) {
    //       console.log(this.pendleaddetails[i].MOBILE);
    //       if (this.pendleaddetails[i].MOBILE == "null" || this.pendleaddetails[i].MOBILE == '' || this.pendleaddetails[i].MOBILE == "undefined") {
    //         this.pendleaddetails[i].MOBILE = '-';
    //       }
    //       if (this.pendleaddetails[i].OFFPHONE == "null" || this.pendleaddetails[i].OFFPHONE == '' || this.pendleaddetails[i].OFFPHONE == "undefined") {
    //         this.pendleaddetails[i].OFFPHONE = '-';
    //       }
    //       if (this.pendleaddetails[i].RESPHONE == "null" || this.pendleaddetails[i].RESPHONE == '' || this.pendleaddetails[i].RESPHONE == "undefined") {
    //         this.pendleaddetails[i].RESPHONE = '-';
    //       }
    //       if (this.pendleaddetails[i].CreatedOn != undefined) {

    //         var date = this.pendleaddetails[i].CreatedOn1;

    //         var timesp = date.split('T');
    //         var time2 = timesp[1].split('.');

    //         var d1 = new Date(timesp[0] + " " + time2[0]);
    //         var d2 = new Date(d1);
    //         d2.setMinutes(d2.getMinutes() + 30);
    //         console.log('getMinutes' + d2);


    //         var penddata = this.datePipe.transform(d2, "hh:mm");
    //         this.pendleaddetails[i].created_time = this.tConvert(penddata);
    //       }
    //       if (this.pendleaddetails[i].TCC_NEXT_CALL_DATE != undefined) {
    //         this.pendleaddetails[i].call_time = this.formatTime(this.pendleaddetails[i].TCC_NEXT_CALL_DATE);
    //       }
    //       this.pendleaddetails[i].blobUrl = null;
    //       this.pendleaddetails[i].isRecording = false;
    //     }

    //   }

    // }, error => {
    //   this.loadingdismiss();
    //   console.log("error : " + JSON.stringify(error));

    // });

  }
  async imageview(image) {

    var modal = await this.modalController.create({
      component: ImageviewPage,
      componentProps: {
        item: image
      }
    });
    await modal.present();
  }

  tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  formatTime(time) {
    if (time) {
      var parts = time.split('T');
      var parts2 = parts[1];
      var parts3 = parts2.split(':');
    }
    var date = new Date(0, 0, 0, parts3[0], parts3[1], 0);

    return this.datePipe.transform(date, 'hh:mm a');

  };
  showmore(idvalue, id) {
    var dd = idvalue;
    console.log(idvalue);
    console.log(idvalue);
    //this.dd = [];
    this.filename[dd] = [];

    console.log(this.filename[dd]);

    // console.log(idvalue);
    var obj1 = {
      callid: id
    };
    var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };

    var getimageJSON = Object.assign(obj1, tokenJSON);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'get_image_name', getimageJSON, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);

      this.latlog[idvalue] = resp['latlong'];
      this.meetlatlongval = resp['meetaddr'];
      console.log(this.latlog[idvalue]);
      console.log(this.meetlatlongval);

      if (resp['circularid'] != null) {
        this.filename1 = resp['circularid'];
        for (var i = 0; i < this.filename1.length; i++) {
          this.filename[dd].push((this.filename1[i].doc_name));
          console.log(this.filename);
        }
      } else {
        this.filename[idvalue] = "";
      }

      // console.log(this.filename[idvalue]);

      if (this.segment == 1) {
        if (this.meetlatlongval != null) {

          var lanlong1 = this.meetlatlongval.split(",");
          // console.log(lanlong1);
          var geocoder = new google.maps.Geocoder();
          this.latlngvals = new google.maps.LatLng(parseFloat(lanlong1[0]), parseFloat(lanlong1[1]));
          this.nativeGeocoder.reverseGeocode(parseFloat(lanlong1[0]), parseFloat(lanlong1[1]), this.geoencoderOptions)
            .then((result) => {
              if (result[0]) {
                this.formattedadd[idvalue] = this.generateAddress(result[0]);
              }
              else {
                var areaname = 'Not Captured';
              }
            })
            .catch((error: any) => {

            });
        }
      } else {
        if (this.latlog[idvalue] != null) {

          var lanlong1 = this.latlog[idvalue].split(",");
          // console.log(lanlong1);
          var geocoder = new google.maps.Geocoder();
          this.latlngvals = new google.maps.LatLng(parseFloat(lanlong1[0]), parseFloat(lanlong1[1]));
          this.nativeGeocoder.reverseGeocode(parseFloat(lanlong1[0]), parseFloat(lanlong1[1]), this.geoencoderOptions)
            .then((result) => {
              if (result[0]) {
                this.formattedadd[idvalue] = this.generateAddress(result[0]);
              }
              else {
                var areaname = 'Not Captured';
              }
            })
            .catch((error: any) => {

            });

        }
      }
      $("#dividvals" + idvalue).css("display", "block");
      $("#imageidvals" + idvalue).hide();
      // meetLatLongVal=null;
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });


  };
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

  async Gethistorydetails(item) {
    item.CALL_ID = parseInt(item.CALL_ID);
    item.Campaign = 0;
    console.log("" + JSON.stringify(item));
    const modal = await this.modalController.create({
      component: HistotydetailsPage,
      componentProps: {
        'item': item,

      }

    });
    return await modal.present();

  }
  async Updatedetails(item, barval) {
    console.log(this.audioName);
    // if(this.audioName != undefined || this.audioName != "undefined"){
    item.audioName = this.audioName;
    // }else{
    //  item.audioName = "null";
    //}

    console.log(item);
    const modal = await this.modalController.create({
      component: UpdateleadsPage,
      componentProps: {
        'item': item,
        'barval': barval,
      }

    });
    modal.onDidDismiss()
      .then((resp) => {
        console.log(barval);
        this.callforalldetails(barval);
      });

    return await modal.present();


  }
  updstrtmeettime(customerid, custleadid, callid, idvals, btnval, meetinglatlong, items) {

    console.log(custleadid);
    console.log(callid);
    console.log(idvals);
    console.log(btnval);
    //  alert("welcome")
    var today = new Date();
    console.log(today);
    var nextcall = new Date(items.TCC_NEXT_CALL_DATE);
    // console.log(items.TCC_NEXT_CALL_DATE);
    console.log(nextcall);

    var appdate = items.TCC_NEXT_CALL_DATE.split('T');
    console.log(appdate);
    // var time=$filter('date')(response.data[j].TCC_NEXT_CALL_DATE, "hh:mm a");
    var time = appdate[1].split(':');
    console.log(time);
    var d1 = appdate[0].split('-');
    console.log(d1);
    var appdate1 = d1[0] + '-' + d1[1] + '-' + d1[2] + ' ' + time[0] + ':' + time[1];
    var meetcurTime = new Date(appdate1);
    //console.log(today.getTime() +" "+  dat.getTime());
    //  $ionicLoading.show({
    //    template: '<ion-spinner class="spinner-energized"></ion-spinner><div  class="col"> Loading... </div>'
    //    // duration: 1000
    //  });


    if (meetinglatlong == undefined || meetinglatlong == null) {
      this.presentAlert("", "Invalid Meeting Location");


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
          var geocoder = new google.maps.Geocoder();
          this.geolocation.getCurrentPosition().then((res) => {

            var pos = {
              lat: res.coords.latitude,
              lng: res.coords.longitude
            };
            var curr_lat_lng = res.coords.latitude + ',' + res.coords.longitude;
            this.latlngvals = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);

            this.nativeGeocoder.reverseGeocode(res.coords.latitude, res.coords.longitude, this.geoencoderOptions)
              .then((result) => {


                if (status == google.maps.GeocoderStatus.OK) {
                  if (result[0]) {
                    var areaname = this.generateAddress(result[0]);

                  } else {
                    areaname = 'Not Captured';
                  }
                } else {
                  areaname = 'Not Captured';
                }
                var rad = function (x) {
                  return x * Math.PI / 180;
                };
                var meetinglatlongarray = meetinglatlong.split(',');
                var curr_lat_lngarray = curr_lat_lng.split(',');
                var R = 6378137;
                console.log("meetinglatlongarray :" + meetinglatlongarray[0]);
                console.log("curr_lat_lngarray :" + parseInt(curr_lat_lngarray[0]));
                var dLat = rad(meetinglatlongarray[0] - parseFloat(curr_lat_lngarray[0]));
                console.log("dLat :" + dLat);
                var dLong = rad(meetinglatlongarray[1] - parseFloat(curr_lat_lngarray[1]));
                console.log("dLong :" + dLong);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(rad(curr_lat_lngarray[0])) * Math.cos(rad(meetinglatlongarray[0])) *
                  Math.sin(dLong / 2) * Math.sin(dLong / 2);
                console.log("a :" + a);
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
                    TCC_CUST_ID: '',
                    TCC_CUST_LEAD_ID: '',
                    TCC_CALL_ID: '',
                    OBJ_ID: '',
                    START_TIME: '',
                    END_TIME: '',
                    Location_Desc: '',
                    access_token: '',
                    userid: '',
                    usertoken: ''
                  };


                  objdataupdtime.TCC_CUST_ID = customerid;
                  objdataupdtime.TCC_CUST_LEAD_ID = custleadid;
                  objdataupdtime.TCC_CALL_ID = callid;
                  objdataupdtime.OBJ_ID = idvals;
                  objdataupdtime.START_TIME = currenttime;
                  objdataupdtime.END_TIME = currenttime;
                  objdataupdtime.Location_Desc = areaname;
                  objdataupdtime.access_token = window.localStorage['token'];
                  objdataupdtime.userid = window.localStorage['TUM_USER_ID'];
                  objdataupdtime.usertoken = window.localStorage['usertoken'];

                  console.log(objdataupdtime);
                  // var updateleadJSON = angular.extend(objdataupdtime,tokenJSON);
                  const header = new Headers();
                  header.append("Content-Type", "application/json");
                  let options = new HttpHeaders().set('Content-Type', 'application/json');
                  this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'updstendtime/', objdataupdtime, {
                    headers: options,
                  }).subscribe(resp => {


                    if (resp == 'start time updated') {

                      this.stbtn = true;
                      // document.getElementById("stbtn" + btnval).style.disabled = true;
                      document.getElementById("stbtn" + btnval).style.backgroundColor = 'grey';
                      // document.getElementById("endbtn" + btnval).style.backgroundColor = '#009689';
                      //$ionicLoading.hide().then(function() {});
                      this.presentAlert("", "Meeting Started Successfully");


                      setTimeout(function () {
                        window.location.reload();
                        this.callforalldetails(items.nextactionval);
                      }, 1500);


                    }
                    if (resp == 'end time updated') {
                      // $ionicLoading.hide().then(function() {});
                      // $ionicPopup.alert({
                      //   title: '',
                      //   template: '<div align ="center">Meeting Ended Successfully</div>'
                      // });

                      // this.openModal(items);
                    }
                  }, error => {

                    // if (error.text == 'start time updated') {

                    this.stbtn = true;
                    // document.getElementById("stbtn" + btnval).style.disabled = true;
                    document.getElementById("stbtn" + btnval).style.backgroundColor = 'grey';
                    // document.getElementById("endbtn" + btnval).style.backgroundColor = '#009689';
                    //$ionicLoading.hide().then(function() {});
                    this.presentAlert("", "Meeting Started Successfully");


                    setTimeout(function () {
                      window.location.reload();
                      this.callforalldetails(items.nextactionval);
                    }, 1500);


                    // }
                    console.log("" + JSON.stringify(error));
                  });

                } else {

                  this.presentAlert("", "Invalid Meeting Location");

                }
              })
              .catch((error: any) => {

              });



          });

        } else {
          this.presentAlert("", "Invalid meeting Time");
          //alert("Invalid meeting Time")

        }

      } else {
        //alert("Meeting is not scheduled")
        this.presentAlert("", "Meeting is not scheduled");

      }



      return false;
    }

  }
  ionViewDidLeave() {
    this.modalController.dismiss();
  }
  openrootmap(latlng) {
    console.log(latlng);
    localStorage.setItem('curntlatlngval', latlng);
    console.log(latlng);
    this.source = window.localStorage['CurrentLatLng'];
    this.destination = latlng;

    if ((latlng == null) || (latlng == 'undefined')) {
      this.presentAlert("Info", "There is no Meeting Location for this Entry!");

    } else {
      // $state.go("app.salesrootmap");
      var options = { timeout: 10000, enableHighAccuracy: true };
      this.geolocation.getCurrentPosition(options).then((res) => {

        // var pos = {
        //   lat: res.coords.latitude,
        //   lng:res.coords.longitude
        // };
        this.source = res.coords.latitude + ',' + res.coords.longitude;
        window.localStorage['CurrentLatLng'] = this.source;
        console.log(this.source);
        this.router.navigate(['/rootmap', {
          source: this.source,
          destination: this.destination
        }]);
      });


    }
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
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
  //phone calls
  phonecalls() {

    var data = false;
    var data1 = false;
    let that = this;
    if (window.PhoneCallTrap) {
      window.PhoneCallTrap.onCall(function (state) {

        if (state == 'RINGING') {
          console.log("RINGING");
        }

        else if (state == 'OFFHOOK') {

          that.startRecording(0);



        }
        else if (state == 'IDLE') {
          // that.stopRecording();
        }


      });
    }


  }
  startRecording(index) {
    console.log("Audio");
    this.pendleaddetails[index].isRecording = true;

    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this._recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      this.stream = s;
      this.record(index);
    }).catch(error => {
      this._recordingFailed.next();
    });

  }

  abortRecording() {
    this.isRecording = false;

    this.stopMedia();
  }

  private record(index) {

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm'
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
        this._recordingTime.next(time);
      },
      1000
    );
  }

  private toString(value) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  stopRecording(i) {

    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          const mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
          this.stopMedia();
          var reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onloadend = function () {
            var base64data = reader.result;
            console.log(base64data);

          };
          this.imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

          // this.image.push(this.imagecif + "_salesvoice.mp3");


          this._recorded.next({
            index: i,
            blob: blob,
            title: mp3Name,

          });
        }
      }, () => {
        this.stopMedia();
        this._recordingFailed.next();
      });
    }
    this.pendleaddetails[i].isRecording = false;

  }
  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }
  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }
  getAudioList() {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }
  ionViewWillEnter() {
    this.getAudioList();
  }
  stopRecord() {
    try {
      this.audio.stopRecord();
      let data = { filename: this.fileName };
      this.audioList.push(data);
      console.log("audioList : " + JSON.stringify(this.audioList));
      localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.recording = false;
      this.getAudioList();
    }
    catch (ex) {
      console.log("stop record : " + ex);
    }
  }
  playAudio(file, idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
    // // if (this.platform.is('ios')) {
    // //   this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;

    // //   this.audio = this.media.create(this.filePath);
    // // } else if (this.platform.is('android')) {
    //   this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
    //   this.audio = this.media.create(this.filePath);
    // // }
    // this.audio.play();
    // this.audio.setVolume(0.8);
  }
  startRecord1() {
    try {
      this.recording = true;

      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
      console.log("startRecord start");
      this.audio.startRecord();

      console.log("startRecord1 after");
    }
    catch (ex) {

      console.log("startRecord error: " + ex);
    }
  }
  dataURLtoFile(dataURI, filename) {
    console.log(dataURI);
    console.log(filename);

    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: 'audio/mp3' });
  };

  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }


}

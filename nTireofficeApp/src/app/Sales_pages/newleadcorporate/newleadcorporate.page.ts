/* eslint-disable no-debugger */
/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable curly */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable quote-props */
/* eslint-disable arrow-body-style */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
declare let google;
import { Crop } from '@ionic-native/crop/ngx';

import { Base64 } from '@ionic-native/base64/ngx';

import { AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import * as jquery from 'jquery';

@Component({
  selector: 'app-newleadcorporate',
  templateUrl: './newleadcorporate.page.html',
  styleUrls: ['./newleadcorporate.page.scss'],
})
export class NewleadcorporatePage implements OnInit {
  contact_array = [];
  pincode;
  address;
  contact1 = [];
  respContact;
  company_id;
  isItemAvailable;
  companiesstr;
  companyname1 = [];
  companyname;
  company;
  file = [];
  imagecif;
  function;
  branchlist: any;
  branchlist1 = [];
  branch;
  branchlocation;
  productdata;
  branchlocationlist: any = [];
  branchlocationlist1 = [];
  productdataarray: any = [];
  saluationarray: any = [];
  callpriorityarray: any = [];

  callratingarray: any = [];
  callnaturearray: any = [];
  callstagearray: any = [];
  leadsourcearray: any = [];
  nextactionarray: any = [];
  Salutation;
  callpriority;
  callrating;
  callnature;
  callstage;
  leadssource;
  leadby;
  nextaction;
  currentlocation;
  appointmentlocation = [];
  appointmentlocation1 = [];
  placetomeet;
  functionid;
  userTypeid;
  branch_id;

  followdate;
  expdate;
  followtime;
  campaign;
  OffPhone;
  ResPhone;
  source;
  remarks;
  closedDate;
  expectedAmount;
  leadBy;
  prod_cat;
  uservalue;
  mobile;
  salutation_name;
  firstname;
  lastname;
  rating;
  nature;
  result;
  lead_id;
  currentlatlon;
  appointmentLatLong;
  image = [];
  Employeeid;
  custname;
  leadByval;
  old_company;
  ContactName;
  mobilenumber;
  curr_prod_category;
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  @ViewChild('map') mapElement: ElementRef;


  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any;
  map: any;
  service = new google.maps.places.AutocompleteService();

  showmap;
  Images = [];
  username: any;
  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true //Corrects Android orientation quirks
  };
  validmobile: boolean;
  constructor(public actionSheetController: ActionSheetController, public sanitizer: DomSanitizer, public alertController: AlertController, private crop: Crop, private base64: Base64, private camera: Camera, private zone: NgZone, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.isItemAvailable = false;
    this.ContactName = "<<Select>>";
    this.showmap = true;
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = parseInt(localStorage.getItem('TUM_BRANCH_ID'));
    this.BranchLocationdata(this.branch);
    this.branchlocation = "<< Select >>";
    this.productdata = "<< Select >>";
    this.nextaction = "<< Select >>";
    this.callpriority = 1;
    this.callstage = 1;
    this.callrating = 1;
    this.callnature = 1;
    this.leadssource = 1;
    this.leadby = "S";

    this.username = localStorage.getItem('TUM_USER_NAME');

    this.Salutation = "<< Select >>";
    this.Getbranches();
    this.Getproductdata();
    this.Getsalutation();
    this.Getcallpriority();

    this.Getcallrating();
    this.Getcallnature();
    this.Getcallstage();
    this.Getleadsource();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

  }

  ngOnInit() {
  }
  adddata(item) {

    this.company = item;
    this.isItemAvailable = false;
    for (var i = 0; i < this.companiesstr.length; i++) {
      if (this.company == this.companiesstr[i].companyName) {
        this.company_id = this.companiesstr[i].id;
      }

    }
    window.localStorage['old_company_status'] = 'true';
    this.old_company = 'true';
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'GetContactDetails/' + this.company_id, {
      headers: options,
    }).subscribe(resp => {
      this.respContact = JSON.stringify(resp);

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
  mobilenumbervalid(mobilenumber) {
    if (mobilenumber != undefined && mobilenumber.length != 10) {
      this.validmobile = true;
    }
    else {
      this.validmobile = false;
    }
  }
  getItems(ev: any) {
    console.log("one");
    this.companyname1 = [];
    if (ev.target.value == "") {
      this.companyname1 = [];
      this.isItemAvailable = false;
    }

    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'getcompany/' + ev.target.value, {
      headers: options,
    }).subscribe(resp => {
      this.companyname1 = [];
      this.isItemAvailable = false;
      // set val to the value of the searchbar
      this.companiesstr = JSON.stringify(resp);
      this.companiesstr = JSON.parse(this.companiesstr);
      // this.companiesstr = JSON.parse(resp.toString());

      for (var i = 0; i < this.companiesstr.length; i++) {

        this.companyname1.push(this.companiesstr[i].companyName);
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items

      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.companyname1 = this.companyname1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
    });
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
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getBranchAccess', params, {
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
  }
  BranchLocationdata(branchid) {

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'BranchLocation/' + branchid, {
      headers: options,
    }).subscribe(resp => {
      this.branchlocationlist = JSON.stringify(resp);
      this.branchlocationlist = JSON.parse(this.branchlocationlist);
      console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  Getproductdata() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'getProduct', {
      headers: options,
    }).subscribe(resp => {
      this.productdataarray = JSON.stringify(resp);
      this.productdataarray = JSON.parse(this.productdataarray);
      console.log("productdataarray: " + JSON.stringify(this.productdataarray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  Getsalutation() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'Nametitle', {
      headers: options,
    }).subscribe(resp => {
      this.saluationarray = JSON.stringify(resp);
      this.saluationarray = JSON.parse(this.saluationarray);
      console.log("prsaluationarrayoductdataarray: " + JSON.stringify(this.saluationarray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  Getcallpriority() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callpriority', {
      headers: options,
    }).subscribe(resp => {
      this.callpriorityarray = JSON.stringify(resp);
      this.callpriorityarray = JSON.parse(this.callpriorityarray);
      console.log("callpriorityarray: " + JSON.stringify(this.callpriorityarray));

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
      this.leadsourcearray = JSON.stringify(resp);
      this.leadsourcearray = JSON.parse(this.leadsourcearray);
      console.log("leadsourcearray: " + JSON.stringify(this.leadsourcearray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  getIndexIfObjWithOwnAttr(array, attr, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][attr] == value) {
        return i;
      }
    }
    return -1;
  }
  Getnextaction(productdata) {

    var index = this.getIndexIfObjWithOwnAttr(this.productdataarray, 'productID', productdata);
    this.curr_prod_category = this.productdataarray[index].productCatID;
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'customerresponse/' + this.curr_prod_category, {
      headers: options,
    }).subscribe(resp => {
      this.nextactionarray = JSON.stringify(resp);
      this.nextactionarray = JSON.parse(this.nextactionarray);
      // this.nextactionarray = JSON.parse(resp.toString());
      console.log("nextactionarray: " + JSON.stringify(this.nextactionarray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  async selectImage() {
    let self = this;


    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {

          //get current position
          this.geolocation.getCurrentPosition().then((res) => {

            this.currentlatlon = res.coords.latitude + "," + res.coords.longitude;
            let location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
            console.log("location :n" + location);
            this.getGeoencoder1(res.coords.latitude, res.coords.longitude);



          }).catch((error) => {
            // this.presentAlert('', 'Turn on location to processed!');
          });
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder1(latitude, longitude) {
    let self = this;
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result) => {
        this.currentlocation = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        this.presentAlert('', 'Error getting location');
      });

    jquery('#fileinput').trigger('click');
    jquery('#fileinput').unbind().change(function () {
      // jquery('#fileinput').on('change', function () {
      var filePath = jquery(this).val();
      console.log(filePath);

      var str = filePath;
      // alert("" + str.split("\\").pop())
      // var actualFile = str.split("\\").pop();
      // console.log("actualFile :" + actualFile);
      // var File_inputvalue =
      //self.Images.push(actualFile);
      self.uploadallfilles();
    });
  }
  uploadallfilles() {

    let self = this;

    jquery('#fileinput').trigger('click');

    const files1 = jquery('#fileinput').prop("files")[0];

    console.log(this.getBase64(files1));

    //  alert("item.DOCUMENTID :"+item.DOCUMENTID+":"+this.fieldname)
    var fileArray = new Array();
    var names = jquery.map(files1, function (val) {

      fileArray.push(val);

      console.log("fileinput :" + val.name + ":" + val.size + ":" + val.type);

      return val.name;
    });
    if (fileArray[4] < 2000000) {
      const file_name = jquery('#fileinput').prop("files")[0].name;
      console.log("filename :" + file_name);
      var file_name_array = file_name.split('.');
      var file_format = file_name_array[file_name_array.length - 1];
      console.log(file_name);
      console.log('getBase64:' + this.getBase64(files1));
      var reader = new FileReader();
      reader.readAsDataURL(files1);
      reader.onload = function () {
        self.Images.push(reader.result);

      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      const file = jquery('#fileinput').prop("files")[0];
      this.file.push(jquery('#fileinput').prop("files")[0]);
      this.image.push(file_name);
      // this.uploadingFiledocument();
    }
  };
  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  pickImage() {

    //get current position
    this.geolocation.getCurrentPosition().then((res) => {

      this.currentlatlon = res.coords.latitude + "," + res.coords.longitude;
      let location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
      console.log("location :n" + location);
      this.getGeoencoder(res.coords.latitude, res.coords.longitude);



    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {

    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result) => {
        this.currentlocation = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        console.log('Error getting location' + JSON.stringify(error));
        alert('Error getting location');
      });
    this.imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true //Corrects Android orientation quirks
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.crop.crop(imageData, { quality: 100 })
        .then(
          newImage => {

            this.base64.encodeFile(newImage).then((base64File: string) => {
              var base64result = base64File.split(',')[1];

              var fileURL = "data:image/jpeg;base64," + base64result;

              this.Images.push(fileURL);

              this.image.push(this.imagecif + "_Csales.jpg");

              var file = this.dataURLtoFile(fileURL, this.image);
              this.file.push(this.dataURLtoFile(fileURL, this.image));

            }, (err) => {
              console.log(err);
            });

          },
          error => {
            console.error('Error cropping image', error);
          }
        );
    }, (err) => {
      // Handle error
    });
  }
  dataURLtoFile(dataURI, filename) {
    console.log(dataURI);
    console.log(filename);

    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };
  //Return Comma saperated address
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
  chooseItem(item: any) {

    this.geo = item;
    this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearch() {

    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }

    let me = this;
    this.service.getPlacePredictions({
      input: this.autocomplete.query,
      componentRestrictions: {
        country: 'de'
      }
    }, (predictions, status) => {
      me.autocompleteItems = [];

      me.zone.run(() => {
        if (predictions != null) {
          predictions.forEach((prediction) => {
            me.autocompleteItems.push(prediction.description);
            console.log(prediction);
          });
        }
      });
    });
  }
  //convert Address string to lat and long
  geoCode(address: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      console.log("lat: " + this.latitude + ", long: " + this.longitude);
    });
  }
  handleAddressChange(event) {
    this.showmap = false;
    console.log(event.geometry.location.lat());
    console.log(event.geometry.location.lng());
    this.appointmentLatLong = event.geometry.location.lat() + "," + event.geometry.location.lng();
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
  DeleteImage(index) {
    this.Images.splice(index, 1);
  }
  Submitcorporate() {
    debugger;
    if ((this.branch == '<< Select >>' || this.productdata == '<< Select >>' || this.company == undefined || this.ContactName == undefined || this.mobile == undefined || this.company == undefined || this.ContactName == undefined || this.callpriority == undefined || this.callrating == '<< Select >>' || this.callnature == '<< Select >>' || this.callstage == '<< Select >>' || this.nextaction == '<< Select >>' || this.leadby == '<< Select >>' || this.remarks == undefined) || (this.nextaction == '1' && (this.placetomeet == undefined || this.followtime == undefined || this.followdate == undefined)) || (this.nextaction == '2' && (this.followtime == undefined || this.followdate == undefined)) || (this.leadby == 'E' && (this.Employeeid == undefined)) || (this.leadby == 'C' && (this.custname == undefined)) || (this.leadby == 'P' && (this.leadByval == undefined))) {

      this.presentAlert('', 'Enter Mandatory Fields');
    }
    else {
      if (window.localStorage['old_company_status'] == 'true') {


        var appoint_time = new Date(this.followtime);
        // console.log(appoint_time);
        var hours = appoint_time.getHours();
        var minutes = appoint_time.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        minutes = minutes < 10 ? 0 + minutes : minutes;
        var strTime = hours + '-' + '00';
        console.log(strTime, 'strTime');
        if (this.campaign == undefined || this.campaign == '') {
          this.campaign = 0;
        }
        if (this.OffPhone == undefined || this.OffPhone == '') {
          this.OffPhone = ' ';
        }
        if (this.ResPhone == undefined || this.ResPhone == '') {
          this.ResPhone = ' ';
        }
        if (this.source == undefined || this.source == '') {
          this.source = 0;
        }
        if (this.remarks == undefined || this.remarks == '') {
          this.remarks = null;
        }
        if (this.company == undefined || this.company == '') {
          this.company = ' ';
        }
        if (this.mobile == undefined || this.mobile == '') {
          this.mobile = ' ';
        }
        if (this.ContactName == undefined || this.ContactName == '') {
          this.ContactName = ' ';
        }

        if (this.expectedAmount == undefined || this.expectedAmount == '') {
          this.expectedAmount = 0;
        }

        if (this.leadby == 'S') {
          this.uservalue = window.localStorage['TUM_USER_ID'];
        }
        if (this.leadby == 'E' || this.leadby == 'C' || this.leadby == 'P') {
          this.uservalue = window.localStorage['TUM_USER_ID'];
        }
        if (this.nextaction == 6 || this.nextaction == 5 || this.nextaction == 4 || this.nextaction == 7 || this.nextaction == 8 || this.nextaction == 9) {
          appdata = ' ';
          strTime = ' ';
        }
        if (this.uservalue == undefined || this.uservalue == '') {
          this.uservalue = null;
        }


        var rad = function (x) {
          return x * Math.PI / 180;
        };
        this.prod_cat = this.productdata;

        this.salutation_name = this.Salutation;

        if (this.mobile == '0000000000') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '1111111111') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '2222222222') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '3333333333') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '4444444444') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '5555555555') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '6666666666') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '7777777777') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '8888888888') {
          alert('Invalid Contact Number');
          return;
        } else if (this.mobile == '9999999999') {
          alert('Invalid Contact Number');
          return;
        }
        var date2 = new Date(this.followdate);
        var day = date2.getDate();
        var month = date2.getMonth() + 1;
        var year = date2.getFullYear();
        var appdata = [day, month, year].join('-');

        var date1 = new Date(this.expdate);
        var day1 = date1.getDate();
        var month1 = date1.getMonth() + 1;
        var year1 = date1.getFullYear();
        this.closedDate = [day1, month1, year1].join('-');
        if (this.closedDate == "NaN-NaN-NaN" || this.closedDate == '') {
          this.closedDate = ' ';
        }
        if (appdata == '' || this.nextaction == 6 || this.nextaction == 5 || this.nextaction == 4 || this.nextaction == 7 || this.nextaction == 8 || this.nextaction == 9) {

          var appdata = ' ';
          var strTime = ' ';
        }
        var branchloc;
        if (this.branchlocation == "<< Select >>") {
          branchloc = 0;
        }
        else {
          branchloc = this.branchlocation;
        }
        var appdata1;
        if (appdata == " ") {
          appdata1 = "01-01-1990";
        } else {
          appdata1 = appdata;
        }
        var strTime1;
        if (strTime == " ") {
          strTime1 = "12-00";
        } else {
          strTime1 = strTime;
        }
        var data = {
          functionid: parseInt(window.localStorage["FUNCTION_ID"]),
          userTypeid: parseInt(window.localStorage['TUM_USER_TYPE']),
          branch_id: parseInt(window.localStorage['TUM_BRANCH_ID']),
          ContactName: this.ContactName,
          mobile: this.mobile,
          OffPhone: this.OffPhone,
          ResPhone: "0",
          appointmentDate: appdata1,
          closedDate: this.closedDate,
          appointmentTime: strTime1,
          company1: this.company,
          campaign: this.campaign,
          source: this.source,
          remarks: this.remarks,
          expectedAmount: this.expectedAmount,
          uservalue: this.uservalue,
          followdate: this.followdate,
          followtime: this.followtime,
          prod_cat: this.curr_prod_category,
          product_id: this.productdata,
          priority: this.callpriority,
          rating: this.callrating,
          nature: this.callnature,
          stage: this.callstage,
          response: this.nextaction,
          leadBy: this.leadby,
          LocationId: branchloc

        };
        var prod_id = parseInt(data.product_id);
        var camp_id = prod_id + 1;
        const header = new Headers();
        header.append("Content-Type", "application/json");

        // let options = new HttpHeaders().set('Content-Type', 'application/json');
        debugger;
        this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'corporatelead' + '/' + data.functionid + '/' + data.branch_id + '/' + data.prod_cat + '/' + data.product_id + '/' + camp_id + '/' + data.company1 + '/' + data.ContactName + '/' + data.mobile + '/' + data.OffPhone + '/' + data.ResPhone + '/' + data.priority + '/' + data.rating + '/' + data.nature + '/' + data.source + '/' + data.stage + '/' + data.response + '/' + data.appointmentTime + '/' + data.appointmentDate + '/' + data.remarks + '/' + data.closedDate + '/' + data.expectedAmount + '/' + data.leadBy + '/' + data.uservalue + '/' + data.userTypeid + '/' + data.LocationId + '').subscribe(resp => {
          console.log("mobileapi : " + JSON.stringify(resp));
          debugger;
          console.log(resp);
          // this.result = JSON.parse(resp.toString());
          this.result = JSON.stringify(resp);
          this.result = JSON.parse(this.result);
          //  console.log(jqueryscope.result);
          // jquery('#submit_retail').attr('disabled',false);
          if (resp.toString() == '"CampaignBranchaccess Not found"') {
            this.presentAlert('Alert', 'Branch access restricted for this campaign');
            this.campaign = '';
          }
          else {
            var resultstrarray = this.result.split(" ");
            var lead_id_new = resultstrarray[4];
            lead_id_new = parseInt(lead_id_new);
            this.lead_id = lead_id_new;
            if (this.appointmentLatLong == undefined || this.appointmentLatLong == '') {
              this.appointmentLatLong = 0;
            }


            var obj = {
              'LeadID': lead_id_new, 'LatLong': this.appointmentLatLong, 'Address': this.placetomeet,
              access_token: window.localStorage['token'],
              userid: parseInt(window.localStorage['TUM_USER_ID']),
              'usertoken': window.localStorage['usertoken'],

            };
            console.log("update_meeting_locationJSON : " + JSON.stringify(obj));
            var update_meeting_locationJSON = obj;
            const header = new Headers();
            header.append("Content-Type", "application/json");

            let options = new HttpHeaders().set('Content-Type', 'application/json');


            this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'update_meeting_location', update_meeting_locationJSON, {
              headers: options,
            }).subscribe(resp => {
              console.log("update_meeting_location success : " + JSON.stringify(resp));

              this.appointmentLatLong = null;
            }, error => {

              console.log("update_meeting_location error : " + JSON.stringify(error));

            });

            if (this.Images.length != 0 || this.Images != undefined) {
              if (this.currentlatlon == '' || this.currentlatlon == undefined) {

              } else {

                var passCurrent_locationJSON = {
                  latlong: this.currentlatlon,
                  CustId: this.lead_id,
                  access_token: window.localStorage['token'],
                  userid: parseInt(window.localStorage['TUM_USER_ID']),
                  'usertoken': window.localStorage['usertoken'],
                  Token: window.localStorage['usertoken']
                };
                console.log("passCurrent_locationJSON : " + JSON.stringify(passCurrent_locationJSON));

                const header = new Headers();
                header.append("Content-Type", "application/json");

                // http://mydesk.nextit.in:8173/dms/DMS/sales/
                let options = new HttpHeaders().set('Content-Type', 'application/json');

                this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'pass_current_loc', passCurrent_locationJSON, {
                  headers: options,
                }).subscribe(resp => {


                }, error => {


                  console.log("Location not updated" + JSON.stringify(error));


                });
                console.log("file : " + this.file.length);
                for (var i = 0; i < this.file.length; i++) {
                  console.log("image : " + this.image[i]);
                  console.log("file: " + this.file[i]);
                  //      const header = new Headers();
                  //  header.append("Content-Type", "application/json");

                  //  var fd = new FormData();
                  //  var url =this.Ipaddressservice.ipaddress +'/dms/uploadfileSalesPhoto';

                  //  fd.append("upload", this.file[i], this.image[i]);
                  //  console.log("this.file[i] : "+JSON.stringify(this.file[i])+"this.image[i]"+JSON.stringify(this.image[i]));

                  //  let options = new HttpHeaders().set('Content-Type',undefined);
                  //  this.http.post(url,fd, {
                  //    headers: options,
                  //    withCredentials: false,
                  //  }).subscribe(resp => {
                  //   alert("success uploadfileSalesPhoto");

                  //  }, error => {

                  //   console.log("error : "+JSON.stringify(error));
                  //   alert("error uploadfileSalesPhoto");


                  //    });
                  var url = this.Ipaddressservice.ipaddress + '/los/uploadfile';
                  const formData: any = new FormData();
                  formData.append("upload", this.file[i], this.image[i]);

                  console.log('form data variable :   ' + formData.toString());
                  this.http.post(url, formData)

                    .subscribe(files => console.log('files', files));
                  var objupload = {
                    'pk1': this.lead_id,
                    'doc_name': this.image[i],
                    'doc_desc': this.remarks,
                    'doc_path': "E:/APPLICATIONS/MyDesk/nTireoffice/UploadDocu/SSTPL" + this.image[i],

                    'uploaded_by': window.localStorage['TUM_USER_ID'],
                    'FUNCTIONID': parseInt(window.localStorage['FUNCTION_ID']),
                    'file_size': this.file[i].size,
                    access_token: window.localStorage['token'],
                    userid: parseInt(window.localStorage['TUM_USER_ID']),
                    'usertoken': window.localStorage['usertoken'],

                  };

                  console.log("objupload : " + JSON.stringify(objupload));

                  var uploadJSON = objupload;
                  const header1 = new Headers();
                  header1.append("Content-Type", "application/json");

                  let options1 = new HttpHeaders().set('Content-Type', 'application/json');
                  this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'uploadimageforsales', uploadJSON, {
                    headers: options1,
                  }).subscribe(resp => {
                    //console.log("success uploadimageforsales");

                    console.log(JSON.stringify(resp));
                  }, error => {

                    //console.log("error uploadimageforsales");

                    console.log(JSON.stringify(error));

                  });

                }
              }
            }

            this.presentAlertConfirm('Success Alert', this.result)

          }
        }, error => {

          console.log("error : " + JSON.stringify(error));

        });
      }
    }
  }
  async Cancelcorporate() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Cancel the Process',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.branch = "<< Select >>";
            this.branchlocation = "<< Select >>";
            this.productdata = "<< Select >>";
            this.nextaction = "<< Select >>";
            this.Salutation = "<< Select >>";
            this.company = "";
            this.ContactName = undefined;
            this.mobile = undefined;
            this.address = undefined;
            this.OffPhone = undefined;
            this.ResPhone = undefined;
            this.callpriority = 1;
            this.callstage = 1;
            this.callrating = 1;
            this.callnature = 1;
            this.leadssource = 1;
            this.leadby = "S";
            this.pincode = undefined;
            this.custname = undefined;
            this.followdate = undefined;
            this.followtime = undefined;
            this.placetomeet = undefined;
            this.Employeeid = undefined;
            this.custname = undefined;
            this.leadByval = undefined;
            this.expdate = undefined;
            this.expectedAmount = undefined;
            this.Images = [];
            this.currentlocation = undefined;
            this.remarks = undefined;
            this.showmap = true;
          }
        }
      ]
    });
    await alert.present();
  }
  async presentAlertConfirm(heading, tittle) {
    const alert = await this.alertController.create({
      header: heading,
      message: tittle,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.branch = "<< Select >>";
            this.branchlocation = "<< Select >>";
            this.productdata = "<< Select >>";
            this.nextaction = "<< Select >>";
            this.Salutation = "<< Select >>";
            this.company = "";
            this.ContactName = "";
            this.mobile = "";
            this.address = "";
            this.OffPhone = "";
            this.ResPhone = "";
            this.callpriority = 1;
            this.callstage = 1;
            this.callrating = 1;
            this.callnature = 1;
            this.leadssource = 1;
            this.leadby = "S";
            this.followdate = "";
            this.followtime = "";
            this.placetomeet = "";
            this.Employeeid = "";
            this.custname = "";
            this.leadByval = "";
            this.expdate = "";
            this.expectedAmount = "";
            this.Images = [];
            this.currentlocation = "";
            this.remarks = "";
            this.showmap = true;
          }
        }
      ]
    });

    await alert.present();
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
  dat_valid = {
    currentDate: new Date()
  };
  Getnumber(contactname) {
    this.mobile = undefined;
    console.log(contactname);
    console.log("contact1 : " + JSON.stringify(this.contact1));
    this.contact1.forEach(element => {
      if (contactname == element.ContactName) {
        this.mobile = element.Mobile;
      }
    });

    // var ContactGet=contact_catch.getdata();
    // console.log(ContactGet);

    // var obj = ContactGet.filter(function ( obj ) {
    //    return obj.ID === contact_id;
    // })[0];

    // console.log(obj);

    // jqueryscope.contact.Mobile= obj.Mobile;
    // jqueryscope.contact.OffPhone= obj.Telephone;
    // jqueryscope.contact.ResNo= obj.ResNo;
    // jqueryscope.contact.ContactName= obj.ContactName;
  }
  timeValidation(val) {

    var element = val;
    var compare_dates = function (date1, date2) {
      if (date1 > date2) return true;
      else if (date1 < date2) return false;
      else return false;
    };
    console.log("chck " + new Date(this.followdate + " " + element));

    if (compare_dates(new Date(this.followdate + " " + element), new Date()) != true) {

      alert("Time should not be past");
      this.followtime = "";
      this.followtime = undefined;

    }
  }

}

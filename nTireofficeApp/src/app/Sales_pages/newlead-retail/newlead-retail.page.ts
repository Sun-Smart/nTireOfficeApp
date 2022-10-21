/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable curly */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
declare const google;
import { Crop } from '@ionic-native/crop/ngx';

import { Base64 } from '@ionic-native/base64/ngx';
import { AlertController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
// import 'intl-tel-input';
declare let $: any;

@Component({
  selector: 'app-newlead-retail',
  templateUrl: './newlead-retail.page.html',
  styleUrls: ['./newlead-retail.page.scss'],
})
// export class NewleadRetailPage implements OnInit {
//   exampleText: any;
//   uservalid: any;
//   show_request: any;
//   show_color: any;
//   userid: any;
//   retailbtn: boolean;
//   file = [];
//   imagecif: any;
//   function: any;
//   branchlist: any;
//   branchlist1 = [];
//   branch: any;
//   branchlocation: any;
//   productdata: any;
//   branchlocationlist: any = [];
//   branchlocationlist1 = [];
//   productdataarray: any = [];
//   saluationarray: any = [];
//   callpriorityarray: any = [];

//   callratingarray: any = [];
//   callnaturearray: any = [];
//   callstagearray: any = [];
//   leadsourcearray: any = [];
//   nextactionarray: any = [];
//   Salutation: any;
//   callpriority: any;
//   callrating: any;
//   callnature: any;
//   callstage: any;
//   leadssource: any;
//   leadby: any;
//   nextaction: any;
//   currentlocation: any;
//   appointmentlocation = [];
//   appointmentlocation1 = [];
//   placetomeet: any;
//   functionid: any;
//   userTypeid: any;
//   branch_id: any;

//   followdate: any;
//   expdate: any;
//   followtime: any;
//   campaign: any;
//   OffPhone: any;
//   ResPhone: any;
//   source: any;
//   remarks: any;
//   closedDate: any;
//   appointmentDate: any;
//   expectedAmount: any;
//   leadBy: any;
//   prod_cat: any;
//   uservalue: any;
//   mobile: any;
//   salutation_name: any;
//   firstname: any;
//   lastname: any;
//   rating: any;
//   nature: any;
//   result: any;
//   lead_id: any;
//   currentlatlon: any;
//   appointmentLatLong: any;
//   image = [];
//   Employeeid: any;
//   custname: any;
//   leadByval: any;
//   specialKeys = [];
//   exampleTextRes: any;
//   //Geocoder configuration
//   geoencoderOptions: NativeGeocoderOptions = {
//     useLocale: true,
//     maxResults: 5
//   };
//   @ViewChild('map') mapElement: ElementRef;


//   autocompleteItems: any;
//   autocomplete: any;

//   latitude = 0;
//   longitude = 0;
//   geo: any;
//   map: any;
//   service = new google.maps.places.AutocompleteService();

//   showmap: any;
//   Images = [];
//   curr_prod_category: any;
//   exampleTextoff: any;
//   private optionsCamera: CameraOptions = {
//     quality: 100,
//     targetWidth: 600,
//     sourceType: this.camera.PictureSourceType.CAMERA,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE,
//     correctOrientation: true //Corrects Android orientation quirks
//   };
//   products: any;
//   email: any;
//   Currency: any;
//   inputall_imagesdoc = [];
//   inputall_images = [];
//   username: any;
//   validemail: boolean;
//   constructor(public actionSheetController: ActionSheetController, private datePipe: DatePipe, public sanitizer: DomSanitizer, public alertController: AlertController, private crop: Crop, private base64: Base64, private camera: Camera, private zone: NgZone, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, private http: HttpClient, public Ipaddressservice: IpaddressService) {
//     this.exampleText = '';
//     this.exampleTextoff = '';
//     this.exampleTextRes = '';
//     this.showmap = true;
//     this.function = localStorage.getItem('FUNCTION_DESC');
//     // this.branch = parseInt(localStorage.getItem('TUM_BRANCH_ID'));
//     this.branch = '<< Select >>';
//     this.BranchLocationdata(this.branch);
//     this.branchlocation = '<< Select >>';
//     this.productdata = '<< Select >>';
//     this.nextaction = '<< Select >>';
//     this.nextaction = '<< Select >>';
//     this.Currency = '<< Select >>';

//     this.callpriority = 1;
//     this.callstage = 1;
//     this.callrating = 1;
//     this.callnature = 1;
//     this.leadssource = 1;
//     this.leadby = 'S';
//     this.source = 1;

//     this.username = localStorage.getItem('TUM_USER_NAME');

//     this.Salutation = '<< Select >>';
//     this.Getbranches();
//     this.Getproductdata();
//     this.Getsalutation();
//     this.Getcallpriority();
//     this.Getcallrating();
//     this.Getcallnature();
//     this.Getcallstage();
//     this.Getleadsource();
//     this.autocompleteItems = [];
//     this.autocomplete = {
//       query: ''
//     };
//   }
//   dat_valid = {
//     currentDate: new Date()
//   };
//   ngOnInit() {
//   }
//   Getbranches() {
//     const params = {
//       access_token: window.localStorage.token,
//       userid: parseInt(window.localStorage.TUM_USER_ID),
//       usertoken: window.localStorage.usertoken,
//       USER_ID: parseInt(window.localStorage.TUM_USER_ID)
//     };

//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getBranchAccess', params, {
//       headers: options,
//     }).subscribe(resp => {
//       this.branchlist = resp;
//       this.branchlist.forEach(element => {
//         this.branchlist1.push(element);
//         console.log('branchlist1 : ' + JSON.stringify(this.branchlist1));
//       });
//     }, error => {
//     });
//   }
//   emailnumbaervalid(emailid){

//     const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//    // return re.test(String(email).toLowerCase());
//   //  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//     if (reg.test(emailid) == false)
//     {
//       this.validemail=true;
//     }
//     else{
//       this.validemail=false;
//     }
//   }

//   BranchLocationdata(branchid) {

//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'BranchLocation/' + branchid, {
//       headers: options,
//     }).subscribe(resp => {
//       this.branchlocationlist = JSON.stringify(resp);
//       this.branchlocationlist = JSON.parse(this.branchlocationlist);
//       if (this.branchlocationlist.length == 0) {
//         this.presentAlert('Alert', 'This Branch has no location');
//       }
//       // console.log('branchlocationlist one: ' + JSON.stringify(this.branchlocationlist));

//     }, error => {
//       // this.presentAlert('Alert', 'Server Error, Branch Location not loaded.');
//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   Getproductdata() {
//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'getProduct', {
//       headers: options,
//     }).subscribe(resp => {
//       this.productdataarray = JSON.stringify(resp);
//       this.productdataarray = JSON.parse(this.productdataarray);
//       // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//       this.productdataarray.sort(function (a, b) {
//         const nameA = a.ProductName; // ignore upper and lowercase
//         const nameB = b.ProductName; // ignore upper and lowercase

//         if (nameA < nameB) {
//           return -1;
//         }
//         if (nameA > nameB) {
//           return 1;
//         }

//         // names must be equal
//         return 0;
//       });
//       console.log('productdataarray: ' + JSON.stringify(this.productdataarray));

//     }, error => {

//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   Getsalutation() {
//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'Nametitle', {
//       headers: options,
//     }).subscribe(resp => {
//       this.saluationarray = JSON.stringify(resp);
//       this.saluationarray = JSON.parse(this.saluationarray);
//       console.log('prsaluationarrayoductdataarray: ' + JSON.stringify(this.saluationarray));

//     }, error => {

//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   Getcallpriority() {
//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callpriority', {
//       headers: options,
//     }).subscribe(resp => {
//       this.callpriorityarray = JSON.stringify(resp);
//       this.callpriorityarray = JSON.parse(this.callpriorityarray);
//       console.log('callpriorityarray: ' + JSON.stringify(this.callpriorityarray));

//     }, error => {

//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   Getcallrating() {
//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callrating', {
//       headers: options,
//     }).subscribe(resp => {
//       this.callratingarray = JSON.stringify(resp);
//       this.callratingarray = JSON.parse(this.callratingarray);
//       console.log('callratingarray: ' + JSON.stringify(this.callratingarray));

//     }, error => {

//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   Getcallnature() {
//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callnature', {
//       headers: options,
//     }).subscribe(resp => {
//       this.callnaturearray = JSON.stringify(resp);
//       this.callnaturearray = JSON.parse(this.callnaturearray);
//       console.log('callnaturearray: ' + JSON.stringify(this.callnaturearray));

//     }, error => {

//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   Getcallstage() {
//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'callstage', {
//       headers: options,
//     }).subscribe(resp => {
//       this.callstagearray = JSON.stringify(resp);
//       this.callstagearray = JSON.parse(this.callstagearray);
//       console.log('callstagearray: ' + JSON.stringify(this.callstagearray));

//     }, error => {

//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   Getleadsource() {
//     const header = new Headers();
//     header.append('Content-Type', 'application/json');

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'Leadsource', {
//       headers: options,
//     }).subscribe(resp => {
//       this.leadsourcearray = JSON.stringify(resp);
//       this.leadsourcearray = JSON.parse(this.leadsourcearray);
//       console.log('leadsourcearray: ' + JSON.stringify(this.leadsourcearray));

//     }, error => {

//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   Getnextaction(productdata) {
//     // console.log('productdata ', productdata);

//     var index = this.getIndexIfObjWithOwnAttr(this.productdataarray, 'productID', productdata);
//     this.curr_prod_category = this.productdataarray[index].productCatID;
//     const header = new Headers();
//     header.append("Content-Type", "application/json");

//     const options = new HttpHeaders().set('Content-Type', 'application/json');
//     // /mobileapi/LMS/LMS.svc/customerresponse/

//     this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'customerresponse/' + this.curr_prod_category, {
//       headers: options,
//     }).subscribe(resp => {
//       console.log('testetetetetetete', resp);
//       this.nextactionarray = JSON.stringify(resp);
//       this.nextactionarray = JSON.parse(this.nextactionarray);
//       console.log('nextactionarray: ' + JSON.stringify(this.nextactionarray));
//     }, error => {

//       console.log('branchlist1 : ' + JSON.stringify(error));
//     });
//   }
//   getIndexIfObjWithOwnAttr(array, attr, value) {
//     for (let i = 0; i < array.length; i++) {
//       if (array[i][attr] == value) {
//         return i;
//       }
//     }
//     return -1;
//   }
//   async selectImage() {
//     const self = this;


//     const actionSheet = await this.actionSheetController.create({
//       header: 'Select Image source',
//       buttons: [{
//         text: 'Load from Library',
//         handler: () => {

//           //get current position
//           this.geolocation.getCurrentPosition().then((res) => {

//             this.currentlatlon = res.coords.latitude + ',' + res.coords.longitude;
//             const location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
//             console.log('location :n' + location);
//             this.getGeoencoder1(res.coords.latitude, res.coords.longitude);



//           }).catch((error) => {
//             // this.presentAlert('', 'Turn on location to processed!');
//           });
//         }
//       },
//       {
//         text: 'Use Camera',
//         handler: () => {
//           this.pickImage();
//         }
//       },
//       {
//         text: 'Cancel',
//         role: 'cancel'
//       }
//       ]
//     });
//     await actionSheet.present();
//   }
//   getBase64(file) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//     reader.onload = function () {
//       return reader.result;
//     };
//     // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//     reader.onerror = function (error) {
//       console.log('Error: ', error);
//     };
//   }
//   //geocoder method to fetch address from coordinates passed as arguments
//   getGeoencoder1(latitude, longitude) {
//     const self = this;
//     this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
//       .then((result) => {
//         this.currentlocation = this.generateAddress(result[0]);
//       })
//       .catch((error: any) => {
//         // this.presentAlert('', 'Error getting location');
//       });

//     $('#fileinput').trigger('click');

//     $('#fileinput').unbind().change(function () {
//       // $('#fileinput').on('change', function () {
//       const filePath = $(this).val();
//       console.log(filePath);

//       const str = filePath;

//       // alert("" + str.split("\\").pop())
//       const actualFile = str.split('\\').pop();
//       console.log('actualFile :' + actualFile);
//       // var File_inputvalue =
//       //self.Images.push(actualFile);
//       self.uploadallfilles();

//     });
//   }
//   uploadallfilles() {

//     const self = this;

//     $('#fileinput').trigger('click');

//     const files1 = $('#fileinput').prop('files')[0];

//     console.log(this.getBase64(files1));

//     //  alert("item.DOCUMENTID :"+item.DOCUMENTID+":"+this.fieldname)
//     const fileArray = new Array();
//     // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//     const names = $.map(files1, function (val) {

//       fileArray.push(val);

//       console.log('fileinput :' + val.name + ':' + val.size + ':' + val.type);

//       return val.name;
//     });
//     if (fileArray[4] < 2000000) {
//       const file_name = $('#fileinput').prop('files')[0].name;
//       console.log('filename :' + file_name);
//       const file_name_array = file_name.split('.');
//       const file_format = file_name_array[file_name_array.length - 1];
//       console.log(file_name);
//       console.log('getBase64:' + this.getBase64(files1));
//       const reader = new FileReader();
//       reader.readAsDataURL(files1);
//       // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//       reader.onload = function () {
//         self.Images.push(reader.result);

//       };
//       // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//       reader.onerror = function (error) {
//         console.log('Error: ', error);
//       };
//       const file = $('#fileinput').prop('files')[0];
//       this.file.push($('#fileinput').prop('files')[0]);
//       this.image.push(file_name);
//       // this.Images.push(file_name)
//       // this.uploadingFiledocument();
//     }
//   };
//   omit_special_char(ev) {
//     let elementChecker: string;
//     const format = /^[a-z0-9 ]*$/i;
//     // eslint-disable-next-line prefer-const
//     elementChecker = ev.target.value;
//     console.log(ev.target.value);
//     if (!format.test(elementChecker)) {
//       this.remarks = elementChecker.slice(0, -1);
//     }
//   }
//   pickImage() {

//     //get current position
//     this.geolocation.getCurrentPosition().then((res) => {

//       this.currentlatlon = res.coords.latitude + ',' + res.coords.longitude;
//       const location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
//       console.log('location :n' + location);
//       this.getGeoencoder(res.coords.latitude, res.coords.longitude);
//     }).catch((error) => {
//       // this.presentAlert('', 'Turn on location to processed!');
//     });
//   }
//   //geocoder method to fetch address from coordinates passed as arguments
//   getGeoencoder(latitude, longitude) {

//     this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
//       .then((result) => {
//         this.currentlocation = this.generateAddress(result[0]);
//       })
//       .catch((error: any) => {
//         // this.presentAlert('', 'Error getting location');
//       });
//     this.imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
//     const options: CameraOptions = {
//       quality: 100,
//       destinationType: this.camera.DestinationType.FILE_URI,
//       encodingType: this.camera.EncodingType.JPEG,
//       mediaType: this.camera.MediaType.PICTURE,
//       correctOrientation: true //Corrects Android orientation quirks
//     };

//     this.camera.getPicture(options).then((imageData) => {
//       // imageData is either a base64 encoded string or a file URI
//       // If it's base64:

//       this.crop.crop(imageData, { quality: 100 })
//         .then(
//           newImage => {

//             this.base64.encodeFile(newImage).then((base64File: string) => {
//               const base64result = base64File.split(',')[1];

//               const fileURL = 'data:image/jpeg;base64,' + base64result;

//               this.Images.push(fileURL);

//               this.image.push(this.imagecif + '_Csales.jpg');

//               const file = this.dataURLtoFile(fileURL, this.image);
//               this.file.push(this.dataURLtoFile(fileURL, this.image));

//             }, (err) => {
//               console.log(err);
//             });

//           },
//           error => {
//             console.error('Error cropping image', error);
//           }
//         );

//     }, (err) => {
//       // Handle error
//     });

//   }
//   dataURLtoFile(dataURI, filename) {
//     console.log(dataURI);
//     console.log(filename);

//     const binary = atob(dataURI.split(',')[1]);
//     const array = [];
//     for (let i = 0; i < binary.length; i++) {
//       array.push(binary.charCodeAt(i));
//     }

//     return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
//   };
//   //Return Comma saperated address
//   generateAddress(addressObj) {
//     const obj = [];
//     let address = '';
//     // eslint-disable-next-line guard-for-in
//     for (const key in addressObj) {
//       obj.push(addressObj[key]);
//     }
//     obj.reverse();
//     for (const val in obj) {
//       if (obj[val].length) { address += obj[val] + ', '; }
//     }
//     return address.slice(0, -2);
//   }

//   chooseItem(item: any) {

//     this.geo = item;
//     this.geoCode(this.geo);//convert Address to lat and long
//   }
//   updateSearch() {

//     if (this.autocomplete.query === '') {
//       this.autocompleteItems = [];
//       return;
//     }

//     const me = this;
//     this.service.getPlacePredictions({
//       input: this.autocomplete.query,
//       componentRestrictions: {
//         country: 'de'
//       }
//     }, (predictions, status) => {
//       me.autocompleteItems = [];

//       me.zone.run(() => {
//         if (predictions != null) {
//           predictions.forEach((prediction) => {
//             me.autocompleteItems.push(prediction.description);
//             console.log(prediction);
//           });
//         }
//       });
//     });
//   }
//   geoCode(address: any) {
//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ address }, (results, status) => {
//       this.latitude = results[0].geometry.location.lat();
//       this.longitude = results[0].geometry.location.lng();
//     });
//   }
//   handleAddressChange(event) {
//     this.showmap = false;
//     console.log(event.geometry.location.lat());
//     console.log(event.geometry.location.lng());
//     this.appointmentLatLong = event.geometry.location.lat() + ',' + event.geometry.location.lng();
//     const latLng = new google.maps.LatLng(event.geometry.location.lat(), event.geometry.location.lng());

//     const mapOptions = {
//       center: latLng,
//       zoom: 15,
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       animation: google.maps.Animation.DROP,
//       // position: map.getCenter()
//     };

//     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

//     this.map.setCenter(latLng);
//     this.map.setZoom(16);
//     this.addMarker1(this.map);
//   }
//   addMarker1(map: any) {
//     const marker = new google.maps.Marker({
//       map,
//       animation: google.maps.Animation.DROP,
//       position: map.getCenter()
//     });
//   }
//   DeleteImage(index) {
//     this.Images.splice(index, 1);
//     this.image.splice(index, 1);
//     this.file.splice(index, 1);
//   }
//   Submitretail() {
//     if ((this.branch == '<< Select >>' || this.productdata == '<< Select >>' || this.Salutation == '<< Select >>' || this.firstname == undefined || this.lastname == undefined || this.mobile == undefined || this.email == undefined || this.callpriority == undefined || this.callrating == '<< Select >>' || this.callnature == '<< Select >>' || this.callstage == '<< Select >>' || this.nextaction == '<< Select >>' || this.leadby == '<< Select >>' || this.remarks == undefined) || (this.nextaction == '1' && (this.placetomeet == undefined || this.followtime == undefined || this.followdate == undefined)) || (this.nextaction == '2' && (this.followtime == undefined || this.followdate == undefined)) || (this.leadby == 'E' && (this.Employeeid == undefined)) || (this.leadby == 'C' && (this.custname == undefined)) || (this.leadby == 'P' && (this.leadByval == undefined))) {

//       this.presentAlert('', 'Enter Mandatory Fields');
//     }
//     else {
//       if (this.leadby == 'E') {
//         if (this.show_request == 'Invalid') {
//           this.presentAlert('', 'Enter valid Employee ID');
//           return;
//         }
//       }
//       else if (this.leadby == 'C') {
//         if (this.show_request == 'Invalid') {
//           this.presentAlert('', 'Enter valid Customer Name');
//           return;
//         }
//       }
//       else if (this.leadby === 'P') {
//         if (this.show_request == 'Invalid') {
//           this.presentAlert('', 'Enter valid Lead By Value');
//           return;
//         }
//       }
//       let strTime;
//       // eslint-disable-next-line eqeqeq
//       if (this.followtime != undefined) {
//         const appoint_time = this.followtime.split(':');
//         const hours = appoint_time[0];

//         strTime = hours + '-' + '00';
//       }
//       // console.log(appoint_time);

//       console.log(strTime, 'strTime');
//       if (this.campaign == undefined || this.campaign == '') {
//         this.campaign = 0;
//       }
//       if (this.OffPhone == undefined || this.OffPhone == '') {
//         this.OffPhone = ' ';
//       }
//       if (this.ResPhone == undefined || this.ResPhone == '') {
//         this.ResPhone = ' ';
//       }
//       if (this.source == undefined || this.source == '') {
//         this.source = 0;
//       }
//       if (this.remarks == undefined || this.remarks == '') {
//         this.remarks = null;
//       }
//       //  if(retail.stage == 6 || retail.stage == 1 || retail.stage == 4 || retail.stage == 2 ||retail.stage == 7 || retail.stage == 8)
//       //  {
//       //    retail.closedDate= ' ';
//       //    retail.expectedAmount='';
//       //  }

//       if (this.expectedAmount == undefined || this.expectedAmount == '') {
//         this.expectedAmount = 0;
//       }

//       if (this.leadby == 'S') {
//         this.uservalue = window.localStorage.TUM_USER_ID;
//       }
//       if (this.leadby == 'E' || this.leadby == 'C' || this.leadby == 'P') {
//         this.uservalue = window.localStorage.TUM_USER_ID;
//       }
//       if (this.uservalue == undefined || this.uservalue == '') {
//         this.uservalue = null;
//       }


//       // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//       const rad = function (x) {
//         return x * Math.PI / 180;
//       };

//       this.salutation_name = this.Salutation;

//       if (this.mobile == '0000000000') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '1111111111') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '2222222222') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '3333333333') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '4444444444') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '5555555555') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '6666666666') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '7777777777') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '8888888888') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       } else if (this.mobile == '9999999999') {
//         this.presentAlert('', 'Invalid Contact Number');
//         return;
//       }


//       const date2 = new Date(this.followdate);

//       const day = date2.getDate();
//       const month = date2.getMonth() + 1;
//       const year = date2.getFullYear();
//       // eslint-disable-next-line no-var
//       var appdata = [day, month, year].join('-');

//       const date1 = new Date(this.expdate);
//       const day1 = date1.getDate();
//       const month1 = date1.getMonth() + 1;
//       const year1 = date1.getFullYear();
//       this.closedDate = [day1, month1, year1].join('-');
//       if (this.closedDate == 'NaN-NaN-NaN' || this.closedDate == '') {

//         this.closedDate = ' ';


//       }
//       if (appdata == '' || this.nextaction == 6 || this.nextaction == 5 || this.nextaction == 4 || this.nextaction == 7 || this.nextaction == 8 || this.nextaction == 9) {
//         // eslint-disable-next-line no-var
//         var appdata = ' ';
//         strTime = ' ';
//       }
//       let branchloc;

//       if (this.branchlocation == '<< Select >>') {
//         branchloc = 0;
//       }
//       else {
//         branchloc = this.branchlocation;
//       }

//       let currency;

//       if (this.Currency == '<< Select >>') {
//         currency = 0;
//       }
//       else {
//         currency = this.Currency;
//       }
//       var followdate1;
//       if (appdata == " " || appdata == undefined || appdata == "NaN-NaN-NaN") {
//         followdate1 = "01-01-1990";
//       } else {
//         followdate1 = appdata;
//       }
//       var followtime1;
//       if (strTime == " " || strTime == undefined) {
//         followtime1 = "12-00";
//       } else {
//         followtime1 = strTime;
//       }
//       const data = {
//         functionid: window.localStorage.FUNCTION_ID,
//         userTypeid: window.localStorage.TUM_USER_TYPE,
//         branch_id: window.localStorage.TUM_BRANCH_ID,
//         appointmentDate: appdata,
//         closedDate: this.closedDate,
//         appointmentTime: strTime,
//         campaign: this.campaign,
//         OffPhone: this.OffPhone,
//         ResPhone: this.ResPhone,
//         source: this.source,
//         remarks: this.remarks,
//         expectedAmount: this.expectedAmount,

//         uservalue: this.uservalue,
//         followdate: followdate1,
//         followtime: followtime1,
//         prod_cat: this.curr_prod_category,
//         product_id: this.productdata,
//         salutation_name: this.salutation_name,
//         mobile: this.mobile,
//         firstName: this.firstname,
//         lastName: this.lastname,
//         email_id: this.email,
//         currency,
//         priority: this.callpriority,
//         rating: this.callrating,
//         nature: this.callnature,
//         stage: this.callstage,
//         response: this.nextaction,
//         leadBy: this.leadby,
//         LocationId: branchloc,

//       };
//       const prod_id = parseInt(data.product_id);
//       const camp_id = prod_id + 1;
//       const header = new Headers();
//       header.append('Content-Type', 'application/json');

//       const options = new HttpHeaders().set('Content-Type', 'application/json');
//       // this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'insertlead' + '/' + data.functionid + '/' + data.branch_id + '/' + data.prod_cat + '/' + data.product_id + '/' + camp_id + '/' + data.salutation_name + '.' + data.firstName + '/' + data.lastName + '/' + data.mobile + '/' + data.OffPhone + '/' + data.ResPhone + '/' + data.priority + '/' + data.rating + '/' + data.nature + '/' + data.source + '/' + data.stage + '/' + data.response + '/' + data.appointmentDate + '/' + data.appointmentTime + '/' + data.remarks + '/' + data.closedDate + '/' + data.expectedAmount + '/' + data.leadBy + '/' + data.uservalue + '/' + data.userTypeid + '/' + data.LocationId + '/' + data.email_id + '/' + data.currency + '', {
//       this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'insertlead' + '/?functionid=' + data.functionid + '&BRANCH_ID=' + data.branch_id + '&productcategoryid=' + data.prod_cat + '&productid=' + data.product_id + '&campaignid=' + camp_id + '&customerfname=' + data.firstName + '&customerlname=' + data.lastName + '&mobile=' + data.mobile + '&OfficePhone=' + data.OffPhone + '&ResidencePhone=' + data.ResPhone + '&callpriorityid=' + data.priority + '&callratingid=' + data.rating + '&callnatureid=' + data.nature + '&leadsourceid=' + data.source + '&callstageid=' + data.stage + '&customerresponse=' + data.response + '&NextCallDate=' + data.followdate + '&time=' + data.followtime + '&remarks=' + data.remarks + '&ExpectedClose=' + data.closedDate + '&ExpectedAmount=' + data.expectedAmount + '&Leadby=' + data.leadBy + '&UserID=' + data.uservalue + '&userType=' + data.userTypeid + '&LocationId=' + data.LocationId + '&EmailId=' + data.email_id + '&Currency=' + data.currency + '', {
//         headers: options,
//       }).subscribe(resp => {
//         console.log('mobileapi : ' + JSON.stringify(resp));

//         console.log(resp);
//         this.result = JSON.stringify(resp);
//         this.result = JSON.parse(this.result);
//         //  console.log(this.result);
//         // $('#submit_retail').attr('disabled',false);
//         if (resp.toString() == '"CampaignBranchaccess Not found"') {
//           this.presentAlert('Alert', 'Branch access restricted for this campaign');

//         }
//         else {
//           const resultstrarray = this.result;
//           let lead_id_new = resultstrarray[4];
//           lead_id_new = parseInt(lead_id_new);

//           this.lead_id = lead_id_new;
//           if (this.appointmentLatLong == undefined || this.appointmentLatLong == '') {
//             this.appointmentLatLong = null;
//           }



//           const obj = {
//             'LeadID': parseInt(lead_id_new),
//             // LatLong: this.appointmentLatLong,
//             'LatLong': this.appointmentLatLong,
//             'Address': this.placetomeet,
//             access_token: window.localStorage.token,
//             userid: parseInt(window.localStorage.TUM_USER_ID),
//             'usertoken': window.localStorage.usertoken,
//             USER_ID: parseInt(window.localStorage.TUM_USER_ID)
//           };
//           console.log(obj);



//           const update_meeting_locationJSON = obj;
//           // eslint-disable-next-line @typescript-eslint/no-shadow
//           const header = new Headers();
//           header.append('Content-Type', 'application/json');

//           // eslint-disable-next-line @typescript-eslint/no-shadow
//           const options = new HttpHeaders().set('Content-Type', 'application/json');

//           this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'update_meeting_location', update_meeting_locationJSON, {
//             headers: options,
//             // eslint-disable-next-line @typescript-eslint/no-shadow
//           }).subscribe(resp => {
//             this.appointmentLatLong = null;
//           }, error => {

//             console.log('error : ' + JSON.stringify(error));

//           });

//           if (this.Images.length != 0 || this.Images != undefined) {
//             if (this.currentlatlon == '' || this.currentlatlon == undefined) {

//             } else {

//               const passCurrent_locationJSON = {
//                 latlong: parseInt(this.currentlatlon),
//                 CustId: this.lead_id,
//                 access_token: window.localStorage.token,
//                 userid: window.localStorage.TUM_USER_ID,
//                 usertoken: window.localStorage.usertoken,
//                 USER_ID: window.localStorage.TUM_USER_ID
//               };
//               // eslint-disable-next-line @typescript-eslint/no-shadow
//               const header = new Headers();
//               header.append('Content-Type', 'application/json');

//               const options = new HttpHeaders().set('Content-Type', 'application/json');
//               this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'pass_current_loc', passCurrent_locationJSON, {
//                 headers: options,
//               }).subscribe(resp => {
//                 console.log('pass_current_loc' + JSON.stringify(resp));

//               }, error => {


//                 console.log('Location not updated' + JSON.stringify(error));


//               });

//               for (let i = 0; i < this.file.length; i++) {

//                 console.log(this.file[i]);
//                 // var url = this.Ipaddressservice.ipaddress + '/dms/uploadfileSalesPhoto';
//                 const url = this.Ipaddressservice.ipaddress + '/los/uploadfile';
//                 const formData: any = new FormData();
//                 formData.append('upload', this.file[i], this.image[i]);

//                 console.log('form data variable :   ' + formData.toString());
//                 this.http.post(url, formData)

//                   .subscribe(files => console.log('files', files));

//                 const objupload = {
//                   pk1: parseInt(this.lead_id),
//                   doc_name: this.image[i],
//                   doc_desc: this.remarks,
//                   doc_path: 'https://demo.herbieai.com/Testntiremydesk/Uploaddocu/SSTPL/' + this.image[i],
//                   uploaded_by: window.localStorage.TUM_USER_ID,
//                   FUNCTION_ID: window.localStorage.FUNCTION_ID,
//                   file_size: this.file[i].size,
//                   access_token: window.localStorage.token,
//                   userid: parseInt(window.localStorage.TUM_USER_ID),
//                   usertoken: window.localStorage.usertoken,
//                   USER_ID: parseInt(window.localStorage.TUM_USER_ID)
//                 };

//                 //D:/Application/Base Product/nTireOfficeTesting/nTireOffice/Uploaddocu/SSTPL/
//                 console.log(objupload);
//                 const uploadJSON = objupload;
//                 const header1 = new Headers();
//                 header1.append('Content-Type', 'application/json');

//                 const options1 = new HttpHeaders().set('Content-Type', 'application/json');
//                 this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'uploadimageforsales', uploadJSON, {
//                   headers: options1,
//                 }).subscribe(resp => {
//                   console.log('uploadimageforsales' + JSON.stringify(resp));
//                 }, error => {
//                   console.log('uploadimagefor error' + JSON.stringify(error));

//                 });

//               }
//             }
//           }

//           if (this.result == 'Product Not Configured') {

//             this.presentAlertConfirm('Alert', this.result);
//           }
//           else if (this.result == 'product not configured') {
//             this.presentAlertConfirm('Alert', this.result);
//           }
//           else {
//             this.presentAlertConfirm('Success Alert', this.result);
//           }
//         }
//       }, error => {
//         console.log('error : ' + JSON.stringify(error));
//       });
//     }
//   }
//   async Cancelretail() {
//     if ((this.branch == '<< Select >>' && this.branchlocation == '<< Select >>' && this.productdata == '<< Select >>' && this.Salutation == '<< Select >>' && this.firstname == undefined || this.lastname == undefined && this.mobile == undefined && this.callpriority == undefined && this.callrating == '<< Select >>' && this.callnature == '<< Select >>' && this.callstage == '<< Select >>' && this.nextaction == '<< Select >>' && this.leadby == '<< Select >>' && this.Currency == '<< Select >>' && this.email == undefined && this.remarks == undefined)) {

//     }
//     else {
//       const alert = await this.alertController.create({
//         header: 'Confirm',
//         message: 'Are you sure want to Cancel the Process',
//         backdropDismiss: false,
//         buttons: [
//           {
//             text: 'No',
//             role: 'cancel',
//             cssClass: 'secondary',
//             handler: (blah) => {
//               console.log('Confirm Cancel: blah');
//             }
//           }, {
//             text: 'Yes',
//             handler: () => {
//               this.branch = '<< Select >>';
//               this.branchlocation = '<< Select >>';
//               this.productdata = '<< Select >>';
//               this.nextaction = '<< Select >>';
//               this.Salutation = '<< Select >>';
//               this.Currency ='<< Select >>';
//               this.email = undefined;
//               this.firstname = undefined;
//               this.lastname = undefined;
//               this.mobile = undefined;
//               this.OffPhone = undefined;
//               this.ResPhone = undefined;
//               this.callpriority = 1;
//               this.callstage = 1;
//               this.callrating = 1;
//               this.callnature = 1;
//               this.leadssource = 1;
//               this.leadby = 'S';
//               this.followdate = undefined;
//               this.followtime = undefined;
//               this.placetomeet = undefined;
//               this.Employeeid = undefined;
//               this.custname = undefined;
//               this.leadByval = undefined;
//               this.expdate = undefined;
//               this.expectedAmount = undefined;
//               this.Images = [];
//               this.currentlocation = undefined;
//               this.remarks = undefined;

//             }
//           }
//         ]
//       });

//       await alert.present();
//     }
//   }
//   async presentAlertConfirm(heading, tittle) {
//     const alert = await this.alertController.create({
//       header: heading,
//       cssClass: 'buttonCss',
//       backdropDismiss: false,
//       message: tittle,
//       buttons: [
//         {
//           text: 'OK',
//           handler: () => {
//             this.branch = '<< Select >>';
//             this.branchlocation = '<< Select >>';
//             this.productdata = '<< Select >>';
//             this.nextaction = '<< Select >>';
//             this.Salutation = '<< Select >>';
//             this.firstname = undefined;
//             this.lastname = undefined;
//             this.mobile = undefined;
//             this.OffPhone = undefined;
//             this.ResPhone = undefined;
//             this.callpriority = 1;
//             this.callstage = 1;
//             this.callrating = 1;
//             this.callnature = 1;
//             this.leadssource = 1;
//             this.leadby = 'S';
//             this.followdate = undefined;
//             this.followtime = undefined;
//             this.placetomeet = undefined;
//             this.Employeeid = undefined;
//             this.custname = undefined;
//             this.leadByval = undefined;
//             this.expdate = undefined;
//             this.expectedAmount = undefined;
//             this.Images = [];
//             this.currentlocation = undefined;
//             this.remarks = undefined;
//             this.showmap = true;

//           }
//         }
//       ]
//     });

//     await alert.present();
//   }
//   timeValidation(val) {

//     const element = val;
//     // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
//     const compare_dates = function (date1, date2) {
//       if (date1 > date2) { return true; }
//       else if (date1 < date2) { return false; }
//       else { return false; }
//     };
//     console.log('chck ' + new Date(this.followdate + ' ' + element));

//     if (compare_dates(new Date(this.followdate + ' ' + element), new Date()) != true) {

//       alert('Time should not be past');
//       this.followtime = undefined;

//     }
//   }
//   async presentAlert(heading, tittle) {
//     const alert = await this.alertController.create({
//       header: heading,
//       cssClass: 'buttonCss',
//       backdropDismiss: false,
//       message: tittle,
//       buttons: ['OK']
//     });
//     await alert.present();
//   }
//   valid_UserNumber(ev, leadvalue) {
//     this.show_request = '';
//     const uservalue = ev.target.value;
//     if (leadvalue == 'E') {
//       const header = new Headers();
//       header.append('Content-Type', 'application/json');
//       const options = new HttpHeaders().set('Content-Type', 'application/json');
//       this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'GetEmployee/' + uservalue, {
//         headers: options,
//       }).subscribe(resp => {
//         this.uservalid = resp;
//         console.log(this.uservalid);


//         if (this.uservalid == 'Invalid') {
//           this.show_request = 'Invalid';
//           this.show_color = ' assertive';
//         }
//         else {
//           this.userid = this.uservalid;
//           //this.userid = this.userid[0].ID;
//           this.userid = this.userid.usercode;
//           console.log(this.userid);
//           this.show_request = 'valid';
//           this.show_color = 'balanced';
//         }
//       }, error => {


//       });

//     }
//     else if (leadvalue == 'C') {
//       const header = new Headers();
//       header.append('Content-Type', 'application/json');
//       const options = new HttpHeaders().set('Content-Type', 'application/json');
//       this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'GetCustomer/' + uservalue, {
//         headers: options,
//       }).subscribe(resp => {
//         this.uservalid = resp;
//         console.log(this.uservalid);


//         if (this.uservalid == 'Invalid') {
//           this.show_request = 'Invalid';
//           this.show_color = ' assertive';
//         }
//         else {
//           this.userid = this.uservalid;
//           this.userid = this.userid.ID;
//           //this.userid = this.userid[0].em_emp_id;
//           console.log(this.userid);
//           this.show_request = 'valid';
//           this.show_color = 'balanced';
//         }
//       }, error => {

//       });

//     }

//     else {
//       const header = new Headers();
//       header.append('Content-Type', 'application/json');
//       const options = new HttpHeaders().set('Content-Type', 'application/json');
//       this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurl + 'GetPartner/' + uservalue, {
//         headers: options,
//       }).subscribe(resp => {
//         this.uservalid = resp;
//         console.log(this.uservalid);


//         if (this.uservalid == 'Invalid') {
//           this.show_request = 'Invalid';
//           this.show_color = ' assertive';
//         }
//         else {
//           this.userid = this.uservalid;
//           //this.userid = this.userid[0].ID;
//           this.userid = this.userid.em_emp_id;
//           console.log(this.userid);
//           this.show_request = 'valid';
//           this.show_color = 'balanced';
//         }
//       }, error => {
//       });
//     }
//   }
//   numberOnlyValidation(event: any) {

//     console.log('check value' + event.key + ':' + this.exampleText);
//     this.specialKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
//     const examp = ['Unidentified'];

//     if (examp.indexOf(event.key) !== -1) {
//       console.log('this.mobile.length :' + this.mobile.length);
//       if (this.mobile.length > 1 && this.exampleText != '' && this.exampleText.length != 0) {

//         const newStr = this.exampleText.substring(0, this.exampleText.length - 1);

//         this.exampleText = newStr;

//       }
//       if (this.mobile.length == 0) {
//         this.exampleText = '';
//       }
//     }
//     else if (this.specialKeys.indexOf(event.key) == -1) {
//       console.log('error');
//       this.mobile = ''; //cleartextbox

//     } else {
//       this.exampleText = this.exampleText + event.key;
//     }
//     this.mobile = this.exampleText; //set ur textbox
//   }
//   offnumberOnlyValidation(event: any) {
//     this.specialKeys = ['@', '-', '_', '!', '#', '$', '%', '^', '&', '*', '(', ')', '?', '.', '>', '<', '|'];
//     console.log('' + this.specialKeys.indexOf(event.key));
//     if (this.specialKeys.indexOf(event.key) != -1) {
//       alert('Special Characters Are Not Allowed');
//       this.remarks = undefined; //cleartextbox
//     }
//   }
//   resnumberOnlyValidation(event: any) {

//     console.log('check value' + event.key + ':' + this.exampleTextRes);
//     this.specialKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
//     const examp = ['Unidentified'];

//     if (examp.indexOf(event.key) !== -1) {
//       console.log('this.mobile.length :' + this.ResPhone.length);
//       if (this.ResPhone.length > 1 && this.exampleTextRes != '' && this.exampleTextRes.length != 0) {

//         const newStr = this.exampleTextRes.substring(0, this.exampleTextRes.length - 1);

//         this.exampleTextRes = newStr;

//       }
//       if (this.ResPhone.length == 0) {
//         this.exampleTextRes = '';
//       }
//     }
//     else if (this.specialKeys.indexOf(event.key) == -1) {
//       console.log('error');
//       this.ResPhone = ''; //cleartextbox

//     } else {
//       this.exampleTextRes = this.exampleTextRes + event.key;
//     }
//     this.ResPhone = this.exampleTextRes; //set ur textbox
//   }
// }

export class NewleadRetailPage implements OnInit {

  exampleText: any;
  uservalid;
  show_request;
  show_color;
  userid;
  retailbtn: boolean;
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
  mobile: any;
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
  specialKeys = [];
  exampleTextRes;
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
  curr_prod_category;
  exampleTextoff;
  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true //Corrects Android orientation quirks
  };
  products: any;
  email: any;
  Currency: any;
  inputall_imagesdoc = [];
  inputall_images = [];
  validemail: boolean;
  constructor(public actionSheetController: ActionSheetController, private datePipe: DatePipe, public sanitizer: DomSanitizer, public alertController: AlertController, private crop: Crop, private base64: Base64, private camera: Camera, private zone: NgZone, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.exampleText = "";
    this.exampleTextoff = "";
    this.exampleTextRes = "";
    this.showmap = true;
    this.function = localStorage.getItem('FUNCTION_DESC');
    // this.branch = parseInt(localStorage.getItem('TUM_BRANCH_ID'));
    this.branch = "<< Select >>";
    this.BranchLocationdata(this.branch);
    this.branchlocation = "<< Select >>";
    this.productdata = "<< Select >>";
    this.nextaction = "<< Select >>";
    this.nextaction = "<< Select >>";
    this.Currency = "<< Select >>";

    this.callpriority = 1;
    this.callstage = 1;
    this.callrating = 1;
    this.callnature = 1;
    this.leadssource = 1;
    this.leadby = "S";
    this.source = 1;



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
  dat_valid = {
    currentDate: new Date()
  };
  ngOnInit(): any {

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
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getBranchAccess/', params, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = resp;
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'BranchLocation/' + branchid, {
      headers: options,
    }).subscribe(resp => {

      this.branchlocationlist = JSON.stringify(resp);
      this.branchlocationlist = JSON.parse(this.branchlocationlist);
      if (this.branchlocationlist.length == 0) {
        this.presentAlert('Alert', 'This Branch has no location');
      }
      console.log("branchlocationlist one: " + JSON.stringify(this.branchlocationlist));

    }, error => {
      // this.presentAlert('Alert', 'Server Error, Branch Location not loaded.');
      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }

  Getproductdata() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'getProduct', {
      headers: options,
    }).subscribe(resp => {

      // this.productdataarray = JSON.parse(resp.toString());
      this.productdataarray = JSON.stringify(resp);
      this.productdataarray = JSON.parse(this.productdataarray);
      this.productdataarray.sort(function (a, b) {
        var nameA = a.ProductName; // ignore upper and lowercase
        var nameB = b.ProductName; // ignore upper and lowercase

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'callpriority', {
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'callrating', {
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'callnature', {
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'callstage', {
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
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'Leadsource', {
      headers: options,
    }).subscribe(resp => {

      this.leadsourcearray = JSON.stringify(resp);
      this.leadsourcearray = JSON.parse(this.leadsourcearray);
      console.log("leadsourcearray: " + JSON.stringify(this.leadsourcearray));

    }, error => {

      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
  Getnextaction(productdata) {

    var index = this.getIndexIfObjWithOwnAttr(this.productdataarray, 'productID', productdata);
    this.curr_prod_category = this.productdataarray[index].productCatID;
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'customerresponse/' + this.curr_prod_category, {
      headers: options,
    }).subscribe(resp => {

      this.nextactionarray = JSON.stringify(resp);
      this.nextactionarray = JSON.parse(this.nextactionarray);
      console.log("nextactionarray: " + JSON.stringify(this.nextactionarray));

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
  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder1(latitude, longitude) {
    var self = this;
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result) => {
        this.currentlocation = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        // this.presentAlert('', 'Error getting location');
      });

    $('#fileinput').trigger('click');

    $('#fileinput').unbind().change(function () {
      // $('#fileinput').on('change', function () {
      var filePath = $(this).val();
      console.log(filePath);

      var str = filePath;

      // alert("" + str.split("\\").pop())
      var actualFile = str.split("\\").pop();
      console.log("actualFile :" + actualFile);
      // var File_inputvalue =
      //self.Images.push(actualFile);
      self.uploadallfilles();

    });


  }
  uploadallfilles() {

    let self = this;

    $('#fileinput').trigger('click');

    var files1 = $('#fileinput').prop("files")[0];

    console.log(this.getBase64(files1));

    //  alert("item.DOCUMENTID :"+item.DOCUMENTID+":"+this.fieldname)
    var fileArray = new Array();
    var names = $.map(files1, function (val) {

      fileArray.push(val);

      console.log("fileinput :" + val.name + ":" + val.size + ":" + val.type);

      return val.name;
    });
    if (fileArray[4] < 2000000) {
      var file_name = $('#fileinput').prop("files")[0].name;
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
      const file = $('#fileinput').prop("files")[0];
      this.file.push($('#fileinput').prop("files")[0]);
      this.image.push(file_name);
      // this.Images.push(file_name)


      // this.uploadingFiledocument();


    }
  };
  omit_special_char(ev) {
    let elementChecker: string;
    let format = /^[a-z0-9 ]*$/i;
    elementChecker = ev.target.value;
    console.log(ev.target.value);
    if (!format.test(elementChecker)) {
      this.remarks = elementChecker.slice(0, -1);
    }
  }
  pickImage() {

    //get current position
    this.geolocation.getCurrentPosition().then((res) => {

      this.currentlatlon = res.coords.latitude + "," + res.coords.longitude;
      let location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
      console.log("location :n" + location);
      this.getGeoencoder(res.coords.latitude, res.coords.longitude);



    }).catch((error) => {
      // this.presentAlert('', 'Turn on location to processed!');
    });
  }
  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {

    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result) => {
        this.currentlocation = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        // this.presentAlert('', 'Error getting location');
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
    this.image.splice(index, 1);

    this.file.splice(index, 1);
  }

  Submitretail() {
    debugger;
    if ((this.branch == '<< Select >>' || this.productdata == '<< Select >>' || this.Salutation == '<< Select >>' || this.firstname == undefined || this.lastname == undefined || this.mobile == undefined || this.email == undefined || this.callpriority == undefined || this.callrating == '<< Select >>' || this.callnature == '<< Select >>' || this.callstage == '<< Select >>' || this.nextaction == '<< Select >>' || this.leadby == '<< Select >>' || this.remarks == undefined) || (this.nextaction == '1' && (this.placetomeet == undefined || this.followtime == undefined || this.followdate == undefined)) || (this.nextaction == '2' && (this.followtime == undefined || this.followdate == undefined)) || (this.leadby == 'E' && (this.Employeeid == undefined)) || (this.leadby == 'C' && (this.custname == undefined)) || (this.leadby == 'P' && (this.leadByval == undefined))) {

      this.presentAlert('', 'Enter Mandatory Fields');
    }
    else {
      if (this.leadby == 'E') {
        if (this.show_request == 'Invalid') {
          this.presentAlert('', 'Enter valid Employee ID');
          return;
        }
      }
      else if (this.leadby == 'C') {
        if (this.show_request == 'Invalid') {
          this.presentAlert('', 'Enter valid Customer Name');
          return;
        }
      }
      else if (this.leadby == 'P') {
        if (this.show_request == 'Invalid') {
          this.presentAlert('', 'Enter valid Lead By Value');
          return;
        }
      }
      var strTime;
      if (this.followtime != undefined) {
        var appoint_time = this.followtime.split(":");
        var hours = appoint_time[0];

        strTime = hours + '-' + '00';
      }
      // console.log(appoint_time);

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
      //  if(retail.stage == 6 || retail.stage == 1 || retail.stage == 4 || retail.stage == 2 ||retail.stage == 7 || retail.stage == 8)
      //  {
      //    retail.closedDate= ' ';
      //    retail.expectedAmount='';
      //  }

      if (this.expectedAmount == undefined || this.expectedAmount == '') {
        this.expectedAmount = 0;
      }

      if (this.leadby == 'S') {
        this.uservalue = window.localStorage['TUM_USER_ID'];
      }
      if (this.leadby == 'E' || this.leadby == 'C' || this.leadby == 'P') {
        this.uservalue = window.localStorage['TUM_USER_ID'];
      }
      if (this.uservalue == undefined || this.uservalue == '') {
        this.uservalue = null;
      }


      var rad = function (x) {
        return x * Math.PI / 180;
      };

      this.salutation_name = this.Salutation;

      if (this.mobile == '0000000000') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '1111111111') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '2222222222') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '3333333333') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '4444444444') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '5555555555') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '6666666666') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '7777777777') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '8888888888') {
        this.presentAlert('', 'Invalid Contact Number');
        return;
      } else if (this.mobile == '9999999999') {
        this.presentAlert('', 'Invalid Contact Number');
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
      if (this.nextaction == 6 || this.nextaction == 5 || this.nextaction == 4 || this.nextaction == 7 || this.nextaction == 8 || this.nextaction == 9) {
        var appdata = ' ';
        strTime = ' ';
      }
      var branchloc;

      if (this.branchlocation == "<< Select >>") {
        branchloc = 0;
      }
      else {
        branchloc = this.branchlocation;
      }

      var currency;

      if (this.Currency == "<< Select >>") {
        currency = 0;
      }
      else {
        currency = this.Currency;
      }

      var followdate1;
      if (this.followdate == null || this.followdate == undefined) {
        followdate1 = "01-01-1990";
      } else {
        followdate1 = this.followdate;
      }

      var followtime1;
      if (this.followtime == null || this.followtime == undefined) {
        followtime1 = "12-00";
      } else {
        followtime1 = this.followtime;
      }
      var data = {
        functionid: parseInt(window.localStorage["FUNCTION_ID"]),
        userTypeid: window.localStorage['TUM_USER_TYPE'],
        branchid: parseInt(window.localStorage['TUM_BRANCH_ID']),
        appointmentDate: appdata,
        closedDate: this.closedDate,
        appointmentTime: strTime,
        campaign: this.campaign,
        OffPhone: this.OffPhone,
        ResPhone: this.ResPhone,
        source: this.source,
        remarks: this.remarks,
        expectedAmount: this.expectedAmount,

        uservalue: this.uservalue,
        followdate: followdate1,
        followtime: followtime1,
        prod_cat: this.curr_prod_category,
        product_id: this.productdata,
        salutation_name: this.salutation_name,
        mobile: this.mobile,
        firstName: this.firstname,
        lastName: this.lastname,
        email_id: this.email,
        currency: currency,
        priority: this.callpriority,
        rating: this.callrating,
        nature: this.callnature,
        stage: this.callstage,
        response: this.nextaction,
        leadBy: this.leadby,
        LocationId: branchloc,

      };
      var prod_id = parseInt(data.product_id);
      var camp_id = prod_id + 1;
      const header = new Headers();
      header.append("Content-Type", "application/json");

      let options = new HttpHeaders().set('Content-Type', 'application/json');
      debugger;
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'insertlead' + '/?functionid=' + data.functionid + '&BRANCH_ID=' + data.branchid + '&productcategoryid=' + data.prod_cat + '&productid=' + data.product_id + '&campaignid=' + camp_id + '&customerfname=' + data.firstName + '&customerlname=' + data.lastName + '&mobile=' + data.mobile + '&OfficePhone=' + data.OffPhone + '&ResidencePhone=' + data.ResPhone + '&callpriorityid=' + data.priority + '&callratingid=' + data.rating + '&callnatureid=' + data.nature + '&leadsourceid=' + data.source + '&callstageid=' + data.stage + '&customerresponse=' + data.response + '&NextCallDate=' + data.followdate + '&time=' + data.followtime + '&remarks=' + data.remarks + '&ExpectedClose=' + data.closedDate + '&ExpectedAmount=' + data.expectedAmount + '&Leadby=' + data.leadBy + '&UserID=' + data.uservalue + '&userType=' + data.userTypeid + '&LocationId=' + data.LocationId + '&EmailId=' + data.email_id + '&Currency=' + data.currency + '', {
        headers: options,
      }).subscribe(resp => {
        console.log("mobileapi : " + JSON.stringify(resp));
        localStorage.setItem("customerRes", data.response);

        console.log(resp);
        this.result = JSON.stringify(resp);
        this.result = JSON.parse(this.result);
        //  console.log(this.result);
        // $('#submit_retail').attr('disabled',false);
        if (resp.toString() == '"CampaignBranchaccess Not found"') {
          this.presentAlert('Alert', 'Branch access restricted for this campaign');

        }
        else {
          var resultstrarray = this.result.split(" ");
          var lead_id_new = resultstrarray[4];
          lead_id_new = parseInt(lead_id_new);

          this.lead_id = lead_id_new;
          if (this.appointmentLatLong == undefined || this.appointmentLatLong == '') {
            this.appointmentLatLong = null;
          }



          var obj = {
            'LeadID': lead_id_new,
            //  'LatLong': this.appointmentLatLong,
            'LatLong': 0,
            'Address': this.placetomeet,
            access_token: window.localStorage['token'],
            userid: parseInt(window.localStorage['TUM_USER_ID']),
            'usertoken': window.localStorage['usertoken'],
            USER_ID: parseInt(window.localStorage['TUM_USER_ID'])
          };
          console.log(obj);



          var update_meeting_locationJSON = obj;
          const header = new Headers();
          header.append("Content-Type", "application/json");

          let options = new HttpHeaders().set('Content-Type', 'application/json');

          this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'update_meeting_location', update_meeting_locationJSON, {
            headers: options,
          }).subscribe(resp => {
            this.appointmentLatLong = null;
          }, error => {

            console.log("error : " + JSON.stringify(error));

          });

          if (this.Images.length != 0 || this.Images != undefined) {
            if (this.currentlatlon == '' || this.currentlatlon == undefined) {

            } else {

              var passCurrent_locationJSON = {
                // latlong: this.currentlatlon,
                latlong: 0,
                custid: parseInt(this.lead_id),
                access_token: window.localStorage['token'],
                userid: parseInt(window.localStorage['TUM_USER_ID']),
                'usertoken': window.localStorage['usertoken'],
                USER_ID: parseInt(window.localStorage['TUM_USER_ID'])
              };
              const header = new Headers();
              header.append("Content-Type", "application/json");

              let options = new HttpHeaders().set('Content-Type', 'application/json');
              this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'pass_current_loc', passCurrent_locationJSON, {
                headers: options,
              }).subscribe(resp => {
                console.log("pass_current_loc" + JSON.stringify(resp));

              }, error => {


                console.log("Location not updated" + JSON.stringify(error));


              });

              for (var i = 0; i < this.file.length; i++) {

                console.log(this.file[i]);
                // var url = this.Ipaddressservice.ipaddress + '/dms/uploadfileSalesPhoto';
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
                  'doc_path': "https://demo.herbieai.com/Testntiremydesk/Uploaddocu/SSTPL/" + this.image[i],
                  'uploaded_by': window.localStorage['TUM_USER_ID'],
                  'FUNCTION_ID': parseInt(window.localStorage['FUNCTION_ID']),
                  'file_size': this.file[i].size,
                  access_token: window.localStorage['token'],
                  userid: parseInt(window.localStorage['TUM_USER_ID']),
                  'usertoken': window.localStorage['usertoken'],
                  USER_ID: parseInt(window.localStorage['TUM_USER_ID'])
                };

                //D:/Application/Base Product/nTireOfficeTesting/nTireOffice/Uploaddocu/SSTPL/
                console.log(objupload);
                var uploadJSON = objupload;
                const header1 = new Headers();
                header1.append("Content-Type", "application/json");

                let options1 = new HttpHeaders().set('Content-Type', 'application/json');
                this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'uploadimageforsales', uploadJSON, {
                  headers: options1,
                }).subscribe(resp => {
                  console.log("uploadimageforsales" + JSON.stringify(resp));
                }, error => {
                  console.log("uploadimagefor error" + JSON.stringify(error));

                });

              }
            }
          }

          if (this.result == "Product Not Configured") {

            this.presentAlertConfirm('Alert', this.result);
          }
          else if (this.result == "product not configured") {
            this.presentAlertConfirm('Alert', this.result);
          }
          else {
            this.presentAlertConfirm('Success Alert', this.result);
          }


        }
      }, error => {

        console.log("error : " + JSON.stringify(error));

      });
    }
  }
  async Cancelretail() {
    console.log('click check');

    // if ((this.branch == '<< Select >>' && this.branchlocation == '<< Select >>' && this.productdata == '<< Select >>' && this.Salutation == '<< Select >>' && this.firstname == undefined || this.lastname == undefined && this.mobile == undefined && this.callpriority == undefined && this.callrating == '<< Select >>' && this.callnature == '<< Select >>' && this.callstage == '<< Select >>' && this.nextaction == '<< Select >>' && this.leadby == '<< Select >>' && this.remarks == undefined)) {

    // }
    // else {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Cancel the Process',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          role: 'no',
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
            this.Currency = "<< Select >>";
            this.email = undefined;
            this.Salutation = "<< Select >>";
            this.firstname = undefined;
            this.lastname = undefined;
            this.mobile = undefined;
            this.OffPhone = undefined;
            this.ResPhone = undefined;
            this.callpriority = 1;
            this.callstage = 1;
            this.callrating = 1;
            this.callnature = 1;
            this.leadssource = 1;
            this.leadby = "S";
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

          }
        }
      ]
    });

    await alert.present();
    // }
  }
  async presentAlertConfirm(heading, tittle) {
    const alert = await this.alertController.create({
      header: heading,
      message: tittle,
      // cssClass: 'buttonCss',
      backdropDismiss: false,
      cssClass: 'Cssbutton',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.branch = "<< Select >>";
            this.branchlocation = "<< Select >>";
            this.productdata = "<< Select >>";
            this.nextaction = "<< Select >>";
            this.Salutation = "<< Select >>";
            this.firstname = undefined;
            this.lastname = undefined;
            this.mobile = undefined;
            this.OffPhone = undefined;
            this.ResPhone = undefined;
            this.callpriority = 1;
            this.callstage = 1;
            this.callrating = 1;
            this.callnature = 1;
            this.leadssource = 1;
            this.leadby = "S";
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
      this.followtime = undefined;

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

  valid_UserNumber(ev, leadvalue) {
    this.show_request = "";
    var uservalue = ev.target.value;
    if (leadvalue == 'E') {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'GetEmployee/' + uservalue, {
        headers: options,
      }).subscribe(resp => {
        this.uservalid = resp;
        console.log(this.uservalid);


        if (this.uservalid == 'Invalid') {
          this.show_request = "Invalid";
          this.show_color = " assertive";
        }
        else {
          this.userid = JSON.parse(this.uservalid);
          //this.userid = this.userid[0].ID;
          this.userid = this.userid[0].em_emp_id;
          console.log(this.userid);
          this.show_request = "valid";
          this.show_color = "balanced";
        }
      }, error => {


      });

    }
    else if (leadvalue == 'C') {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'GetCustomer/' + uservalue, {
        headers: options,
      }).subscribe(resp => {
        this.uservalid = resp;
        console.log(this.uservalid);


        if (this.uservalid == 'Invalid') {
          this.show_request = "Invalid";
          this.show_color = " assertive";
        }
        else {
          this.userid = JSON.parse(this.uservalid);
          this.userid = this.userid[0].ID;
          //this.userid = this.userid[0].em_emp_id;
          console.log(this.userid);
          this.show_request = "valid";
          this.show_color = "balanced";
        }
      }, error => {

      });

    }

    else {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.insertserviceurl + 'GetPartner/' + uservalue, {
        headers: options,
      }).subscribe(resp => {
        this.uservalid = resp;
        console.log(this.uservalid);


        if (this.uservalid == 'Invalid') {
          this.show_request = "Invalid";
          this.show_color = " assertive";
        }
        else {
          this.userid = JSON.parse(this.uservalid);
          //this.userid = this.userid[0].ID;
          this.userid = this.userid[0].em_emp_id;
          console.log(this.userid);
          this.show_request = "valid";
          this.show_color = "balanced";
        }
      }, error => {

      });

    }
  }

  // numberOnlyValidation(event: any) {
  //  this.specialKeys=[".","+","_","-"];
  //  if (this.specialKeys.indexOf(event.key) !== -1) {
  //   console.log("error");
  //   return;
  //   }else{
  //     console.log("success");
  //   }
  //   event.preventDefault();
  // }



  numberOnlyValidation(event: any) {

    console.log("check value" + event.key + ":" + this.exampleText);
    this.specialKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    var examp = ["Unidentified"];

    if (examp.indexOf(event.key) !== -1) {
      console.log("this.mobile.length :" + this.mobile.length);
      if (this.mobile.length > 1 && this.exampleText != '' && this.exampleText.length != 0) {

        var newStr = this.exampleText.substring(0, this.exampleText.length - 1);

        this.exampleText = newStr;

      }
      if (this.mobile.length == 0) {
        this.exampleText = '';
      }
    }
    else if (this.specialKeys.indexOf(event.key) == -1) {
      console.log("error");
      this.mobile = ''; //cleartextbox

    } else {
      this.exampleText = this.exampleText + event.key;
    }
    this.mobile = this.exampleText; //set ur textbox
  }

  offnumberOnlyValidation(event: any) {

    this.specialKeys = ["@", "-", "_", "!", "#", "$", "%", "^", "&", "*", "(", ")", "?", ".", ">", "<", "|"];
    console.log('' + this.specialKeys.indexOf(event.key));
    if (this.specialKeys.indexOf(event.key) != -1) {
      alert('Special Characters Are Not Allowed');
      this.remarks = undefined; //cleartextbox

    }
  }

  resnumberOnlyValidation(event: any) {

    console.log("check value" + event.key + ":" + this.exampleTextRes);
    this.specialKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    var examp = ["Unidentified"];

    if (examp.indexOf(event.key) !== -1) {
      console.log("this.mobile.length :" + this.ResPhone.length);
      if (this.ResPhone.length > 1 && this.exampleTextRes != '' && this.exampleTextRes.length != 0) {

        var newStr = this.exampleTextRes.substring(0, this.exampleTextRes.length - 1);

        this.exampleTextRes = newStr;

      }
      if (this.ResPhone.length == 0) {
        this.exampleTextRes = '';
      }
    }
    else if (this.specialKeys.indexOf(event.key) == -1) {
      console.log("error");
      this.ResPhone = ''; //cleartextbox

    } else {
      this.exampleTextRes = this.exampleTextRes + event.key;
    }
    this.ResPhone = this.exampleTextRes; //set ur textbox
  }
  emailnumbaervalid(emailid) {

    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    //  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailid) == false) {
      this.validemail = true;
    }
    else {
      this.validemail = false;
    }
  }
}


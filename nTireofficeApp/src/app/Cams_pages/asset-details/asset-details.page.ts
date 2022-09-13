import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
declare var jquery: any;
declare var $: any;
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var google: any;
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.page.html',
  styleUrls: ['./asset-details.page.scss'],
})
export class AssetDetailsPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;
  username:any;
  currentlatlon:any;
  isItemAvailable:boolean;
  assetcode1;
  scannedCode:any;
  detailsreqcat:any;
  assetcodeResult:any;
  assetcode1str:any;
  assetcode:any;
  departmentreqdd:any;
  details:any;
  details1=[];
  deprciationtype:any;
  myValue:boolean;
  showmap:boolean;
  icheck:any;
  assetucode:any;
  imagesucessres=[];
  Images = [];
  file = [];
  imagecif;
  image = [];
  curr_prod_category;
  detailsmap;
  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true //Corrects Android orientation quirks
  }
  products: any;
  @ViewChild('map') mapElement: ElementRef;
  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private crop: Crop, private base64: Base64, private camera: Camera,private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation,public sanitizer: DomSanitizer,private barcodeScanner: BarcodeScanner) { 

      //,private qrScanner: QRScanner
      this.function = localStorage.getItem('FUNCTION_DESC');
      this.branch = localStorage.getItem('TUM_BRANCH_CODE');
      this.userID = localStorage.getItem('TUM_USER_ID');
      this.usertype = localStorage.getItem('TUM_USER_TYPE');
      this.userToken = localStorage.getItem('usertoken');
      this.accessToken = localStorage.getItem('token');
      this.branchID = localStorage.getItem('TUM_BRANCH_ID');
      this.functionID = localStorage.getItem('FUNCTION_ID');
      this.username=localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
  }

  doRefresh(event){
    this.details1=[];
    this.assetcode='';
    event.target.complete();
  }

  getItems(ev: any) {
    this.assetcode1 = [];
    if (ev.target.value == "") {
      this.assetcode1 = [];
      this.isItemAvailable = false;
    }
    // Reset items back to all of the items
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    var params = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
    };
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetcodelist',params, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      // set val to the value of the searchbar
      this.assetcodeResult= resp;
      this.assetcode1str = this.assetcodeResult;

      for (var i = 0; i < this.assetcode1str.length; i++) {

        this.assetcode1.push(this.assetcode1str[i].ASSET_CODE);
      }
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.isItemAvailable = true;
        this.assetcode1 = this.assetcode1.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }

  //  scancoderecon(){
  //   this.qrScanner.prepare()
  //   .then((status: QRScannerStatus) => {
  //      if (status.authorized) {
  //        // camera permission was granted
  
  
  //        // start scanning
  //        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //          console.log('Scanned something', text);
  //          this.scannedCode=text;
  //           this.processasset(this.scannedCode)
  //          this.qrScanner.hide(); // hide camera preview
  //          scanSub.unsubscribe(); // stop scanning
  //        });
  
  //      } else if (status.denied) {
  //        // camera permission was permanently denied
  //        // you must use QRScanner.openSettings() method to guide the user to the settings page
  //        // then they can grant the permission from there
  //      } else {
  //        // permission was denied, but not permanently. You can ask for permission again at a later time.
  //      }
  //   })
  //   .catch((e: any) => console.log('Error is', e));
  // }

  scancoderecon(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedCode=barcodeData.text;
      this.processasset(this.scannedCode)
      }).catch(err => {
      console.log('Error', err);
      });
  }

  processasset(assetcode){
    this.details1=[];
    this.assetcode = assetcode;
    this.isItemAvailable = false;
    var data = {
      'assetcode': assetcode,
      'branchid': this.branchID,
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken': this.userToken
  }
  console.log(data);

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetserreqdept',data, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp);
      this.departmentreqdd = resp[0].Text;
    
  }, error => {
    console.log("error : " + JSON.stringify(error));

  });
  this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetdetailslist',data, {
    headers: options,
  }).subscribe(resp => {
    console.log(resp);
     this.details = resp;
    console.log(this.details);
 
   
    var alasset = this.details;

    if (this.details.length < 1) {
        this.presentAlert("Alert","No Record Found")
        this.myValue = false;
        this.showmap = false;
    } else {
      this.details1.push(resp[0]);

        var depritype = resp[0].ASSET_DEPRECIATION_TYPE;
        console.log(depritype);
        if (depritype == 1) {
            this.deprciationtype = 'Straight Line';
            //console.log($scope.deprciationtype);
        } else {
            this.deprciationtype = 'WDC';
            //console.log($scope.deprciationtype);
        }

        
        var imgchk = resp[0].ImageUrl;

        if(imgchk!=null){
          var imglen=imgchk.length;
          console.log(imgchk);
          if(imglen < 4){
            this.icheck = null;
          console.log("200")
         
        }else{
          this.icheck = resp[0].ImageUrl;
          console.log("100")
        }

      }else{
        this.icheck = null;
      }

        this.assetucode = resp[0].ASSET_CODE;
        var assetlat = resp[0].asset_latitude;
        //console.log(assetlat);
        var assetlng = resp[0].asset_longitude;
        console.log(this.assetucode);
        console.log(this.icheck);
        this.showmap = true;

        var map = new google.maps.Map(document.getElementById('mapshowimage12'), {
          zoom: 8,
          center: new google.maps.LatLng(assetlat, assetlng)
      });
      var contentString = "ASSET CODE: " + this.assetucode;
      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });
      var latlngset = new google.maps.LatLng(assetlat, assetlng);
      var marker = new google.maps.Marker({
          position: latlngset,
          map: map,
          title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function () {
          infowindow.open(map, marker);
      });

      this.myValue = true;
    }
    
  }, error => {
    console.log("error : " + JSON.stringify(error));

  });
  }

  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
  
      message: tittle,
      buttons: ['OK']
    });
  
    await alert.present();
  }

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

  Attachdocument() {

    this.imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true //Corrects Android orientation quirks
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:

      this.crop.crop(imageData, { quality: 100 })
        .then(
          newImage => {

            this.base64.encodeFile(newImage).then((base64File: string) => {
              var base64result = base64File.split(',')[1]

              var fileURL = "data:image/jpeg;base64," + base64result;

              this.Images.push(fileURL)

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
    })
  }

  dataURLtoFile(dataURI, filename) {
    console.log(dataURI)
    console.log(filename)

    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  DeleteImage(index) {
    this.Images.splice(index, 1);
  }

  updateassetdetails(){
  //  alert("dsgds")
  if (this.file.length >= 1) {
      //  alert("dsgds1")
      //setTimeout(function() {
      var j;
      for (j = 0; j < this.file.length; j++) {
        console.log(this.file[j]);
        console.log(this.image[j]);
        var imagepage = "E:/APPLICATIONS/MyDesk/nTireoffice/UploadDocu/SSTPL" + this.image[j];
        var imagepagen = this.image[j];
        console.log(imagepage);
        // var url = "http://herbieai.com:8150/dms/uploadfileappilcantpiccams";
        var url = "http://demo.herbieai.com:8033/dms/uploadprofileImg";
        const formData: any = new FormData();
        formData.append("upload", this.file[j], this.image[j]);

        console.log('form data variable :   ' + formData.toString());
        this.http.post(url, formData)

          .subscribe(files => console.log('files', files))

          var obj = {
            'assetcode': this.assetucode,
            'branchid': this.branchID,
            'functionida': this.functionID,
            'doc_path': imagepagen,
            'access_token': this.accessToken,
            'userid': this.userID,
            'usertoken': this.userToken
        };
        
        console.log(JSON.stringify(obj));
        const header = new Headers();
        header.append("Content-Type", "application/json");
      
        let options = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/uploadimage',obj, {
          headers: options,
        }).subscribe(resp => {
          console.log(resp);
          if (resp == "sucess") {
            this.imagesucessres.push(resp);
            //$scope.getuserlist();
        }
          
        }, error => {
          console.log("error : " + JSON.stringify(error));
      
        });
      }
      if (j == this.file.length) {
      //  $scope.camera = 1;
    }
    }else{
      this.geolocation.getCurrentPosition().then((res) => {

        this.currentlatlon = res.coords.latitude + "," + res.coords.longitude;
        let location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
        console.log("location :n" + location);
        var lat = res.coords.latitude;
        var long = res.coords.longitude;
  
        var datauasset = {
          'assetcode': this.assetucode,
          'branchid': this.branchID,
          'functionida': this.functionID,
          'assetlat': lat,
          'assetlng': long,
          'access_token': this.accessToken,
          'userid': this.userID,
          'usertoken': this.userToken
        }
        const header = new Headers();
        header.append("Content-Type", "application/json");
      
        let options = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetdetailmap',datauasset, {
          headers: options,
        }).subscribe(resp => {
          console.log(resp);
          this.detailsmap = resp;
          // console.log($scope.detailsmap);
          var imgchk = resp[0].ImageUrl;

          if(imgchk!=null){
            var imglen=imgchk.length;
            console.log(imgchk);
            if(imglen < 4){
              this.icheck = null;
            console.log("200")
           
          }else{
            this.icheck = resp[0].ImageUrl;
            console.log("100")
          }
  
        }else{
          this.icheck = null;
        }
          var assetlatm = resp[0].asset_latitude;

          var assetlngm = resp[0].asset_longitude;

          var alassetm = this.detailsmap;

          // var popup = $ionicPopup.alert({
          //     title: "",
          //     template: "<center> Updated Successfully </center>",
          // });
          // $ionicLoading.hide();
          this.presentAlert("Sucess","Updated Successfully")
          this.showmap = true;

          var map = new google.maps.Map(document.getElementById('mapshowimage12'), {
            zoom: 8,
            center: new google.maps.LatLng(assetlatm, assetlngm)
        });
        var contentString = "ASSET CODE: " + this.assetucode;
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
         var latlngsetnew = new google.maps.LatLng(assetlatm, assetlngm);
        var marker = new google.maps.Marker({
            position: latlngsetnew,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
        // }
        this.myValue = true;

        //this.newimage = [];

        //$scope.detailsdept = response.data.recordsets[1];
        console.log(assetlatm);

          
        }, error => {
          console.log("error : " + JSON.stringify(error));
      
        });
        
      }).catch((error) => {
        this.presentAlert('', 'Turn on location to processed!');
      });
    }    
  }
}

/* eslint-disable no-debugger */
/* eslint-disable radix */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { fromEvent, Subscription } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-addtravelexpensedetails',
  templateUrl: './addtravelexpensedetails.page.html',
  styleUrls: ['./addtravelexpensedetails.page.scss'],
})
export class AddtravelexpensedetailsPage implements OnInit, OnDestroy {
  Customer_ID;
  Images = [];
  token;
  allexpensedetails = [];
  allexpensedetails1;
  validExpense;
  getGeoencoder1;
  getGeoencoder;
  customer_name;
  call_id;
  product;
  product_desc;
  campaign;
  campaign_desc;
  branch_id;
  image = [];
  file: any;
  newimage = [];
  allExpense;
  documents;
  exdata;
  imagecif;
  expense_id1;
  fileURL;
  currentlatlon
  image1;
  expense_obj = {
    expense_type: undefined,
    expense_cost: "",
    remarks: ""
  };
  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true //Corrects Android orientation quirks
  };
  commonapi_sales;
  private backbuttonSubscription: Subscription;
  constructor(public actionSheetController: ActionSheetController, public alertController: AlertController, private model: ModalController, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation, private camera: Camera, navParams: NavParams, private http: HttpClient, public Ipaddressservice: IpaddressService) {

    this.Customer_ID = navParams.get('Customer_ID');

    this.commonapi_sales = 'https://demo.herbieai.com/Testntiremydesk/Uploaddocu/SSTPL/';
    var functionid = parseInt(window.localStorage['FUNCTION_ID']);
    var dataobj1 = { functionid: functionid, status: 'A' };
    this.token = window.localStorage['token'];
    var userid = parseInt(window.localStorage['TUM_USER_ID']);
    var tokenJSON = { access_token: this.token, userid: userid, 'usertoken': window.localStorage['usertoken'] };

    var getappbyuserJSON1 = Object.assign(dataobj1, tokenJSON);
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getexpdetails', getappbyuserJSON1, {
      headers: options,
    }).subscribe(resp => {

      this.allexpensedetails1 = resp;
      this.allexpensedetails1.forEach(element => {
        this.allexpensedetails.push(element);
      });

      console.log("allexpensedetails : " + JSON.stringify(this.allexpensedetails));
    }, error => {

      console.log("" + JSON.stringify(error));
    });

    this.getexpensedetails();
  }

  ngOnInit() {
    const event = fromEvent(document, 'backbutton');
    this.backbuttonSubscription = event.subscribe(async () => {

      this.model.dismiss();
    });
  }
  ngOnDestroy() {
    this.backbuttonSubscription.unsubscribe();
  }
  getexpensedetails() {

    this.token = window.localStorage['token'];

    var tokenJSON1 = {
      Custid: parseInt(this.Customer_ID),
      access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken']
    };

    var getExpenseJSON = tokenJSON1;

    console.log("getExpenseJSON : " + JSON.stringify(getExpenseJSON));
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getAllExpenseDetail/', getExpenseJSON, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp);
      this.allExpense = resp;
      console.log(this.allExpense);
      this.documents = []
      for (var i = 0; i < this.allExpense.length; i++) {
        console.log(this.allExpense[i].expense_id)
        this.expense_id1 = this.allExpense[i].expense_id;
        var dataobj = { expense_id: this.expense_id1 }
        this.token = window.localStorage['token'];

        var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };

        var getExpensedocJSON = Object.assign(dataobj, tokenJSON);
        const header = new Headers();
        header.append("Content-Type", "application/json");
        let options = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getExpenseDoc/', getExpensedocJSON, {
          headers: options,
        }).subscribe(resp => {
          this.exdata = resp;
          for (var j = 0; j < this.exdata.length; j++) {
            this.documents.push(this.exdata[j]);
            console.log(this.documents);
          }
        }, error => {

          alert("" + JSON.stringify(error));
        });

      }
    });
  }
  async selectImage() {
    let self = this;


    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          $('#fileinput').trigger('click');

          $('#fileinput').unbind().change(function () {
            // $('#fileinput').on('change', function () {
            var filePath = $(this).val();
            console.log(filePath);

            if (filePath != undefined && filePath != "") {
              var str = filePath;
            }
            // alert("" + str.split("\\").pop())
            //   if(str!=undefined){
            //   var actualFile = str.split("\\").pop();
            // }
            //   console.log("actualFile :" + actualFile);
            // var File_inputvalue =
            //self.Images.push(actualFile);
            self.uploadallfilles();

          });
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.Attachdocument();
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
  // pickImage() {

  //   //get current position
  //   this.geolocation.getCurrentPosition().then((res) => {

  //     this.currentlatlon = res.coords.latitude + "," + res.coords.longitude;
  //     let location = 'lat ' + res.coords.latitude + ' lang ' + res.coords.longitude;
  //     console.log("location :n" + location);
  //     // this.getGeoencoder(res.coords.latitude, res.coords.longitude);



  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }
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
      console.log("filename :" + file_name)
      var file_name_array = file_name.split('.');
      var file_format = file_name_array[file_name_array.length - 1];
      console.log(file_name)
      console.log('getBase64:' + this.getBase64(files1));
      var reader = new FileReader();
      reader.readAsDataURL(files1);
      reader.onload = function () {
        self.newimage.push(reader.result);

      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      const file = $('#fileinput').prop("files")[0];
      this.file = $('#fileinput').prop("files")[0];
      this.image1 = file_name;
      this.uploadingFiledocument();


    }
  };
  uploadingFiledocument() {
    var url = this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurl + 'uploadfile';
    const formData: any = new FormData();
    formData.append("upload", this.file, this.image1);

    console.log('form data variable :   ' + formData.toString());
    this.http.post(url, formData)

      .subscribe(files => console.log('files', files))
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
  Attachdocument() {



    this.imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
    this.camera.getPicture(this.optionsCamera).then((imageData) => {

      var fileURL = "data:image/jpeg;base64," + imageData;

      // alert("fileupload"+$scope.fileURL);
      this.newimage.push(this.fileURL);

      // this.image.push(fileURL);
      this.image1 = this.imagecif + ".jpg";
      //console.log($scope.image);
      this.file = this.dataURLtoFile(fileURL, this.imagecif + ".jpg");
      this.uploadingFiledocument();
      console.log("file" + this.file);
      console.log("file one" + JSON.stringify(this.file));
    }, (err) => {
      // Handle error
    });
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
  AddExpense(data) {
    console.log(data)
    if (data.expense_type == undefined) {
      this.presentAlert("", "Enter Expense Type")
    }
    else if (data.expense_cost == "") {
      this.presentAlert("", "Enter Expense Amount")
    }
    else if (data.remarks == "") {
      this.presentAlert("", "Enter remarks")
    }
    else {
      this.validExpense = 'true';

      var insert_obj = {
        functionid: parseInt(localStorage.getItem('FUNCTION_ID')),

        CUSTOMER_ID: this.Customer_ID,
        // CUSTOMER_NAME: this.customer_name.toString(),
        CUSTOMER_NAME: "",
        // CALL_ID: parseInt(this.call_id),
        CALL_ID: 0,
        // PRODUCT: parseInt(this.product),
        PRODUCT: 0,
        // PRODUCT_DESC: this.product_desc.toString(),
        PRODUCT_DESC: "",
        // CAMPAIGN: parseInt(this.campaign),
        CAMPAIGN: "0",
        // CAMPAIGN_DESC: this.campaign_desc.toString(),
        CAMPAIGN_DESC: "",
        CUSTOMER_REF: "",
        Remarks: data.remarks,
        status: 'P',

        createdby: parseInt(localStorage.getItem('TUM_USER_ID')),
        updatedby: parseInt(localStorage.getItem('TUM_USER_ID')),
        // BRANCH_ID: this.branch_id,
        branchid: parseInt(window.localStorage['TUM_USER_ID']),
        expense_type: data.expense_type.toString(),
        expense_cost: data.expense_cost.toString(),
        remarks: data.remarks,
        document: "https://demo.herbieai.com/Testntiremydesk/Uploaddocu/SSTPL/" + this.image1,
        file_array: "https://demo.herbieai.com/Testntiremydesk/Uploaddocu/SSTPL/" + this.image1,
        //file_array:this.image1,
        document_desc: "expense_document",
        document_remarks: "expense_document",
        //CostId:
      };



      this.token = window.localStorage['token'];

      var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };


      var insertExpenseJSON = Object.assign(insert_obj, tokenJSON);
      debugger;
      console.log("insertExpenseJSON : " + JSON.stringify(insertExpenseJSON));
      const header1 = new Headers();
      header1.append("Content-Type", "application/json");
      let options1 = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'insert_expense_details/', insertExpenseJSON, {
        headers: options1,
      }).subscribe(resp => {
        this.model.dismiss();
      }, error => {

        console.log("insert_expense_details : " + JSON.stringify(error));
      });



      this.presentAlert("", "Successfully Saved")
      // this.presentAlert1("", "Successfully Saved")

      var dataobj = { Custid: parseInt(this.Customer_ID) }
      this.token = window.localStorage['token'];

      var tokenJSON1 = {
        functionid: parseInt(window.localStorage['FUNCTION_ID']),
        access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken']
      };

      var getExpenseJSON = Object.assign(dataobj, tokenJSON1);

      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getAllExpenseDetail/', getExpenseJSON, {
        headers: options,
      }).subscribe(resp => {
        console.log(resp);
        this.allExpense = resp;
        console.log(this.allExpense);
        this.documents = []
        for (var i = 0; i < this.allExpense.length; i++) {
          console.log(this.allExpense[i].expense_id)
          this.expense_id1 = this.allExpense[i].expense_id;
          var dataobj = { expense_id: this.expense_id1 }
          this.token = window.localStorage['token'];

          var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };

          var getExpensedocJSON = Object.assign(dataobj, tokenJSON);
          const header = new Headers();
          header.append("Content-Type", "application/json");
          let options = new HttpHeaders().set('Content-Type', 'application/json');
          this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getExpenseDoc/', getExpensedocJSON, {
            headers: options,
          }).subscribe(resp => {
            this.exdata = resp;
            for (var j = 0; j < this.exdata.length; j++) {
              this.documents.push(this.exdata[j]);
              console.log(this.documents);
            }
          }, error => {

            console.log("getExpenseDoc : " + JSON.stringify(error));
          });


        }

        this.model.dismiss();
      }, error => {


      });
      data.expense_type = undefined;
      data.expense_cost = '';
      data.remarks = '';
      this.newimage = [];
      this.file = [];
      this.image = [];

    }
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
  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
  DeleteImage(index) {
    this.newimage.splice(index, 1);
    this.image.splice(index, 1);
  }
  closemodel() {
    this.model.dismiss();
  }


}

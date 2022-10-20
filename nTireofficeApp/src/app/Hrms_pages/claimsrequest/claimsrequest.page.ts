import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { ToastmessageService } from '../../service/toastmessage.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { CameraService } from '../../service/camera.service'
import { Crop } from '@ionic-native/crop/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Base64 } from '@ionic-native/base64/ngx';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { json } from '@angular-devkit/core';

@Component({
  selector: 'app-claimsrequest',
  templateUrl: './claimsrequest.page.html',
  styleUrls: ['./claimsrequest.page.scss'],
})

export class ClaimsrequestPage implements OnInit {
  function_id;
  userID;
  usertoken;
  ReferenceData1;
  ReferenceData = [];
  token;
  empid;
  Reqcategory1;
  Reqcategory = [];
  empCode;
  name;
  status;
  company;
  branch;
  department;
  empID;
  contact;
  reqRef;
  travelData1: any[];
  travelData = [];
  imagecif;
  Images = [];
  image = [];
  file;
  expenseetype;
  expenseetype1 = [];
  expenseType;
  expenseamount;
  expenseArray = [];
  expenseremarks;
  amount;
  expensetxt;
  requestCat;
  description;
  reqID;
  workflowTable;
  reqtype;
  dat_valid;
  date;
  base64image;
  imgname;
  imgobj;
  travelData2;
  username = window.localStorage.getItem('TUM_USER_NAME');
  reqrefid12;
  constructor(private alertController: AlertController, private http: HttpClient, private router: Router, public sanitizer: DomSanitizer, private crop: Crop, private base64: Base64, public CameraService: CameraService, public actionSheetController: ActionSheetController, private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService, public toastmessageService: ToastmessageService) {
    this.function_id = window.localStorage["FUNCTION_ID"];
    this.userID = window.localStorage['TUM_USER_ID'];
    this.usertoken = window.localStorage['usertoken'];
    this.token = window.localStorage['token'];
    this.empid = window.localStorage['empid'];
    this.empCode = window.localStorage['TUM_EMP_CODE'];
    this.date = new Date();
    this.dat_valid = {
      currentDate: new Date()
    };
    this.expenseType = "";
    this.requestCat = "";
    this.getReqref();

    this.getEmployeeDetails();
    this.getExpenseType();
  }

  ngOnInit() {
    this.getReqcategory();
  }
  getReqcategory() {
    var Catobj = {
      User_ID: this.userID,
      FunctionID: parseInt(this.function_id),
      userid: parseInt(this.userID),
      usertoken: this.usertoken,
      access_token: this.token,
      appURL: 'getrequestcategoryclaims'
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getRequestCategoryClaims", Catobj).then(resp => {

      console.log(resp)
      this.Reqcategory1 = resp;
      this.Reqcategory1.forEach(element => {
        this.Reqcategory.push(element)
      });
      console.log("ReferenceData : " + JSON.stringify(this.ReferenceData));
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  getReqref() {
    var Refobj = {
      User_ID: this.userID,
      FunctionID: parseInt(this.function_id),
      userid: parseInt(this.userID),
      usertoken: this.usertoken,
      access_token: this.token,
      //EmpId: window.localStorage.getItem('EmployeeID')
      EmpId: parseInt(window.localStorage.getItem('EmployeeID'))

    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getrequestReferencedata", Refobj).then(resp => {
      this.ReferenceData1 = resp;
      this.ReferenceData1.forEach(element => {
        this.ReferenceData.push(element)
      });
      console.log("ReferenceData : " + JSON.stringify(this.ReferenceData));
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }

  getEmployeeDetails() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/GetEmployees/" + this.empCode).then(resp => {
      console.log(resp)
      if (resp == "Employee not Exist") {
        this.toastmessageService.presentAlert1("", "Employee Does not Exist");

      } else {
        console.log(resp)
        this.status = "P";
        this.name = window.localStorage['TUM_USER_NAME'];

        this.company = window.localStorage['FUNCTION_DESC'];
        this.branch = window.localStorage['TUM_BRANCH_CODE']
        //  var employeeDetails = JSON.parse(resp.toString());
        var employeeDetails = resp;

        this.department = employeeDetails[0].Department;
        this.empID = employeeDetails[0].EmpID;

        this.userID = employeeDetails[0].UserID;
        this.contact = employeeDetails[0].ContactPhone;

      }
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }

  requestRefChange() {
    localStorage.setItem("TxnReference", this.reqRef)
    var Odobj = {
      User_ID: window.localStorage['TUM_USER_ID'],
      //  userid:window.localStorage['TUM_USER_ID'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      usertoken: this.usertoken,
      access_token: this.token,
      Reference: this.reqRef,
      TxnReference:this.reqRef
    }


    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "gettravelDetailsClaims", Odobj).then(resp => {

      this.travelData2 = resp;
      this.travelData2.forEach(element => {
        this.travelData.push(element);
      });
      console.log("ReferenceData : " + JSON.stringify(this.ReferenceData));
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }

  Camera(type) {
    this.imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
    this.CameraService.camerafunction(type).then(imageData => {

      console.log("imageData : " + imageData);
      console.log("imageData one: " + JSON.stringify(imageData));

      this.base64image = "data:image/jpeg;base64," + imageData["data"];
      var fileURL = "data:image/jpeg;base64," + imageData["data"];
      this.imgname = this.imagecif + "_Expense.jpg"
      this.imgobj = {
        imgname: this.imgname,
        imgURL: this.base64image
      }

      this.image.push(this.imgobj);
      this.file = this.dataURLtoFile(fileURL, this.image);

      this.uploadDoc(this.file, this.imgname)
    }, error => {

      console.log("error : " + JSON.stringify(error));

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

  uploadDoc(file, imagename) {
    var url = this.Ipaddressservice.ipaddress + '/dms/uploadprofileImg';
    const formData: any = new FormData();
    formData.append("upload", file, imagename);

    console.log('form data variable :   ' + formData.toString());
    this.http.post(url, formData)

      .subscribe(files => console.log('files', files))
  }
  galleryImages() {

  }
  async Attachdocument() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Use Camera',

        handler: () => {
          this.Camera('camera');
        }
      }, {
        text: 'Gallery image',

        handler: () => {
          this.Camera('gallery');
        }
      }]
    });
    await actionSheet.present();
  }
  getExpenseType() {
    var Odobj = {
      User_ID: this.userID,
      FunctionID: parseInt(this.function_id),
      userid: parseInt(this.userID),
      usertoken: this.usertoken,
      access_token: this.token,
    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getExpensetypeClaims", Odobj).then(resp => {
      this.expenseetype = resp;
      this.expenseetype.forEach(element => {
        this.expenseetype1.push(element)
      });
      console.log("ReferenceData : " + JSON.stringify(this.ReferenceData));
    }, error => {

      //  console.log("error : "+JSON.stringify(error));

    });
  }
  addExpenseDetails() {
    if (this.expenseType == "") {
      // this.toastmessageService.presentAlert1("","Select Expense Type");
      // this.toastmessageService.presentAlert("","Select Expense Type");
      this.toastmessageService.presentAlert1("", "Select Expense Type");
    }
    else if (this.amount == undefined) {
      this.toastmessageService.presentAlert1("", "Enter Amount");

    }
    else {
      if (this.expenseType == 1) {
        this.expenseType = 'Food'
      }
      else if (this.expenseType == 2) {
        this.expenseType = 'Travel'
      }
      else if (this.expenseType == 3) {
        this.expenseType = 'Hotel'
      }
      else {
        this.expenseType = 'Hotel'
      }
      console.log("expenseType : " + this.expenseType);
      this.expenseetype1.forEach(element => {

        if (element.VAL == this.expenseType) {
          this.expensetxt = element.TEXT;
        }

      });

      this.expenseArray.push({

        // EXPENSE_TYPE1:this.expensetxt,
        EXPENSE_TYPE: this.expenseType,
        EXPENSE_VAL: this.expenseType,
        EXPENSE_REMARKS: this.expenseremarks,
        ATTACTMENT: this.imgobj,
        EXPENSE_AMOUNT: this.amount
      })
      this.expenseType = "";
      this.expenseremarks = undefined;
      this.amount = undefined;
      this.base64image = undefined;
    }
  }
  release;
  billableclient;
  reqrefid;
  expenseid;
  exp_id;
  EXPREF_ID;
  EXPENSE_ID;
  claimsSubmit() {

   this.reqRef= window.localStorage.getItem('TxnReference')
   console.log(this.reqRef)
    if (this.release == true) {

      this.status = 'P';
    }
    else {
      this.status = 'N';
    }
    if (this.billableclient == true) {

      this.billableclient = 'Y';
    }
    else {
      this.billableclient = 'N';
    }
    // // debugger
    // if (this.expenseArray.length == 0) {
    //   this.toastmessageService.presentAlert1("", "Please Fill All Mandatory Fields!");
    //   return;
    // }

    var obj = {
      TxnReference: this.reqRef,
      userid: parseInt(this.userID),
      usertoken: this.usertoken,
      access_token: this.token,


    }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getrequestrefid", obj).then(resp => {
      this.toastmessageService.presentAlert("", "Claims Request saved Successfully");
      if (resp != '') {
        this.reqrefid = resp[0].ODRequestRef;
        console.log(this.reqrefid)
        console.log(resp)
      }

      if (this.expenseArray.length > 0) {
        this.expenseArray.forEach(element => {
          var obj = {
            userid: this.userID,
            usertoken: this.usertoken,
            access_token: this.token,
          }
          if (element.ATTACTMENT != undefined) {
            var imgname = element.ATTACTMENT.imgname;
          }
          this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getlastinsertedexpense", obj).then(resp => {
            console.log(resp);
            this.expenseid = resp[0].expenseid;
            this.exp_id = resp[0].EXP_id;
            this.EXPREF_ID = resp[0].EXPREF_ID;
            var expenseobj = {
              // FUNCTION_ID:window.localStorage['FUNCTION_ID'],
              FUNCTION_ID: parseInt(window.localStorage['FUNCTION_ID']),
              BRANCH_ID: window.localStorage['TUM_BRANCH_ID'],
              Expenseid: this.expenseid + 1,
              Exp_id: this.exp_id + 1,
              ExpensesType: element.EXPENSE_VAL,
              ExpensesAmount: element.EXPENSE_AMOUNT,
              Remarks: element.EXPENSE_REMARKS,
              UserId: window.localStorage['TUM_USER_ID'],
              RequestRef: this.reqrefid,
              // userid:window.localStorage['TUM_USER_ID'],
              userid: parseInt(window.localStorage['TUM_USER_ID']),
              usertoken: window.localStorage['usertoken'],
              access_token: window.localStorage['token']
            }
            console.log(expenseobj);
            this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "saveExpenseClaimsDetail/", expenseobj).then(resp => {
              console.log(resp);
              var obj = {
                requestRef: this.reqrefid,
                userid: this.userID,
                usertoken: this.usertoken,
                access_token: this.token,
              }
              console.log(obj);
              this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getExpenseIDClaims/", obj).then(resp => {
                this.EXPENSE_ID = resp[0].pk1;
                console.log(this.EXPENSE_ID);
                var path = 'https://sunsmart.in/mydesk/Uploaddocu/SSTPL/' + imgname;
                var docobj = {
                  // FUNCTION_ID:window.localStorage['FUNCTION_ID'],
                  FUNCTION_ID: parseInt(window.localStorage['FUNCTION_ID']),
                  module_id: 50101,
                  pk1: this.EXPENSE_ID,
                  pk2: this.expenseid,
                  pk3: " ",
                  pk4: " ",
                  doc_name: imgname,
                  doc_desc: '',
                  doc_path: path,
                  uploaded_by: window.localStorage['TUM_USER_ID'],
                  // userid:window.localStorage['TUM_USER_ID'],
                  userid: parseInt(window.localStorage['TUM_USER_ID']),
                  usertoken: window.localStorage['usertoken'],
                  access_token: window.localStorage['token']
                }
                console.log(this.EXPENSE_ID);
                console.log(docobj);
                this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "uploadclaimsdoc/", docobj).then(resp => {
                }, error => {
                  console.log("error : " + JSON.stringify(error));
                });
                console.log("ReferenceData : " + JSON.stringify(this.ReferenceData));
              }, error => {
                console.log("error : " + JSON.stringify(error));
              });
              if (this.amount == undefined) {
                this.amount = 0;
              }

              var claimsobj = {
                // FUNCTION_ID:window.localStorage['FUNCTION_ID'],
                FUNCTION_ID: parseInt(window.localStorage['FUNCTION_ID']),
                BRANCH_ID: window.localStorage['TUM_BRANCH_ID'],
                EMP_ID: window.localStorage['em_emp_id'],
                EXPENSE_REF: this.reqrefid,
                EXPENSE_ID: this.expenseid + 1,
                EXPENSE_CATEGORY: this.requestCat,
                DESCRIPTION: this.description,
                AMOUNT: this.expenseamount,
                IS_BILLABLE: this.billableclient,
                COMMENTS: '',
                STATUS: this.status,

                EXPENSE_DATE: new Date(),
                CREATED_BY: window.localStorage['TUM_USER_ID'],
                UPDATED_BY: window.localStorage['TUM_USER_ID'],
                USER_ID: window.localStorage['TUM_USER_ID'],
                IPADDRESS: 0,
                request_ref: this.reqrefid,
                // userid:window.localStorage['TUM_USER_ID'],
                userid: parseInt(window.localStorage['TUM_USER_ID']),
                usertoken: window.localStorage['usertoken'],
                access_token: window.localStorage['token']
              }
              console.log(claimsobj);
              this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "saveMasterClaimsDetail/", claimsobj).then(resp => {
                this.toastmessageService.presentAlert1("", "Request saved Successfully<br> Req Ref : " + this.EXPREF_ID);
                // this.toastmessageService.presentAlert1("Request Sent","Request saved Successfully <br> Req Ref : " + this.reqID1 );
                this.expenseArray = [];
                console.log(this.expenseArray)
                this.reqID = this.EXPREF_ID + 1;
                this.workflowTable = 'HRMS_EXPENSE_SPECIFICATION_DETAILS';
                this.reqtype = null;
                if (this.status == "P") {
                  this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms1 + "WorkFlowAuth/" + this.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp => {
                  }, error => {
                    console.log("error : " + JSON.stringify(error));
                  });
                }
              }, error => {
                console.log("error : " + JSON.stringify(error));
              });
            }, error => {
              console.log("error : " + JSON.stringify(error));
            });
          });
        });
      }
    }, error => {
      console.log("error : " + JSON.stringify(error));
      this.reqrefid = error.error.text[0].ODRequestRef;
      this.reqrefid12 = error.error.text[0].ODRequestRef;
      console.log(this.reqrefid)
      if (this.expenseArray.length > 0) {
        this.expenseArray.forEach(element => {
          var obj = {
            userid: this.userID,
            usertoken: this.usertoken,
            access_token: this.token,
          }
          if (element.ATTACTMENT != undefined) {
            var imgname = element.ATTACTMENT.imgname;
          }
          this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getlastinsertedexpense/", obj).then(resp => {
            console.log(resp);
            this.expenseid = resp[0].expenseid;
            this.exp_id = resp[0].EXP_id;
            this.EXPREF_ID = resp[0].EXPREF_ID;
            var expenseobj = {
              // FUNCTION_ID:window.localStorage['FUNCTION_ID'],
              FUNCTION_ID: parseInt(window.localStorage['FUNCTION_ID']),
              BRANCH_ID: window.localStorage['TUM_BRANCH_ID'],
              Expenseid: this.expenseid + 1,
              Exp_id: this.exp_id + 1,
              ExpensesType: element.EXPENSE_VAL,
              ExpensesAmount: element.EXPENSE_AMOUNT,
              Remarks: element.EXPENSE_REMARKS,
              UserId: window.localStorage['TUM_USER_ID'],
              RequestRef: this.reqrefid,
              // userid:window.localStorage['TUM_USER_ID'],
              userid: parseInt(window.localStorage['TUM_USER_ID']),
              usertoken: window.localStorage['usertoken'],
              access_token: window.localStorage['token']
            }
            console.log(expenseobj);
            this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "saveExpenseClaimsDetail/", expenseobj).then(resp => {
              console.log(resp);
              var obj = {
                requestRef: this.reqrefid,
                userid: this.userID,
                usertoken: this.usertoken,
                access_token: this.token,
              }
              console.log(obj);
              this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "getExpenseIDClaims/", obj).then(resp => {
                this.EXPENSE_ID = resp[0].pk1;
                console.log(this.EXPENSE_ID);
                var path = 'https://sunsmart.in/mydesk/Uploaddocu/SSTPL/' + imgname;
                var docobj = {
                  // FUNCTION_ID:window.localStorage['FUNCTION_ID'],
                  FUNCTION_ID: parseInt(window.localStorage['FUNCTION_ID']),
                  module_id: 50101,
                  pk1: this.EXPENSE_ID,
                  pk2: this.expenseid,
                  pk3: " ",
                  pk4: " ",
                  doc_name: imgname,
                  doc_desc: '',
                  doc_path: path,
                  uploaded_by: window.localStorage['TUM_USER_ID'],
                  // userid:window.localStorage['TUM_USER_ID'],
                  userid: parseInt(window.localStorage['TUM_USER_ID']),
                  usertoken: window.localStorage['usertoken'],
                  access_token: window.localStorage['token']
                }
                console.log(this.EXPENSE_ID);
                console.log(docobj);
                this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "uploadclaimsdoc/", docobj).then(resp => {
                }, error => {
                  console.log("error : " + JSON.stringify(error));
                });
                console.log("ReferenceData : " + JSON.stringify(this.ReferenceData));
              }, error => {
                console.log("error : " + JSON.stringify(error));
              });
              if (this.amount == undefined) {
                this.amount = 0;
              }
              var claimsobj = {
                // FUNCTION_ID:window.localStorage['FUNCTION_ID'],
                FUNCTION_ID: parseInt(window.localStorage['FUNCTION_ID']),
                BRANCH_ID: window.localStorage['TUM_BRANCH_ID'],
                EMP_ID: window.localStorage['em_emp_id'],
                EXPENSE_REF: this.reqrefid,
                EXPENSE_ID: this.expenseid + 1,
                EXPENSE_CATEGORY: this.requestCat,
                DESCRIPTION: this.description,
                AMOUNT: this.expenseamount,
                IS_BILLABLE: this.billableclient,
                COMMENTS: '',
                STATUS: this.status,

                EXPENSE_DATE: new Date(),
                CREATED_BY: window.localStorage['TUM_USER_ID'],
                UPDATED_BY: window.localStorage['TUM_USER_ID'],
                USER_ID: window.localStorage['TUM_USER_ID'],
                IPADDRESS: 0,
                request_ref: this.reqrefid,
                // userid:window.localStorage['TUM_USER_ID'],
                userid: parseInt(window.localStorage['TUM_USER_ID']),
                usertoken: window.localStorage['usertoken'],
                access_token: window.localStorage['token']
              }
              console.log(claimsobj);
              this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + "saveMasterClaimsDetail/", claimsobj).then(resp => {

                this.toastmessageService.presentAlert1("", "Request saved Successfully<br> Req Ref : " + this.EXPREF_ID);
                // this.toastmessageService.presentAlert1("Request Sent","Request saved Successfully <br> Req Ref : " + this.reqID1 );
                this.expenseArray = [];
                this.reqID = this.EXPREF_ID + 1;
                this.workflowTable = 'HRMS_EXPENSE_SPECIFICATION_DETAILS';
                this.reqtype = null;
                if (this.status == "P") {
                  this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms1 + "WorkFlowAuth/" + this.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp => {
                  }, error => {
                    console.log("error : " + JSON.stringify(error));
                  });
                }
              }, error => {
                console.log("error : " + JSON.stringify(error));
              });
            }, error => {
              console.log("error : " + JSON.stringify(error));
            });
          });
        });
      }
    });
  }

  async cancelClaims() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Cancel the Process',
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
            this.requestCat = "";
            this.reqRef = "";
            this.amount = undefined;
            this.description = undefined;
            this.release = false;
            this.billableclient = false;
            this.expenseType = "";
            this.amount = undefined;
            this.expenseremarks = undefined;
            this.Images = [];
            this.Images = undefined;
            this.expenseArray = [];
            this.expenseamount ="";

          }
        }
      ]
    });

    await alert.present();
  }



  // cancelClaims(){
  //   this.requestCat="";
  //     this.reqRef="";
  //     this.amount=undefined;
  //     this.description=undefined;
  //     this.release=false;
  //     this.billableclient=false;
  //     this.expenseType="";
  //     this.amount=undefined;
  //     this.expenseremarks=undefined;
  //     this.Images=[];
  //     this.expenseArray=[];
  // }

  claimList() {
    this.router.navigateByUrl('/claimssummary');
  }

}

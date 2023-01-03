import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-prsstatus',
  templateUrl: './prsstatus.page.html',
  styleUrls: ['./prsstatus.page.scss'],
})
export class PRSstatusPage implements OnInit {

  showfilter: boolean = true;
  filter : boolean = true;
  showviewlist: boolean = false
  expression: boolean = true
  getresponse: any;
  prscode: String;
  status: any;
  todate: any;
  fromdate: any;
  editprs: boolean = false;
  loading: boolean = false;
  showdeledit: boolean = true
  Branchname;
  getprsid: any;
  getstatus: any;
  noRecord: boolean = false;
  arrayvalue: any=[];
  prscoderes: any;
  array: any;
  constructor(private router: Router, private alertController: AlertController, public loadingController: LoadingController, private Ipaddressservice: IpaddressService, private httpclient: HttpClient) {

  }

  ngOnInit() {
    this.Branchname = localStorage.getItem('TUM_BRANCH_CODE');
    this.getCards();

  }

  togglefilter() {
    this.showfilter = !this.showfilter;
  }

  next() {
    this.router.navigate(['/purchase-request'])
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


  edit() {
    this.router.navigate(['/updateprsstatus'])
  }

  new()
  {
    this.showfilter = false;
    this.filter = false;
  }

  async testdetele() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to delete this recoed',
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


            let body = {
              "prsid": this.prscode
            }
            this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_PRS_Delete', body).subscribe((res: any) => {
              this.loading = false
              this.getresponse = res;
              this.presentAlert("", this.getresponse);
              // console.log("Response", res)
              // console.log("Response", res)
              // for (let item of this.getresponse) {
              //   console.log(item);
              // }
            })


          }
        }
      ]
    });


    // let body = {
    //   "prsid": this.getprsid
    // }
    // this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_PRS_Delete', body).subscribe((res: any) => {
    //   this.loading = false
    //   this.getresponse = res;
    //   this.presentAlert("", res);
    //   this.Search();
    //   // console.log("Response", res)
    //   // console.log("Response", res)
    //   // for (let item of this.getresponse) {
    //   //   console.log(item);
    //   // }
    // })
  }


  async clear() {
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

            this.prscode = "";
            this.status = "";
            this.todate = "";
            this.fromdate = "";
            this.getresponse = [];

          }
        }
      ]
    });

    await alert.present();
  }
  getVal(item: any) {
    console.log(item);
  }


getCards(){
  debugger;
  this.loading = true;
    this.presentLoadingWithOptions();
  var body = {
    "functionid": "1",
    "branchid": "1",
    "prscode":"",
    "fromdate": "",
    "todate": "",
    "reuestdate": "",
    "status": "",
    "currentstatus": "",
    "reqtype": "",
    "menuid": "",
    "usertype": "",
    "requser": "",
    "userid": "",
    "alphaname": "",
    "sortexpression": "PRS_ID",
    "qutype": "",
    "prsref": "",
    "pageindex1": 1,
    "pagesize1": 10

  };
  this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_PRS_search', body).subscribe((res: any) => {
    this.loading = false
    this.getresponse = res;

    console.log("Response", res)
    console.log(res.status)
    if (res.status == "d" || res.status == "D") {
      this.showdeledit = false
    }
    for (let item of this.getresponse) {
      console.log(item);
      this.getprsid = item.PRS_ID
      this.getstatus = item.STATUS
      console.log(this.getstatus)
    }
    if (this.getstatus == "Denied" || this.getstatus == "D") {
      this.showdeledit = false
    }
  })

}

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

  Search() {
    this.loading = true
    // console.log(this.prscode)
    // console.log(this.status)
    // console.log(this.todate)
    // console.log(this.fromdate)
    this.showviewlist = true
    if (this.prscode == undefined) {
      this.prscode = ''
    }
    if (this.status == undefined) {
      this.status = ''
    }
    if (this.todate == undefined) {
      // this.todate = new Date();
      this.todate = ''
    }
    if (this.fromdate == undefined) {
      // this.fromdate = new Date();
      this.fromdate = ''
    }


    if (this.status == "Approved") {
      this.status = 'A'
    }
    if (this.status == "Pending") {
      this.status = 'P'
    }
    if (this.status == "Cancelled") {
      this.status = 'X'
    }
    if (this.status == "New") {
      this.status = 'N'
    }
    if (this.status == "Denied") {
      this.status = 'D'
    }
    if (this.status == "Under Process") {
      this.status = 'U'
    }

    var body = {
      "functionid": "1",
      "branchid": "1",
      "prscode": this.prscode,
      "fromdate": this.fromdate,
      "todate": this.todate,
      "reuestdate": "",
      "status": this.status,
      "currentstatus": "",
      "reqtype": "",
      "menuid": "",
      "usertype": "",
      "requser": "",
      "userid": "",
      "alphaname": "",
      "sortexpression": "PRS_ID",
      "qutype": "",
      "prsref": "",
      "pageindex1": 1,
      "pagesize1": 10
    };
    this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_PRS_search', body).subscribe((res: any) => {
      this.loading = false;
      this.getresponse = res;
      if(this.getresponse == null) {
      this.noRecord = true;
      }

      console.log("Response", res)
      console.log("Response", res)
      this.arrayvalue=[]
      if(res&&res.length>0){
        for (let i = 0; i < res.length; i++) {
          const element = res[i].PRS_CODE.toLowerCase();
          console.log(element,"res");
          if(this.prscode&&this.prscode!=null){
            if(element==this.prscode.toLowerCase()){

            }else{
              this.presentAlert1("add item failed", 'No Data Found!');
            }
          }
        }
      }else{
        this.presentAlert1("add item failed", 'No Data Found!');
      }

      //   this.arrayvalue.push(element)
      //   console.log( this.arrayvalue,
      //     "asdad");
      // }
      // if(this.arrayvalue.includes(this.prscode)){
      //   alert("crt")
      // }else{
      //   alert("wrg")
      // }

      //  console.log(this.array,"this.array");

      console.log(res.status)
      if (res.status == "d" || res.status == "D") {
        this.showdeledit = false
      }
      for (let item of this.getresponse) {
        console.log(item);
        this.getprsid = item.PRS_ID
        this.getstatus = item.STATUS
        console.log(this.getstatus)
      }
      if (this.getstatus == "Denied" || this.getstatus == "D") {
        this.showdeledit = false
      }
    })

    //   const header = new Headers();
    //   header.append("Content-Type", "application/json");

    //   let options = new HttpHeaders().set('Content-Type', 'application/json');
    //   this.httpclient.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceerpapi+'get_PRS_search', {
    //                             // ?strfunction=1&branch=1&fdate=null&tdate=null&Status=P&drpcategory=null&drptype=null&TASKTYPE=null&AssetCode=null
    //     headers: options,
    //   }).subscribe(resp => {
    //     console.log(resp)
    //   //   this.carddata=resp;
    //   //   this.responseData1 = JSON.parse(this.carddata);
    //   //   console.log(this.responseData1.length);
    //   // this.responseDatalength = this.responseData1.length;
    //   }, error => {
    //     //this.presentAlert('Alert','Server Error,Contact not loaded');
    //     console.log("error : " + JSON.stringify(error));

    //   });
  }
  public onKeyUp(event: any) {

    let newValue = event.target.value;

    let regExp = new RegExp('^[A-Za-z0-9? ]+$');

    if (! regExp.test(newValue)) {
      event.target.value = newValue.slice(0, -1);
    }
  }


 omit_special_char(event) {
  var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z0-9]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}

keyUpChecker(ev) {
  let elementChecker: string;
  let format = /^[a-z0-9 ]*$/i;
  elementChecker = ev.target.value;
  console.log(ev.target.value);
  if(!format.test(elementChecker)){
  this.prscode = elementChecker.slice(0, -1);
  }
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
    });
    return await loading.present();
  }

  async loadingdismiss() {

    return await this.loadingController.dismiss();
  }


}

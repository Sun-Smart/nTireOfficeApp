import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-prsstatus',
  templateUrl: './prsstatus.page.html',
  styleUrls: ['./prsstatus.page.scss'],
})
export class PRSstatusPage implements OnInit {

  showfilter: boolean = true;
  showviewlist: boolean = false
  expression: boolean = true
  getresponse: any;
  prscode: String;
  status: String;
  todate: String;
  fromdate: String;
  editprs: boolean = false;
  loading: boolean = false
  constructor(private router: Router, private alertController: AlertController, private Ipaddressservice: IpaddressService, private httpclient: HttpClient) {

  }

  ngOnInit() {
  }

  togglefilter() {
    this.showfilter = !this.showfilter;
  }
  next() {
    this.router.navigate(['/purchase-request'])
  }



  edit() {
    this.router.navigate(['/updateprsstatus'])
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
          }
        }
      ]
    });

    await alert.present();
  }





  Search() {
    this.loading = true
    console.log(this.prscode)
    console.log(this.status)
    console.log(this.todate)
    console.log(this.fromdate)
    this.showviewlist = true
    if (this.prscode == undefined) {
      this.prscode = ''
    }
    if (this.status == undefined) {
      this.status = ''
    }
    if (this.todate == undefined) {
      this.todate = ''
    }
    if (this.fromdate == undefined) {
      this.fromdate = ''
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
      "sortexpression": "PRS_CODE",
      "qutype": "",
      "prsref": "",
      "pageindex1": 1,
      "pagesize1": 10

    };
    this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_PRS_search', body).subscribe((res: any) => {
      this.loading = false
      this.getresponse = res;
      console.log("Response", res)
      console.log("Response", res)
      for (let item of this.getresponse) {
        console.log(item);

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

}

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-completion-jobs-reopen',
  templateUrl: './completion-jobs-reopen.page.html',
  styleUrls: ['./completion-jobs-reopen.page.scss'],
})
export class CompletionJobsReopenPage implements OnInit {

  userID: any;
  usertype: any;
  function: any;
  branch: any;
  userToken: any;
  accessToken: any;
  branchID: any;
  functionID: any;

  doi: any;
  reason: any;
  sub: any;
  data: any;
  activityr;
  assetr;
  pmrrefr;
  wrkno;

  constructor(private activatedRoute: ActivatedRoute, private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService, private router: Router) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');

    var todayDate = new Date();
    var day = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var finaltodayDate = month + "/" + day + "/" + year;
    this.doi = finaltodayDate;
    console.log(this.doi);

  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
    });
    console.log(this.data);
  }

  reopenok() {
    var finaltodayDate = this.datePipe.transform(this.doi, 'dd-MM-yyyy');

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.activityr = this.data.CMD_ACTIVITY_ID;
    console.log(this.activityr)
    this.assetr = this.data.CMD_ASSET_ID;
    console.log(this.assetr);

    this.pmrrefr = this.data.pmr_reference;
    console.log(this.pmrrefr);

    this.wrkno = this.data.WorkorderNo;
    console.log(this.wrkno);


    // console.log(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlCams+"/CAMS_PENDING_REOPENED/"+this.activityr+"/"+this.assetr+"/"+this.pmrrefr+"/1/"+this.pmrrefr+"/"+this.reason+"/"+finaltodayDate+"/"+this.userID+"/"+this.branchID+"/"+this.wrkno);

    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlCams + "CAMS_PENDING_REOPENED" + this.activityr + "/" + this.assetr + "/" + this.pmrrefr + "/1/" + this.pmrrefr + "/" + this.reason + "/" + finaltodayDate + "/" + this.userID + "/" + this.branchID + "/" + this.wrkno, {
      headers: options,
    }).subscribe(resp => {
      this.presentAlert('Alert', 'Successfully Reopened');
      this.router.navigate(['/completion-jobs']);
    }, error => {

      console.log(JSON.stringify(error));
    });
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
}

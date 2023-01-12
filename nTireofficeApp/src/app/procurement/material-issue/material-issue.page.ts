import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from 'src/app/Property_Pages/table-sample.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-material-issue',
  templateUrl: './material-issue.page.html',
  styleUrls: ['./material-issue.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialIssuePage implements OnInit {
  showviewlist: boolean = false
  showedit: boolean = false
  data: any = [];
  data1: any = [];
  showsearch: boolean = false;
  funtionID;
  branch_ID;
  branch;
  fromdate;
  todate;
  responseData;
  mode : any = true;
  mrscode;
  fromdate1;
  todate1;
  Statusselect : any = true;
  fromdate2;
  todate2;
  function;
  userID;
  usertype;
  username
  responseDatalength;
  currentqty;

  @ViewChild('firstTable') myTable1: MaterialIssuePage;
  @ViewChild('secondTable') myTable2: MaterialIssuePage;
  getresponse: any;
  getsetvalue: any;
  getstatusvalue: any;

  mrsCode;

  MaterialIssue;
  hidecount: boolean=false;
  showcount: boolean=false;
  Select: any;

  constructor(private router: Router,private modalCtrl: ModalController,private alertcontroller: AlertController, private datePipe: DatePipe, private http: HttpClient, private tableApi: TableSampleService,public Ipaddressservice: IpaddressService ) {
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');

    this.fromdate = this.datePipe.transform(this.fromdate, 'dd/MM/YYYY');
    this.todate = this.datePipe.transform(this.todate, 'dd/MM/YYYY');
    this.mode = "<< Select >>";

   }

  ngOnInit() {
this.mode = null;
this.Statusselect = 0;
  }
  IssueDetails(item : any){
    console.log(item);
    console.log(this.currentqty);
    this.router.navigate(['/issuedetails',item])

  }
  setValue(value:any){
    console.log(value)
    this.getsetvalue =value
  }
  setstatusvalue(value:any){
    this.getstatusvalue =value
  }

  SearchList() {
this.showviewlist = true;
if(this.mode == "<< Select >>" || this.mode == undefined){
  var MRSMODE = "0";
 }else{
  MRSMODE= this.mode;
 }
 if(this.Select == "<< Select >>" || this.Select == undefined){
  var MISTATUS = "0";
 }else{
  MISTATUS= this.Select;
 }
if(this.fromdate == "<< Select >>" || this.fromdate == undefined){
  var fromdate = "0";
 }else{
  this.fromdate2 = this.datePipe.transform(this.fromdate, 'dd/MM/YYYY');
  fromdate= this.fromdate2;
 }
 if(this.todate == "<< Select >>" || this.todate == undefined){
  var todate = "0";
 }else{
  this.todate2 = this.datePipe.transform(this.todate, 'dd/MM/YYYY');
  todate= this.todate2;
 }


let body =  {
  "FUNCTIONIDMI":this.funtionID,
  "BRANCHIDMI":this.branch_ID,
  "ITEM_CODEMI":"",
  "ITEM_REFMI":"",
  "ILT_REFMI":"",
  "SR_REFMI":"",
  "FROMDATEMI":fromdate,
  "TODATEMI":todate,
  "STATUSMI":MISTATUS,
  "ALPHANAMEMI":"",
  "SORTEXPRESSIONMI":"item_short_desc",
  "PAGEINDEXMI":0,
  "PAGESIZEMI":20,
  "SEARCH_TYPEMI":MRSMODE
}

    // const header = new Headers();
    // header.append("Content-Type", "application/json");
    // let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress1+
      this.Ipaddressservice.serviceerpapi+'MaterialIssueAllDetails' , body).subscribe((res:any) =>{
        console.log(res)
        this.MaterialIssue =res;
        this.responseData =this.MaterialIssue;
      console.log(this.responseData);

if(this.responseData == "null" || this.responseData == null || this.responseData == "")
{
  this.hidecount=true
  this.showcount =false

}
if(this.responseData != null)
{
  this.responseDatalength = this.responseData.length;
  this.showcount =true
  this.hidecount=false
}
      })


// Mode : Location

    // this.showviewlist = true
    // const header = new Headers();
    // header.append("Content-Type", "application/json");

    // let options = new HttpHeaders().set('Content-Type', 'application/json');
    // this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceerpapi+'MaterialIssueAllDetails',
    //   {
    //   headers: options,
    // }).subscribe(resp => {
    //    this.responseData = resp;
    //    console.log(this.responseData);
    //    this.responseDatalength = this.responseData.length;
    // }, error => {

    //   console.log(JSON.stringify(error));
    // });
  }

  async presentAlert(heading, tittle) {
    var alert = await this.alertcontroller.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert1(heading, tittle) {
    var alert = await this.alertcontroller.create({
      header: heading,
      cssClass: 'buttonCss',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }


  transCancel() {
    this.modalCtrl.dismiss();
  }

  edit() {
    this.showedit = true
  }

  Search() {
    this.showsearch = true
  }
}

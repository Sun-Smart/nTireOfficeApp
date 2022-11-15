import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  mode;
  mrscode;
  fromdate1;
  todate1;
  Status;
  fromdate2;
  todate2;
  function;
  userID;
  usertype;
  username
  responseDatalength;
  @ViewChild('firstTable') myTable1: MaterialIssuePage;
  @ViewChild('secondTable') myTable2: MaterialIssuePage;

  constructor(private modalCtrl: ModalController,private datePipe: DatePipe, private http: HttpClient, private tableApi: TableSampleService,public Ipaddressservice: IpaddressService ) {
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.username=localStorage.getItem('TUM_USER_NAME');


    this.fromdate = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
   }

  ngOnInit() {

  }

  setValue(value:any){
    console.log(value)
  }

  SearchList() {
    this.showviewlist = true;
    if(this.mode == "<< Select >>" || this.mode == undefined){
      var Mode = "null";
     }else{
      Mode= this.mode;
     }

     if(this.Status == "<< Select >>" || this.Status == undefined){
      var STATUS = 'null';
     }else{
      STATUS= this.Status
     }

     if(this.fromdate1 == "<< Select >>" || this.fromdate1 == undefined){
      var fromdate1 = 'null';
     }else{
      this.fromdate2 = this.datePipe.transform(this.fromdate, 'dd-MM-yyyy');
      fromdate1= this.fromdate2
     }

     if(this.todate1 == "<< Select >>" || this.todate1 == undefined){
      var todate1 = 'null';
     }else{
      this.todate2 = this.datePipe.transform(this.todate, 'dd-MM-yyyy');
      todate1= this.todate2
     }

     if(this.mrscode == undefined){
      var MRSCODE = 'null';
     }else{
       MRSCODE = this.mrscode;
     }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    var body = {

        FUNCTIONIDMI : this.funtionID,
        BRANCHIDMI :this.branch_ID,
        ITEM_CODEMI:"ITEM16",
        ITEM_REFMI:"",
        ILT_REFMI:"",
        SR_REFMI:"",
        FROMDATEMI:"19/07/2020",
        TODATEMI:"19/07/2022",
        STATUSMI:"0",
        ALPHANAMEMI:"",
        SORTEXPRESSIONMI:"item_short_desc",
        PAGEINDEXMI:0,
        PAGESIZEMI:20,
        SEARCH_TYPEMI:"MI"
       

    }
    this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceerpapi+'MaterialIssueAllDetails',
    {
      headers: options,
    }).subscribe(resp => {
       this.responseData = resp;
       console.log(this.responseData);
       this.responseDatalength = this.responseData.length;
    }, error => {

      console.log(JSON.stringify(error));
    });
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

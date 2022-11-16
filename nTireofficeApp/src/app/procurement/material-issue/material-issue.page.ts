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
  mode : any;
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
  getresponse: any;
  getsetvalue: any;
  getstatusvalue: any;

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
    this.getsetvalue =value
  }
  setstatusvalue(value:any){
    this.getstatusvalue =value
  }

  SearchList() {
this.showviewlist = true;




let body =  {
  "FUNCTIONIDMI":"1",
  "BRANCHIDMI":"1",
  "ITEM_CODEMI":"",
  "ITEM_REFMI":"",
  "ILT_REFMI":"",
  "SR_REFMI":"",
  "FROMDATEMI":this.fromdate,
  "TODATEMI":this.todate,
  "STATUSMI":this.getstatusvalue,
  "ALPHANAMEMI":"",
  "SORTEXPRESSIONMI":"item_short_desc",
  "PAGEINDEXMI":0,
  "PAGESIZEMI":20,
  "SEARCH_TYPEMI":this.getsetvalue
}

    // const header = new Headers();
    // header.append("Content-Type", "application/json");
    // let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress1+
      this.Ipaddressservice.serviceerpapi+'MaterialIssueAllDetails' , body).subscribe((res:any) =>{
        console.log(res)
        this.getresponse =res
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

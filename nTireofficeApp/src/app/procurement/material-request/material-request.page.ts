import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastmessageService } from 'src/app/service/toastmessage.service';
import { DatePipe } from '@angular/common';
import { IpaddressService } from 'src/app/ipaddress.service';

@Component({
  selector: 'app-material-request',
  templateUrl: './material-request.page.html',
  styleUrls: ['./material-request.page.scss'],
})
export class MaterialRequestPage implements OnInit {
  showbtn: boolean = true;
  showlineItems: boolean = false;
  showviewlist:boolean=false;
  hideviewlist:boolean=false;
  hidefilter:boolean=true;
  loading:boolean=false;
  mrscode;
  hidelineItems: boolean;
  visible:boolean = false;
  Additem:boolean = true;
  expenseArray = [];
  showlineItems1:boolean=true;
  shownewcard:boolean=true;
  ShowAllItem:boolean=true;
  Showcard:boolean=false;
  overallsubmit:boolean = false;
  submitview: boolean =false;
  initialSearch:boolean=true;
  overallsubmitnew:boolean=false;
  release=false;
  funtionID;
  branch_ID;
  branch;
  userID;
  usertype;
  fromdate;
  todate;
  priority;
  reasonrequest;
  requiredbefore;
  sno;
  itemcode;
  itemdepreciation;
  uom;
  unitprice;
  stockqty;
  requestqty;
  remarks;
  requestby;
  mrsdate;
  materialreqsearch: any;
  materialrequestsearch: any;
  data: any;
  todate2;
  fromdate2;
  status;
  cusstatus: any;

  constructor( private router :Router,private toastmessageservice :ToastmessageService,private datePipe: DatePipe, private HttpClient: HttpClient, private IpaddressService: IpaddressService)
  {
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.fromdate = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
    this.requestby = localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate());
    this.mrsdate = this.datePipe.transform(todayDate,'YYYY/MM/dd');
    console.log(this.mrsdate);
  }
  setValue(value:any){
    console.log(value)
    if(this.priority==1){
      let getdate = new Date();

      getdate.setDate(getdate.getDate());
      console.log(getdate);
      this.requiredbefore = this.datePipe.transform(getdate , 'yyyy-MM-dd')
      console.log(this.requiredbefore)
    }
    if(this.priority==2){
      let getdate = new Date();

      getdate.setDate(getdate.getDate()+2);
      console.log(getdate);
      this.requiredbefore = this.datePipe.transform(getdate , 'yyyy-MM-dd')
      console.log(this.requiredbefore)

    }
    if(this.priority==3){

      let getdate = new Date();

      getdate.setDate(getdate.getDate()+3);
      console.log(getdate);
      this.requiredbefore = this.datePipe.transform(getdate , 'yyyy-MM-dd')
      console.log(this.requiredbefore)

    }
    if(this.priority==4){

      let getdate = new Date();

      getdate.setDate(getdate.getDate()+1);
      console.log(getdate);
      this.requiredbefore = this.datePipe.transform(getdate , 'yyyy-MM-dd')
      console.log(this.requiredbefore)
    }
      }


  SearchItems(){
    this.showviewlist = true
    this.showbtn = true

    if(this.fromdate == "<< Select >>" || this.fromdate == undefined){
      var fromdate = 'null';
     }else{
      this.fromdate2 = this.datePipe.transform(this.fromdate, 'dd/MM/YYYY');
      fromdate= this.fromdate2;
     }

     if(this.todate == "<< Select >>" || this.todate == undefined){
      var todate = 'null';
     }else{
      this.todate2 = this.datePipe.transform(this.todate, 'dd/MM/YYYY');
      todate= this.todate2;
     }

     if(this.status == "<< Select >>" || this.status == undefined){
      var MRSTATUS = "0";
     }else{
      MRSTATUS= this.status;
     }

     if(this.cusstatus == "<< Select >>" || this.cusstatus == undefined)
     {
var cusstatus = "0";
     }
     else{
      cusstatus = this.status;
     }


    let body =
    {
        "FUNCTIONIDM": this.funtionID,
       "BRANCHM": this.branch_ID,
       "MRSCODEM":"MRS",
       "ITEMCODEM":"ITE",
       "DATEFROMM": fromdate,
       "DATETOM": todate,
        "STATUSM":MRSTATUS,
        "CUTSTATUSM":"",
       "MENUIDM":"",
        "PAGEINDEXM":0,
       "PAGESIZEM":10,
       "SORTEXPRESSIONM":"mrs_code",
       "ALPHANAMEM":"",
       "USERTYPEM":this.usertype,
        "USERIDM":this.userID
     }


this.HttpClient.post(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'MaterialRewuistionDetails',body).subscribe((res: any) => {
  this.materialrequestsearch = res;
  console.log(this.materialrequestsearch)
  this.materialreqsearch = this.materialrequestsearch.itemDetails;
})
  }


  Addnewitem(){
    // this.showlineItems1 = !this.showlineItems1;

    this.ShowAllItem = false;

    if(this.release ==true)
     {
      this.status= 'P';
     }
     else
     {
      this.status= 'N';
     }
  }

  onsubmit(){
    this.toastmessageservice.presentAlert1('saved successfully','this process is saved successfully')
    // this.showlineItems =!this.showlineItems;
    this.expenseArray=[];
    this.initialSearch=true;
    this.showlineItems=false;
    // this.showbtn = true
  // this.ngOnInit();

  }

  showline(){

    // this.showlineItems = false;
    this.Showcard = true;
    this.shownewcard =false;
    this.overallsubmit = true;
    this.submitview =!this.submitview;
    this.overallsubmitnew =true;
    this.expenseArray.push({


    })
    console.log(this.expenseArray)
    this.showbtn = true;
  }

  Searchlist(){
    debugger;
    // this.initialSearch =! this.initialSearch;
    // this.showfilter =! this.showfilter;
    this.showbtn = true;
  }

  Additems() {
    this.shownewcard=true
    this.ShowAllItem = false;
    this.overallsubmit=false;
    // this.shownewcard==!this.shownewcard
  }

  new(){
        // this.showlineItems = !this.showlineItems
    // this.showviewlist = false;
    // this.Showcard = false;
    this.overallsubmit=true;
    this.initialSearch = false;
    this.showlineItems = true;
    this.showbtn = false;
  }

  clear(){
    alert("67")

  }


  hideline(){
    this.hidelineItems=!this.hidelineItems
    // this.showfilter = !this.showfilter;
    // this.Additem = !this.Additem;
    // this.visible = !this.visible
  }

  submit(){
    this.showviewlist=true
    this.hideviewlist=true
  }

  togglefilter(){
    // this.showfilter = !this.showfilter;
    this.hidefilter = !this.hidefilter;
  }

  close(){
    this.reasonrequest='';
    this.priority = '';
    }

  Search() {
    this.loading=true

    this.showviewlist = true
    if(this.mrscode ==undefined){
      this.mrscode=''
    }}
}

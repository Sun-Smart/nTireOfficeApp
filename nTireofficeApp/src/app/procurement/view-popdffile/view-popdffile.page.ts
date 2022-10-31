import { DatePipe } from '@angular/common';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-view-popdffile',
  templateUrl: './view-popdffile.page.html',
  styleUrls: ['./view-popdffile.page.scss'],
})
export class ViewPOPDFFilePage implements OnInit {
  funtionID;
  branch_ID;
  fromdate;
  todate;
  branch;
  responseData: any;
  userID;
  usertype;
  responseDatalength: any;
  todate2;
  fromdate2;
  prscode;
  constructor( public Ipaddressservice: IpaddressService,private http: HttpClient,private datePipe: DatePipe) { 
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.fromdate = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
  }
 
  ngOnInit() {
    this.getCards();
  }

  getCards() {
    debugger;

    const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceerpapi+'Getodersummary?strbranch='+this.branch_ID+'&function='+this.funtionID+'&ponumber=null&vendorcode=null&fromdate=null&todate=null&status=null&itemcode=null&usertype=1&userid=1&pageIndex=1&pageSize=25&sortExpression=sortExpression&alphaname=null&prscode=null',{
                           
    headers: options,
  }).subscribe(resp => {
     this.responseData = resp;
     console.log(this.responseData);
     this.responseDatalength = this.responseData.length;
  }, error => {

    console.log(JSON.stringify(error));
  });

};
requestedJobs() {
  debugger;
 
 // this.responseData = {};
 if (this.prscode == "" || this.prscode == undefined){
  var PRSCODE ='null' ;
 }else{
     PRSCODE = this.prscode;
 }

 if(this.fromdate == "<< Select >>" || this.fromdate == undefined){
  var fromdate = 'null';
 }else{
  this.fromdate2 = this.datePipe.transform(this.fromdate, 'dd-MM-yyyy');
  fromdate= this.fromdate2;
 }

 if(this.todate == "<< Select >>" || this.todate == undefined){
  var todate = 'null';
 }else{
  this.todate2 = this.datePipe.transform(this.todate, 'dd-MM-yyyy');
  todate= this.todate2;
 }

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceerpapi+'Getodersummary?strbranch='+this.branch_ID+'&function='+this.funtionID+'&ponumber='+PRSCODE+'&vendorcode=null&fromdate='+this.fromdate+'&todate='+this.todate+'&status=null&itemcode=null&usertype=1&userid=1&pageIndex=1&pageSize=25&sortExpression=sortExpression&alphaname=null&prscode=null', {
                                                                                                                                                                                                                                                                  // &TASKTYPE=84&AssetCode=MT
    headers: options,
  }).subscribe(resp => {
    console.log(resp);
  
    this.responseData =resp;
    console.log(this.responseData);
    this.responseDatalength = this.responseData.length;
  

  }, error => {

    console.log(JSON.stringify(error));
  });
}

}

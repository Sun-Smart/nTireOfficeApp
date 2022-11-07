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
  responseDatalength;
  @ViewChild('firstTable') myTable1: MaterialIssuePage;
  @ViewChild('secondTable') myTable2: MaterialIssuePage;

  constructor(private modalCtrl: ModalController,private datePipe: DatePipe, private http: HttpClient, private tableApi: TableSampleService,public Ipaddressservice: IpaddressService ) {
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
  
    this.fromdate = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
   }

  ngOnInit() {
   
  }

  setValue(value:any){
    console.log(value)
  }

  SearchList() {
    this.showviewlist = true
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

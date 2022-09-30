import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-prsstatus',
  templateUrl: './prsstatus.page.html',
  styleUrls: ['./prsstatus.page.scss'],
})
export class PRSstatusPage implements OnInit {

  showfilter:boolean = true;
  showviewlist:boolean= false
  constructor( private router :Router, private Ipaddressservice:IpaddressService,private httpclient :HttpClient) {

    }

  ngOnInit() {
  }

  togglefilter(){
    this.showfilter = !this.showfilter;
  }
  next(){
    this.router.navigate(['/purchase-request'])
  }
  Search(){
    this.showviewlist=true
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpclient.get(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceerpapi+'get_PRS_search', {
                              // ?strfunction=1&branch=1&fdate=null&tdate=null&Status=P&drpcategory=null&drptype=null&TASKTYPE=null&AssetCode=null
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
    //   this.carddata=resp;
    //   this.responseData1 = JSON.parse(this.carddata);
    //   console.log(this.responseData1.length);
    // this.responseDatalength = this.responseData1.length;
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });





  }

}

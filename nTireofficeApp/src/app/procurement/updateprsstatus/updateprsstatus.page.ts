import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-updateprsstatus',
  templateUrl: './updateprsstatus.page.html',
  styleUrls: ['./updateprsstatus.page.scss'],
})
export class UpdateprsstatusPage implements OnInit {
  getParamID: any;
  prscode: any;
  status: any;
  todate: any;
  fromdate: any;
  getresponse: any;

  constructor( private router:Router ,private route:ActivatedRoute ,private httpclient :HttpClient,private Ipaddressservice:IpaddressService)

   {
    this.getParamID = this.route.snapshot.paramMap.get('id');
    console.log('this.getParamID ', this.getParamID);
   }

  ngOnInit() {
  }

  closemodal(){
    this.router.navigate(['/prsstatus'])
  }
  update(){

    console.log(this.prscode)
    console.log(this.status)
    console.log(this.todate)
    console.log(this.fromdate)
    if(this.prscode ==undefined){
      this.prscode=''
    }
    if(this.status ==undefined){
      this.status=''
    }
    if(this.todate ==undefined){
      this.todate=''
    }
    if(this.fromdate ==undefined){
      this.fromdate=''
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
      this.getresponse = res;
      console.log("Response", res)
      console.log("Response", res)

    })





  }

}

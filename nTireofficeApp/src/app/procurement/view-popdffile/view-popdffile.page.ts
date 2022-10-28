import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  constructor( public Ipaddressservice: IpaddressService,private http: HttpClient,private datePipe: DatePipe) { 
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
  
    this.fromdate = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
  }
 
  ngOnInit() {
  }

}

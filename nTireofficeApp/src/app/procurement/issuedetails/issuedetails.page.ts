import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-issuedetails',
  templateUrl: './issuedetails.page.html',
  styleUrls: ['./issuedetails.page.scss'],
})
export class IssuedetailsPage implements OnInit {
  funtionID;
  branch_ID;
  branch;
  fromdate;
  todate;
  constructor(private http: HttpClient,public Ipaddressservice: IpaddressService,private datePipe: DatePipe) { 
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
  
    this.fromdate = this.datePipe.transform(this.fromdate, 'dd/MM/YYYY');
    this.todate = this.datePipe.transform(this.todate, 'dd/MM/YYYY');
  }

  ngOnInit() {
  }
  SearchList(){

    let body =  {
      "FUNCTIONIDMIS":"1",
      "BRANCHIDMIS":"1",
      "LOCATION_IDMIS":"12",
      "BINMIS":"36",
      "ITEM_IDMIS":"1272",
      "ALPHANAMEMIS":"",
      "SORTEXPRESSIONMIS":"batch_serial_no desc",
      "PAGEINDEXMIS":0,
      "PAGESIZEMIS":10,
      "STOREEMIS":"165",
      "RACKEMIS":"5953"
    }
    
        // const header = new Headers();
        // header.append("Content-Type", "application/json");
        // let options = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post(this.Ipaddressservice.ipaddress1+
          this.Ipaddressservice.serviceerpapi+'MaterialIssueDetailsPopupSearch' , body).subscribe((res:any) =>{
            console.log(res)
         
          })

  }
}

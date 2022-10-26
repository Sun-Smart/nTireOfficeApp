import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-quick-receipt',
  templateUrl: './quick-receipt.page.html',
  styleUrls: ['./quick-receipt.page.scss'],
})
export class QuickReceiptPage implements OnInit {
  showfilter: boolean = true;
  branchlist1: Object;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.BranchLocationdata();
  }
  togglefilter(){
    this.showfilter = !this.showfilter
  }


  
BranchLocationdata() {

  const header = new Headers();
  header.append("Content-Type", "application/json");

  let options = new HttpHeaders().set('Content-Type', 'application/json');
  this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/getbranchid' , {
    headers: options,
  }).subscribe(resp => {
    this.branchlist1 = resp;
    console.log("brachdrop",this.branchlist1);
    
    // this.branchlist1 = JSON.parse(this.branchlist1);
    // console.log("branchlist1 one: " + JSON.stringify(this.branchlist1));

  }, error => {

    console.log("branchlist1 : " + JSON.stringify(error));
  });
}
}

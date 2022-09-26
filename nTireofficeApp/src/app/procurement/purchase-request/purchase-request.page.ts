import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.page.html',
  styleUrls: ['./purchase-request.page.scss'],
})
export class PurchaseRequestPage implements OnInit {
  showlineItems:boolean=true
  showviewlist:boolean=false
  showfilter:boolean=true
  constructor(private router :Router) { }

  ngOnInit() {
  }

  showline(){
    // this.showlineItems=true
    this.showviewlist=true
    this.showlineItems=!this.showlineItems
    // this.showfilter = !this.showfilter;
  }
  submit(){
    this.showviewlist=true
  }
  togglefilter(){
    this.showfilter = !this.showfilter;
  }
  close(){
    // window.location.reload()
    // this.router.navigate(['/purchase-request'])
    // this.showviewlist=true
    this.showlineItems=!this.showlineItems
  }

}

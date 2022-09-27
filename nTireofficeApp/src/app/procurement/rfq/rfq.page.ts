import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.page.html',
  styleUrls: ['./rfq.page.scss'],
})
export class RFQPage implements OnInit {
  showviewlist:boolean=false
  showrfq:boolean=false
  constructor(private router :Router) { }

  ngOnInit() {
  }
  Submit(){
    this.showviewlist=true
  }
  raiseRFQ(){
    this.showrfq=true
    this.showviewlist=false
  }
  manageRFQlink(){
    this.router.navigate(['/manage-rfq'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-request',
  templateUrl: './material-request.page.html',
  styleUrls: ['./material-request.page.scss'],
})
export class MaterialRequestPage implements OnInit {

  showlineItems:boolean=true
  showviewlist:boolean=false
  showfilter:boolean=true
  constructor( private router :Router) { }

  ngOnInit() {
  }



  showline(){
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
    // this.showviewlist=true
    this.showlineItems=!this.showlineItems

  }


}

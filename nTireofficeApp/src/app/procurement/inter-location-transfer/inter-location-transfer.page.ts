import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inter-location-transfer',
  templateUrl: './inter-location-transfer.page.html',
  styleUrls: ['./inter-location-transfer.page.scss'],
})
export class InterLocationTransferPage implements OnInit {
  showlineItems:boolean=true
  hidelineItems:boolean=false
  showfilter:boolean=true
  hidefilter:boolean=true
  showviewlist:boolean=false
  trforderno:String;


  loading:boolean=false
  constructor() { }

  ngOnInit() {
  }
  showline(){
    this.showlineItems=!this.showlineItems
    
    // this.showfilter = !this.showfilter;
  }
  close(){
    // this.showviewlist=true
    this.showlineItems=!this.showlineItems
    this.hidelineItems=!this.hidelineItems

  }
  togglefilter(){
    this.showfilter = !this.showfilter;
    this.hidefilter = !this.hidefilter;
  }
  Search() {
    this.loading=true
  
    this.showviewlist = true
    if(this.trforderno ==undefined){
      this.trforderno=''
    }}

}

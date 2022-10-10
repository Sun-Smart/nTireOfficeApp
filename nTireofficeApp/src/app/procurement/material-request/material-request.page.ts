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
  hideviewlist:boolean=false
  showfilter:boolean=true
  hidefilter:boolean=true
  loading:boolean=false
  mrscode:String;
  hidelineItems: boolean;
  visible:boolean = false
  Additem:boolean = true
  constructor( private router :Router) { }

  ngOnInit() {
  }



  showline(){
    this.showlineItems=!this.showlineItems
    
    // this.showfilter = !this.showfilter;
  }

   
  hideline(){
    this.hidelineItems=!this.hidelineItems
    // this.showfilter = !this.showfilter;
    // this.Additem = !this.Additem;
    // this.visible = !this.visible
  }
  submit(){
    this.showviewlist=true
    this.hideviewlist=true
  }

  togglefilter(){
    this.showfilter = !this.showfilter;
    this.hidefilter = !this.hidefilter;
  }
  close(){
    // this.showviewlist=true
    this.showlineItems=!this.showlineItems
    this.hidelineItems=!this.hidelineItems

  }
  Search() {
    this.loading=true
  
    this.showviewlist = true
    if(this.mrscode ==undefined){
      this.mrscode=''
    }}
    


}

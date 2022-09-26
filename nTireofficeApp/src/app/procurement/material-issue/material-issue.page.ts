import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-issue',
  templateUrl: './material-issue.page.html',
  styleUrls: ['./material-issue.page.scss'],
})
export class MaterialIssuePage implements OnInit {
  showviewlist:boolean=false
  constructor() { }

  ngOnInit() {
  }
  Submit(){
    this.showviewlist=true
  }



}

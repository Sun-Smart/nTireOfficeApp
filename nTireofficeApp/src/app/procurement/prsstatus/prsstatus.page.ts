import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prsstatus',
  templateUrl: './prsstatus.page.html',
  styleUrls: ['./prsstatus.page.scss'],
})
export class PRSstatusPage implements OnInit {

  showfilter:boolean = true;
  showviewlist:boolean= false
  constructor( private router :Router) { }

  ngOnInit() {
  }

  togglefilter(){
    this.showfilter = !this.showfilter;
  }
  next(){
    this.router.navigate(['/purchase-request'])
  }
  Search(){
    this.showviewlist=true
  }

}

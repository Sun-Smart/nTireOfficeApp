import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendorsdetails',
  templateUrl: './vendorsdetails.page.html',
  styleUrls: ['./vendorsdetails.page.scss'],
})

export class VendorsdetailsPage implements OnInit {

  showitemdetails_grid : boolean = true;
  showvendorlist_grid : boolean = false;
  value : any;
  constructor( private router :Router){}
  ngOnInit(): void {

  }
  close(){
    this.router.navigate(['/manage-rfq']);
  }

  add(){
    this.router.navigate(['/manage-rfq']);
    if(this.value == false)
    {
    this.showitemdetails_grid = true;
    this.showvendorlist_grid = true;
  }
  else
  {
    this.showitemdetails_grid = true;
    this.showvendorlist_grid = false;
  }
}
}


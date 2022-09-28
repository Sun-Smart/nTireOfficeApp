import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendorsdetails',
  templateUrl: './vendorsdetails.page.html',
  styleUrls: ['./vendorsdetails.page.scss'],
})
export class VendorsdetailsPage implements OnInit {


  constructor( private router :Router){}
  ngOnInit(): void {

  }
  close(){
    this.router.navigate(['/manage-rfq'])
  }

  add(){
      this.router.navigate(['/manage-rfq'])
  }

}


import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.page.html',
  styleUrls: ['./manage-rfq.page.scss'],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA]
})
export class ManageRfqPage implements OnInit {
  showvendorqrotation:boolean = false;
  showvendorqrotationaction:boolean = true;
  selectAllissue:boolean = false;
  selectAllvendor:boolean = false;


  constructor(private router: Router) { }

  ngOnInit() {
  }

  find() {
    this.router.navigate(['/vendorsdetails'])

  }
  // VendorQuotation() {
  //   // this.RequestVenderQuotation==true
  //   // showvendorqrotation
  // }
  RequestVenderQuotation() {
    this.showvendorqrotation = true;
    this.showvendorqrotationaction = false;
  }

  selectAllissueCheckbox(value) {
    console.log(value);
    if(value == false) {
      this.selectAllissue = true;
    }
    else {
      this.selectAllissue = false;
    }
  }

  selectAllvendorCheckbox(value) {
    console.log(value);
    if(value == false) {
      this.selectAllvendor = true;
    }
    else {
      this.selectAllvendor = false;
    }
  }
  back() {
    this.router.navigate(['/rfq'])
  }
  VendorQuotation(){

  this.router.navigate(['/vendor-quotation'])

  }
}

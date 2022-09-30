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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  find() {
    this.router.navigate(['/vendorsdetails'])

  }
  VendorQuotation() {
    // this.RequestVenderQuotation==true
    // showvendorqrotation
  }
  RequestVenderQuotation() {
    this.showvendorqrotation = true;
    this.showvendorqrotationaction = false;
  }

  back() {
    this.router.navigate(['/rfq'])
  }

}

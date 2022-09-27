import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.page.html',
  styleUrls: ['./manage-rfq.page.scss'],
})
export class ManageRfqPage implements OnInit {

  constructor( private router :Router) { }

  ngOnInit() {
  }

  find(){
    this.router.navigate(['/vendorsdetails'])

  }

}

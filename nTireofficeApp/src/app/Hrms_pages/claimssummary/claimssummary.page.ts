import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claimssummary',
  templateUrl: './claimssummary.page.html',
  styleUrls: ['./claimssummary.page.scss'],
})
export class ClaimssummaryPage implements OnInit {
  // router: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  cancel(){
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/claimsrequest'])
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pmsdashboard',
  templateUrl: './pmsdashboard.page.html',
  styleUrls: ['./pmsdashboard.page.scss'],
})
export class PmsdashboardPage implements OnInit {
  students: any[];
  constructor() { }

  ngOnInit() {
    // fetch('').then(res => res.json())
    //   .then(json => {
    //     this.students = json;
    //   });
  
  }

}

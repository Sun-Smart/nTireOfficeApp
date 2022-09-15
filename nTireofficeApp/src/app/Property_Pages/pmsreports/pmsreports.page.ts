import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pmsreports',
  templateUrl: './pmsreports.page.html',
  styleUrls: ['./pmsreports.page.scss'],
})
export class PmsreportsPage implements OnInit {

  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor() { }

  ngOnInit() {
  }

}

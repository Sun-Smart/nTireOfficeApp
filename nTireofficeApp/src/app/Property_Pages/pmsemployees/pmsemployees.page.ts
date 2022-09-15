import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pmsemployees',
  templateUrl: './pmsemployees.page.html',
  styleUrls: ['./pmsemployees.page.scss'],
})
export class PmsemployeesPage implements OnInit {

  username = window.localStorage.getItem('TUM_USER_NAME');

  constructor() { }

  ngOnInit() {
  }

}

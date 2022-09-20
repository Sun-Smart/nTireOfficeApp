import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onlineexamportal',
  templateUrl: './onlineexamportal.page.html',
  styleUrls: ['./onlineexamportal.page.scss'],
})
export class OnlineexamportalPage implements OnInit {
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToTestList(){
    this.router.navigateByUrl("hrmsonlineexam");
  }
  goToReport(){
    this.router.navigateByUrl("hrmsonlineexamreports");
  }
}

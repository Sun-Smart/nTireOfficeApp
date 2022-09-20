import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-online-exam-ctrl',
  templateUrl: './online-exam-ctrl.page.html',
  styleUrls: ['./online-exam-ctrl.page.scss'],
})

export class OnlineExamCtrlPage implements OnInit {
  urldata;
  insertreportcountobj1;
  ExamDetailsobj;
  NO_WRONG_ANSWER;
  constructor(private router:Router,private route:ActivatedRoute) {
    this.urldata = this.route.params.subscribe(params => {
      this.insertreportcountobj1=params.insertreportcountobj1;
      this.ExamDetailsobj=params.ExamDetailsobj;

       });
  }

  ngOnInit() {
  }
  goToHome(){
    this.router.navigateByUrl("hrmsonlineexamportal");

  }
}

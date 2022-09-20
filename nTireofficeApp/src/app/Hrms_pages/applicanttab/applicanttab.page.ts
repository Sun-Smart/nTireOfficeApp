import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicanttab',
  templateUrl: './applicanttab.page.html',
  styleUrls: ['./applicanttab.page.scss'],
})
export class ApplicanttabPage implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res);
  });
  }

  ngOnInit() {
  }

}

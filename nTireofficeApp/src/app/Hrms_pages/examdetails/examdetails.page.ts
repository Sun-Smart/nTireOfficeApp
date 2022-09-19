import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-examdetails',
  templateUrl: './examdetails.page.html',
  styleUrls: ['./examdetails.page.scss'],
})

export class ExamdetailsPage implements OnInit {
  urldata;
  item;
  constructor(private route:Router,private router: ActivatedRoute) {
    this.urldata = this.router.params.subscribe(params => {
    this.item=params.ExamDetailsobj;
    });
   }

  ngOnInit() {
  }
  startExam(data){
    this.route.navigate(['/hrmsonlineexamtimer', {
      data:data,
      ExamDetailsobj:this.item
            }])
  }
}

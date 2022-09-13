import { Component, OnInit } from '@angular/core';

import {TabparamserviceService} from '../../tabparamservice.service'

@Component({
  selector: 'app-pending-jobs-tabs',
  templateUrl: './pending-jobs-tabs.page.html',
  styleUrls: ['./pending-jobs-tabs.page.scss'],
})
export class PendingJobsTabsPage implements OnInit {
  
  constructor(private Tabparams:TabparamserviceService) { 
   
  }

  ngOnInit() {
  }

}

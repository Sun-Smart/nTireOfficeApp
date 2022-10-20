import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IpaddressService } from '../../service/ipaddress.service';
@Component({
  selector: 'app-pms-create-issue',
  templateUrl: './pms-create-issue.page.html',
  styleUrls: ['./pms-create-issue.page.scss'],
})
export class PmsCreateIssuePage implements OnInit {

  name: string;
  username = window.localStorage.getItem('TUM_USER_NAME');
  dataStatus: any;
  
  constructor(private modalCtrl: ModalController,private http: HttpClient, 
 
    public  Ipaddressservice: IpaddressService,) { }

  ngOnInit() {
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
  
// postmethod create issue,

createissue(){
  var data={
    
      "userid":1,
  "functionid":1,
  "branchid":1,
  "Priority":"4", 
  "pm_due_date":"11/10/2022",
  "drpPMType": "15",
  "txtDetails": "TEST",
  "assetownerid": "1",
  "assetid": "55",
  "assetcode":"PROCOM3327052022"  
  

  }
  this.http.post(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlProperty +'get_training_details',data ).subscribe((res: any) => {
    console.log(res)
    this.dataStatus = res
  })
}
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IpaddressService } from 'src/app/ipaddress.service';
import { ViewEncapsulation } from '@angular/core';
import { TableSampleService } from 'src/app/Property_Pages/table-sample.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatevendorquot',
  templateUrl: './updatevendorquot.page.html',
  styleUrls: ['./updatevendorquot.page.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UpdatevendorquotPage implements OnInit {
  showedit: boolean = false
  options = { checkboxes: true }
  data: any = [];

  constructor(private router: Router, private modalCtrl: ModalController, private http: HttpClient, private tableApi: TableSampleService) { }

  ngOnInit() {



  }

  transCancel() {
    this.modalCtrl.dismiss();
  }

  edit() {
    this.showedit = true
  }
  submit() {
    this.router.navigate(['/vendor-quotation'])

  }
  cancel() {


  }

}

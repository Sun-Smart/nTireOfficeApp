import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-additional-charges',
  templateUrl: './additional-charges.page.html',
  styleUrls: ['./additional-charges.page.scss'],
})
export class AdditionalChargesPage implements OnInit {
  showView: boolean = false;
  branchlist1: Object;


  constructor(private modalCtrl: ModalController, private http: HttpClient, ) { }

  ngOnInit() {
    this.BranchLocationdata();
  }
  submit() {
    debugger;
    this.showView = true;

  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  BranchLocationdata() {

    const header = new Headers();
    header.append("Content-Type", "application/json");
  
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/getbranchid' , {
      headers: options,
    }).subscribe(resp => {
      this.branchlist1 = resp;
      console.log("brachdrop",this.branchlist1);
      
      // this.branchlist1 = JSON.parse(this.branchlist1);
      // console.log("branchlist1 one: " + JSON.stringify(this.branchlist1));
  
    }, error => {
  
      console.log("branchlist1 : " + JSON.stringify(error));
    });
  }
}

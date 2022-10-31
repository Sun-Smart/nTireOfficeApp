import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.page.html',
  styleUrls: ['./manage-rfq.page.scss'],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA]
})
export class ManageRfqPage implements OnInit {
  showvendorqrotation: boolean = false;
  showvendorqrotationaction: boolean = true;
  selectAllissue: boolean = false;
  selectAllvendor: boolean = false;
  disabled : boolean = false;
  showitemdetails_grid : boolean = true;
  showvendorlist_grid : boolean = false;


  constructor(private router: Router, private alertcontroller: AlertController) { }

  ngOnInit() {
  }

  find() {
    this.router.navigate(['/vendorsdetails'])
  }

  // VendorQuotation() {
  //   this.RequestVenderQuotation==true
  //   showvendorqrotation
  // }

  RequestVenderQuotation() {
    // this.showvendorqrotation = true;
    // this.showvendorqrotationaction = false;
    this.presentAlert("", "Quotation Requested Successfully");
  }

  cancel(){
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/rfq'])
  }

  selectAllissueCheckbox(value) {
    console.log(value);
    if (value == false) {
      this.selectAllissue = true;
    }
    else {
      this.selectAllissue = false;
    }
  }

  selectAllvendorCheckbox(value) {
    console.log(value);
    if (value == false) {
      this.selectAllvendor = true;
    }
    else {
      this.selectAllvendor = false;
    }
  }
  back() {
    this.router.navigate(['/rfq'])
  }
  VendorQuotation() {

    this.router.navigate(['/vendor-quotation'])
  }

//   add(value)
//   {
//   if (value == false)
// {
//   this.showvendorlist_grid = false;
//   this.showitemdetails_grid = true;
// }
// else
// {
//   this.showvendorlist_grid = true;
//   this.showitemdetails_grid = true;
// }
// }

  async presentAlert(heading, tittle) {
    var alert = await this.alertcontroller.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
}

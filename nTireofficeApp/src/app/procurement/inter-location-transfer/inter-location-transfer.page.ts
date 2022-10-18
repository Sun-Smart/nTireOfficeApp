import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-inter-location-transfer',
  templateUrl: './inter-location-transfer.page.html',
  styleUrls: ['./inter-location-transfer.page.scss'],
})
export class InterLocationTransferPage implements OnInit {
  showlineItems: boolean = true
  hidelineItems: boolean = false
  showfilter: boolean = true
  hidefilter: boolean = true
  showviewlist: boolean = false
  trforderno: any;
  Itemcode:any;
  fromtrfdate:any;
  totrfdate:any;
  status:any;



  loading: boolean = false
  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  showline() {
    this.showlineItems = !this.showlineItems

    // this.showfilter = !this.showfilter;
  }
  close() {
    // this.showviewlist=true
    this.showlineItems = !this.showlineItems
    this.hidelineItems = !this.hidelineItems

  }
  togglefilter() {
    this.showfilter = !this.showfilter;
    this.hidefilter = !this.hidefilter;
  }
  Search() {
    this.loading = true

    this.showviewlist = true
    if (this.trforderno == undefined) {
      this.trforderno = ''
    }
  }
  submit() {
    this.showviewlist = true
    // this.hideviewlist=true
  }

  async clear() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to Cancel the Process',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.trforderno = "";
            this.Itemcode = "";
            this.fromtrfdate = "";
            this.totrfdate="";
            this.status="";
            // this.prscode = "";
            // this.status = "";
            // this.todate = "";
            // this.fromdate = "";
          }
        }
      ]
    });

    await alert.present();
  }
}

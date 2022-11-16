import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { IpaddressService } from './../../service/ipaddress.service';
import { HttprequestService } from '../../service/httprequest.service';


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
  Itemcode: any;
  fromtrfdate: any;
  totrfdate: any;
  status: any;
  loading: boolean = false
  transferid: string;
  transferrefer: string;
  release: string;
  Remarks: string;
  interlocation: any;
  toastmessageService: any;

  constructor(private alertController: AlertController, private httpclient: HttprequestService, private IpaddressService: IpaddressService) { }

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
      this.trforderno = "";
    }

if(this.Itemcode == undefined)
{
  this.Itemcode = "";
}

if(this.fromtrfdate == undefined)
{
  this.fromtrfdate = "";
}

  let body = {
  "FUNCTIONIDILT":"1",
  "BRANCHIDILT":"1",
  "FROMDATEILT":"",
  "TODATEILT":"",
  "STATUSILT":"",
  "MODEILT":"",
  "INTERREFILT":"",
  "STRITEMCODEILT":"",
  "ALPHANAMEILT":"",
  "SORTEXPRESSIONILT":"CodeDesc",
  "PAGEINDEXILT":0,
  "PAGESIZEILT":20
  }

    this.httpclient.PostRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'InterLocationTransferSummary', body).then((res: any) => {
      this.interlocation = res;
      console.log("Response", res);
      this.toastmessageService.presentAlert1("", "Career Details Removed");
    });

    if (this.trforderno == undefined) {
      this.trforderno = ''
    }
}


  submit() {
    this.showviewlist = true
    // this.hideviewlist=true
  }
  listline() {
    this.showlineItems = !this.showlineItems

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
            this.totrfdate = "";
            this.status = "";

          }
        }
      ]
    });

    await alert.present();
  }
  async clear1() {
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
            this.transferid = "";
            this.transferrefer = "";
            this.status = "";
            this.release = "";
            this.Remarks = "";

          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlert1 (heading, title)
  {
var alert = await this.alertController.create({
  header: heading,
  cssClass: 'buttonCss',
  backdropDismiss: false,
  message: title,
  buttons: ['OK']
});
await alert.present();
  }


}



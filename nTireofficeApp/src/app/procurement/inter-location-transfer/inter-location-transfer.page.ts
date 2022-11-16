import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { IpaddressService } from './../../service/ipaddress.service';
import { HttprequestService } from '../../service/httprequest.service';
import { DatePipe } from '@angular/common';


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
  fromdate;
  todate;
  function;
  branch;
  userID;
  usertype;
  username;
  funtionID;
  branch_ID;
  fromdate2;
  todate2;
  error: string;
  Response: any;
  res: any;

  constructor(private alertController: AlertController,private datePipe: DatePipe, private httpclient: HttprequestService, private IpaddressService: IpaddressService) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.username=localStorage.getItem('TUM_USER_NAME');
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')

    this.fromdate = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
    this.status = "<<select>>";
   }

  ngOnInit() {
    this.interlocation = [];
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
}else{

}
if(this.fromdate == "<< Select >>" || this.fromdate == undefined){
  var fromdate = "";
 }else{
  this.fromdate2 = this.datePipe.transform(this.fromdate, 'dd-MM-yyyy');
  fromdate= this.fromdate2
 }

 if(this.todate == "<< Select >>" || this.todate == undefined){
  var todate = "";
 }else{
  this.todate2 = this.datePipe.transform(this.todate, 'dd-MM-yyyy');
  todate= this.todate2
 }

if(this.status == "<<Select>>" || this.status == undefined){
  var locTransferStatus = null
}else{
  locTransferStatus = this.status
}


  let body = {
  "FUNCTIONIDILT":this.funtionID,
  "BRANCHIDILT":this.branch_ID,
  "FROMDATEILT":fromdate,
  "TODATEILT":todate,
  "STATUSILT": locTransferStatus,
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
      console.log("Response",res,res, this.interlocation);
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



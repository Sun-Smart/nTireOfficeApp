import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from 'src/app/ipaddress.service';
import { PmsCreateIssuePage } from '../pms-create-issue/pms-create-issue.page';
import { PmsIssueStatusPage } from '../pms-issue-status/pms-issue-status.page';
declare var google: any;

@Component({
  selector: 'app-pmscustomer',
  templateUrl: './pmscustomer.page.html',
  styleUrls: ['./pmscustomer.page.scss'],
})
export class PmscustomerPage implements OnInit {

  name: string = '';
  username: any;
  filterTerm: string;
  showfilter: boolean = true;


  Propertyname;
  Propertycode;
  Location
  branchcode: any;
  branchid: any;
  userId: any;

  strFunctionId
  strLocationId
  strPropertyId
  strPropertyDesc
  rentelCode
  strStatus
  pageIndex
  pageSize
  sortExpression
  alphaname
  Split_ID
  strusertype


  usertype: any;
  function: any;
  branch: any;
  functionID: any;



  constructor(private modalCtrl: ModalController, 
    public alertController: AlertController, 
    private http: HttpClient, 
    public Ipaddressservice: IpaddressService) {}


  ngOnInit() {

    this.userId = window.localStorage['TUM_USER_ID'],
    console.log(this.userId);
    this.branchcode = window.localStorage['TUM_BRANCH_CODE']
    console.log(this.branchcode);
    
    this.branchid = window.localStorage['TUM_BRANCH_ID']
    console.log(this.branchid);
    this.strFunctionId = window.localStorage['FUNCTION_ID']
    this.strusertype = window.localStorage['TUM_USER_TYPE']

  }
  async createModal() {

    const model = await this.modalCtrl.create({

      component: PmsCreateIssuePage,
    });
    return await model.present();
    const { data, role } = await model.onWillDismiss();

    if (role === 'confirm') {
      this.name = data;

    }
  }

  async viewModal() {
    const model = await this.modalCtrl.create({

      component: PmsIssueStatusPage,
    });
    return await model.present();
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  }

  propertyCodE(e) {

    var body = {
      userid: this.userId,
      strBranchId: this.branchid
      // "strFunctionId"

      // "strLocationId"
      // "strPropertyId"
      // "strPropertyDesc";
      // "rentelCode";
      // "strStatus";
      // "pageIndex";
      // "pageSize";
      // "sortExpression";
      // "alphaname";
      // "Split_ID";
      // "strusertype";
    }

    if (this.Location == '' || this.Location == "" || this.Location == undefined) {
      this.Location = 0

    }

    if (this.Propertycode == '' || this.Propertycode == "" || this.Propertycode == undefined) {
      this.Propertycode = 0
    }

    if (this.Propertyname == '' || this.Propertyname == "" || this.Propertyname == undefined) {
      this.Propertyname = 0
    }

    if (this.strPropertyDesc == '' || this.strPropertyDesc == "" || this.strPropertyDesc == undefined) {
      this.strPropertyDesc = 0
    }



    this.http.get('https://demo.herbie.ai/nTireMobileCoreAPI/api/Property/fm_rental_summary/' + this.strFunctionId + '/' + this.branchid + '/' + this.branchcode
      + '/' + this.Propertycode + '/' + this.strPropertyDesc + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + this.strusertype + '/' + this.userId
    ).subscribe((res: any) => {
      console.log(res);
      let data = JSON.stringify(res)
      console.log(data)

    })

  }


}

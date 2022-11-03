import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-pms-issue-status',
  templateUrl: './pms-issue-status.page.html',
  styleUrls: ['./pms-issue-status.page.scss'],
})
export class PmsIssueStatusPage implements OnInit {

  username = window.localStorage.getItem('TUM_USER_NAME');
  functionID: any;
  userID: any;
  branchID: any;
  propertyCodeResult: any;
  branch: any;
  branchlocation: any;
  propertycode: any;
  propertyId: any;
  getStatus: any;
  propertyID: any;
  viewStatus: any;
  isViewStatusCard: boolean;
  shownoRec: boolean;

  constructor(private modalCtrl: ModalController,
    public alertController: AlertController,
    private http: HttpClient,
    public Ipaddressservice: IpaddressService, private navParams: NavParams) { }

  ngOnInit() {
    this.viewStatus = this.navParams.get('Data');
    console.log(this.viewStatus);
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');

    this.getIssueStatus();
  }


  getIssueStatus() {

    this.propertyId = this.viewStatus.property_id;
    console.log(this.propertyId);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlProperty + 'getissuestatus/' + this.functionID + '/' + this.branchID + '/' + this.propertyId, {
      headers: options,
    }).subscribe(resp => {
    
      this.getStatus = resp;
      console.log(this.getStatus);

      if(this.getStatus = null){
        this.isViewStatusCard = false;
      }else{
        this.isViewStatusCard = true;
      }

    });
  };




  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}

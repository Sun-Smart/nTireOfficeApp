import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-department-wise-model',
  templateUrl: './department-wise-model.page.html',
  styleUrls: ['./department-wise-model.page.scss'],
})
export class DepartmentWiseModelPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;
  username:any;
  sub;
  deptId;
  locId;
  brnchnme;
  detailfinalsmodals;
  departmentDetails: Object;
  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('id');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username=localStorage.getItem('TUM_USER_NAME');
   }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {  
      this.deptId = params['deptId'];   
      this.locId = params['locId'];
      this.brnchnme =  params['brnchnme'];
      this.deptDetails();
    });  
  }

  deptDetails(){
    var datafinalm = {
      'depidm': this.deptId,
      'locidm': this.locId,
      'branchdescp':this.brnchnme,
      'funnme':this.function,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
 
    }

    console.log(datafinalm);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetdepatmentwiselocationmodal',datafinalm, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detailfinalsmodals = resp;
   this.departmentDetails = resp;
      console.log(this.detailfinalsmodals);
  
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }
}

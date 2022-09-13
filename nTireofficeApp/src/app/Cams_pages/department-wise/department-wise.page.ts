import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import { ActivatedRoute} from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-department-wise',
  templateUrl: './department-wise.page.html',
  styleUrls: ['./department-wise.page.scss'],
})
export class DepartmentWisePage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  ZoneLoc;
  detailz;
  ZONE_DESC;
  locationlistnew =[];
  detailregion;
  region;
  detailbranch;
  branchLoc;
  detaildepatment;
  locationchk;
  depatment;
  location;
  detailfinals;
  username:any;
  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username=localStorage.getItem('TUM_USER_NAME');
    this.getZone();
    this.getDepartment();
    this.getLocation();

    this.ZoneLoc="<< Select >>";
    this.region="<< Select >>";
    this.branchLoc="<< Select >>";
    this.depatment="<< Select >>";
    this.location="<< Select >>";
   }

  ngOnInit() {
  }

  doRefresh(event){
    this.getZone();
    this.getDepartment();
    this.getLocation();

    this.ZoneLoc="<< Select >>";
    this.region="<< Select >>";
    this.branchLoc="<< Select >>";
    this.depatment="<< Select >>";
    this.location="<< Select >>";
    this.detailfinals=[];
    event.target.complete();
  }
  getZone(){
    var data = {
      'functionidrep': this.functionID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationzone',data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detailz = resp;

      for (var i = 0; i < this.detailz.length; i++) {
        // console.log($scope.all_items[i]);
        // $scope.locationlistnew.push($scope.asstdtlocation.detailz[i].ZONE_DESC);
        this.ZONE_DESC= this.detailz[i].zoneid + '--' + this.detailz[i].ZONE_DESC;
        this.locationlistnew.push(this.ZONE_DESC);
     
    }

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }

  getDepartment(){
    var data = {
      'functionidrep': this.functionID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationdeparment',data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detaildepatment = resp;

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }

  getLocation(){
    var data = {
      'functionidrep': this.functionID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationarea',data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.locationchk = resp;

    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }

  selzone(){
    var dataz = {
      'functionidrep': this.functionID,
      'zoneid': this.ZoneLoc,
      'access_token': this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(dataz);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationregion',dataz, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detailregion= resp;
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });

  }

  selregion(){
    var dataz = {
      'functionidrep': this.functionID,
      'zoneid': this.ZoneLoc,
      'regionid' : this.region,
      'access_token': this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(dataz);
    if (this.ZoneLoc != '' || this.ZoneLoc != undefined)  {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationbranch',dataz, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detailbranch= resp;
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }else{
    this.presentAlert("Alert","Select Zone");
  }
  }

  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
  
      message: tittle,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  processlocationreport(){

    if(this.ZoneLoc == undefined || this.ZoneLoc == '<< Select >>'){
      var LocZone= '';
    }else{
      LocZone= this.ZoneLoc;
    }

    if(this.region == undefined || this.region == '<< Select >>'){
      var region1= '';
    }else{
      region1= this.region;
    }

    if(this.branchLoc == undefined || this.branchLoc == '<< Select >>'){
      var branchLoc1= '';
    }else{
      branchLoc1= this.branchLoc;
    }

    if(this.depatment == undefined || this.depatment == '<< Select >>'){
      var depatment1= '';
    }else{
      depatment1= this.depatment;
    }

    if(this.location == undefined || this.location == '<< Select >>'){
      var location1= '';
    }else{
      location1= this.location;
    }
    var datafinal = {
      'functionidrep': this.functionID,
      'fzoneid': LocZone,
      'fregionid': region1,
      'fbranchid': branchLoc1,
      // 'fassetcatid':$scope.asstdtlocation.category,
      // 'fassetsubcatid':$scope.asstdtlocation.subcategory,
      'depatmentid': depatment1,
      'locationidd': location1,
      'access_token':window.localStorage['token'],
      'userid':this.userID,
      'usertoken':this.userToken


    }
    console.log(datafinal);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetdepatmentwiselocation',datafinal, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detailfinals = resp;
      //$scope.detailsdept = response.data.recordsets[1];
      console.log(this.detailfinals);
     // var al = $scope.detailfinals;
     // console.log(al);
      if (this.detailfinals.length < 1) {
        this.presentAlert('Alert','No Data Found');
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    });
  }

  departmodaldttls(deptId:any,locId:any,brnchnme:any){
    console.log(deptId);
    console.log(locId);
    console.log(brnchnme);
    this.router.navigate(['/department-wise-model',{'deptId': deptId,'locId':locId,'brnchnme':brnchnme}]);
    }
}

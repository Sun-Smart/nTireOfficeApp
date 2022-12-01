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
    this.branchID = localStorage.getItem('id');
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
    this.getCards();
  }
  getCards(){
    var datafinal = {
      'functionidrep': this.functionID,
      'fzoneid': 0,
      'fregionid':0,
      'fbranchid': 0,
      // 'fassetcatid':$scope.asstdtlocation.category,
      // 'fassetsubcatid':$scope.asstdtlocation.subcategory,
      'depatmentid': 0,
      'locationidd':0,
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
 
  resetlocationreport(){

    this.ZoneLoc="<< Select >>";
    this.region="<< Select >>";
    this.detailregion=[];
    this.branchLoc="<< Select >>";
    this.detailbranch=[];
    this.depatment="<< Select >>";
    this.detaildepatment=[];
    this.location="<< Select >>";
    this.locationchk=[];
    this.detailfinals= ''||[];

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
      'zoneid': parseInt(this.ZoneLoc),
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
      'zoneid': parseInt(this.ZoneLoc),
      'regionid' : parseInt(this.region),
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
      cssClass:'buttonCss',
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass:'Cssbutton',
      backdropDismiss:false,
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
      var region1= '0';
    }else{
      region1= this.region;
    }

    if(this.branchLoc == undefined || this.branchLoc == '<< Select >>'){
      var branchLoc1= '0';
    }else{
      branchLoc1= this.branchLoc;
    }

    if(this.depatment == undefined || this.depatment == '<< Select >>'){
      var depatment1= '0';
    }else{
      depatment1= this.depatment;
    }

    if(this.location == undefined || this.location == '<< Select >>'){
      var location1= '0';
    }else{
      location1= this.location;
    }
    var datafinal = {
      'functionidrep': this.functionID,
      'fzoneid': parseInt(LocZone),
      'fregionid': parseInt(region1),
      'fbranchid': parseInt(branchLoc1),
      // 'fassetcatid':$scope.asstdtlocation.category,
      // 'fassetsubcatid':$scope.asstdtlocation.subcategory,
      'depatmentid': parseInt(depatment1),
      'locationidd': parseInt(location1),
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

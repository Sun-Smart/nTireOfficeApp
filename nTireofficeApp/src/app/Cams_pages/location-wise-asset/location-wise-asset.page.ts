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
  selector: 'app-location-wise-asset',
  templateUrl: './location-wise-asset.page.html',
  styleUrls: ['./location-wise-asset.page.scss'],
})
export class LocationWiseAssetPage implements OnInit {
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
  detailcategory;
  detailregion;
  region;
  detailbranch;
  category;
  detailsubcategory;
  branchLoc;
  subcategory;
  detailfinals;
  detailfinalsLength;
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
    this.getAssetLocationCategory();

    this.ZoneLoc="<< Select >>";
    this.region="<< Select >>";
    this.branchLoc="<< Select >>";
    this.category="<< Select >>";
    this.subcategory="<< Select >>";
    
   }

  ngOnInit() {
  }

  doRefresh(event){
    this.getZone();
    this.getAssetLocationCategory();
    this.detailfinals=[];
    this.ZoneLoc="<< Select >>";
    this.region="<< Select >>";
    this.branchLoc="<< Select >>";
    this.category="<< Select >>";
    this.subcategory="<< Select >>";

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

  getAssetLocationCategory(){
    var data = {
      'functionidrep': this.functionID,
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationcategory',data, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detailcategory = resp;

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
      message: tittle,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  selcatdrop(){
    var datac = {
      'functionidrep': this.functionID,
      'categoryid': parseInt(this.category),
      'access_token': this.accessToken,
      'userid': this.userID,
      'usertoken':this.userToken
    }
    console.log(datac);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetlocationsubcategory',datac, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detailsubcategory= resp;
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    }); 
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

    if(this.category == undefined || this.category == '<< Select >>'){
      var category1= '';
    }else{
      category1= this.category;
    }

    if(this.subcategory == undefined || this.subcategory == '<< Select >>'){
      var subcategory1= '';
    }else{
      subcategory1= this.subcategory;
    }
    var datafinal = {
      'functionidrep': this.functionID,
      'fzoneid': parseInt(LocZone),
      'fregionid': parseInt(region1),
      'fbranchid': 1,
      'fassetcatid': parseInt(category1),
      'fassetsubcatid': parseInt(subcategory1),
      'access_token':window.localStorage['token'],
      'userid':this.userID,
      'usertoken':this.userToken
    }
    console.log(datafinal);

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/assetloctionfilterfinal',datafinal, {
      headers: options,
    }).subscribe(resp => {
      console.log(resp)
      this.detailfinals= resp;
      this.detailfinalsLength= this.detailfinals.length;
      if (this.detailfinals.length < 1) {
        this.presentAlert("Alert","No Data Found");
      }
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));

    }); 
  }

  resetlocationreport(){
    this.ZoneLoc='';
    this.region='';
    this.branchLoc='';
    this.category='';
    this.subcategory='';
    this.detailfinals= '';

  }

  showmore(idvalue) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "block");
    $("#imageidvalsp" + idvalue).hide();
}
showless(idvalue) {
    //        alert(idvalue);
    $("#dividvalsp" + idvalue).css("display", "none");
    $("#imageidvalsp" + idvalue).show();
};
}

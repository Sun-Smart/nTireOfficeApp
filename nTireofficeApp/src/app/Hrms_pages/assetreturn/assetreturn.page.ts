import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute} from '@angular/router';
declare var $;
@Component({
  selector: 'app-assetreturn',
  templateUrl: './assetreturn.page.html',
  styleUrls: ['./assetreturn.page.scss'],
})
export class AssetreturnPage implements OnInit {
  userId;
  usertoken;
  token;
  RecoveryReason1;
  RecoveryReason=[];
  reason;
  recoveryReason;
  amount;
  allreturnAsset1;
  allreturnAsset=[];
  RequestRef;
  AssetReturnRefshow;
  AssetReturnshow;
  company;
  recoveryval;
  urldata;
  name;
  AssetTransfernew;
  FRMBRANCH;
  ASSETCODEASSETDESCRIPTION;
  TOBRANCH;
  TRANSFERTYPE;
  RequestDate;
  Status;
  workflow_no;
  username = window.localStorage.getItem('TUM_USER_NAME');
  nodata:boolean;
  constructor(private route:ActivatedRoute,private router: Router,private datepipe: DatePipe,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.company = window.localStorage['FUNCTION_DESC'];
    this.name = window.localStorage['TUM_USER_NAME'];
    this.recoveryval="";
    this.recoveryReason="";
  //   this.urldata = this.route.params.subscribe(params => {
  //     this.AssetTransfernew=JSON.parse(params.item);
  //     console.log(""+this.AssetTransfernew)
  //     this.RequestRef=this.AssetTransfernew.RequestRef;
  //     //this.ASSET_CODE=this.AssetTransfernew.ASSET_CODE;
  //    // this.ASSET_ID=this.AssetTransfernew.ASSET_ID;
  //     //this.ASSET_USER=this.AssetTransfernew.ASSET_USER;
  //     //this.Text=this.AssetTransfernew.Text;
  //     this.ASSETCODEASSETDESCRIPTION=this.AssetTransfernew.ASSETCODEASSETDESCRIPTION;

  //       this.FRMBRANCH=this.AssetTransfernew.FRMBRANCH;
  //       // console.log(this.RequestDate);
  //       this.TOBRANCH=this.AssetTransfernew.TOBRANCH;
  //       this.TRANSFERTYPE=this.AssetTransfernew.TRANSFERTYPE;
  //       this.RequestDate=this.AssetTransfernew.RequestDate;
  //    //   this.REASON=this.AssetTransfernew.REASON;
  //       this.Status=this.AssetTransfernew.Status;
  //       this.workflow_no=this.AssetTransfernew.workflow_no;
  //  });


    if(this.RequestRef!=undefined){
      this.AssetReturnRefshow=true;
      this.AssetReturnshow=false;
    }
    else{
      this.AssetReturnRefshow=false;
      this.AssetReturnshow=true;
    }
    this.getDisplaydata();
    this.SearchAssetReturns();
  }

  ngOnInit() {
  }
  getDisplaydata(){
    var obj1={
      userid:this.userId,
      usertoken:this.usertoken,
      access_token:this.token
     }
     this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getRecoveryReason/",obj1).then(resp=>{
     this.RecoveryReason1=resp;
     this.RecoveryReason1.forEach(element => {
       this.RecoveryReason.push(element);
     });
    }, error => {
    console.log("error : "+JSON.stringify(error));
    });
  }
showMoreDetail(index){

    $("#"+index).toggle();
  }
  ProcessAssetReturn(data){
    var assetobj={
      FUNCTION_ID:data.eim_inf_domain_id,
      asset_id:data.InfId,
      ir_reason:this.reason,
      ir_updated_by:this.userId,
      BRANCH_ID:data.eim_branch_id,
      created_by:this.userId,
      ir_recovery_reason:'this.recoveryReason',
      ir_amount:this.amount,
      userid:this.userId,
           usertoken:window.localStorage['usertoken'],
           access_token:window.localStorage['token']
    }
    // console.log(assetobj);
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getAssetReturnsInsert/",assetobj).then(resp=>{
      if(resp="Successfully Updated"){
        this.toastmessageService.presentAlert1("","Successfully Updated")
         this.SearchAssetReturns();
         this.reason="";
         this.recoveryval="";
         this.amount="";
         this.recoveryReason="";
      }
     }, error => {
      if(error.error.text="Successfully Updated"){
        this.toastmessageService.presentAlert1("","Successfully Updated")
         this.SearchAssetReturns();
      }
     console.log("error : "+JSON.stringify(error));

     });
  }
  SearchAssetReturns(){
    this.allreturnAsset1;
    this.allreturnAsset=[];
    var assetobj={
	  	// ZoneID:data.zoneid,
	  	// BranchID:data.branchid,
        userid:this.userId,
        usertoken:this.usertoken,
        access_token:this.token
      }
      this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getAssetReturnsData/",assetobj).then(resp=>{

        this.allreturnAsset1=resp;
       this.allreturnAsset1.forEach(element => {
        this.allreturnAsset.push(element);
       });
       console.log(this.allreturnAsset);
       if(this.allreturnAsset.length == 0) this.nodata = true;
       }, error => {

       console.log("error : "+JSON.stringify(error));

       });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { ModalController,NavParams } from '@ionic/angular';
import { element } from 'protractor';

@Component({
  selector: 'app-reapplyasset',
  templateUrl: './reapplyasset.page.html',
  styleUrls: ['./reapplyasset.page.scss'],
})
export class ReapplyassetPage implements OnInit {
  company: any;
  FUNCTION_ID: any;
  empID: any;
  categoryData=[];
  assestsubCategory: string;
  subCategoryData: any[];
  assestCategory: string;
  userID: any;
  token: any;
  usertoken: any;
  em_emp_id: any;
  name: any;
  empCode: any;
  branch: any;
  item: any;
  returnDate: any;
  reqbeforedte: any;
  reqID: string;
  workflowTable: string;
  release=false;
  reqtype: string;


  constructor(private model:ModalController,public navParams: NavParams,public modalController: ModalController,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService) {
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.token=window.localStorage['token'];
    this.userID = window.localStorage['TUM_USER_ID'];
    this.usertoken= window.localStorage['usertoken'];
    this.em_emp_id=window.localStorage['em_emp_id'];
    this.name = window.localStorage['TUM_USER_NAME'];
    this.empCode= window.localStorage['TUM_EMP_CODE'];
    // console.log(this.coff.name);
    // this.validate = validate;
    this.company = window.localStorage['FUNCTION_DESC'];
    console.log(this.company);
    this.branch=window.localStorage['TUM_BRANCH_CODE'];
    this.item=navParams.get('item');
    this.item.RequestDate = new Date(this.item.RequestDate).toLocaleDateString().split('/');
    this.item.RequestDate = this.item.RequestDate[2]+'-'+this.item.RequestDate[0]+'-'+this.item.RequestDate[1];
    this.item.RequiredBefore = new Date(this.item.RequiredBefore).toLocaleDateString().split('/');
    this.reqbeforedte = this.item.RequiredBefore[2]+'-'+this.item.RequiredBefore[0]+'-'+this.item.RequiredBefore[1];
    this.item.ReturnDate = new Date(this.item.ReturnDate).toLocaleDateString().split('/');
    this.returnDate = this.item.ReturnDate[2]+'-'+this.item.ReturnDate[0]+'-'+this.item.ReturnDate[1];


    console.log(""+JSON.stringify(this.item));
    this.getAssetCategory();

  }

  ngOnInit() {
  }

  closemodel(index) {
    if (index == 1) {
      // this.modal1.hide();
      // modalCtrl.dismiss();
      this.model.dismiss('cancel');
    } else if (index == 3) {
      this.model.dismiss('cancel');
      // modalCtrl.dismiss();
    } else {
      this.model.dismiss('cancel');
      // modalCtrl.dismiss();
    }
  };

  getAssetCategory(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "LoadAssetCategory/"+this.FUNCTION_ID+ "").then(resp=>{
      this.categoryData = JSON.parse(resp.toString());
      this.categoryData.forEach(element=>{
        if(element.Text == this.item.AssetCategory){
          this.item.AssetCategory = element.id;
          this.assestCategory = element.id;
        }
      })
      this.getAssestsSubcat(this.assestCategory);
      console.log(""+ JSON.stringify(this.categoryData));
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  //get assests sub category
  getAssestsSubcat(val){
    this.subCategoryData=[];
    this.assestsubCategory="";
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "LoadAssetSubCategory/"+this.FUNCTION_ID +"/"+ this.assestCategory).then(resp=>{
      this.subCategoryData = JSON.parse(resp.toString());
      this.subCategoryData.forEach(element=>{
        if(element.Text == this.item.SubCategory){
          this.item.SubCategory = element.id;
          this.assestsubCategory = element.id;
        }
      })
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }


  assestsSubmit() {
    // if ($scope.assetData.status == undefined) {
    //   $scope.assetData.status = "N";
    // }
    // console.log($scope.assetData);
    if(this.release ==true)
    {
     this.item.Status= 'P';
    }
    else{
     this.item.Status= 'N';
    }

    this.returnDate = this.returnDate.split('-');
    this.returnDate = this.returnDate[2]+'-'+this.returnDate[1]+'-'+this.returnDate[0];

    this.reqbeforedte =  this.reqbeforedte.split('-');
    this.reqbeforedte = this.reqbeforedte[2]+'-'+this.reqbeforedte[1]+'-'+this.reqbeforedte[0];
    this.item.RequestDate =  this.item.RequestDate.split('-');
    this.item.RequestDate = this.item.RequestDate[2]+'-'+this.item.RequestDate[1]+'-'+this.item.RequestDate[0];
  console.log(""+this.returnDate+""+this.reqbeforedte+''+this.item.RequestDate);

    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "SaveAssets/"+ window.localStorage['FUNCTION_ID'] +"/"+ window.localStorage['TUM_BRANCH_ID'] +"/"+this.item.ReqRef+ "/" + window.localStorage['em_emp_id'] + "/" +this.item.RequestDate+'/'+this.assestCategory+'/'+this.assestsubCategory+'/'+this.returnDate+'/'+this.reqbeforedte+'/'+this.item.Reason+'/'+this.item.Status).then(resp=>{
      this.subCategoryData = JSON.parse(resp.toString());

      if(resp !='')
      {
        var replace = resp.toString().replace(/"/g, '');
        var split = replace.split("@");
        this.reqID = split[0];
        this.workflowTable = split[2];
        // console.log(split[1]);
        this.userID = this.userID;
        this.toastmessageService.presentAlert1("Request Sent","Asset Updated Successfully <br> Req Ref : " +this.reqID);
        this.model.dismiss();
        this.reqtype = 'null';
        if (this.item.Status == "P") {
          this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms1+"WorkFlowAuth/" + this.reqID + "/" + this.reqtype + "/null/null/" + this.userID + "/1/" + this.workflowTable).then(resp=>{
            this.closemodel(1);
          }, error => {

          console.log("error : "+JSON.stringify(error));
          this.closemodel(1);
          });
        }
      }
     }, error => {

     console.log("error : "+JSON.stringify(error));
     this.closemodel(1);
     });



  };

}

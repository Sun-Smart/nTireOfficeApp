import { Component, OnInit } from '@angular/core';
import {HttprequestService} from '../../service/httprequest.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IpaddressService} from '../../ipaddress.service';
import {NavParams} from '@ionic/angular';
import { AlertController,LoadingController,ModalController} from '@ionic/angular';

@Component({
  selector: 'app-deny-screen',
  templateUrl: './deny-screen.page.html',
  styleUrls: ['./deny-screen.page.scss'],
})
export class DenyScreenPage implements OnInit {
  item: any;
  deny = {
    userID:'',
    userTypeID:'',
    reqNo:'',
    Txn_password:'',
    comment:'',
  }
  approvals = {
    reqType: '',
    requestno: '',
    requestBy: '',
    status: ''

  };
  approvedResult: string;
  configid: string;

  constructor(private HttpRequest:HttprequestService,private http: HttpClient,public Ipaddressservice:IpaddressService,navParams: NavParams,public alertController: AlertController,public modalCtrl: ModalController) {
    this.item=navParams.get('item');
    console.log(""+this.item);
    // alert(""+JSON.stringify(this.item))



  ;
   this.deny.userID = window.localStorage['TUM_USER_ID'];
    this.deny.userTypeID = window.localStorage['TUM_USER_TYPE'];
    this.deny.reqNo = this.item.workflow_no;
  }

  ngOnInit() {
  }


  closeModal(index) {
    if (index == 1) {
      // $scope.modal1.hide();
      // modalCtrl.dismiss();
      this.modalCtrl.dismiss('cancel');
    } else if (index == 3) {
      this.modalCtrl.dismiss('cancel');
      // modalCtrl.dismiss();
    } else {
      this.modalCtrl.dismiss('cancel');
      // modalCtrl.dismiss();
    }
  };

  denyRequest(){
    console.log("approve"+this.deny);
    // console.log(this.totalitem);
    // alert(this.userid);
    var user_id = window.localStorage['TUM_USER_ID'];
   var  Password=this.deny.Txn_password
var obj={
  user_id:window.localStorage['TUM_USER_ID'],
  Password:this.deny.Txn_password
}


    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +'/mobileapi/BO/BO.svc/verifywfuser/'+user_id+'/'+Password).then(resp=>{
      console.log(""+JSON.stringify(resp));


      if(resp ==1){
        var user_type_id = window.localStorage['TUM_USER_TYPE'];
        var pass_item = this.item;
        var workflow_no = pass_item.workflow_no;
        var status = 'A';
        console.log(workflow_no, 'got');
        if (this.approvals.reqType == this.configid) {

      }
      else {
        var typerequest = this.approvals.reqType;
        var Userid = window.localStorage['requserid'];
        var approvername = window.localStorage['TUM_USER_NAME'];

        this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +'/mobileapi/BO/BO.svc/workflow_Deny/'+this.deny.userTypeID+'/'+this.deny.reqNo+'/'+user_id+'/'+this.deny.comment).then(resp=>{
          this.presentAlert("","Request has been denied");
          this.modalCtrl.dismiss('cancel');
          // this.approve = {};
        }, error => {
          console.error(error); // Error!
        })




      }
    }
      else{
        console.log('Invalid Txn Password');
       this.approvedResult = "Invalid Txn Password";
       this.presentAlert("","Invalid Password");
      }

    }, error => {
      console.error(error); // Error!
    });


  }

  async presentAlert(heading,tittle) {
    var alert = await this.alertController.create({
      header: heading,
      backdropDismiss:false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
}

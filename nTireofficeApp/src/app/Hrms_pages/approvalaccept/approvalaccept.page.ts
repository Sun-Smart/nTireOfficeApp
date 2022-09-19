import { Component, OnInit } from '@angular/core';
import {HttprequestService} from '../../service/httprequest.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IpaddressService} from '../../ipaddress.service';
import {NavParams} from '@ionic/angular';
import { AlertController,LoadingController,ModalController} from '@ionic/angular';

@Component({
  selector: 'app-approvalaccept',
  templateUrl: './approvalaccept.page.html',
  styleUrls: ['./approvalaccept.page.scss'],
})
export class ApprovalacceptPage implements OnInit {
  approve={
    Txn_password:'',
    comments:'',
  }
approvals = {
    reqType: '',
    requestno: '',
    requestBy: '',
    status: ''

  };
  branchlist: unknown;
  item: any;
  pass_workflow;
  approvedResult: string;
  configid: string;
  constructor(private HttpRequest:HttprequestService,private http: HttpClient,public Ipaddressservice:IpaddressService,navParams: NavParams,public alertController: AlertController,public modalCtrl: ModalController) {
    this.item=navParams.get('item');
    // alert(""+JSON.stringify(this.item));
    console.log(""+this.item)
//     this.HttpRequest.PostRequest('http://sunsmart.in:8155/dms/DMS/dmsapi/DMS/getconfigif',"").then(resp=>{
// console.log(""+resp);
//       }, error => {
//         console.error(error); // Error!
//       });
//     // this.pass_workflow.setdata(this.item);
//    }
  }
  ngOnInit() {
  }

  // appservice.configid().then(function(resp) {
  //   // console.log(JSON.stringify(resp.data[0].WF_CONFIG_ID));
  //   this.configid = resp.data[0].WF_CONFIG_ID;
  // })


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

  giveApproval(approve) {
    console.log("approve"+approve);
    // console.log(this.totalitem);
    // alert(this.userid);
    var user_id = window.localStorage['TUM_USER_ID'];
   var  Password=approve.Txn_password
var obj={
  user_id:window.localStorage['TUM_USER_ID'],
  Password:approve.Txn_password
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

        this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +'/mobileapi/BO/BO.svc/workflow_Approval/'+user_type_id+'/'+workflow_no+'/'+user_id+'/'+approve.comments).then(resp=>{
          if (resp == "-1") {
            this.approvedResult = "Already Approved";
            // this.modal.hide();
            this.presentAlert("","Already Approved");
            this.modalCtrl.dismiss('cancel');
          }
          else if (resp== "4" || resp == "7" || resp =="6" || resp == "12" || resp == "15" || resp == "16" || resp == "5") {
            this.approvedResult = "Approved"
            // this.modal.hide();
            this.presentAlert("","Approved");
            // this.myApprovals();
            this.modalCtrl.dismiss('cancel');

            // $ionicPopup.alert({
            //   title: 'Record Status',
            //   template: '<p style="margin-top: 25px;">Approved</p>',
            //   buttons: [{
            //       text: '<b>OK</b>',
            //       type: 'button button-clear button-balanced',
            //       onTap: function(e) {
            //         this.myApprovals();
            //         this.modal1.hide();


            //       }
            //     }


            //   ]
            // });

            this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +'/getrequestorto'+Userid+'/'+typerequest+'/'+approvername).then(resp=>{
              console.log(""+JSON.stringify(resp));
        }, error => {
              console.error(error); // Error!
            })





          }
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

        // if (this.approvals.reqType == this.configid) {
          // alert("s")

          // var obj = {
          //   Workflow_No: workflow_no,
          //   ApproverRemarks: approve.comments,
          //   UPDATED_BY: this.userid,
          //   status: 'A'
          // }
          // console.log(workflow_no + this.userid + status + approve.comments + this.userid);
        // }

          // $ionicLoading.show({
          //   template: '<p>Loading...</p><ion-spinner icon="circles" class="spinner-energized"></ion-spinner>',
          //   duration: 1000
          // });
      // console.log(""+JSON.parse(resp));
  //     this.branchlist=resp;
  //  this.branchlist.forEach(element => {
  //   this.branchlist1.push(element)

  //   console.log("branchlist1 : "+JSON.stringify(this.branchlist1));
  //  });
    }, error => {
      console.error(error); // Error!
    });


    // services.validateTxnPassword(user_id, approve.Txn_password).then(function(resp) {
    //   console.log(resp.data);
    //   if (resp.data == 1) {
    //     var user_type_id = window.localStorage['TUM_USER_TYPE'];
    //     var pass_item = pass_workflow.getdata();
    //     var workflow_no = pass_item.workflow_no;
    //     var status = 'A';
    //     console.log(workflow_no, 'got');
    //     if (this.approvals.reqType == this.configid) {
    //       // alert("s")

    //       var obj = {
    //         Workflow_No: workflow_no,
    //         ApproverRemarks: approve.comments,
    //         UPDATED_BY: this.userid,
    //         status: 'A'
    //       }
    //       console.log(workflow_no + this.userid + status + approve.comments + this.userid);


    //       $ionicLoading.show({
    //         template: '<p>Loading...</p><ion-spinner icon="circles" class="spinner-energized"></ion-spinner>',
    //         duration: 1000
    //       });
    //       appservice.newapproval(workflow_no, this.userid, status, approve.comments, this.userid).then(function(resp) {
    //         console.log(resp);
    //         // alert(resp.data);
    //         // alert(resp.data)
    //         var popup = $ionicPopup.alert({
    //           title: "",
    //           template: resp.data
    //         });

    //         this.modal1.hide();


    //         services.myApprovals(this.approvals).then(function(resp) {
    //           console.log(resp);
    //           var dat_s = JSON.parse(resp.data);
    //           console.log(dat_s.length);
    //           if (dat_s.length > 0) {
    //             this.approve_result1 = JSON.parse(resp.data);
    //             // this.approve_result=this.approve_result[0].RequestDate;
    //             console.log(this.approve_result1);
    //             $ionicLoading.hide();
    //             this.modal1.hide();
    //           } else {
    //             console.log('No record found');
    //             $ionicLoading.hide();
    //             this.approval_search = "No record found"
    //           }


    //           // var reqType_no=this.approvals.reqType;
    //           //         var comp_id="1";
    //           //         var Approval_user_id=window.localStorage['TUM_USER_ID'];
    //           //         services.approve_user(reqType_no,comp_id,Approval_user_id).then(function(resp){
    //           //           console.log(resp,'final');
    //           //           this.dat=JSON.parse(resp.data);
    //           //           console.log(this.dat,'dat');
    //           //         pass_dat.setdata(this.dat);
    //           //       })

    //         })

    //       })

    //     } else {
    //       var typerequest = this.approvals.reqType;
    //       var Userid = window.localStorage['requserid'];
    //       var approvername = window.localStorage['TUM_USER_NAME'];
    //       services.workflow_Approval(user_type_id, workflow_no, user_id, approve.comments).then(function(resp) {
    //         console.log(resp);
    //         if (resp.data == "-1") {
    //           this.approvedResult = "Already Approved";
    //           // this.modal.hide();
    //           $ionicPopup.alert({
    //             title: 'Record Status',
    //             template: '<h5 style="text-align:center">Already Approved</h5>'
    //           });
    //         } else if (resp.data == "4" || resp.data == "7" || resp.data =="6" || resp.data == "12" || resp.data == "15" || resp.data == "16" || resp.data == "5") {
    //           this.approvedResult = "Approved";
    //           // this.modal.hide();

    //           $ionicPopup.alert({
    //             title: 'Record Status',
    //             template: '<p style="margin-top: 25px;">Approved</p>',
    //             buttons: [{
    //                 text: '<b>OK</b>',
    //                 type: 'button button-clear button-balanced',
    //                 onTap: function(e) {
    //                   this.myApprovals();
    //                   this.modal1.hide();


    //                 }
    //               }


    //             ]
    //           });

    //           services.getrequestortoken(Userid, typerequest, approvername).then(function(resp) {

    //             console.log(resp)

    //           })



    //         } else {
    //           this.approvedResult = "Not Approved";
    //           $ionicPopup.alert({
    //             title: 'Record Status',
    //             template: '<h5 style="text-align:center">Not Approved</h5>'
    //           });
    //         }
    //         this.approve = {};
    //       })
    //     }
    //   } else {
    //     console.log('Invalid Txn Password');
    //     this.approvedResult = "Invalid Txn Password";
    //     var popup = $ionicPopup.alert({
    //       title: "",
    //       template: "<center> Invalid Password</center>"
    //     });
    //   }
    // })



  }

  async presentAlert(heading,tittle) {
    var alert = await this.alertController.create({
      header: heading,

      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  ionViewDidLoad() {
    // this.platform.ready().then(() => {



    // your init service

  }


}

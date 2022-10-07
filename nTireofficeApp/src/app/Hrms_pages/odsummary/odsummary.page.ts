import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { ModalController } from '@ionic/angular';
import { ReapplyOdPage } from '../reapply-od/reapply-od.page'
import { json } from '@angular-devkit/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-odsummary',
  templateUrl: './odsummary.page.html',
  styleUrls: ['./odsummary.page.scss'],
})
export class OdsummaryPage implements OnInit {
  company;
  empID;
  FUNCTION_ID;
  em_emp_id;
  error;
  display:any=[];
  display1:any=[];
  status;
  fromDate;
  toDate;
  ReqRef: any;
  Userid: any;
  reqRefDetail: string;
  reqRef1: any;
  username = window.localStorage.getItem('TUM_USER_NAME');
  traveldetails: { User_ID: any; ODRequestRef: any; userid: any; usertoken: any; access_token: any; TxnReference:any};
  constructor(public modalController: ModalController,private HttpRequest: HttprequestService,
    private router: Router,
    public Ipaddressservice: IpaddressService) {
    this.company = window.localStorage['FUNCTION_DESC'];
    this.empID=window.localStorage['EmployeeID'];
    this.FUNCTION_ID= window.localStorage['FUNCTION_ID'];
    this.em_emp_id=window.localStorage['em_emp_id'];

    this.status="";
    this.filterDate(undefined,undefined);


  }
  // cancel(){
  //   return this.modalController.dismiss(null, 'cancel');
  // }
  ngOnInit() {
  }

    cancel(){
    // return this.modalController.dismiss(null, 'cancel');
    this.router.navigate(['/od-request'])
  }
  filterDate(fromdate,todate){
    var obj = {
      empID: window.localStorage.getItem("EmployeeID"),

    }
    this.display=[];
     if (fromdate == undefined || fromdate == "") {
       fromDate = "01-01-1990";
     } else {
       var fromDate = this.formatDate(fromdate);
     }
//  alert("todate : "+todate);
     if (todate == undefined || todate == "") {
       toDate = "06-06-2079";
     } else {
       var toDate = this.formatDate(todate);
     }

     this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1+this.Ipaddressservice.serviceurlhrms+"/"+"searchOd/" + this.FUNCTION_ID + "/" + this.empID + "/" + fromDate + "/" + toDate).then(resp=>{
       if (resp != "No Records found") {

         this.display =resp;
         console.log(""+JSON.stringify(this.display));
         this.display1=resp;
        //  for(let i = 0;i<this.display.length;i++){
        //   this.ReqRef = this.display[i].ReqRef;
        //   this.Userid = this.display[i].UserID
        //   var status = this.display[i].Status;
        //   this.error = "";
        //   this.getRequestRef(i);
        //  }

         this.display.forEach(element=>{
          this.ReqRef = element.ReqRef;
          this.Userid = element.UserID
          var status = element.Status;

          var odref={
            User_ID:parseInt(this.Userid),
            ODRequestRef:parseInt(this.ReqRef),
             userid:parseInt(window.localStorage['TUM_USER_ID']),
             usertoken:window.localStorage['usertoken'],
             access_token:window.localStorage['token']
            }

          this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "getODRequestRef",odref).then(resp=>{
            // console.log(""+JSON.stringify(resp));
            // this.reqRefDetail = JSON.stringify(resp);
            this.reqRef1 =  resp[0]['TxnReference'];
            if(resp[0]['IsTravelRequired']=='Y'){
              element.travelstatus = "Required";
            }

            if(resp[0]['IsTravelRequired']=='N'){
              element.travelstatus = "Not Required";
            }

          }, error => {
          // alert('Server Error, Data not loaded.')
          console.log("error : "+JSON.stringify(error));

          });

         })

        //  this.getTravelDetails();
       } else {


         this.display = [];
         this.error = "No Records Found";
       }
     }, error => {
     alert('Server Error, Data not loaded.')
     console.log("error : "+JSON.stringify(error));

     });
   }


   getRequestRef(i)
   {
    var odref={
      User_ID:parseInt(this.Userid),
      ODRequestRef:this.ReqRef,
       userid:window.localStorage['TUM_USER_ID'],
       usertoken:window.localStorage['usertoken'],
       access_token:window.localStorage['token']
      }

    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "getODRequestRef/",odref).then(resp=>{
      console.log(""+JSON.stringify(resp));
      // this.reqRefDetail = JSON.stringify(resp);
      this.reqRef1 =  resp[0]['TxnReference'];
      if(resp[0]['IsTravelRequired']=='Y'){
        console.log("travreq")

        this.display[i].travelstatus = "Required";
      }

      if(resp[0]['IsTravelRequired']=='N'){
        console.log("travnotreq");
        this.display[i].travelstatus = "Not Required";
      }



    }, error => {
    // alert('Server Error, Data not loaded.')
    console.log("error : "+JSON.stringify(error));

    });
   }
  //  getTravelDetails()
  //  {
  //   var odref={
  //     User_ID:this.Userid,
  //     ODRequestRef:this.ReqRef,
  //      userid:window.localStorage['TUM_USER_ID'],
  //      usertoken:window.localStorage['usertoken'],
  //      access_token:window.localStorage['token']
  //     }

  //     this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlhrms2+ "getTravelDetails/",odref).then(resp=>{
  //       console.log(""+JSON.stringify(resp));
  //       // this.reqRefDetail = JSON.stringify(resp);
  //       this.reqRef1 =  resp[0]['TxnReference'];
  //       console.log(""+this.reqRef1);


  //     }, error => {
  //     // alert('Server Error, Data not loaded.')
  //     console.log("error : "+JSON.stringify(error));

  //     });
  //  }
   async openModal(value){
     this.traveldetails={
      User_ID:this.Userid,
      ODRequestRef:this.ReqRef,
      TxnReference: this.reqRef1 ,
       userid:window.localStorage['TUM_USER_ID'],
       usertoken:window.localStorage['usertoken'],
       access_token:window.localStorage['token']
     }
    console.log(""+JSON.stringify(value));
    // this.tempID = "1";
    const modal = await this.modalController.create({
      component: ReapplyOdPage,
      componentProps: {
        'item':value,
        'item2': this.traveldetails ,

      }

    });
    modal.onDidDismiss()
    .then((data) => {
      this.filterDate(undefined,undefined);
  });

    return await modal.present();

  }


  changeOrder(){
    this.error=''
    this.display = this.display1.filter((data) => {


      if(data.Status!=undefined){
      return data.Status.toLowerCase().indexOf(this.status.toLowerCase()) > -1;
    }

    });

    if(this.display.length==0){
      this.error = "No data found";
    }
  }
  formatDate(value) {
    value = new Date(value);

    var day = value.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var month = value.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
      // console.log(month);
    }
    var year = value.getFullYear();
    value = day + "-" + month + "-" + year;
    return value;
  }
}

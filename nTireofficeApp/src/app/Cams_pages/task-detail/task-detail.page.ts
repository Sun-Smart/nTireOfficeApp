import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService} from '../../service/ipaddress.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router} from '@angular/router';
import {TabparamserviceService} from '../../service/tabparamservice.service'
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {

  userID:any;
  usertype:any;
  function:any;
  branch:any;
  userToken:any;
  accessToken:any;
  branchID:any;
  functionID:any;

  urldata;

  assetcodetabrefe:any;
  assetcodeDesc:any;
  jobtaskdetails:any;
  checkedList:any=[];
  constructor(private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public alertController: AlertController, private zone: NgZone, private http: HttpClient, public Ipaddressservice: IpaddressService,private router : Router,private Tabparams:TabparamserviceService) {

    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('id');
    this.functionID = localStorage.getItem('FUNCTION_ID');

    console.log(JSON.stringify(this.Tabparams.data));
    this.urldata = JSON.parse(JSON.stringify(this.Tabparams.data));

    this.assetcodetabrefe=this.urldata.pmm_asset_code;
    this.assetcodeDesc=this.urldata.amd_activity_desc;
   }

  ngOnInit() {
    this.taskdetail();
  }

  taskdetail(){
    var data = {
      'activityid':this.urldata.amd_activity_id,
      'assetid':parseInt(this.urldata.CMD_ASSET_ID),
      'branchid': this.branchID,
      'functionid':parseInt(this.functionID),
      'access_token':this.accessToken,
      'userid':this.userID,
      'usertoken':this.userToken
    }

    const header = new Headers();
    header.append("Content-Type", "application/json");
  
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/pendingtaskdetail',data, {
      headers: options,
    }).subscribe(resp => {
      this.jobtaskdetails = resp;
      console.log(this.jobtaskdetails);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
  
    });  
  }
  checkItems(item:any){
    debugger;
    console.log(item)
    this.checkedList.push(item)

  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'Cssbutton',
      backdropDismiss: false,
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  addSelectedItemData(list){
    
    debugger;
    this.presentAlert('Success','Saved Successfully');
    console.log(list);
    var selectedItems = [];
    console.log(list);
    list.forEach(obj => {
      console.log(obj);
          // if (list[obj].selected == list[obj].task_id) {
          //     // selectedItems.push(list[key].selected);
          //     selectedItems.push(list[obj]);
          //     // console.log(selectedItems);
          // }
          if (obj.selected == true) {
            // selectedItems.push(list[key].selected);
            selectedItems.push(obj);
             console.log(selectedItems);
        }
      });
    
if (selectedItems.length > 0){
                //  saveButton=true;
    for(var j=0;j<selectedItems.length;j++){
      var insertIntradata={
        FUNCTIONID:window.localStorage['FUNCTION_ID'],
        BRANCHID:window.localStorage['TUM_BRANCH_ID'],
        assetid:selectedItems[j].ASSET_ID,
        activityid:selectedItems[j].ASSET_ACTIVITY_ID,
        taskid:selectedItems[j].task_id,
        taskuid:selectedItems[j].U_ID,
         createdby:window.localStorage['TUM_USER_ID'], 
        userid:window.localStorage['TUM_USER_ID'],
        usertoken:window.localStorage['usertoken'],
        access_token:window.localStorage['token']
      }
      console.log(insertIntradata);
      const header = new Headers();
    header.append("Content-Type", "application/json");
  
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress+this.Ipaddressservice.serviceurlCamsNode +'/insertIntraDatatask',insertIntradata, {
      headers: options,
    }).subscribe(resp => {
      this.jobtaskdetails = resp;
      console.log(this.jobtaskdetails);
      setTimeout(() => {
        alert("Task Added");
      }, 2000);
    }, error => {
      //this.presentAlert('Alert','Server Error,Contact not loaded');
      console.log("error : " + JSON.stringify(error));
  
    });  

    }
    }else{
       alert("Please choose items");
      
          
     }
  }
}

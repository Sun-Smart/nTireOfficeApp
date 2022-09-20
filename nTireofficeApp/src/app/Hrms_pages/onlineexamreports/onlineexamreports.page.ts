import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onlineexamreports',
  templateUrl: './onlineexamreports.page.html',
  styleUrls: ['./onlineexamreports.page.scss'],
})
export class OnlineexamreportsPage implements OnInit {
  userId;
  usertoken;
  token;
  ResultList=[];
  ResultList1;
  constructor(private router: Router,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService) {
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];


    this.getAllResultList();
   }

  ngOnInit() {
  }
  getAllResultList(){
    var resultobj={

			APPLICANT_ID:this.userId,
		  	userid:this.userId,
		    usertoken:this.usertoken,
		    access_token:this.token
	}
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlhrms2 + 'get_result_list/',resultobj).then(resp => {
     this.ResultList1=resp;
     this.ResultList1.forEach(element => {
      this.ResultList.push(element);
     });
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  viewReport(data){
    this.router.navigate(['/hrmsview-report', {
      reportData:JSON.stringify(data)
            }])

  }
}

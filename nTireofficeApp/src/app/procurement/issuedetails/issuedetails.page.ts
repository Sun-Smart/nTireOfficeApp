import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IpaddressService } from 'src/app/service/ipaddress.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-issuedetails',
  templateUrl: './issuedetails.page.html',
  styleUrls: ['./issuedetails.page.scss'],
})
export class IssuedetailsPage implements OnInit {
  funtionID;
  branch_ID;
  branch;
  fromdate;
  todate;
  sub;
  data;
  ITEMCODE;
  AVAILABLEQUANTITY;
  LocationDetails;
  BinLocationDetails;
  getdata: any;
  CurrentQty: any;
  getlength: any;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public Ipaddressservice: IpaddressService, private datePipe: DatePipe) {
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');

    this.fromdate = this.datePipe.transform(this.fromdate, 'dd/MM/YYYY');
    this.todate = this.datePipe.transform(this.todate, 'dd/MM/YYYY');

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
      console.log('this.data ', this.data);
      this.ITEMCODE = this.data.item_Code11;
      this.AVAILABLEQUANTITY = this.data.STOCKQTY;
      this.CurrentQty = this.data.QuantityPending




    });
  }

  ngOnInit() {
    debugger;
    this.getLocation();
    this.getBinLocation();

  }

  getLocation() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getmaterialpopupLocationdesc/' + this.funtionID + '/' + this.branch_ID, {
      // Pendingsearchs11?strfunction=1&branch
      // =1&fdate=28-01-2018&tdate=28-09-2022&Status=Pending&strUserId=193&UserType=11
      // &drpcategory=null&drptype=6&TASKTYPE=84&AssetCode=MT
      headers: options,
    }).subscribe(resp => {
      this.LocationDetails = resp;
      console.log(this.LocationDetails);
    });
  }
  getBinLocation() {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'getmaterialpopupbindesc/' + this.funtionID + '/' + this.branch_ID, {
      // Pendingsearchs11?strfunction=1&branch
      // =1&fdate=28-01-2018&tdate=28-09-2022&Status=Pending&strUserId=193&UserType=11
      // &drpcategory=null&drptype=6&TASKTYPE=84&AssetCode=MT
      headers: options,
    }).subscribe(resp => {
      this.BinLocationDetails = resp;
      console.log(this.BinLocationDetails);
    });
  }
  SearchList() {

    let body = {

      "FUNCTIONIDMIS": this.funtionID.toString(),
      "BRANCHIDMIS": this.branch_ID.toString(),
      "LOCATION_IDMIS": "12",
      "BINMIS": "36",
      "ITEM_IDMIS": "1272",
      "ALPHANAMEMIS": "",
      "SORTEXPRESSIONMIS": "batch_serial_no desc",
      "PAGEINDEXMIS": 0,
      "PAGESIZEMIS": 10,
      "STOREEMIS": "165",
      "RACKEMIS": "5953"


    }

    // const header = new Headers();
    // header.append("Content-Type", "application/json");
    // let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress1 +
      this.Ipaddressservice.serviceerpapi + 'MaterialIssueDetailsLinkSearch', body).subscribe((res: any) => {
        console.log(res)

        this.getdata = res
        this.getlength = this.getdata.length
      })

  }

  issue() {
    this.presentAlert("", "Your Issue Saved successfully");
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


}

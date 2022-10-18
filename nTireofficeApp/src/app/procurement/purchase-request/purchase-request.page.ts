import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IpaddressService } from 'src/app/service/ipaddress.service';

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.page.html',
  styleUrls: ['./purchase-request.page.scss'],
})
export class PurchaseRequestPage implements OnInit {
  showlineItems: boolean = true
  showviewlist: boolean = false
  showfilter: boolean = true
  getlistitems: any

  userid
  branchid



  branch
  Requisitiondate
  prscode

  prsmode;
  reasonpurchase;
  referenceifany;
  rfpcomments;
  order;
  requestby;

  Description
  Item
  Category;
  qty;
  unitprice;
  Requiredbefore
  netprice;
  itemdescription;
  release


  constructor(private router: Router, private httpclient: HttpClient, private Ipaddressservice: IpaddressService) {

    var data = {
      "Description": this.Description,
      "Item": this.Item,
      "Category": this.Category,
      "qty": this.qty,
      "unitprice": this.unitprice,
      "Requiredbefore": this.Requiredbefore,
      "netprice": this.netprice,
      "itemdescription": this.itemdescription
    }
  }

  ngOnInit() {

    this.userid = localStorage.getItem('TUM_USER_ID')
    this.branchid = localStorage.getItem(' TUM_BRANCH_ID')



  }

  showline() {
    this.showviewlist = true
    // this.showviewlist = true
    this.showlineItems = !this.showlineItems

    var data = {
      Description: this.Description,
      Item: this.Item,
      Category: this.Category,
      qty: this.qty,
      unitprice: this.unitprice,
      Requiredbefore: this.Requiredbefore,
      netprice: this.netprice,
      itemdescription: this.itemdescription
    }
    // console.log(data)
    this.getlistitems = JSON.stringify(data);
    // this.getlistitems = JSON.parse(this.getlistitems);
    console.log(this.getlistitems);


    // localStorage.setItem('Description', this.getlistitems.Description);
    // localStorage.setItem('Item', this.getlistitems.Item);
    // localStorage.setItem('qty', this.getlistitems.qty);
    // localStorage.setItem('unitprice', this.getlistitems.unitprice);
    // localStorage.setItem('Requiredbefore', this.getlistitems.Requiredbefore);
    // localStorage.setItem('netprice', this.getlistitems.netprice);
    // localStorage.setItem('itemdescription', this.getlistitems.itemdescription);

    // this.showlineItems=true

    // this.showfilter = !this.showfilter;
  }
  submit() {
    this.showviewlist = true;
    localStorage.setItem('Description', this.getlistitems.Description);
    localStorage.setItem('Item', this.getlistitems.Item);
    localStorage.setItem('qty', this.getlistitems.qty);
    localStorage.setItem('unitprice', this.getlistitems.unitprice);
    localStorage.setItem('Requiredbefore', this.getlistitems.Requiredbefore);
    localStorage.setItem('netprice', this.getlistitems.netprice);
    localStorage.setItem('itemdescription', this.getlistitems.itemdescription);
  }
  togglefilter() {
    this.showfilter = !this.showfilter;
  }
  close() {
    // window.location.reload()
    // this.router.navigate(['/purchase-request'])
    this.showviewlist = true
    this.showlineItems = !this.showlineItems

    var body = {

      "functionid": "1",
      "prsid": "",
      "prscode": "",
      "status": "0",
      "createdby": this.userid, //userid
      "ipaddress": "0",
      "reasonpurchase": this.reasonpurchase,
      "netamount": this.netprice,
      "currency": "0",
      "requestcomments": "0",
      "isbid": "0",
      "prstype": "0",
      "branchid": this.branchid,//TUM_BRANCH_ID
      "prsref": "0",
      "userid": this.userid,//userid
      "requestby": this.userid,//userid
      "requestdate": "",
      "requettype": this.prsmode,
      "issinglevendor": "",
      "orderpriority": ""

    }

    this.httpclient.post(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceerpapi + 'get_PRS_Insert_Update', body).subscribe((res: any) => {
      // this.getresponse = res;
      console.log(res)
    })


  }


}

import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpaddressService } from './../../service/ipaddress.service';
import { HttprequestService } from '../../service/httprequest.service';
@Component({
  selector: 'app-vendorsdetails',
  templateUrl: './vendorsdetails.page.html',
  styleUrls: ['./vendorsdetails.page.scss'],
})

export class VendorsdetailsPage implements OnInit {

  showitemdetails_grid : boolean = true;
  showvendorlist_grid : boolean = false;
  value : any;
  selectAllvendor : boolean = false;
  data;
  sub;
  function;
  branch;
  userID;
  usertype
  userToken
  accessToken;
  branchID;
  functionID;
  username;
  findvendor;
  findVendorDetails;
  ItemID;
  RFQID;
  CATEGORY;
  SUBCAT;
  VendorDetails:any=[];
  Checked;
  constructor( private router :Router,private activatedRoute: ActivatedRoute,private IpaddressService: IpaddressService, private httpclient: HttprequestService){
    this.function = localStorage.getItem('FUNCTION_DESC');
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.userToken = localStorage.getItem('usertoken');
    this.accessToken = localStorage.getItem('token');
    this.branchID = localStorage.getItem('TUM_BRANCH_ID');
    this.functionID = localStorage.getItem('FUNCTION_ID');
    this.username = localStorage.getItem('TUM_USER_NAME');
  }
  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
      console.log('this.data ',this.data)
      this.RFQID = this.data.id;
      this.CATEGORY=this.data.category;
      this.ItemID=this.data.itemid;
      this.SUBCAT=this.data.subcategory;
      console.log(this.ItemID);
    });
      this.getCards();

  }
  close(){
    this.router.navigate(['/manage-rfq']);
  }
  getCards(){
    this.httpclient.GetRequest(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'get_Find_vendor?functionid='+this.functionID+'&branch='+this.branchID+'&itemCategory='+this.CATEGORY+'&itemSubCategory='+this.SUBCAT+'&rFQCode='+this.RFQID+'&keyword=null&VendorCode=null&Brand=null&Model=null&qtyval=null&ItemID='+this.ItemID).then((res:any) => {
      this.findvendor = res;
      this.findVendorDetails = this.findvendor.vendorDetails;
      console.log(this.findvendor);
     })
  }

  add(){
    this.router.navigate(['/manage-rfq']);
    if(this.value == false)
    {
    this.showitemdetails_grid = true;
    this.showvendorlist_grid = true;
  }
  else
  {
    this.showitemdetails_grid = true;
    this.showvendorlist_grid = false;
  }
}

selectAllvendorCheckbox(value) {
  console.log(value);
  if (value == false) {
    this.selectAllvendor = true;
  }
  else {
    this.selectAllvendor = false;
  }
}
fieldsChange(values:any,item:any):void {
  console.log(values.currentTarget.checked);
  this.Checked = values.currentTarget.checked;
  console.log(item);

  if(this.Checked == true){
    this.VendorDetails.push(item);
    console.log(this.VendorDetails);
  }
  else if(this.Checked == false){
    this.VendorDetails = this.VendorDetails.filter(id => id != item.id);
  }
}
}


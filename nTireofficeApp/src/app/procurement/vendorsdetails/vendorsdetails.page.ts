import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IpaddressService } from './../../service/ipaddress.service';
import { HttprequestService } from '../../service/httprequest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  RFQCODE;
  ITEMCODE;
  ITEMDESC;
  VendorDetails:any=[];
  Checked;
  AddVendor;
  addvalue;
  RequestRequisition;
  splitted;
  item;
  constructor(  private router :Router,private activatedRoute: ActivatedRoute,private httpresponse: HttprequestService,private IpaddressService: IpaddressService,private http: HttpClient){
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
      this.RFQCODE = this.data.rfq;
      this.ITEMCODE = this.data.itemCode;
      this.ITEMDESC = this.data.itemdesc;
      this.splitted = this.data.id;
      console.log(this.splitted)
       this.item = this.data.rfq;
      console.log(this.item);
    });
      this.getCards();

  }
  close(splitted,item){
    console.log(item);
    console.log(splitted)
    // this.router.navigate(['/manage-rfq']);
    // this.router.navigate(['/manage-rfq',this.splitted,this.item])
  }
  getCards(){
    this.http.get(this.IpaddressService.ipaddress1 + this.IpaddressService.serviceerpapi + 'get_Find_vendor?functionid='+this.functionID+'&branch='+this.branchID+'&itemCategory='+this.CATEGORY+'&itemSubCategory='+this.SUBCAT+'&rFQCode='+this.RFQID+'&keyword=null&VendorCode=null&Brand=null&Model=null&qtyval=null&ItemID='+this.ItemID).subscribe((res:any) => {
      this.findvendor = res;
      this.findVendorDetails = this.findvendor.vendorDetails;
      console.log(this.findvendor);
     })
  }

  add(event : any){
    this.addvalue =event.target.value;
    this.AddVendor = this.VendorDetails[0];
    console.log(this.AddVendor);
    let data = this.AddVendor;
    console.log(data);

    // for (var i =0; i< this.AddVendor.length; i ++) {
         
    // }

    let body ={

      "Add_vendor":[
        {
          
          "Vendor_details":this.VendorDetails
        }
      ]
    }
    console.log(body);
    let options = new HttpHeaders().set('Content-Type', 'application/json')
    this.http.post(this.IpaddressService.ipaddress1+this.IpaddressService.serviceerpapi +'Add_Vendor', body,{
      headers: options, responseType: 'text'
    } 
      ).subscribe((resp :any)=>{
        console.log(resp)
      })

}
cancel(){
  this.router.navigate(['/manage-rfq',this.splitted,this.item])
  // this.router.navigate(['/manage-rfq'])
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
    this.VendorDetails.push({
      "functionid":this.functionID,
      "rfqcode":this.RFQCODE,
      "vendorid":item.vENDOR_ID,
      "itemid":"",
      "itemcategory":item.categoryVal,
      "itemsubcategory":item.sub_category_id,
      "brand":item.brand,
      "model":item.model,
      "rating":"",
      "mode":"",
      "userid":this.userID,
      "ipaddress":"",
      "unitprice":item.unit_price,
      "netamount":"",
      "discount":item.discount,
      "taxes":item.tax1,
      "transportcharges":item.transport_charges,
      "fromqty":item.from_qty,
      "toqty":item.to_qty,
      "leadtime":item.lead_time,
      "itemcode":this.ITEMCODE,
      "itemdesc1":item.itemDescription,
      "tamount":item.amount,
      "qty":"",
      "vendoritemid":item.vendorItemID,
      "prsid":""
    });
    console.log(this.VendorDetails);
  }
  else {
    var index = this.VendorDetails.indexOf(item);
    if(index > -1){
      this.VendorDetails.splice(index,1)
      console.log(this.VendorDetails,'filterarray');
    }


  }
}
}
//  var index = d.indexOf(s);
//             if (index > -1) {
//                 d.splice(index, 1);

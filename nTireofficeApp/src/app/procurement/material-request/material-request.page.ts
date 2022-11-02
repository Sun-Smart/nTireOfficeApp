import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastmessageService } from 'src/app/service/toastmessage.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-material-request',
  templateUrl: './material-request.page.html',
  styleUrls: ['./material-request.page.scss'],
})
export class MaterialRequestPage implements OnInit {
  showbtn: boolean = true;
  showlineItems: boolean = true;
  showviewlist:boolean=false
  hideviewlist:boolean=false
  showfilter:boolean=true
  hidefilter:boolean=true
  loading:boolean=false
  mrscode:String;
  hidelineItems: boolean;
  visible:boolean = false
  Additem:boolean = true
  expenseArray = [];
  showlineItems1:boolean=true;
  shownewcard:boolean=false
  ShowAllItem:boolean=true
  Showcard:boolean=false
  overallsubmit:boolean = false;
  submitview: boolean =false;
  initialSearch:boolean=true;
  overallsubmitnew:boolean=false;
  funtionID;
  branch_ID;
  branch;
  userID;
  usertype;
  fromdate;
  todate;
  constructor( private router :Router,private toastmessageservice :ToastmessageService,private datePipe: DatePipe) { 
    this.funtionID = localStorage.getItem('FUNCTION_ID');
    this.branch_ID = localStorage.getItem('TUM_BRANCH_ID')
    this.branch = localStorage.getItem('TUM_BRANCH_CODE');
    this.userID = localStorage.getItem('TUM_USER_ID');
    this.usertype = localStorage.getItem('TUM_USER_TYPE');
    this.fromdate = this.datePipe.transform(this.fromdate, 'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.todate, 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

  SearchItems(){
    this.showviewlist = true
    this.showbtn = true
    
  }
  Addnewitem(){
    this.showlineItems1 = !this.showlineItems1;
    this.ShowAllItem = false;

  }
  onsubmit(){
    this.toastmessageservice.presentAlert1('saved successfully','this process is saved successfully')
    // this.showlineItems =!this.showlineItems;
    this.expenseArray=[];
    this.overallsubmitnew = false;
    
  }

  showline(){
    this.showlineItems = false;
    this.Showcard = true;
    this.shownewcard =false;
    this.overallsubmit = true;
    this.submitview =!this.submitview;
    this.overallsubmitnew =true;
    this.expenseArray.push({
      prsid: "",
      itemid: 'PO2202',
      i_function_id: "1",
      required_qty: 5,
      UOM: "15",
      expected_cost: "100",
      exp_date: 6/10/2020,
      status: "A",
      created_by: "210",
      netprice: 5,
      ipaddress: "",
      unit_price:2,
      Limit: "",
      Availlimit: "",
      BalanceLimit: "",
      CATEGORY: 'hello',
      TAX1: "",
      TAX2: "",
      TAX1DESC: "",
      TAX2DESC: "",
      OTHERCHARGES: "",
      item_short_desc: 'hai',
      item_long_desc: 'test',
      REMARKS: "",
      CategoryID: "",
      SubCategoryID: "",
      prsDetailID: "",
      FreightVALUE: "",
      FreightID: "",
      RecoveryVALUE: "",
      RecoveryID: "",
      BDC: "",
      PTM: "",
      ACC: "",
      CPC: "",
      flag: "I"

    })
    console.log(this.expenseArray)
    this.showbtn = true;
  }
  Searchlist(){
    debugger;
    this.initialSearch =! this.initialSearch;
    this.showfilter =! this.showfilter;
    this.showbtn = true;
  }
  
  Additems() { 
    this.shownewcard=true
    this.ShowAllItem = false;
    this.overallsubmit=false;
    // this.shownewcard==!this.shownewcard
  }
  new(){
        this.showlineItems = !this.showlineItems
    this.showviewlist = false;
    this.Showcard = false;
    this.overallsubmit=true;
    this.initialSearch = false;
    this.showbtn = false;


  }
  clear(){
    alert("67")

  }
   
  hideline(){
    this.hidelineItems=!this.hidelineItems
    this.showfilter = !this.showfilter;
    // this.Additem = !this.Additem;
    // this.visible = !this.visible
  }
  submit(){
    this.showviewlist=true
    this.hideviewlist=true
  }

  togglefilter(){
    this.showfilter = !this.showfilter;
    this.hidefilter = !this.hidefilter;
  }
  close(){
    // this.showviewlist=true
    this.showlineItems=!this.showlineItems
    this.hidelineItems=!this.hidelineItems

  }
  Search() {
    this.loading=true
  
    this.showviewlist = true
    if(this.mrscode ==undefined){
      this.mrscode=''
    }}
    


}

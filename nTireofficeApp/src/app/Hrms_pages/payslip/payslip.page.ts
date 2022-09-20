import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import { AlertController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.page.html',
  styleUrls: ['./payslip.page.scss'],
})
export class PayslipPage implements OnInit {
  yeardata;
  monthdata;
  empid;
  empData=[];
  paySlipEarnings=[];
  error;
  signal;
  totalEarnings;
  paySlipDeduction=[];
  totalDeductions;
  netEarnings;
  year=[];
  month=[];
  FUNCTION_ID;
  segmentdata;
  username = window.localStorage.getItem('TUM_USER_NAME');
  constructor(private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public loadingController: LoadingController,) {
        this.empid=window.localStorage['empid'];
        this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
        this.segmentdata="earnings";
        this.yeardata="";
    this.monthdata="";
        this.geYears();
        this.geMonths();
   }

  ngOnInit() {
  }

  getPaySlip(){
    this.getLeaveDetails();
    this.loadingdismiss();
    if (this.yeardata == "") {
      this.yeardata  = "0";
    }
    if (this.monthdata == "") {
      this.monthdata = "0";
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "EmployeeSalaryRegularEarnings/" +  this.empid + "/" + this.yeardata + "/" + this.monthdata).then(resp=>{
      this.paySlipEarnings = JSON.parse(resp.toString());
       this.loadingdismiss();

           console.log(this.paySlipEarnings);
          if (this.paySlipEarnings.length==0) {
            this.error = "No data found";
            this.signal = 0;

          } else {

            var total = 0;
            for (var i = 0; i < this.paySlipEarnings.length; i++) {

              total += parseFloat(this.paySlipEarnings[i].AMOUNT);
              this.paySlipEarnings[i].AMOUNT = parseFloat(this.paySlipEarnings[i].AMOUNT).toFixed(2);
            }
            this.totalEarnings = total;

            this.error = "";
            this.signal = 1;

          }

        }, error => {

        console.log("error : "+JSON.stringify(error));

        });

        this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "EmployeeSalaryRegularDeduction/" + this.empid + "/" + this.yeardata + "/" + this.monthdata).then(resp=>{

          this.paySlipDeduction = JSON.parse(resp.toString());
          // console.log(this.paySlipDeduction);

          var total = 0;
          for (var i = 0; i < this.paySlipDeduction.length; i++) {
            total += parseFloat(this.paySlipDeduction[i].AMOUNT);
          }
          this.totalDeductions = total;

          this.netEarnings = parseFloat(this.totalEarnings) - parseFloat(this.totalDeductions);
            }, error => {

            console.log("error : "+JSON.stringify(error));

            });
  }
  getLeaveDetails(){
    // this.presentLoadingWithOptions();
    if (this.yeardata == "") {
      this.yeardata  = "0";
    }
    if (this.monthdata == "") {
      this.monthdata = "0";
    }
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+ "EmployeeLeaveDetails/" + this.empid + "/" + this.yeardata + "/" + this.monthdata).then(resp=>{
      this.loadingdismiss();
      this.empData = JSON.parse(resp.toString());
          // console.log(this.empData);
          this.empData = this.empData[0];



        }, error => {
          this.loadingdismiss();
        console.log("error : "+JSON.stringify(error));

        });
  }
  geYears(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/CommonDropdown/"+this.FUNCTION_ID+"/Year/%20/0/0").then(resp=>{
      this.year = JSON.parse(resp.toString());

        }, error => {

        console.log("error : "+JSON.stringify(error));

        });
  }
  geMonths(){
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 +this.Ipaddressservice.serviceurlhrms+"/CommonDropdown/"+this.FUNCTION_ID+"/Month/%20/0/0").then(resp=>{
      this.month = JSON.parse(resp.toString());

        }, error => {

        console.log("error : "+JSON.stringify(error));

        });
  }



 inWords (amount) {
  var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j].toString());
                    n_array[i] = 0;
                }
            }
        }
      var  value;
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}


async presentLoadingWithOptions() {
  const loading = await this.loadingController.create({
    spinner: 'crescent',

    message: 'Please wait...',
    translucent: true,
    cssClass: 'custom-class custom-loading',


  });
  return await loading.present();
}
async   loadingdismiss() {

   return await this.loadingController.dismiss();
}

}

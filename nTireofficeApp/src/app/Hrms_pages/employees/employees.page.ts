import { Component, OnInit } from '@angular/core';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../service/ipaddress.service';
import { LoadingController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})

export class EmployeesPage implements OnInit {
  totalemployee1: any;
  count: any;
  displaydetails($event: Event) {
    throw new Error('Method not implemented.');
  }
  Designation: any = [];
  function_id;
  Branch: any = [];
  Department: any = [];
  designation;
  branch;
  department;
  length;
  name;
  code;
  displayEmployee = [];
  allemp;
  totalemployee;
  profilephoto: any;
  profilesplit: any;
  showfilter: boolean = false;
  loading: boolean = false;
  obj;
  username = window.localStorage.getItem('TUM_USER_NAME');
  VALUE: any;
  constructor(public loadingController: LoadingController, private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService) {
    this.function_id = window.localStorage["FUNCTION_ID"];
    // this.branch = window.localStorage["TUM_BRANCH_ID"]
    // this.designation = window.localStorage.getItem("EmpDesignation");
    // this.department = window.localStorage.getItem("EmpDepartment");
  }

  ngOnInit() {

    // this.employeeSearch();
  }

  ionViewDidEnter() {
    this.getDesignation();
    this.getBranch();
    this.getDepartment();
    this.employeeSearch();
  }
  //get designation
  getDesignation() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/CommonDropdown/Designation/0/0/0").then(resp => {

      console.log("workin", resp)
      this.Designation = resp;
      console.log(this.Designation)
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  //get branch
  getBranch() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/CommonDropdown/Branch/0/0/0").then(resp => {
      this.Branch = resp;
      console.log(this.Branch);
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }
  //get department
  getDepartment() {
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + "/CommonDropdown/Department/0/0/0").then(resp => {
      this.Department = resp;
      console.log(this.Department);
    }, error => {

      console.log("error : " + JSON.stringify(error));

    });
  }

  employeeSearch() {
    this.loading = true;
    this.presentLoadingWithOptions();
    debugger;
    // this.switch = 1;
    var name;
    var code;
    var designation;
    var branch;
    var department;
    console.log(this.employeeSearch)
    console.log("designation:" + this.designation, "branch:" + this.branch, "dept:" + this.department);

    if (this.name == undefined || this.name == '') {
      name = "0";
    } else {
      name = this.name;
    }

    if (this.code == undefined || this.code == '') {
      code = "0";
    } else {
      code = this.code;
    }
    if (this.designation == undefined || this.designation == '') {
      designation = "0";
    } else {
      designation = this.designation.VALUE;


    }
    if (this.branch == undefined || this.branch == '') {
      debugger;
      branch = "0";
    } else {
      branch = this.branch.VALUE;
    }
    if (this.department == undefined || this.department == '') {
      department = "0";
    } else {
      department = this.department.VALUE;
    }

    var increment;

    this.displayEmployee = []
    increment = 50;
    this.length = 0;

    this.obj = {
      empID: "0",
      name: name||0,
      code: code ||0,
      designation: this.designation ||0,
      branch: this.branch ||0,
      department:this.department ||0,
      top: this.length,
      increment: increment ||0,
      //increment: 2000
      // empID: 0,
      // name: 0,
      // code: 0,
      // designation: 0,
      // branch: 0,
      // department: 0,
      // top: 0,
      // increment: 3000,
      appURL: 'employeesearch'

    }
    console.log(this.obj);
    this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + '/EmployeeSearch/' + this.obj.empID + "/" + this.obj.name + "/" + this.obj.code + "/" + this.obj.designation + "/" + this.obj.branch + "/" + this.obj.department + "/" + this.obj.top + "/" + this.obj.increment + '/' + this.obj.appURL).then(resp => {
      this.loadingdismiss();
      this.loading = false;
      this.allemp = resp;
      console.log(this.allemp,"emp");

      // this.allemp = JSON.parse(resp.toString());
      if( this.allemp=="No data found"){
      this.count= JSON.stringify(this.displayEmployee);
      }else{
        this.displayEmployee = this.displayEmployee.concat(this.allemp);
        // console.log("displayEmployee : " + JSON.stringify(this.displayEmployee));
      }


      //  this.displayEmployee.forEach

      this.displayEmployee.forEach(element => {
        if (element.Photo != null) {
          this.profilephoto = element.Photo;
          // console.log(""+this.profilephoto)
          this.profilesplit = this.profilephoto.split('/');
          this.profilesplit = this.profilesplit[6];
          console.log("" + this.profilesplit)
          element.profilePhoto = 'http://demo.herbieai.com/ssg/uploaddocu/sstpl/' + this.profilesplit;
        }
        else {
          if (element.Sex == 'Male')
            element.profilePhoto = 'assets/Images/defaultMale.png';
          else {
            element.profilePhoto = 'assets/Images/defaultFemale.png';
          }
        }
      });
      //  this.profile[0].Photo='https://sunsmart.in/mydesk/Uploaddocu/SSTPL/'+this.photo[this.img];
      this.Branch.forEach(data => {
        this.displayEmployee.forEach(element => {
          if (element.Branch_ID == data.VALUE) {
            element.branchtxt = data.TEXT;
            this.loadingdismiss();

          }

        });
      });

      this.length = this.displayEmployee.length + 1;
    }, error => {
      this.loadingdismiss();
      this.loading = false;
      console.log("error : " + JSON.stringify(error));

    });

    // var obj1 = {
    //   empID: "0",
    //   name: name,
    //   code: code,
    //   designation:  this.designation,
    //   branch: branch,
    //   department: department,
    //   top: this.length,
    //   increment: increment,
    //   appURL: 'employeesearch'
    // }

    // this.HttpRequest.GetRequest(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlhrms + '/EmployeeSearch/' + obj1.empID + "/" + obj1.name + "/" + obj1.code + "/" + obj1.designation + "/" + obj1.branch + "/" + obj1.department + "/" + obj1.top + "/" + obj1.increment + "/" + obj1.appURL).then((resp:any) => {
    //   console.log(resp)
    //   this.loading = false;
    //   this.allemp=resp

    //   if( this.allemp=="No data found"){
    //     this.count= JSON.stringify(this.displayEmployee);
    //     }else{
    //       this.displayEmployee = this.displayEmployee.concat(this.allemp);
    //       // console.log("displayEmployee : " + JSON.stringify(this.displayEmployee));
    //     }
    //   // this.totalemployee = JSON.parse(resp.toString()).length;
    //   // this.totalemployee = resp.length;
    //   // this.totalemployee = JSON.parse(this.totalemployee);
    //   // this.totalemployee = JSON.parse(resp.toString()).length;
    // }, error => {
    //   this.loading = false;
    //   // this.loadingdismiss();
    //   console.log("error : " + JSON.stringify(error));

    // });
  }



  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
    });
    return await loading.present();
  }

  async loadingdismiss() {

    return await this.loadingController.dismiss();
  }

  portChange(event: {

    component: IonicSelectableComponent,
    value: any,
  }) {
    console.log('port:', event);
  }

  modalcancel(event: {
    component: IonicSelectableComponent,
    value: any,
  }) {
    event.value = '';
    console.log(event);
  }

  togglefilter() {
    this.showfilter = !this.showfilter;
  }
}

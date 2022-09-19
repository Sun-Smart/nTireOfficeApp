import { Component, OnInit} from '@angular/core';
import { CameraserviceService} from '../../service/cameraservice.service';
import { CameraService } from 'src/app/service/camera.service';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { HttprequestService } from '../../service/httprequest.service';
import { IpaddressService } from '../../ipaddress.service';
import {ToastmessageService} from '../../service/toastmessage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.page.html',
  styleUrls: ['./applicant-details.page.scss'],
})
export class ApplicantDetailsPage implements OnInit {
DeleteImage(_t622: number) {
throw new Error('Method not implemented.');
}

  chkval;
  name;
  imagecif;
  Images = [];
  image=[];
  file=[];
  Images1=[];
            file1=[];
            userId;
            usertoken;
            token;
            dat_valid: { currentDate: Date; };
            FUNCTION_ID;
            agencyname=[];
            agencyname1;
            hrmedudetaiscat1;
            hrmedudetaiscat=[];
            hrmjobcategory1;
            hrmjobcategory=[];
            filename;
            filename1;
            applicantmasterid;
            finalid;
            gapplicationdate;
            gdob;
            gppvalidity;
            updaterefrenceno;
            gname;
            gfamilyname;
            gmiddlename;
            ggender;
            gmobile;
            gprimartemail;
            gapplicationref;
            gmaritalstatus;
            gapplicationmode;
            gfathername;
            gage;
            gpassportnumber;
            ghighqualification;
            gjobcategory;
            gtotalexp;
            glastsalary;
            gexpsalary;
            glocationpref;
            gnoticeperiod;
            grelaventexp;
            goverseasexp;
            gcurrentaddress;
            gpermanentaddress;
            gaddress2c;
            gaddress2p;
            gcityc;
            gcityp;
            gstatec;
            gstatep;
            gcountryc;
            gcountryp;
            gpincodec;
            pincodep;
            gphonec;
            gphonep;
            gfax;
            gsecemail;
            gref1;
            gcontact1;
            gref2;
            gcontact2;
            information;
            agency;
            locprefdetails1;
            locprefdetails=[];
            projectselect:boolean;
            projectmultiselect:boolean;
            refrenceno;
            generalapplicantdetails;
            gapplicantphoto;
            masterid;
            appilcantplus;
           member_refid;
           refid;
           urldata;
           updaterefno;
  refrenceid: any;
sanitizer: any;

  constructor(private router:Router,private datepipe: DatePipe,private http: HttpClient,public CameraserviceService: CameraserviceService, private CameraService: CameraService,private crop: Crop, private base64: Base64,private HttpRequest: HttprequestService, public Ipaddressservice: IpaddressService,public toastmessageService:ToastmessageService,private activatedRoute:ActivatedRoute) {
    this.dat_valid= {
      currentDate: new Date()
    };
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res);
  });
  this.member_refid = localStorage.getItem('refno');
    this.userId=window.localStorage['TUM_USER_ID'];
    this.usertoken=window.localStorage['usertoken'];
    this.token=window.localStorage['token'];
    this.FUNCTION_ID=window.localStorage['FUNCTION_ID'];
    this.name = window.localStorage['FUNCTION_DESC'];
    this.projectselect=true;
    // this.ggender="";
    // this.gmaritalstatus="";
    this.gapplicationmode="";
    this.agency="";
    this.ghighqualification="";
    this.gjobcategory="";
    this.getAgencyName();
    this.getHighestQualification();
    this.getJobCategory();
    this.getLocationRefrence();
    this.getemploymentdesign();
    this.getskillcatdetail();
    this.getemploymentmappedto();
    this.getskillratingdetail();
    this.geteducation();
    this.getgeneraldetail();
    this.getupdateskilldetail();
    this.getupdateemploymentdetail();


   }

  ngOnInit() {
  }
  multiselectproject(){
    if (this.projectselect == true) {
      this.projectmultiselect = true;
      this.projectselect = false;
  } else {
      this.projectselect = true;
      this.projectmultiselect = false;
  }
  }
  getemploymentdesign(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmemploymentdesign/",datag).then(resp=>{
      console.log(resp);
    })
  }
   getupdateid(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"applicantid/",datag).then(resp=>{
      console.log(resp);
      this.masterid = resp[0].serial_no;
      this.appilcantplus = parseInt(this.masterid) + 1;
      var datagbmu = {
        access_token:this.token,
        userid:this.userId,
         usertoken:this.usertoken,
         applicantidu:this.appilcantplus
       }
       console.log(datagbmu);
      this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"applicantidupdate/",datagbmu).then(resp=>{
        console.log(resp);
        this.member_refid = resp[0][""];
       })
    })
  }
  // getmemberid(){
  //   var datagbmu = {
  //     access_token:this.token,
  //     userid:this.userId,
  //      usertoken:this.usertoken,
  //      applicantidu:this.appilcantplus
  //    }
  //    console.log(datagbmu);
  //   this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"applicantidupdate/",datagbmu).then(resp=>{
  //     console.log(resp);
  //     this.member_refid = resp[0][""];
  // })
  // }
  getskillcatdetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmskillcatdetail/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getemploymentmappedto(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmemploymentmappedto/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getskillratingdetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmskillratingdetail/",datag).then(resp=>{
      console.log(resp);
    })
  }
  geteducation(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID,
       refrenceid:this.member_refid
     }
     console.log(datag);
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"geteducation/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getupdateemploymentdetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID,
       refrenceid:this.member_refid
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"updateemploymentdetail/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getupdateskilldetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID,
       refrenceid:this.member_refid
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"updateskilldetail/",datag).then(resp=>{
      console.log(resp);
    })
  }
  getgeneraldetail(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID,
       refrenceid:this.member_refid
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getgeneraldetail/",datag).then(resp=>{

      console.log(resp);
      this.gname = resp[0].amd_firstname;
      this.gfamilyname  =  resp[0].amd_lastname;
      this.gmiddlename = resp[0].amd_middlename;
      this.ggender = resp[0].amd_sex;
      this.gmobile = resp[0].amd_mobile;
      this.gprimartemail = resp[0].amd_email1;
      this.gapplicationdate = new Date( resp[0].amd_date).toISOString().split('T')[0];

      this.updaterefrenceno = resp[0].amd_reference_no;
      this.gmaritalstatus = resp[0].amd_marital_status;
      this.gapplicationmode = resp[0].amd_resume_mode;
      this.agency = resp[0].amd_agency_ref;
      this.gfathername = resp[0].amd_fathername;
      this.gdob =new Date( resp[0].amd_dob).toISOString().split('T')[0];

      this.gpassportnumber = resp[0].amd_passport_no;
      this.gppvalidity =new Date( resp[0].amd_passport_validity).toISOString().split('T')[0];
     this.gage=resp[0].amd_passport_no;
      this.ghighqualification = parseInt(resp[0].highest_qualification);
      this.gjobcategory = parseInt(resp[0].amd_job_category);
      this.gtotalexp = resp[0].amd_experience;
      this.glastsalary = resp[0].amd_last_salary_drawn;
      this.gexpsalary = resp[0].amd_expected_salary;
      this.glocationpref = parseInt(resp[0].amd_location_pref);
      this.gcurrentaddress = resp[0].amd_address1;
      this.gpermanentaddress = resp[0].amd_Perm_address1;
      this.gaddress2c = resp[0].amd_address2;
      this.gaddress2p = resp[0].amd_Perm_address2;
      this.gcityc = resp[0].amd_city;
      this.gcityp = resp[0].amd_Perm_city;
      this.gstatec = resp[0].amd_state;
      this.gstatep = resp[0].amd_Perm_state;
      this.gcountryc = resp[0].amd_country;
      this.gcountryp = resp[0].amd_Perm_country;
      this.gpincodec = resp[0].amd_pin_code;
      this.pincodep = resp[0].amd_Perm_pin_code;
      this.gphonec = resp[0].amd_home_phone;
      this.gphonep = resp[0].amd_office_phone;
      this.gfax = resp[0].amd_fax;
      this.gsecemail = resp[0].amd_email2;
      this.gref1 = resp[0].amd_reference1;
      this.gref2 = resp[0].amd_reference2;
      this.gcontact1 = resp[0].amd_ref_contact_information1;
      this.gcontact2 = resp[0].amd_ref_contact_information2;
      this.information = resp[0].amd_additional_information;
      this.grelaventexp = resp[0].relevent_experience;
      this.goverseasexp = resp[0].amd_overseas_experience;
    })

  }
  getAgencyName(){
    var datag = {
      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"agencynameapi/",datag).then(resp=>{
      console.log(resp);
      this.agencyname1 =resp;
      this.agencyname1.forEach(element => {
        this.agencyname.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  getage(element) {

    // alert(""+element.target.value);
     var birthday=this.datepipe.transform(element.target.value,'yyyy/MM/dd')

     var today = new Date();
     var birthDate = new Date(birthday);

     var age = today.getFullYear() - birthDate.getFullYear();
     var m = today.getMonth() - birthDate.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
       age--;
     }

    //  alert("age : "+age);
     // console.log(age);
    this.gage=age;
   }


   getage1(element) {

    // alert(""+element);
     var birthday=this.datepipe.transform(element,'yyyy/MM/dd')

     var today = new Date();
     var birthDate = new Date(birthday);

     var age = today.getFullYear() - birthDate.getFullYear();
     var m = today.getMonth() - birthDate.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
       age--;
     }

    //  alert("age : "+age);
     // console.log(age);
    this.gage=age;
   }
  getHighestQualification(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmeducationcategory/",datag).then(resp=>{
      this.hrmedudetaiscat1 =resp;
      this.hrmedudetaiscat1.forEach(element => {
        this.hrmedudetaiscat.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }

  getLocationRefrence(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"locationpreference/",datag).then(resp=>{
      this.locprefdetails1 =resp;
      this.locprefdetails1.forEach(element => {
        this.locprefdetails.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  getJobCategory(){
    var datag = {

      access_token:this.token,
      userid:this.userId,
       usertoken:this.usertoken,
       functid:this.FUNCTION_ID
     }
    this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"hrmjobcategory/",datag).then(resp=>{
      this.hrmjobcategory1 =resp;
      this.hrmjobcategory1.forEach(element => {
        this.hrmjobcategory.push(element);
      });
     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  Attachdocument() {
 this.imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

    this.CameraService.camerafunction('camera').then(imageData=>{

      this.crop.crop(imageData["data"], { quality: 100 })
      .then(
        newImage => {

          this.base64.encodeFile(newImage).then((base64File: string) => {
            var base64result = base64File.split(',')[1]

            var fileURL = "data:image/jpeg;base64," + base64result;

            this.Images.push(fileURL)

            this.image.push(this.imagecif + "_Csales.jpg");

            var file = this.dataURLtoFile(fileURL, this.image);
            this.file.push(this.dataURLtoFile(fileURL, this.image));
            this.filename = this.file[0].name;
          }, (err) => {
            console.log(err);
          });

        },
        error => {
          console.error('Error cropping image', error);
        }
      );

    }, error => {

   console.log("error : "+JSON.stringify(error));

    });


  }


  usameaddress(val) {
    // console.log(val);
    if(val==false){
      this.gpermanentaddress=this.gcurrentaddress;
     this.gaddress2p= this.gaddress2c;
     this.gcityp= this.gcityc;
     this.gstatep= this.gstatec;
      this.gcountryp=this.gcountryc;
     this.pincodep= this.gpincodec;
     this.gphonep= this.gphonec;

    }else{
       this.gpermanentaddress='';
       this.gaddress2p='';
      this.gcityp='';
      this.gstatep='';
      this.gcountryp='';
      this.pincodep='';
      this.gphonep='';
    }
    }






  attachProfile(){
    this.imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

    this.CameraService.camerafunction('camera').then(imageData=>{

      this.crop.crop(imageData["data"], { quality: 100 })
      .then(
        newImage => {

          this.base64.encodeFile(newImage).then((base64File: string) => {
            var base64result = base64File.split(',')[1]

            var fileURL = "data:image/jpeg;base64," + base64result;

            this.Images1.push(fileURL)

            this.Images1.push(this.imagecif + "_Csales.jpg");

            var file = this.dataURLtoFile(fileURL, this.image);
            this.file1.push(this.dataURLtoFile(fileURL, this.image));
            this.filename1 = this.file1[0].name;
          }, (err) => {
            console.log(err);
          });

        },
        error => {
          console.error('Error cropping image', error);
        }
      );

    }, error => {

   console.log("error : "+JSON.stringify(error));

    });
  }
  dataURLtoFile(dataURI, filename) {
    console.log(dataURI)
    console.log(filename)

    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  saveGeneralDetails(){
  if((this.gname==undefined||this.gname==null)||(this.gfamilyname==undefined||this.gfamilyname==null)||(this.ggender==undefined||this.ggender==null)
  ||(this.gmobile==undefined||this.gmobile==null)||(this.gapplicationdate==undefined||this.gapplicationdate==null)||(this.gdob==undefined||this.gdob==null)
  ||(this.gapplicationmode==undefined||this.gapplicationmode==null)||(this.gage==undefined||this.gage==null)||(this.ghighqualification==undefined||this.ghighqualification==null)
  ||(this.gjobcategory==undefined||this.gjobcategory==null)||(this.glocationpref==undefined||this.glocationpref==null)||(this.gpermanentaddress==undefined||this.gpermanentaddress==null)
  ||(this.gtotalexp==undefined||this.gtotalexp==null)||(this.glastsalary==undefined||this.glastsalary==null)||(this.gexpsalary==undefined||this.gexpsalary==null)){
    this.toastmessageService.presentAlert1("Alert","Please fill in all the details");
  }else{
    if(this.file[0]!=undefined){
      var url = this.Ipaddressservice.ipaddress + '/dms/uploadprofileImg';
      const formData: any = new FormData();
      formData.append("upload", this.file[0], this.filename);

      console.log('form data variable :   ' + formData.toString());
      this.http.post(url, formData)
  .subscribe(files => console.log('files', files))
}
if(this.file1[0]!=undefined){
  var url = this.Ipaddressservice.ipaddress + '/dms/uploadprofileImg';
  const formData: any = new FormData();
      formData.append("upload", this.file1[0], this.filename1);

      console.log('form data variable :   ' + formData.toString());
      this.http.post(url, formData)
  .subscribe(files => console.log('files', files))
}
  var datag = {

    access_token:this.token,
    userid:this.userId,
     usertoken:this.usertoken,

   }
   this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"applicantid/",datag).then(resp=>{
    this.applicantmasterid=resp[0].serial_no;

    if(this.applicantmasterid.length > 0){

  var appilcantplus=parseInt(this.applicantmasterid) + 1;
        var datagbmu = {


        access_token:this.token,
        userid:this.userId,
         usertoken:this.usertoken,
         applicantidu:appilcantplus

       }
       this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"applicantidupdate/",datagbmu).then(resp=>{
        this.finalid=resp[0][""];
        localStorage.setItem('finalid', this.finalid);

        // all insert
  if(this.gapplicationdate != undefined){
    var applicationdte =this.datepipe.transform(this.gapplicationdate,'dd/MM/yyyy')

    }else{
      var applicationdte ='';
    }
    if(this.gdob != undefined){
    var applicantdob = this.datepipe.transform(this.gdob,'dd/MM/yyyy')

    }else{
      var applicantdob ='';
    }
    if(this.gppvalidity != undefined){
    var applicantppvaldte =this.datepipe.transform(this.gppvalidity,'dd/MM/yyyy')

    }
    else{
    var applicantppvaldte ='';
    }

    if(this.gname == undefined){
      this.gname='';
    }
    if(this.gfamilyname == undefined){
      this.gfamilyname='';
    }
    if(this.gmiddlename == undefined){
      this.gmiddlename='';
    }
    if(this.ggender == undefined){
      this.ggender='';
    }
    if(this.gmobile == undefined){
      this.gmobile='';
    }
    if(this.gprimartemail == undefined){
     this.gprimartemail='';
    }
    if(this.gapplicationref == undefined){
     this.gapplicationref='';
    }
    if(this.gmaritalstatus == undefined){
     this.gmaritalstatus='';
    }
    if(this.gapplicationmode == undefined){
     this.gapplicationmode='';
    }
    if(this.agency == undefined){
     this.agency='';
    }
    if(this.gfathername == undefined){
     this.gfathername='';
    }
    if(this.gage == undefined){
     this.gage='';
    }
    if(this.gpassportnumber == undefined){
     this.gpassportnumber='';
    }
    if(this.ghighqualification == undefined){
     this.ghighqualification='';
    }
    if(this.gjobcategory == undefined){
     this.gjobcategory='';
    }
    if(this.gtotalexp == undefined){
     this.gtotalexp='';
    }
    if(this.glastsalary == undefined){
     this.glastsalary='';
    }
    if(this.gexpsalary == undefined){
     this.gexpsalary='';
    }
    if(this.gexpsalary == undefined){
     this.gexpsalary='';
    }
    if(this.glocationpref == undefined){
     this.glocationpref='';
    }
    if(this.gnoticeperiod == undefined){
     this.gnoticeperiod='';
    }
    if(this.grelaventexp == undefined){
     this.grelaventexp='';
    }
    if(this.goverseasexp == undefined){
     this.goverseasexp='';
    }
    if(this.filename == undefined){
     this.filename='';
    }
    if(this.gcurrentaddress == undefined){
     this.gcurrentaddress='';
    }
    if(this.gpermanentaddress == undefined){
     this.gpermanentaddress='';
    }
    if(this.gaddress2c == undefined){
     this.gaddress2c='';
    }
    if(this.gaddress2p == undefined){
     this.gaddress2p='';
    }
    if(this.gcityc == undefined){
     this.gcityc='';
    }
    if(this.gcityp == undefined){
     this.gcityp='';
    }
    if(this.gstatec == undefined){
     this.gstatec='';
    }
    if(this.gstatep == undefined){
     this.gstatep='';
    }
    if(this.gcountryc == undefined){
     this.gcountryc='';
    }
    if(this.gcountryp == undefined){
     this.gcountryp='';
    }
    if(this.gpincodec == undefined){
     this.gpincodec='';
    }
    if(this.pincodep == undefined){
     this.pincodep='';
    }
    if(this.gphonec == undefined){
     this.gphonec='';
    }
    if(this.gphonep == undefined){
     this.gphonep='';
    }
    if(this.gfax == undefined){
     this.gfax='';
    }
    if(this.gsecemail == undefined){
     this.gsecemail='';
    }
    if(this.gref1 == undefined){
     this.gref1='';
    }
    if(this.gcontact1 == undefined){
     this.gcontact1='';
    }
    if(this.gref2 == undefined){
     this.gcontact2='';
    }
    if(this.information == undefined){
     this.information='';
    }

    var datagbmufinal = {


          access_token:this.token,
          userid:this.userId,
           usertoken:this.usertoken,
           finalapplicantid:this.finalid,
          // finalapplicantid:this.updaterefrenceno,
            givenname:this.gname,
           familyname:this.gfamilyname,
           middlename:this.gmiddlename,
           gender:this.ggender,
           mobile:this.gmobile,
           primaryemail:this.gprimartemail,
           applicationdate:applicationdte,
           applicantref:this.gapplicationref,
           maritalstatus:this.gmaritalstatus,
           applicationmode:this.gapplicationmode,
           agencyname:this.agencyname,
           fathername:this.gfathername,
           dob:applicantdob,
           age:this.gage,
           passportno:this.gpassportnumber,
           ppvalidity:applicantppvaldte,
           qualification:this.ghighqualification,
           jobcat:this.gjobcategory,
           totalexp:this.gtotalexp,
           lastsalary:this.glastsalary,
           expsalary:this.gexpsalary,
           locationpref:this.glocationpref,
           noticeperiod:this.gnoticeperiod,
           relavantexp:this.grelaventexp,
           overseasexp:this.goverseasexp,
           applicantphoto:this.filename,
           caddress1:this.gcurrentaddress,
           paddress1:this.gpermanentaddress,
           caddress2:this.gaddress2c,
           paddress2:this.gaddress2p,
           ccity:this.gcityc,
           pcity:this.gcityp,
           cstate:this.gstatec,
           pstate:this.gstatep,
           ccountry:this.gcountryc,
           pcountry:this.gcountryp,
           cpincode:this.gpincodec,
           ppincode:this.pincodep,
           resphone:this.gphonec,
           officephone:this.gphonep,
           fax:this.gfax,
           secondarymail:this.gsecemail,
           reference1:this.gref1,
           contact1:this.gcontact1,
           reference2:this.gref2,
           contact2:this.gcontact2,
           profile:this.filename1,
           addinfo:this.information,
           functid:this.FUNCTION_ID,
           }
         // console.log(datagbmufinal);
         this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"applicantfinalinsert/",datagbmufinal).then(resp=>{
          // this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"updateapplicantfinalinsert/",datagbmufinal).then(resp=>{


          this.updaterefrenceno=this.finalid;
          // console.log(this.updaterefrenceno);
          this.toastmessageService.presentAlert1("Applicant","Created Successfully");
        // this.getGeneraldetails(this.updaterefrenceno);
         }, error => {

         console.log("error : "+JSON.stringify(error));

         });

       }, error => {

       console.log("error : "+JSON.stringify(error));

       });


    }

   }, error => {

   console.log("error : "+JSON.stringify(error));

   });
  }
}
  getGeneraldetails(refrenceno){
    var datageesu = {
      access_token:this.token,
      userid:this.userId,
      usertoken:this.usertoken,
      functid:this.FUNCTION_ID,
       refrenceid:refrenceno
     }
     this.HttpRequest.PostRequest(this.Ipaddressservice.ipaddress +this.Ipaddressservice.serviceurlhrms2+"getgeneraldetail/",datageesu).then(resp=>{
     this.generalapplicantdetails=resp;
 this.gname=this.generalapplicantdetails[0].amd_firstname;
 this.gfamilyname=this.generalapplicantdetails[0].amd_lastname;
 this.ggender=this.generalapplicantdetails[0].amd_sex;
  this.gmobile=parseInt(this.generalapplicantdetails[0].amd_mobile);
   this.gprimartemail=this.generalapplicantdetails[0].amd_email1;
   this.gapplicationdate=this.generalapplicantdetails[0].amd_date;
    this.gmaritalstatus=this.generalapplicantdetails[0].amd_marital_status;
   this.gapplicationmode=this.generalapplicantdetails[0].amd_resume_mode;
   this.agencyname=this.generalapplicantdetails[0].amd_agency_ref;
   this.gfathername=this.generalapplicantdetails[0].amd_fathername;
   this.gpassportnumber=this.generalapplicantdetails[0].amd_passport_no;
   this.ghighqualification=this.generalapplicantdetails[0].highest_qualification;
   this.gjobcategory=this.generalapplicantdetails[0].amd_job_category;
   this.gtotalexp=parseInt(this.generalapplicantdetails[0].amd_experience);
   this.glastsalary=parseInt(this.generalapplicantdetails[0].amd_last_salary_drawn);
   this.gexpsalary=parseInt(this.generalapplicantdetails[0].amd_expected_salary);
   this.gnoticeperiod=parseInt(this.generalapplicantdetails[0].amd_availablity);
   this.grelaventexp=parseInt(this.generalapplicantdetails[0].relevent_experience);
   this.goverseasexp=this.generalapplicantdetails[0].amd_overseas_experience;
   this.gcurrentaddress=this.generalapplicantdetails[0].amd_address1;
   this.gpermanentaddress=this.generalapplicantdetails[0].amd_Perm_address1;
   this.gaddress2c=this.generalapplicantdetails[0].amd_address2;
   this.gaddress2p=this.generalapplicantdetails[0].amd_Perm_address2;
   this.gcityc=this.generalapplicantdetails[0].amd_city;
   this.gcityp=this.generalapplicantdetails[0].amd_Perm_city;
   this.gstatec=this.generalapplicantdetails[0].amd_state;
   this.gstatep=this.generalapplicantdetails[0].amd_Perm_state;
   this.gcountryc=this.generalapplicantdetails[0].amd_country;
   this.gcountryp=this.generalapplicantdetails[0].amd_Perm_country;
    this.gpincodec=parseInt(this.generalapplicantdetails[0].amd_pin_code);
    this.pincodep=parseInt(this.generalapplicantdetails[0].amd_Perm_pin_code);
     this.gphonec=parseInt(this.generalapplicantdetails[0].amd_home_phone);
     this.gphonep=parseInt(this.generalapplicantdetails[0].amd_office_phone);
   this.gnoticeperiod=parseInt(this.generalapplicantdetails[0].amd_availability_from);
     this.glocationpref=this.generalapplicantdetails[0].amd_location_pref;
     this.gfax=parseInt(this.generalapplicantdetails[0].amd_fax);
     this.gsecemail=this.generalapplicantdetails[0].amd_email2;
     this.gref1=this.generalapplicantdetails[0].amd_reference1;
     this.gcontact1=this.generalapplicantdetails[0].amd_ref_contact_information1;
     if(this.generalapplicantdetails[0].amd_reference2=='undefined'){
     this.gref2='';
     }else{
     this.gref2=this.generalapplicantdetails[0].amd_reference2;
     }
     this.gcontact2=this.generalapplicantdetails[0].amd_ref_contact_information2;
     this.information=this.generalapplicantdetails[0].amd_additional_information;
     this.information=this.generalapplicantdetails[0].amd_additional_information;
     this.gdob=new Date(this.generalapplicantdetails[0].amd_dob);

     this.getage1(this.gdob);
     this.gppvalidity=new Date(this.generalapplicantdetails[0].amd_passport_validity);
     this.gapplicantphoto=this.generalapplicantdetails[0].amd_photo;
        // console.log(this.updategeneral.gapplicantphoto);

   var birthday=this.datepipe.transform(this.gdob,'yyyy-MM-dd')
   var today = new Date();
  var birthDate = new Date(birthday);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  // console.log(age);
  this.gage=age;

     }, error => {

     console.log("error : "+JSON.stringify(error));

     });
  }
  historypage(){
   this.router.navigateByUrl('hrmsapplicantsummary');
  }
}

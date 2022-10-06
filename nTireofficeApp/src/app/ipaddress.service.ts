
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class IpaddressService {
  public ipaddress;
  public ipaddress1;
  public getLoginLink;
  public serviceurl;
  public companyurl;
  public addcontacturl;
  public serviceurldms;
  public serviceurllos;
  public serviceurlhrms;
  public serviceurlhrms1;
  public serviceurlhrms2;
  public serviceurlhrms3;
  public serviceurlhrms4;
  public serviceurlhrms5;
  public serviceurlCams;
  public serviceurlCamsNode;
  public serviceerpapi;
  public serviceurlerp
  constructor() {

    //  this.ipaddress1 = "http://demo.herbie.ai";

    //  this.ipaddress = "http://demo.herbie.ai:8034";

    //   this.ipaddress1 = "http://65.0.146.170";
    //  this.ipaddress = "http://65.0.146.170:8034";


    // this.ipaddress1 = "http://prod.herbie.ai";
    // this.ipaddress ="https://prod.herbie.ai:8033";


    this.ipaddress1 = "http://demo.herbie.ai";
    this.ipaddress ="https://demo.herbie.ai:8033";

// ICRISAT
    // this.ipaddress = "http://192.168.0.154:8033";
    // this.ipaddress = "http://192.168.43.214:8033";
    //  this.ipaddress1="http://192.168.0.154";

    this.serviceurlhrms = "/SSGmobileapi/HRMS/HRMS.svc/";
    this.serviceurlhrms1 = "/SSGmobileapi/bo/bo.svc/";
    this.serviceurlhrms2 = "/dms/DMS/cams_hrms_sales/";
    this.serviceurlhrms3 = "/SSGmobileapi/BO/BO.svc/";
    this.serviceurlhrms4 = "/dms/DMS/dmsapi/DMS/";
    this.serviceurlhrms5 = "/dms/DMS/E-attendence/";


    // this.serviceurlhrms = "/nTireMobileCoreAPI/api/HRMS";
    // this.serviceurlhrms1 = "/nTireMobileCoreAPI/api/HRMS/";
    // this.serviceurlhrms2 = "/nTireMobileCoreAPI/api/HRMS/";
    // this.serviceurlhrms3 = "/nTireMobileCoreAPI/api/HRMS/";
    // this.serviceurlhrms4 = "/dms/DMS/dmsapi/DMS/";
    // this.serviceurlhrms5 = "/dms/DMS/E-attendence/";


    this.serviceurl = "/SSGmobileapi/LMS/LMS.svc";
    this.serviceurldms = "/dms/DMS/sales";
    this.getLoginLink = '/dms';

    this.serviceurllos = "/los/LOS/";

    //Cams

    this.serviceurlCamsNode = "/dms/DMS/cams_hrms_sales"
    this.serviceurlCams = "/SSGmobileapi/cams/cams.svc/"

    // this.serviceurlCamsNode = "/nTireMobileCoreAPI/api/CAMS"
    // this.serviceurlCams = "/nTireMobileCoreAPI/api/CAMS/"


    // this.serviceurlCamsNode = "/dms/DMS/cams_hrms_sales"
    // this.serviceurlCams="/mobileapi/cams/cams.svc/"

        //procurement
        //prod
        // this.serviceerpapi = "/dms/DMS/erpapi/";
//demo
    this.serviceerpapi = "/nTireMobileCoreAPI/api/ERP/"
    // https://demo.herbie.ai/nTireMobileCoreAPI/api/ERP/get_PRS_search


  }
}

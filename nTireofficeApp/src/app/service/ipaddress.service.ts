/* eslint-disable @typescript-eslint/quotes */
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
  public serviceurlSales;
  public serviceurlProperty;
  public insertserviceurl;
  tokenlogin: string;
  hrmslogindata: string;
  dynamicmenu: string;
  getLoginLinkFM: string;
  serviceurllosFM: string;
  dynamicmenuFM: string;

  constructor() {

    //  this.ipaddress1 = "http://demo.herbie.ai";

    //  this.ipaddress = "http://demo.herbie.ai:8033";

    //   this.ipaddress1 = "http://65.0.146.170";
    //  this.ipaddress = "http://65.0.146.170:8033";

    // this.ipaddress1 = "http://prod.herbie.ai";
    // this.ipaddress ="https://prod.herbie.ai:8033";

    this.ipaddress1 = "https://demo.herbie.ai";
    this.ipaddress = "https://demo.herbie.ai";

    this.tokenlogin = "/nTireMobileCoreAPISSG/api";
    this.hrmslogindata = "/nTireMobileCoreAPISSG/api";
    // ICRISAT
    // this.ipaddress = "http://192.168.0.154:8033";
    // this.ipaddress = "http://192.168.43.214:8033";
    //  this.ipaddress1="http://192.168.0.154";


    // this.serviceurlhrms = "/SSGmobileapi/HRMS/HRMS.svc/";
    // this.serviceurlhrms1 = "/SSGmobileapi/bo/bo.svc/";
    // this.serviceurlhrms2 = "/dms/DMS/cams_hrms_sales/";
    // this.serviceurlhrms3 = "/SSGmobileapi/BO/BO.svc/";
    // this.serviceurlhrms4 = "/dms/DMS/dmsapi/DMS/";
    // this.serviceurlhrms5 = "/dms/DMS/E-attendence/";



    this.serviceurlhrms = "/nTireMobileCoreAPISSG/api/HRMS";
    this.serviceurlhrms1 = "/nTireMobileCoreAPISSG/api/HRMS/";
    this.serviceurlhrms2 = "/nTireMobileCoreAPISSG/api/HRMS/";
    this.serviceurlhrms3 = "/nTireMobileCoreAPISSG/api/HRMS/";
    // this.serviceurlhrms4 = "/dms/DMS/dmsapi/DMS/";
    // this.serviceurlhrms5 = "/dms/DMS/E-attendence/";


    // Sales
    this.serviceurl = "/nTireMobileCoreAPI/api/Sales/";
    this.insertserviceurl = "/nTireMobileCoreAPI/api/Sales/";
    this.serviceurlSales = "/nTireMobileCoreAPI/api/Sales/";

    // this.serviceurl = "/SSGmobileapi/LMS/LMS.svc/";
    // this.serviceurlSales = "/dms/DMS/sales/";

    this.getLoginLink = '/nTireMobileCoreAPI/api/Login';
    this.serviceurllos = "/los/LOS/";
    this.dynamicmenu = '/nTireMobileCoreAPI/api';

    // Login for Property

    this.getLoginLinkFM = '/nTireMobileCoreAPI/api/Login';
    this.serviceurllosFM = "/los/LOS/";
    this.dynamicmenuFM = '/nTireMobileCoreAPI/api';


    //Cams

    // this.serviceurlCamsNode = "/dms/DMS/cams_hrms_sales"
    // this.serviceurlCams = "/SSGmobileapi/cams/cams.svc/"

    this.serviceurlCamsNode = "/nTireMobileCoreAPI/api/CAMS";
    this.serviceurlCams = "/nTireMobileCoreAPI/api/CAMS/";


    //Procurement
    // this.serviceerpapi = "/dms/DMS/erpapi/";
    this.serviceerpapi = "/nTireMobileCoreAPI/api/ERP/";

    this.dynamicmenu ="/nTireMobileCoreAPI/api";

    // Property p

    this.serviceurlProperty = "/nTireMobileCoreAPIFM/api/Property/";


  }


}

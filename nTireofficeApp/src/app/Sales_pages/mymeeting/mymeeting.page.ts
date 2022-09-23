/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable new-parens */
/* eslint-disable radix */
/* eslint-disable one-var */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable curly */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
declare var $: any;
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { LocationupdateleadsPage } from '../locationupdateleads/locationupdateleads.page';
declare var google: any;

@Component({
  selector: 'app-mymeeting',
  templateUrl: './mymeeting.page.html',
  styleUrls: ['./mymeeting.page.scss'],
})
export class MymeetingPage implements OnInit {
  InforObj = [];
  DateTime;
  TCC_CUST_ID;
  TCC_CUST_LEAD_ID;
  TCC_CALL_ID;
  latlngvals;
  destination;
  branchlocation;
  branchlatlng;
  range;
  Sales_currentLoc;
  salesCurrentlatlong;
  NoRecord;
  token;
  allmeetinglocation: any;
  showmap;
  map: any;
  starttime;
  meeting;
  currAddress;
  DateTime1 = [];
  address = [];
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  source;
  appointmentByLead = [];
  fromdate;
  todate;
  @ViewChild('map') mapElement: ElementRef;
  username:any;
  constructor(public modalController: ModalController, private router: Router, private datePipe: DatePipe, private nativeGeocoder: NativeGeocoder, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    var today = new Date();

    this.fromdate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.todate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    this.username=localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
  }
  Getmeetings(from_datemeet, to_datemeet) {

    this.allmeetinglocation = "";
    var locations = [];
    var userid = window.localStorage['TUM_USER_ID'];
    var date = new Date(from_datemeet);

    // var day = date.getDate();
    // console.log(from_datemeet)
    // var month = date.getMonth() + 1;
    // var year = date.getFullYear();
    from_datemeet = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();

    var date1 = new Date(to_datemeet);
    // var day1 = date1.getDate();
    // var month1 = date1.getMonth() + 1;
    // var year1 = date1.getFullYear();
    to_datemeet = ('0' + date1.getDate()).slice(-2) + '/' + ('0' + (date1.getMonth() + 1)).slice(-2) + '/' + date1.getFullYear();

    this.token = window.localStorage['token'];
    var tokenJSON = { access_token: this.token, userid: window.localStorage['TUM_USER_ID'], 'usertoken': window.localStorage['usertoken'] };

    var getapppostJSONtmp = { user_id: userid, from_datemeet: from_datemeet, to_datemeet: to_datemeet }
    var getapppostJSON = Object.assign(getapppostJSONtmp, tokenJSON);
    console.log("getapppostJSON : " + JSON.stringify(getapppostJSON));
    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getallappointments_post/', getapppostJSON, {
      headers: options,
    }).subscribe(resp => {
      this.allmeetinglocation = resp;
      console.log(this.allmeetinglocation);

      if (this.allmeetinglocation == '') {

        this.NoRecord = "No Meeting Found";
        $('#mapDetailsTable').hide();
        $('#showdivs').hide();

      } else {
        $('#showdivs').show();
        this.NoRecord = "";

        for (var i = 0; i < this.allmeetinglocation.length; i++) {

          var latlong = this.allmeetinglocation[i].TCC_LOCATION_TO_MEET;

          var regex = /^[0-9.,]+$/;
          if (latlong == '' || latlong == null) {

          } else {


            if (latlong.match(regex)) {
              console.log("its latlong")
              window.localStorage['meet_loc'] = latlong
              // return false;
            }
            else {
              this.http.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + latlong + '&key=AIzaSyAoA0tJjXYQr7xGY5MuEezEQHfSas9n9T4', {
                headers: options,
              }).subscribe(resp => {
                window.localStorage['meet_loc'] = resp['results'][0].geometry.location.lat + ',' + resp['results'][0].geometry.location.lng;
                console.log(window.localStorage['meet_loc'])

              });

            }
          }
          if (window.localStorage['meet_loc'] != null || window.localStorage['meet_loc'] != 'null' || window.localStorage['meet_loc'] != undefined || window.localStorage['meet_loc'] != 'undefined') {
            console.log(this.allmeetinglocation[i])
            if (window.localStorage['meet_loc']) {
              var index = window.localStorage['meet_loc'].split(",");
              console.log(index);
              var lat = index[0];
              var lang = index[1];
            }

            var statis_array = [];

            if (this.isValidLat(lat) && this.isValidLng(lang)) {

              var date1 = new Date(this.allmeetinglocation[i].TCC_NEXT_CALL_DATE);
              var meetDate = ('0' + date1.getDate()).slice(-2) + '/' + ('0' + (date1.getMonth() + 1)).slice(-2) + '/' + date1.getFullYear();
              var parts = this.allmeetinglocation[i].TCC_NEXT_CALL_DATE.split('T');
              var parts2 = parts[1];
              var parts3 = parts2.split(':');
              var date = new Date(0, 0, 0, parts3[0], parts3[1], 0); var meetTime = this.datePipe.transform(date, 'hh:mm a');
              var meetDateTime = meetDate + ' ' + meetTime;
              console.log(meetDateTime)
              statis_array.push('meeting');
              statis_array.push(lat);
              statis_array.push(lang);
              statis_array.push(this.allmeetinglocation[i].TCC_REMARKS);
              statis_array.push(this.allmeetinglocation[i].TCC_REMARKS_PRIVATE);
              statis_array.push(this.allmeetinglocation[i].TCC_NEXT_CALL_DATE);

              var d = new Date(this.allmeetinglocation[i].START_TIME);

              var h = this.addZero(d.getHours());
              var m = this.addZero(d.getMinutes());
              var s = this.addZero(d.getSeconds());

              this.starttime = h + ":" + m + ":" + s;

              statis_array.push(this.starttime);
              statis_array.push(this.allmeetinglocation[i].CustFullName);
              statis_array.push(this.allmeetinglocation[i].CUST_LEAD_ID);
              statis_array.push(this.allmeetinglocation[i].MOBILE);
              // statis_array.push(this.allmeetinglocation[i].Meeting_address);
              statis_array.push(this.currAddress);
              statis_array.push(meetDateTime);
              var obj = {
                "lat": lat,
                "lng": lang
              };
              console.log(statis_array)
              locations.push(statis_array);
              this.meeting = statis_array;

              console.log(this.meeting)
              console.log(locations)


            }
          }

        }



      }
      if (locations != []) {
        var lat_lng = [];
        this.showmap = true;
        var waypts = [];

        for (var i = 0; i < locations.length; i++) {

          if (locations[i][0] == 'meeting') {
            var data = locations[i];
            var myLatlng = new google.maps.LatLng(data[1], data[2]);

            lat_lng.push(myLatlng);

          }
        }

      } else {
        this.showmap = false;
        alert("No Meetings");


      }
      google.maps.event.addDomListener(window, 'load', this.initMap(locations));



    }, error => {

      console.log("error : " + JSON.stringify(error));

    });

  }
  initMap(markers) {

    console.log(markers)
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var latLongcenter = new google.maps.LatLng(markers[0][1], markers[0][2]);
    console.log(latLongcenter)
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
      mapTypeId: 'roadmap',
      center: latLongcenter
    };


    // Display a map on the page
    map = new google.maps.Map(document.getElementById("mapshowimage12"), mapOptions);
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.4,
      strokeWeight: 0.5,
      fillColor: '#FF0000',
      fillOpacity: 0.10,
      map: map,
      center: latLongcenter,
      radius: parseInt(this.range)
    });

    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
      suppressMarkers: true
    });
    map.setTilt(45);

    // Info Window Content
    var infoWindowContent = [
      ['<div class="info_content">' +
        '<h3>London Eye</h3>' +
        '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' + '</div>'
      ],
      ['<div class="info_content">' +
        '<h3>Palace of Westminster</h3>' +
        '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
        '</div>'
      ]
    ];

    // Display multiple markers on a map

    // var infoWindow = new google.maps.InfoWindow(),
    var infoWindow = new google.maps.InfoWindow();
    var marker, i;

    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();
    var waypts = new Array();

    this.address = [];
    for (i = 0; i < markers.length; i++) {

      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);


      bounds.extend(position);
      if (markers[i][3] == 'customer') {
        var icon_url = 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png';
      } else if (markers[i][3] == 'employee') {
        var icon_url = 'assets/Images/measle_blue-ocn.png';
      } else if (markers[i][3] == 'atm') {
        var icon_url = 'assets/Images/measle_blue-mer.png';
      } else if (markers[i][3] == 'branch') {
        var icon_url = 'assets/Images/measle_bubble.png';
      }
      if (markers[i][0] == 'salesperson') {
        var icon_image = 'assets/Images/user1.png';
        var Employee_ID = localStorage.getItem("emp_id");
        var Sales_ID = localStorage.getItem("sales_id");

        if (Employee_ID == markers[i][3]) {
          var icon_image = 'assets/Images/personblue.png';
        } else {
          var icon_image = 'assets/Images/user1.png';
        }

        marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: icon_image,
          title: markers[i][0]
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infoWindow.setContent('<div class="info_content">' + '<h3 align="center">Employee Details</h3>' + '<p>Emp Code : ' + markers[i][3] + '</p><p>Name : ' + markers[i][4] + '</p><button class="btn btn-success" align="center" id="' + markers[i][3] + '" user_id="' + markers[i][5] + '" onclick="angular.element(this).scope().viewmeeting(this)">View Meetings</button>' + '</div>');
            infoWindow.open(map, marker);

            var latlng = new google.maps.LatLng(markers[i][1], markers[i][2]);

            this.Sales_currentLoc = latlng;
            localStorage.setItem('salesCurrentlatlong', markers[i][1] + "," + markers[i][2]);

            // this.salesCurrentlatlong = markers[i][1] + "," + markers[i][2];
          }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
      } else {
        var latlngdd = new google.maps.LatLng(markers[i][1], markers[i][2]);

        this.Sales_currentLoc = latlngdd;
        localStorage.setItem('salesCurrentlatlong', markers[i][1] + "," + markers[i][2]);


        var nextcalldate = markers[i][5];
        var app_date = new Date(nextcalldate);

        var milliseconds = app_date.getTime();

        var milliseconds1 = new Date().getTime();

        if (milliseconds > milliseconds1) {
          var icon_image = 'assets/Images/markerGreen1.png';
        } else {
          if (markers[i][6] == '') {

            var icon_image = 'assets/Images/markerYellow1.png';
          } else {

            var icon_image = 'assets/Images/location.png';
          }
        }

        var obj = this.meeting;


        var data = markers[i];
        console.log(data)

        var myLatlng = new google.maps.LatLng(data[1], data[2]);
        lat_lng.push(myLatlng);


        waypts.push({
          location: myLatlng,
          stopover: true
        });

        console.log(markers[i][10]);
        console.log(markers[i][9]);
        var time = markers[i][5];
        time = time.slice(0, -1);


        this.TCC_CUST_ID = '';
        this.TCC_CUST_LEAD_ID = '';
        this.TCC_CALL_ID = '';
        marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: icon_image,
          title: markers[i][0]
        });


        var self = this;
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          console.log(markers[i]);

          return function () {




            var latlng = new google.maps.LatLng(markers[i][1], markers[i][2]);

            if (latlng == null || latlng == undefined) {
              var meetingaddress = "Address not Found"
              infoWindow.setContent('<div class="info_content">'
                + '<h3 align="center">Meeting Details</h3>'
                + '<p><span style="font-weight:bold;">Meeting Description :</span> '
                + markers[i][0] + '</p><p style="width: 24em;"><span style="font-weight:bold;">Meeting Address :</span> '
                + meetingaddress + '</p>' + '<p><span style="font-weight:bold;">Mobile Number :</span><a  href="tel:'
                + markers[i][9] + '" style="width: 24em;"> '
                + markers[i][9] + '</a></p>' + '<p><span style="font-weight:bold;">Date : </span>'
                + markers[i][11] + '</p>'
                + '<p><span style="font-weight:bold;">Customer Name :</span>'
                + markers[i][7] + '</p>' + '</p>'
                + '<button class="btn" id="updatebtn" align="center" style="background-color: #2196F3 !important;    color: white;width:50%;" leadId="' + markers[i][8] + '"source="' + window.localStorage['BRANCH_LATLONG'] + '" destination="' + markers[i][1] + ',' + markers[i][2] + '" onclick="angular.element(this).scope().updateMeetingModal(this)">Update Appointment</button>' +
                '<button class="btn btn-success" style="background-color: #5cb85c !important;    color: white;width:50%;" align="center" id="viewbtn" style="width:50%;" source="' + window.localStorage['BRANCH_LATLONG'] + '" destination="' + markers[i][1] + ',' + markers[i][2] + '"  (click)="ng.probe($0).viewTaffic(this)">View Traffic</button>' + '</div>');
              infoWindow.open(map, this);
            } else {
              //var userlatlong=latlong;
              // var latsplit=userlatlong.split(',')

              self.latlngvals = new google.maps.LatLng(markers[i][1], markers[i][2]);

              var promiseaddress = self.showLocation(self.latlngvals)
              promiseaddress.then(data => {

                var meetingaddress = data;

                infoWindow.setContent('<div class="info_content">'
                  + '<h3 align="center">Meeting Details</h3>'
                  + '<p><span style="font-weight:bold;">Meeting Description :</span> '
                  + markers[i][0] + '</p><p style="width: 24em;"><span style="font-weight:bold;">Meeting Address :</span> '
                  + meetingaddress + '</p>' + '<p><span style="font-weight:bold;">Mobile Number :</span><a  href="tel:'
                  + markers[i][9] + '" style="width: 24em;"> '
                  + markers[i][9] + '</a></p>' + '<p><span style="font-weight:bold;">Date : </span>'
                  + markers[i][11] + '</p>'
                  + '<p><span style="font-weight:bold;">Customer Name :</span>'
                  + markers[i][7] + '</p>' + '</p>'
                  + '<button class="btn" id="updatebtn" align="center" style="background-color: #2196F3 !important;    color: white;width:50%;" leadId="' + markers[i][8] + '"source="' + window.localStorage['BRANCH_LATLONG'] + '" destination="' + markers[i][1] + ',' + markers[i][2] + '" onclick="angular.element(this).scope().updateMeetingModal(this)">Update Appointment</button>' +
                  '<button class="btn btn-success" style="background-color: #5cb85c !important;    color: white;width:50%;" align="center" id="viewbtn" style="width:50%;" source="' + window.localStorage['BRANCH_LATLONG'] + '" destination="' + markers[i][1] + ',' + markers[i][2] + '"  (click)="ng.probe($0).viewTaffic(this)">View Traffic</button>' + '</div>');
                infoWindow.open(map, this);

              });

            }


            function formatDate(date, patternStr) {
              if (!patternStr) {
                patternStr = 'M/d/yyyy';
              }
              var monthNames = [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
              ];
              var dayOfWeekNames = [
                "Sunday", "Monday", "Tuesday",
                "Wednesday", "Thursday", "Friday", "Saturday"
              ];
              var day = date.getDate(),
                month = date.getMonth(),
                year = date.getFullYear(),
                hour = date.getHours(),
                minute = date.getMinutes(),
                second = date.getSeconds(),
                miliseconds = date.getMilliseconds(),
                h = hour % 12,
                hh = twoDigitPad(h),
                HH = twoDigitPad(hour),
                mm = twoDigitPad(minute),
                ss = twoDigitPad(second),
                aaa = hour < 12 ? 'AM' : 'PM',
                EEEE = dayOfWeekNames[date.getDay()],
                EEE = EEEE.substr(0, 3),
                dd = twoDigitPad(day),
                M = month + 1,
                MM = twoDigitPad(M),
                MMMM = monthNames[month],
                MMM = MMMM.substr(0, 3),
                yyyy = year + "",
                yy = yyyy.substr(2, 2)
                ;
              // checks to see if month name will be used
              patternStr = patternStr
                .replace('hh', hh).replace('h', h)
                .replace('HH', HH).replace('H', hour)
                .replace('mm', mm).replace('m', minute)
                .replace('ss', ss).replace('s', second)
                .replace('S', miliseconds)
                .replace('dd', dd).replace('d', day)

                .replace('EEEE', EEEE).replace('EEE', EEE)
                .replace('yyyy', yyyy)
                .replace('yy', yy)
                .replace('aaa', aaa);
              if (patternStr.indexOf('MMM') > -1) {
                patternStr = patternStr
                  .replace('MMMM', MMMM)
                  .replace('MMM', MMM);
              }
              else {
                patternStr = patternStr
                  .replace('MM', MM)
                  .replace('M', M);
              }
              return patternStr;
            }
            function twoDigitPad(num) {
              return num < 10 ? "0" + num : num;
            }
            function formatTime(time) {
              if (time) {
                var parts = time.split('T');
                var parts2 = parts[1];
                var parts3 = parts2.split(':');
              }
              var date = new Date(0, 0, 0, parts3[0], parts3[1], 0);

              return this.datePipe.transform(date, 'hh:mm a')

            };

          }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
      }

    }

    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('viewbtn').addEventListener('click', () => {

        this.router.navigate(['/locationtraffic', {
          source: $('#viewbtn').attr('source'),
          destination: $('#viewbtn').attr('destination')
        }])

      });
    });
    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('updatebtn').addEventListener('click', () => {
        this.updateappointment();
        // this.router.navigate(['/locationtraffic', {
        //     source:$('#viewbtn').attr('source'),
        //     destination:$('#viewbtn').attr('destination')
        //   }])

      });
    });

    this.destination = lat_lng[lat_lng.length - 1];

    this.branchlocation = window.localStorage['BRANCH_LATLONG'];
    //this.branchlocation='13.0500,80.2121';
    if (this.branchlocation) {
      this.branchlatlng = this.branchlocation.split(',');
      var branchlatlng_obj = { lat: parseFloat(this.branchlatlng[0]), lng: parseFloat(this.branchlatlng[1]) };
      console.log(branchlatlng_obj)
    }


    var branchmarker = new google.maps.Marker({
      position: branchlatlng_obj,
      map: map,
      icon: 'assets/Images/home-2.png',
      title: 'hello'
    });

    console.log(this.branchlocation)
    console.log(waypts);
    directionsService.route({
      // origin: $rootScope.Sales_currentLoc,
      origin: this.branchlocation,
      destination: this.destination,
      waypoints: waypts,
      // optimizeWaypoints: true,
      unitSystem: google.maps.UnitSystem.METRIC,
      travelMode: 'DRIVING'

    }, function (response, status) {
      console.log(response)
      var disCount = 0;
      this.routes = response.routes[0].legs;
      console.log(this.routes)
      this.mapDetailsdata = [];
      for (var i = 0; i < this.routes.length - 1; i++) {

        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          this.mapDetails = {};

          this.mapDetails.Distance = this.routes[i].distance.text;
          this.mapDetails.Duration = this.routes[i].duration.text;
          this.mapDetails.StartAddress = this.routes[i].start_address;
          this.mapDetails.EndAddress = this.routes[i].end_address;

          this.mapDetailsdata.push(this.mapDetails);

        } else {
          // window.alert('Directions request failed due to ' + status);
        }

        this.MeetingAdd = this.mapDetails.EndAddress;

      }

      this.mapDetailsdataLength = this.mapDetailsdata.length;
      console.log(this.mapDetailsdataLength);

      if (this.mapDetailsdataLength == 0 || this.mapDetailsdata == '') {

        $('#mapDetailsTable').hide();
        this.NoRecord = 'No Meeting Found';
      } else {
        $('#mapDetailsTable').show();
        this.NoRecord = '';
      }
    });



    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
      this.setZoom(5);
      google.maps.event.removeListener(boundsListener);

    });


  }

  async updateappointment() {

    const modal = await this.modalController.create({
      component: LocationupdateleadsPage,
      componentProps: {
        lead_id: $('#updatebtn').attr('leadid')

      }

    });
    modal.onDidDismiss()
      .then((resp) => {

        this.Getmeetings(this.fromdate, this.todate);
      });
    return await modal.present();
  }


  isValidLat(val) {

    return (this.isNumeric(val) && (val >= -90.0) && (val <= +90.0));
  }

  isValidLng(val) {
    return (this.isNumeric(val) && (val >= -180.0) && (val <= +180.0));
  }
  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }
  //    dateconversion(date){

  //     var date1=this.datePipe.transform(date, 'dd-MM-yyyy');

  //     return date1;
  //  }

  showLocation = function (LatLng) {
    let promise = new Promise((resolve, reject) => {

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': LatLng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var myAddress = results[0].formatted_address;
          resolve(myAddress);
        }
      })
    });
    return promise;
  // eslint-disable-next-line @typescript-eslint/semi
  }
  closeOtherInfo() {
    if (this.InforObj.length > 0) {
      /* detach the info-window from the marker ... undocumented in the API docs */
      this.InforObj[0].set("marker", null);
      /* and close it */
      this.InforObj[0].close();
      /* blank the array */
      this.InforObj.length = 0;
    }
  }

  formatTime(time) {
    if (time) {
      var parts = time.split('T');
      var parts2 = parts[1];
      var parts3 = parts2.split(':');
    }
    var date = new Date(0, 0, 0, parts3[0], parts3[1], 0);

    return this.datePipe.transform(date, 'hh:mm a');

  };
}

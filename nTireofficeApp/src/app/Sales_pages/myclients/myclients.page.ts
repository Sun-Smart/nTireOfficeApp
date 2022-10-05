/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable new-parens */
/* eslint-disable radix */
/* eslint-disable object-shorthand */
/* eslint-disable one-var */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable curly */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable prefer-const */
/* eslint-disable quote-props */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
declare var $: any;
import { DatePipe } from '@angular/common';
declare var google: any;
import { AlertController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-myclients',
  templateUrl: './myclients.page.html',
  styleUrls: ['./myclients.page.scss'],
})
export class MyclientsPage implements OnInit {
  branchlist;
  branchlist1 = [];
  branchlocation;
  destination;
  BRANCH_ID;
  token;
  allmeetinglocation;
  NoRecord;
  meeting;
  starttime;
  showmap;
  DateTime1 = [];
  address = [];
  range;
  Sales_currentLoc;
  locationaddress;
  salesCurrentlatlong;
  DateTime;
  latlngvals;
  branch;
  username: any;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(public alertController: AlertController, private nativeGeocoder: NativeGeocoder, private datePipe: DatePipe, private http: HttpClient, public Ipaddressservice: IpaddressService) {
    this.branch = "";
    this.Getbranches();
    this.username = localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
  }
  Getbranches() {
    var params = {
      access_token: window.localStorage['token'],
      userid: parseInt(window.localStorage['TUM_USER_ID']),
      'usertoken': window.localStorage['usertoken'],
      USER_ID: parseInt(window.localStorage['TUM_USER_ID'])
    };

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'getBranchAccess', params, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = resp;
      this.branchlist.forEach(element => {
        this.branchlist1.push(element)
        this.branch = element.BRANCH_ID;
        this.initmeetimg(this.branch);
        console.log("branchlist1 : " + element.BRANCH_ID);
      });



    }, error => {


    });
  }
  async presentAlert1(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
  initmeetimg(locbranch) {
    if (locbranch == "") {
      this.presentAlert1('', 'Please Select Branch');
    }
    else {
      var locations = [];
      this.BRANCH_ID = locbranch;
      console.log(this.BRANCH_ID)
      var userid = parseInt(window.localStorage['TUM_USER_ID']);
      this.token = window.localStorage['token'];
      var tokenJSON = { access_token: this.token, userid: parseInt(window.localStorage['TUM_USER_ID']), 'usertoken': window.localStorage['usertoken'] };
      var getpendleadJSONtmp = { user_id: userid, branchid: parseInt(this.BRANCH_ID) }
      var getpendleadJSON = Object.assign(getpendleadJSONtmp, tokenJSON);
      console.log(getpendleadJSON);
      // sales_services.getapponitments(userid).then(function(resp) {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + this.Ipaddressservice.serviceurlSales + 'allpendleadsdatabybranch', getpendleadJSON, {
        headers: options,
      }).subscribe(resp => {
        console.log("allmeetinglocation : " + JSON.stringify(resp));
        this.allmeetinglocation = resp;
        console.log(this.allmeetinglocation);
        if (this.allmeetinglocation == '') {
          this.NoRecord = "No Record Found";

          $('#showdivs').hide();
          $('#mapDetailsTable').hide();
        } else {

          $('#showdivs').show();
          this.NoRecord = "";

          for (var i = 0; i < this.allmeetinglocation.length; i++) {
            var latlong = this.allmeetinglocation[i].TCC_LOCATION_TO_MEET;
            if (latlong != null && latlong != 'null' && latlong != undefined && latlong != 'undefined') {
              var index = latlong.split(",");
              var lat = index[0];
              var lang = index[1];
              var statis_array = [];
              if (this.isValidLat(lat) && this.isValidLng(lang)) {
                statis_array.push('meeting');
                statis_array.push(lat);
                statis_array.push(lang);
                statis_array.push(this.allmeetinglocation[i].TCC_REMARKS);
                statis_array.push(this.allmeetinglocation[i].TCC_REMARKS_PRIVATE);
                statis_array.push(this.allmeetinglocation[i].TCC_NEXT_CALL_DATE);
                var dateTime = this.allmeetinglocation[i].START_TIME;
                this.starttime = this.datePipe.transform(dateTime, 'hh:mm a')

                statis_array.push(this.starttime);
                statis_array.push(this.allmeetinglocation[i].CustFullName);
                statis_array.push(this.allmeetinglocation[i].CUST_LEAD_ID);
                statis_array.push(this.allmeetinglocation[i].TCC_RESPONSE);
                statis_array.push(this.allmeetinglocation[i].Meeting_address);

                var obj = {
                  "lat": lat,
                  "lng": lang
                };
                locations.push(statis_array);
                this.meeting = statis_array;
                console.log(this.meeting)
              }
            }
          }
          // setTimeout(function(){console.log($rootScope.meeting)},3000)
          if (locations != []) {
            debugger;
            var lat_lng = [];
            this.showmap = true;
            var waypts = [];
            for (var i = 0; i < locations.length; i++) {
              if (locations[i][0] == 'meeting') {
                var data = locations[i];
                console.log('maps maps ', new google.maps.LatLng(data));

                var myLatlng = new google.maps.LatLng(data[1], data[2]);
                lat_lng.push(myLatlng);
              }
            }
          } else {
            this.showmap = false;
            // alert("No Meetings");
            alert("No Meetings");
          }
          google.maps.event.addDomListener(window, 'load', this.initMap1(locations));
        }
      }, error => {

        //alert(""+JSON.stringify(error));
      });

    }
  }

  initMap1(markers) {
    debugger;
    console.log(markers)
    var directionsService = new google.maps.DirectionsService.name;
    var directionsDisplay = new google.maps.DirectionsRenderer.name;
    var latLongcenter = new google.maps.LatLng(markers[0][1], markers[0][2]);
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
      mapTypeId: 'roadmap',
      center: latLongcenter
    };
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("mapshowimageclient"), mapOptions);
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
    this.DateTime1 = [];
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

        // function placeMarker(marker, infoWindow, addresstext, map, i, lat, long, usercode, username, userid) {
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {

            infoWindow.setContent('<div class="info_content">' + '<h3 align="center">Employee Details</h3>' + '<p>Emp Code : ' + markers[i][3] + '</p><p>Name : ' + markers[i][4] + '</p><button class="btn btn-success" align="center" id="' + markers[i][3] + '" user_id="' + markers[i][5] + '" onclick="angular.element(this).scope().viewmeeting(this)">View Meetings</button>' + '</div>');
            infoWindow.open(map, marker);
            var latlng = new google.maps.LatLng(markers[i][1], markers[i][2]);
            this.Sales_currentLoc = latlng;
            this.salesCurrentlatlong = markers[i][1] + "," + markers[i][2];
          }
        })(marker, i));
        // }
      } else {
        var latlngdd = new google.maps.LatLng(markers[i][1], markers[i][2]);
        this.Sales_currentLoc = latlngdd;
        this.salesCurrentlatlong = markers[i][1] + "," + markers[i][2];
        var nextcalldate = markers[i][5];
        var app_date = new Date(nextcalldate);
        var milliseconds = app_date.getTime();
        var milliseconds1 = new Date().getTime();
        // if (milliseconds > milliseconds1) {
        if (markers[i][9] == 1) {
          var icon_image = 'assets/Images/markerGreen1.png';
        } else {
          var icon_image = 'assets/Images/location.png';

        }
        var obj = this.meeting;
        var data = markers[i];
        // console.log(data)
        var myLatlng = new google.maps.LatLng(data[1], data[2]);
        lat_lng.push(myLatlng);
        waypts.push({
          location: myLatlng,
          stopover: true
        });

        if (markers[i][1] == undefined) { this.DateTime = 'Nil' }
        else {
          this.DateTime = this.tConvert(markers[i][1]);

        }
        this.DateTime1.push(this.DateTime);

      }
      marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: icon_image,
        title: markers[i][0]
      });

      var addresstext = markers[i][0];
      var self = this;
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {

          var latlng = new google.maps.LatLng(markers[i][1], markers[i][2]);

          if (latlng == null || latlng == undefined) {
            this.locationaddress = "Address not Found";

            infoWindow.setContent('<div class="info_content">' + '<h3 align="center">Meeting Details</h3>' + '<p><span style="font-weight:bold;">Meeting Description :</span> ' + addresstext + '</p><p style="width: 24em;"><span style="font-weight:bold;">Meeting Address :</span> ' + this.locationaddress + '</p>' + '<p><span style="font-weight:bold;">Date : </span>' + formatDate(new Date(markers[i][5]), 'M/dd/yyyy ') + ' ' + myFunction(markers[i][5]) + '</p>' + '<p><span style="font-weight:bold;">Customer Name :</span>' + markers[i][7] + '</p>' + '</p>' + '</div>');
            infoWindow.open(map, this);
          } else {
            self.latlngvals = new google.maps.LatLng(markers[i][1], markers[i][2]);

            var promiseaddress = self.showLocation(self.latlngvals)
            promiseaddress.then(data => {

              this.locationaddress = data;


              infoWindow.setContent('<div class="info_content">' + '<h3 align="center">Meeting Details</h3>' + '<p><span style="font-weight:bold;">Meeting Description :</span> ' + addresstext + '</p><p style="width: 24em;"><span style="font-weight:bold;">Meeting Address :</span> ' + this.locationaddress + '</p>' + '<p><span style="font-weight:bold;">Date : </span>' + formatDate(new Date(markers[i][5]), 'M/dd/yyyy') + ' ' + myFunction(markers[i][5]) + '</p>' + '<p><span style="font-weight:bold;">Customer Name :</span>' + markers[i][7] + '</p>' + '</p>' + '</div>');
              infoWindow.open(map, this);

            });

          }
          function myFunction(time1) {
            console.log('time1' + time1);
            var date = new Date(time1);
            date.setHours(date.getHours() - 5);
            date.setMinutes(date.getMinutes() - 30);

            if (date.getMinutes() == 0) {
              var time = date.getHours() + ':' + '00';
            }
            else {
              time = date.getHours() + ':' + date.getMinutes();
            }
            var timeString = time;
            var H = +timeString.substr(0, 2);
            var h = H % 12 || 12;
            var ampm = (H < 12 || H === 24) ? "AM" : "PM";
            timeString = h + timeString.substr(2, 3) + ' ' + ampm;
            return timeString;
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
        }
      })(marker, i));
      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
    }

    directionsService.route({
      // origin: $rootScope.Sales_currentLoc,
      origin: this.branchlocation,
      destination: this.destination,
      waypoints: waypts,
      // optimizeWaypoints: true,
      unitSystem: google.maps.UnitSystem.METRIC,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    }, function (response, status) {
      console.log(response)
      var disCount = 0;
      this.routes = response.routes[0].legs;
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
        this.NoRecord = 'No Record Found';
      } else {
        $('#mapDetailsTable').show();
        this.NoRecord = '';
      }
    });
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
      this.setZoom(4);
      google.maps.event.removeListener(boundsListener);
    });
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
  }

  tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }




}

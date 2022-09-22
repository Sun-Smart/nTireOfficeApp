/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable new-parens */
/* eslint-disable radix */
/* eslint-disable one-var */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable space-before-function-paren */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpaddressService } from '../../service/ipaddress.service';
declare var $: any;
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google: any;
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { LocationupdateleadsPage } from '../locationupdateleads/locationupdateleads.page';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  branchlist: any;
  branchlist1 = [];
  usertype: any;
  usertype1 = [];
  role;
  NoRecord;
  branch;
  branchlatlong;
  userTypeDesc;
  allsaleslocation;
  salesuserid;
  showmap;
  nomap;
  NoCustomer;
  SalesUserid;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  range;
  address = [];
  meeting;
  destination;
  Sales_currentLoc;
  branchlocation;
  branchlatlng;
  DateTime;
  salesCurrentlatlong;
  user_id;
  allmeetinglocation;
  starttime;
  viewuserid;
  username:any;
  constructor(public alertController: AlertController, public modalController: ModalController, private router: Router, private datePipe: DatePipe, private nativeGeocoder: NativeGeocoder, private http: HttpClient, public Ipaddressservice: IpaddressService) {

    this.branch = undefined;
    this.role = undefined;
    this.Getbranches();
    this.Getrole();
    this.username=localStorage.getItem('TUM_USER_NAME');
  }

  ngOnInit() {
  }
  Getbranches() {
    var obj = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
      functionidrep: window.localStorage['FUNCTION_ID']
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/locationbranch/', obj, {
      headers: options,
    }).subscribe(resp => {
      this.branchlist = resp;
      this.branchlist.forEach(element => {
        this.branchlist1.push(element)
        this.branchlist1.sort(function (a, b) {
          var nameA = a.BRANCH_DESC.toUpperCase(); // ignore upper and lowercase
          var nameB = b.BRANCH_DESC.toUpperCase(); // ignore upper and lowercase

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      });
    }, error => {


    });
  }
  Getrole() {
    var obj = {
      access_token: window.localStorage['token'],
      userid: window.localStorage['TUM_USER_ID'],
      'usertoken': window.localStorage['usertoken'],
      USER_ID: window.localStorage['TUM_USER_ID'],
      functionidrep: window.localStorage['FUNCTION_ID']
    };
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/user_type_get/', obj, {
      headers: options,
    }).subscribe(resp => {
      this.usertype = resp;

      this.usertype.forEach(element => {
        this.usertype1.push(element)
        this.usertype1.sort(function (a, b) {
          var nameA = a.DESCRIPTION.toUpperCase(); // ignore upper and lowercase
          var nameB = b.DESCRIPTION.toUpperCase(); // ignore upper and lowercase

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        console.log("usertype1 :" + JSON.stringify(this.usertype1))

      });
    }, error => {


    });
  }
  Getlocation(branch, role) {
    var locations = [];
    if (branch == undefined) {
      this.presentAlert('', 'Please Select Branch');

    }
    else if (role == undefined) {
      this.presentAlert('', 'Please Select Role');

    }
    else {
      this.NoRecord = '';
      console.log("welcome");
      var branchdetail = branch;
      var branch = branchdetail.BRANCH_ID;

      this.branchlatlong = branchdetail.BRANCH_LATLONG;
      var user_type = role;
      console.log(branch);
      console.log(user_type);
      this.userTypeDesc = $("#desc option:selected").text();

      console.log(this.userTypeDesc);

      // this.showspin($ionicLoading);

      //console.log(this.showspin);
      // this.hidespin($ionicLoading)
      //console.log(this.hidespin);
      // setInterval(function() {
      console.log("inside")
      var getsalelocJSONtmp = {
        user_type: user_type,
        branch: branch,
        TUM_USER_CODE: window.localStorage['TUM_EMP_CODE']

      }
      var tokenJSON = { access_token: window.localStorage['token'], userid: window.localStorage['TUM_USER_ID'], 'usertoken': window.localStorage['usertoken'] };

      var getsalelocJSON = Object.assign(getsalelocJSONtmp, tokenJSON);

      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/getallsaleslocation/', getsalelocJSON, {
        headers: options,
      }).subscribe(resp => {

        this.allsaleslocation = resp;
        console.log(this.allsaleslocation)

        //var Employee_Userid = localStorage.getItem("user_id");
        //var salesuserid = window.localStorage['Sales_userid'];
        console.log(this.allsaleslocation);

        for (var i = 0; i < this.allsaleslocation.length; i++) {




          if (this.allsaleslocation[i].current_location == '' || this.allsaleslocation[i].current_location == null) {
            console.log("no current location")
            // this.show=true;

            $('#mapDetailsTable').hide();
          } else {
            console.log(this.branch);

            var rad = function (x) {
              return x * Math.PI / 180;
            };
            var meetinglatlongarray = this.allsaleslocation[i].current_location.split(',');
            var curr_lat_lngarray = this.branchlatlong.split(',');
            var R = 6378137;
            var dLat = rad(meetinglatlongarray[0] - curr_lat_lngarray[0]);
            var dLong = rad(meetinglatlongarray[1] - curr_lat_lngarray[1]);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(rad(curr_lat_lngarray[0])) * Math.cos(rad(meetinglatlongarray[0])) *
              Math.sin(dLong / 2) * Math.sin(dLong / 2);
            console.log(a)
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            console.log(d)

            if (d < 50000) {

              this.NoRecord = "";
              // this.show=false;
              //this.sales
              var userid = resp['TUM_USER_ID'];
              //window.localStorage[salesid] = this.allsaleslocation[i].TUM_USER_ID;
              window.localStorage['Start_Loction'] = this.salesuserid;
              var latlong = this.allsaleslocation[i].current_location;
              var index = latlong.split(",");

              var lat = index[0];
              var lang = index[1];
              var statis_array = [];
              statis_array.push('salesperson');
              statis_array.push(lat);
              statis_array.push(lang);
              statis_array.push(this.allsaleslocation[i].TUM_USER_CODE);
              statis_array.push(this.allsaleslocation[i].TUM_USER_NAME);
              statis_array.push(this.allsaleslocation[i].TUM_USER_ID);

              var obj = { "lat": lat, "lng": lang };
              locations.push(statis_array);
            } else {
              console.log("Outside 50 km");
            }

          }
        }

        console.log(locations);
        if (locations.length == 0) {
          console.log("empty")
          this.showmap = false;
          this.nomap = true;
          this.NoCustomer = "No " + this.userTypeDesc + " Found";
          $('#mapDetailsTable').hide();
          // alert("No "+this.userTypeDesc+" Found");
          // alert("No Record Found");
          locations = [];
        }
        else {
          console.log(locations)
          console.log("not empty")
          this.showmap = true;
          this.nomap = false;
        }

        google.maps.event.addDomListener(window, 'load', this.initMap(locations));



      }, error => {
        console.log("error : " + JSON.stringify(error));

      });


    }

  }
  initMap(markers) {
    var geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos)
        localStorage.currentlat = pos.lat
        localStorage.currentlng = pos.lng
        console.log(markers)

      })
    }

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    //var latLongcenter = new google.maps.LatLng(markers[0][1], markers[0][2]);
    var latLongcenter = localStorage.currentlat + ',' + localStorage.currentlng;
    console.log(latLongcenter);
    // var latlong1 = window.localStorage['LatLng'];
    // var latlong1arr = latlong1.split(',');
    // var mainlatLongcenter = new google.maps.LatLng(latlong1arr[0], latlong1arr[1]);
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
      mapTypeId: 'roadmap',
      zoom: 4,
      center: latLongcenter
    };


    // Display a map on the page
    map = new google.maps.Map(document.getElementById("mapshowimageloc"), mapOptions);
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

    google.maps.event.trigger(map, 'resize');

    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({ suppressMarkers: true });
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


    for (i = 0; i < markers.length; i++) {

      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);


      // flightPlanCoordinates.push(position);
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
        console.log(markers[i][3]);
        var icon_image = 'assets/Images/user1.png';
        var Employee_ID = localStorage.getItem("emp_id");
        var Sales_ID = localStorage.getItem("sales_id");


        if (Employee_ID == markers[i][3]) {
          var icon_image = 'assets/Images/personblue.png';
        } else {
          var icon_image = 'assets/Images/user1.png';
        }

        //  function placeMarker(marker, infoWindow, addresstext, map, i,lat,long, usercode, username,userid) {
        console.log(i);
        // alert("first")


        //  }

        marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: icon_image,
          title: markers[i][0]
          // draggable: true
          // animation: google.maps.Animation.DROP
        });

        var addresstext = markers[i][0];
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            // infoWindow.setContent('<div class="info_content">' + '<h3 align="center">Employee Details</h3>' + '<p>Emp Code : ' + markers[i][3] + '</p><p>Name : ' + markers[i][4] + '</p><button class="btn btn-success" align="center" id="meetingbtn"  user_id="' + markers[i][5] + '">View Meetings</button>' + '</div>');
            infoWindow.setContent('<div class="info_content">' + '<h3 align="center">Employee Details</h3>' + '<p>Emp Code : ' + markers[i][3] + '</p><p>Name : ' + markers[i][4] + '</p>' + '</div>');
            infoWindow.open(map, marker);
            console.log(markers[i][5]);

            var latlng = new google.maps.LatLng(markers[i][1], markers[i][2]);
            console.log(latlng);
            this.Sales_currentLoc = latlng;
            console.log(i);
            console.log(markers[i][1]);
            console.log(this.Sales_currentLoc);
            this.salesCurrentlatlong = markers[i][1] + "," + markers[i][2];
            this.viewuserid = markers[i][5];
          }
        })(marker, i));
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);

        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          document.getElementById('meetingbtn').addEventListener('click', () => {
            console.log(markers[i][5]);
            this.viewmeeting(this.viewuserid);
            // this.router.navigate(['/locationtraffic', {
            //     source:$('#meetingbtn').attr('user_id'),
            //     destination:$('#viewbtn').attr('destination')
            //   }])

          });
        });
      } else {
        console.log(markers);

        var nextcalldate = markers[i][5];
        var app_date = new Date(nextcalldate);
        console.log(app_date);
        var milliseconds = app_date.getTime();
        console.log(milliseconds);
        var milliseconds1 = new Date().getTime();
        console.log(milliseconds1);
        if (milliseconds > milliseconds1) {
          var icon_image = 'assets/Images/markerGreen1.png';
        } else {
          if (markers[i][6] == '') {
            console.log("no appointment");
            var icon_image = 'assets/Images/markerYellow1.png';
          } else {
            console.log("start time");
            var icon_image = 'assets/Images/location.png';
            //  document.getElementById('time').style.color='red';
            // $("span").addClass("intro");
            // $('span').addClass('intro').siblings().removeClass('intro');

          }
        }
        console.log(markers[i][1]);
        // var icon_image = 'assets/Images/location.png';
        // var icon_image = 'assets/Images/markerYellow.png';
        var obj = this.meeting;

        console.log(markers[i]);
        var data = markers[i];

        console.log(data);
        var myLatlng = new google.maps.LatLng(data[1], data[2]);
        lat_lng.push(myLatlng);
        console.log(lat_lng);

        waypts.push({
          location: myLatlng,
          stopover: true
        });
        console.log(waypts);

        this.address = [];



        marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: icon_image,
          title: markers[i][0]
          // draggable: true
          // animation: google.maps.Animation.DROP
        });
        var addresstext = markers[i][0];

        console.log(markers[i][5]);
        // time = time.slice(0,-1);
        this.DateTime = this.datePipe.transform(markers[i][5], 'MMM d, y h:mm a');

        var DateTime = this.datePipe.transform(markers[i][5], 'MMM d, y h:mm a');

        console.log(this.DateTime);
        console.log(markers[i][7]);
        var latlng = new google.maps.LatLng(markers[i][1], markers[i][2]);
        var latlong = markers[i][1] + ',' + markers[i][2];
        console.log(latlong);
        console.log(this.salesCurrentlatlong);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              console.log(results[1].formatted_address);
              this.address = results[1].formatted_address;
              var address = results[1].formatted_address;
              google.maps.event.addListener(marker, 'click', (function (marker, i) {

                // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
                function dateconversion(date) {

                  var d = new Date(date);
                  var datetime = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear() + ' ' + (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ':' + d.getMinutes() + ' ' + (d.getHours() >= 12 ? "PM" : "AM");

                  return datetime;

                }
                return function () {

                  infoWindow.setContent('<div class="info_content">' + '<h3 align="center">Meeting Details</h3>' + '<p><span style="font-weight:bold;">Meeting Description :</span> ' + addresstext + '</p><p style="width: 24em;"><span style="font-weight:bold;">Meeting Address :</span> ' + address + '</p>' + '<p><span style="font-weight:bold;">Date : </span>' + dateconversion(markers[i][5]) + '</p>' + '<p><span style="font-weight:bold;">Customer Name :</span>' + markers[i][7] + '</p>' + '</p>' + '<button class="btn" align="center" style="background-color: #2196F3 !important;    color: white;width:50%;" id="updatebtn" leadId="' + markers[i][8] + '"source="' + this.salesCurrentlatlong + '" destination="' + latlong + '">Update Appointment</button>' + '<button class="btn btn-success" align="center" id="viewbtn" style="width:50%;" source="' + this.curr_latlong + '" destination="' + latlong + '" >View Traffic</button>' + '</div>');
                  infoWindow.open(map, marker);

                };
              })(marker, i));
            }
          }
        });



        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);

        //  }

      }
    }
    google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      document.getElementById('viewbtn').addEventListener('click', () => {

        this.router.navigate(['/locationtraffic', {
          source: $('#viewbtn').attr('source'),
          destination: $('#viewbtn').attr('destination')
        }]);

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

    console.log(lat_lng);
    this.destination = lat_lng[lat_lng.length - 1];
    console.log(this.destination);
    console.log(waypts);
    console.log(this.Sales_currentLoc);
    this.branchlocation = window.localStorage['BRANCH_LATLONG'];
    this.branchlatlng = this.branchlocation.split(',');
    var branchlatlng_obj = { lat: parseFloat(this.branchlatlng[0]), lng: parseFloat(this.branchlatlng[1]) };
    console.log(branchlatlng_obj);
    var branchmarker = new google.maps.Marker({
      position: branchlatlng_obj,
      map: map,
      icon: 'assets/Images/home-2.png',
      title: 'hello'
    });

    directionsService.route({
      // origin:this.Sales_currentLoc,
      origin: this.branchlocation,
      destination: this.destination,
      waypoints: waypts,
      // optimizeWaypoints: true,
      unitSystem: google.maps.UnitSystem.METRIC,
      travelMode: 'DRIVING'

    }, function (response, status) {
      var disCount = 0;
      this.routes = response.routes[0].legs;
      console.log(this.routes.length);
      this.mapDetailsdata = [];
      for (var i = 0; i < this.routes.length - 1; i++) {

        if (status === 'OK') {
          console.log(response);
          directionsDisplay.setDirections(response);
          this.mapDetails = {};

          this.mapDetails.Distance = this.routes[i].distance.text;
          this.mapDetails.Duration = this.routes[i].duration.text;
          this.mapDetails.StartAddress = this.routes[i].start_address;
          this.mapDetails.EndAddress = this.routes[i].end_address;

          console.log(this.mapDetails);
          this.mapDetailsdata.push(this.mapDetails);

        } else {
          // window.alert('Directions request failed due to ' + status);
        }

        console.log(this.mapDetailsdata);
        this.MeetingAdd = this.mapDetails.EndAddress;
        console.log(this.MeetingAdd);

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


    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
      this.setZoom(4);
      google.maps.event.removeListener(boundsListener);

    });

  }
  viewmeeting(id) {

    var locations = [];

    this.user_id = $('#meetingbtn').attr('user_id');
    console.log(this.user_id);



    localStorage.setItem("emp_id", id);
    localStorage.setItem("sales_id", $('#meetingbtn').attr('user_id'));


    this.SalesUserid = localStorage.getItem("sales_id");
    console.log(this.SalesUserid);
    var salesidTemp = { user_id: this.SalesUserid };
    var tokenJSON = { access_token: window.localStorage['token'], userid: window.localStorage['TUM_USER_ID'], 'usertoken': window.localStorage['usertoken'] };

    var getappointmentsJSON = Object.assign(salesidTemp, tokenJSON);
    const header = new Headers();
    header.append("Content-Type", "application/json");
    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.Ipaddressservice.ipaddress + '/dms/DMS/sales/getallappointments/', getappointmentsJSON, {
      headers: options,
    }).subscribe(resp => {
      this.allmeetinglocation = resp;
      console.log(this.allmeetinglocation);

      if (this.allmeetinglocation == '') {
        console.log("there is no meeting");
        alert("No meeting exists");
        this.NoRecord = "No Record Found";
        $('#mapDetailsTable').hide();

      }
      else {
        this.NoRecord = "";

        for (var i = 0; i < this.allmeetinglocation.length; i++) {
          console.log(this.allmeetinglocation[i].START_TIME);

          var latlong = this.allmeetinglocation[i].TCC_LOCATION_TO_MEET;
          if (latlong != null && latlong != 'null' && latlong != undefined && latlong != 'undefined') {
            console.log(latlong);
            var index = latlong.split(",");
            var lat = index[0];
            var lang = index[1];
            var statis_array = [];
            console.log(this.allmeetinglocation[i]);

            if (this.isValidLat(lat) && this.isValidLng(lang)) {
              console.log(lat);
              console.log(lang);
              console.log(this.allmeetinglocation[i]);
              statis_array.push('meeting');
              statis_array.push(lat);
              statis_array.push(lang);
              statis_array.push(this.allmeetinglocation[i].TCC_REMARKS);
              statis_array.push(this.allmeetinglocation[i].TCC_REMARKS_PRIVATE);
              statis_array.push(this.allmeetinglocation[i].TCC_NEXT_CALL_DATE);


              var dateTime = this.allmeetinglocation[i].START_TIME;
              // var dateTime = this.allmeetinglocation[i].START_TIME.split("T");
              // var time=dateTime[1].split(".");
              // console.log(time[0])
              // statis_array.push(time[0]);
              this.starttime = this.datePipe.transform(dateTime, 'hh:mm a');

              console.log(this.starttime);
              statis_array.push(this.starttime);
              console.log(statis_array);
              statis_array.push(this.allmeetinglocation[i].CustFullName);
              statis_array.push(this.allmeetinglocation[i].CUST_LEAD_ID);
              var obj = { "lat": lat, "lng": lang };
              locations.push(statis_array);
              this.meeting = statis_array;
              console.log(this.meeting);
              console.log(this.allmeetinglocation[i]);
            }
          }
        }
        console.log(locations);
        if (locations != []) {
          var lat_lng = [];
          this.showmap = true;
          var waypts = [];
          for (var i = 0; i < locations.length; i++) {
            console.log(locations[i][0]);
            if (locations[i][0] == 'meeting') {
              var data = locations[i];
              console.log(data);
              var myLatlng = new google.maps.LatLng(data[1], data[2]);
              lat_lng.push(myLatlng);
              console.log(lat_lng);
            }
          }

        } else {
          this.showmap = false;

        }
        google.maps.event.addDomListener(window, 'load', this.initMap(locations));
      }



    }, error => {
       alert("error : "+JSON.stringify(error));

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
  async updateappointment() {

    const modal = await this.modalController.create({
      component: LocationupdateleadsPage,
      componentProps: {
        lead_id: $('#updatebtn').attr('leadid')

      }

    });
    return await modal.present();
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,
      cssClass: 'buttonCss',
      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
}

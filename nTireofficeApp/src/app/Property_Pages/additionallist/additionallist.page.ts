/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IpaddressService } from '../../service/ipaddress.service';
@Component({
  selector: 'app-additionallist',
  templateUrl: './additionallist.page.html',
  styleUrls: ['./additionallist.page.scss'],
})
export class AdditionallistPage implements OnInit {
  sub: any;
  data: any;
  ShowAddionalList: any = [];
  showError: boolean;
  username = window.localStorage.getItem('TUM_USER_NAME');
  arra: any=[];
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router, public Ipaddressservice: IpaddressService) {

  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.data = params;
    });
    console.log(this.data);
    this.GetList();
  }
  GetList() {

    const header = new Headers();
    header.append("Content-Type", "application/json");

    let options = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get(this.Ipaddressservice.ipaddress1 + this.Ipaddressservice.serviceurlProperty + 'getadditionalchargegrid/' + this.data.property, {
      headers: options,
    }).subscribe(resp => {
      this.ShowAddionalList = resp;
      if (resp == "No data found") {
        this.ShowAddionalList=[]
        // this.arra.push(this.ShowAddionalList)
        // console.log(this.arra);
        
        this.showError = true;
      } else {
        this.showError = false;
       }
      console.log(resp);
    }, error => {
    });
  };
  cancel() {
    this.router.navigate(['/additional-page']);
    // return this.modalCtrl.dismiss(null, 'cancel');
  }
}

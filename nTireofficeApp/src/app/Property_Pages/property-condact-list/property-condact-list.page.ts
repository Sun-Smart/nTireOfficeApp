import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-condact-list',
  templateUrl: './property-condact-list.page.html',
  styleUrls: ['./property-condact-list.page.scss'],
})
export class PropertyCondactListPage implements OnInit {
  showfilter:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  togglefilter(){
    this.showfilter = !this.showfilter
  }
}

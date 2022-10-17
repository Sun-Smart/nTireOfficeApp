/* eslint-disable max-len */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-rootmap',
  templateUrl: './rootmap.component.html',
  styleUrls: ['./rootmap.component.css']
})
export class RootmapComponent implements OnInit {
  url;
  urldata;
  username: string;
  constructor(public sanitizer: DomSanitizer,public route: Router, private router: ActivatedRoute) {
    this.username = localStorage.getItem('TUM_USER_NAME');
    this.urldata = this.router.params.subscribe(params => {
      let dangerousVideoUrl = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDGQhzcQYbQf9E7dzGUz-R7BVp2iFeNLfI&origin=' + params.source + '&destination=' + params.destination;
      this.url=this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
    });
   }

  ngOnInit() {
  }

}

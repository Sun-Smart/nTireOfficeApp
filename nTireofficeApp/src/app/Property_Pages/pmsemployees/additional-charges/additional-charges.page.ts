import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-additional-charges',
  templateUrl: './additional-charges.page.html',
  styleUrls: ['./additional-charges.page.scss'],
})
export class AdditionalChargesPage implements OnInit {
  visible:boolean=true;
  invisible:boolean=false
  constructor() { }

  ngOnInit() {
  }
  submit(){
    this.visible=false;
    this.invisible=true
      }
      cancel() {
        // this.modal.dismiss(null, 'cancel');
      }
}

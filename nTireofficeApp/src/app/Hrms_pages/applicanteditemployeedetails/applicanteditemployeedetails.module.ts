import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApplicanteditemployeedetailsPageRoutingModule } from './applicanteditemployeedetails-routing.module';
import { ApplicanteditemployeedetailsPage } from './applicanteditemployeedetails.page';
import { HttprequestService } from '../../service/httprequest.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicanteditemployeedetailsPageRoutingModule,


  ],
  providers: [HttprequestService],
  declarations: [ApplicanteditemployeedetailsPage]
})
export class ApplicanteditemployeedetailsPageModule {}

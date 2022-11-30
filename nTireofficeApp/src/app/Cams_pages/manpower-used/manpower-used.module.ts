import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// import { BrowserModule } from '@angular/platform-browser'
import { ManpowerUsedPage } from './manpower-used.page';

const routes: Routes = [
  {
    path: '',
    component: ManpowerUsedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  declarations: [ManpowerUsedPage],
  providers:[DatePipe]
})
export class ManpowerUsedPageModule {}

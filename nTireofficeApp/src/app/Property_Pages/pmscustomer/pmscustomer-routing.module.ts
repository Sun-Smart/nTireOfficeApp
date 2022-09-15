import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PmscustomerPage } from './pmscustomer.page';


const routes: Routes = [
  {
    path: '',
    component: PmscustomerPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmscustomerPageRoutingModule {}

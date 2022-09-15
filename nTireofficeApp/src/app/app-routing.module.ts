import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {

    path: '12',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./Login/login/login.module').then( m => m.LoginPageModule)
  },
  // CAMS
  { path: 'dashboardCams',
   loadChildren:  ()=> import('./Cams_pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)},
  {
    path: 'dashboard',
    loadChildren: () => import('./navbar/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'invoiceupload',
    loadChildren: () => import('./procurement/invoiceupload/invoiceupload.module').then( m => m.InvoiceuploadPageModule)
  },
  {
    path: 'updatevendoritem',
    loadChildren: () => import('./procurement/updatevendoritem/updatevendoritem.module').then( m => m.UpdatevendoritemPageModule)
  },
  {
    path: 'updatevendorquot',
    loadChildren: () => import('./procurement/updatevendorquot/updatevendorquot.module').then( m => m.UpdatevendorquotPageModule)
  },
  {
    path: 'vendormaster',
    loadChildren: () => import('./procurement/vendormaster/vendormaster.module').then( m => m.VendormasterPageModule)
  },
  {
    path: 'vendormaster-model',
    loadChildren: () => import('./procurement/vendormaster-model/vendormaster-model.module').then( m => m.VendormasterModelPageModule)
  },
  {
    path: 'vendorpayments',
    loadChildren: () => import('./procurement/vendorpayments/vendorpayments.module').then( m => m.VendorpaymentsPageModule)
  },
  {
    path: 'vendorppconfirm',
    loadChildren: () => import('./procurement/vendorppconfirm/vendorppconfirm.module').then( m => m.VendorppconfirmPageModule)
  },
  {
    path: 'vendorquotation',
    loadChildren: () => import('./procurement/vendorquotation/vendorquotation.module').then( m => m.VendorquotationPageModule)
  },
  {
    path: 'vendorsdetails',
    loadChildren: () => import('./procurement/vendorsdetails/vendorsdetails.module').then( m => m.VendorsdetailsPageModule)
  },
  {
    path: 'vendorsitems',
    loadChildren: () => import('./procurement/vendorsitems/vendorsitems.module').then( m => m.VendorsitemsPageModule)
  },
  {
    path: 'vendorpoconfirm',
    loadChildren: () => import('./procurement/vendorpoconfirm/vendorpoconfirm.module').then( m => m.VendorpoconfirmPageModule)
  },


  {
    path:'pending-jobs',
    loadChildren: () => import('./Cams_pages/pending-jobs/pending-jobs.module').then(m => m.PendingJobsPageModule)
  },
  {
    path:'asset-details',
    loadChildren: () => import('./Cams_pages/asset-details/asset-details.module').then(m => m.AssetDetailsPageModule)
  },
  {
    path:'completion-jobs',
    loadChildren: () => import('./Cams_pages/completion-jobs/completion-jobs.module').then(m => m.CompletionJobsPageModule)
  },
  {
    path:'asset-reconcil',
    loadChildren: () => import('./Cams_pages/asset-reconcil/asset-reconcil.module').then(m => m.AssetReconcilPageModule)
  },
  {
    path:'user-request',
    loadChildren: () => import('./Cams_pages/user-request/user-request.module').then(m => m.UserRequestPageModule)
  },
  {
    path:'service-request',
    loadChildren: () => import('./Cams_pages/service-request/service-request.module').then(m => m.ServiceRequestPageModule)
  },
  {
    path:'location-wise-asset',
    loadChildren: () => import('./Cams_pages/location-wise-asset/location-wise-asset.module').then(m => m.LocationWiseAssetPageModule)
  },
  {
    path:'asset-transfer',
    loadChildren:() => import('./Cams_pages/asset-transfer/asset-transfer.module').then(m => m.AssetTransferPageModule)
  },
  {
    path:'reconciliation-report',
    loadChildren:() => import('./Cams_pages/reconciliation-report/reconciliation-report.module').then(m => m.ReconciliationReportPageModule)
  },

// Property

{
  path:'pmsdashboard',
  loadChildren:() => import('./Property_Pages/pmsdashboard/pmsdashboard.module').then(m => m.PmsdashboardPageModule)
},
{
  path:'pmscustomer',
  loadChildren:() => import('./Property_Pages/pmscustomer/pmscustomer-routing.module').then(m => m.PmscustomerPageRoutingModule)
},
{
  path:'pmsemployees',
  loadChildren:() => import('./Property_Pages/pmsemployees/pmsemployees.module').then(m => m.PmsemployeesPageModule)
},
{
  path:'pmsreports',
  loadChildren:() => import('./Property_Pages/pmsreports/pmsreports.module').then(m => m.PmsreportsPageModule)
},

{ path: 'hrmsdashboard', loadChildren:()=>import('./Hrms_pages/dashboard/dashboard.module').then(m => m.DashboardPageModule) },

{ path: 'myprofile', loadChildren:()=>import('./Hrms_pages/myprofile/myprofile.module').then(m => m.MyprofilePageModule) },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

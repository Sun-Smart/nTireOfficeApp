import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
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


  // { path: 'pending-jobs', loadChildren: './Cams_pages/pending-jobs/pending-jobs.module#PendingJobsPageModule' },
  // { path: 'pending-jobs-tabs', loadChildren: './Cams_pages/pending-jobs-tabs/pending-jobs-tabs.module#PendingJobsTabsPageModule' },
  // { path: 'job-detail', loadChildren: './Cams_pages/job-detail/job-detail.module#JobDetailPageModule' },
  // { path: 'task-detail', loadChildren: './Cams_pages/task-detail/task-detail.module#TaskDetailPageModule' },
  // { path: 'manpower-used', loadChildren: './Cams_pages/manpower-used/manpower-used.module#ManpowerUsedPageModule' },
  // { path: 'spares-used', loadChildren: './Cams_pages/spares-used/spares-used.module#sparesUsedPageModule' },
  // { path: 'consumable-used', loadChildren: './Cams_pages/consumable-used/consumable-used.module#ConsumableUsedPageModule' },
  // { path: 'completion-jobs', loadChildren: './Cams_pages/completion-jobs/completion-jobs.module#CompletionJobsPageModule' },
  // { path: 'asset-reconcil', loadChildren: './Cams_pages/asset-reconcil/asset-reconcil.module#AssetReconcilPageModule' },
  // { path: 'user-request', loadChildren: './Cams_pages/user-request/user-request.module#UserRequestPageModule' },
  // { path: 'asset-details', loadChildren: './Cams_pages/asset-details/asset-details.module#AssetDetailsPageModule' },
  // { path: 'service-request', loadChildren: './Cams_pages/service-request/service-request.module#ServiceRequestPageModule' },
  // { path: 'service-list', loadChildren: './Cams_pages/service-list/service-list.module#ServiceListPageModule' },
  // { path: 'location-wise-asset', loadChildren: './Cams_pages/location-wise-asset/location-wise-asset.module#LocationWiseAssetPageModule' },
  // { path: 'asset-transfer', loadChildren: './Cams_pages/asset-transfer/asset-transfer.module#AssetTransferPageModule' },
  // { path: 'reconciliation-report', loadChildren: './Cams_pages/reconciliation-report/reconciliation-report.module#ReconciliationReportPageModule' },
  // { path: 'department-wise', loadChildren: './Cams_pages/department-wise/department-wise.module#DepartmentWisePageModule' },
  // { path: 'department-wise-model', loadChildren: './Cams_pages/department-wise-model/department-wise-model.module#DepartmentWiseModelPageModule' },



  //Procurement





  // { path: 'updatevendoritem', loadChildren: './procurement/updatevendoritem/updatevendoritem.module#UpdatevendoritemPageModule' },
  // { path: 'updatevendorquot', loadChildren: './procurement/updatevendorquot/updatevendorquot.module#UpdatevendorquotPageModule' },
  // { path: 'vendormaster', loadChildren: './procurement/vendormaster/vendormaster.module#VendormasterPageModule' },
  // { path: 'vendormaster-modal', loadChildren: './procurement/vendormaster-modal/vendormaster-modal.module#VendormasterModalPageModule' },
  // { path: 'vendorpayments', loadChildren: './procurement/vendorpayments/vendorpayments.module#VendorpaymentsPageModule' },
  // { path: 'invoiceupload', loadChildren: './procurement/invoiceupload/invoiceupload.module#InvoiceuploadPageModule' },
  // { path: 'vendorpoconfirm', loadChildren: './procurement/vendorpoconfirm/vendorpoconfirm.module#VendorpoconfirmPageModule' },
  // { path: 'vendorquotation', loadChildren: './procurement/vendorquotation/vendorquotation.module#VendorquotationPageModule' },
  // { path: 'vendorsdetails', loadChildren: './procurement/vendorsdetails/vendorsdetails.module#VendorsdetailsPageModule' },
  // { path: 'vendorsitems', loadChildren: './procurement/vendorsitems/vendorsitems.module#VendorsitemsPageModule' },
  // { path: 'imageview', loadChildren: './Sales_pages/imageview/imageview.module#ImageviewPageModule' },
  // { path: 'closedleads', loadChildren: './Sales_pages/closedleads/closedleads.module#ClosedleadsPageModule' },
  // { path: 'itemdetails', loadChildren: './itemdetails/itemdetails.module#ItemdetailsPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Login/login/login.module').then( m => m.LoginPageModule)
  },
  // CAMS
  { path: 'dashboardCams',
   loadChildren:  ()=> import('./Cams_pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)},  {
    path: 'dashboard',
    loadChildren: () => import('./navbar/dashboard/dashboard.module').then( m => m.DashboardPageModule)
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
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

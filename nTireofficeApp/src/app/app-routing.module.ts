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
   loadChildren:  ()=> import('./Cams_pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)},
  {
    path: 'dashboard',
    loadChildren: () => import('./navbar/dashboard/dashboard.module').then( m => m.DashboardPageModule)
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
  // { path: 'department-wise-model', loadChildren: './Cams_pages/department-wise-model/department-wise-model.module#DepartmentWiseModelPageModule' }
//  hrms
{ path: 'hrmsdashboard', loadChildren:()=>import('./Hrms_pages/dashboard/dashboard.module').then(m => m.DashboardPageModule) },
 
 
  // { path: 'hrmsmyapprovals', loadChildren: './Hrms_pages/myapprovals/myapprovals.module#MyapprovalsPageModule' },
  // { path: 'hrmsmyprofile', loadChildren: './Hrms_pages/myprofile/myprofile.module#MyprofilePageModule' },
  // { path: 'hrmsemployees', loadChildren: './Hrms_pages/employees/employees.module#EmployeesPageModule' },
  // { path: 'hrmsattendance', loadChildren: './Hrms_pages/attendance/attendance.module#AttendancePageModule' },
  // { path: 'hrmsprocessed-attendance', loadChildren: './Hrms_pages/processed-attendance/processed-attendance.module#ProcessedAttendancePageModule' },
  // { path: 'hrmspayslip', loadChildren: './Hrms_pages/payslip/payslip.module#PayslipPageModule' },
  // { path: 'hrmscoff-request', loadChildren: './Hrms_pages/coff-request/coff-request.module#CoffRequestPageModule' },
  // { path: 'hrmscoffsummary', loadChildren: './Hrms_pages/coffsummary/coffsummary.module#CoffsummaryPageModule' },
  // { path: 'hrmsreapplycoff', loadChildren: './Hrms_pages/reapplycoff/reapplycoff.module#ReapplycoffPageModule' },
  // { path: 'hrmsod-request', loadChildren: './Hrms_pages/od-request/od-request.module#OdRequestPageModule' },
  // { path: 'hrmsclaimsrequest', loadChildren: './Hrms_pages/claimsrequest/claimsrequest.module#ClaimsrequestPageModule' },
  // { path: 'hrmsclaimssummary', loadChildren: './Hrms_pages/claimssummary/claimssummary.module#ClaimssummaryPageModule' },

  // { path: 'hrmsleave-request', loadChildren: './Hrms_pages/leave-request/leave-request.module#LeaveRequestPageModule' },
  // { path: 'hrmsleavesummary', loadChildren: './Hrms_pages/leavesummary/leavesummary.module#LeavesummaryPageModule' },
  // { path: 'hrmspermission-request', loadChildren: './Hrms_pages/permission-request/permission-request.module#PermissionRequestPageModule' },
  // { path: 'hrmspermissionsummary', loadChildren: './Hrms_pages/permissionsummary/permissionsummary.module#PermissionsummaryPageModule' },
  // { path: 'hrmsassetrequest', loadChildren: './Hrms_pages/assetrequest/assetrequest.module#AssetrequestPageModule' },
  // { path: 'hrmsassestssummary', loadChildren: './Hrms_pages/assestssummary/assestssummary.module#AssestssummaryPageModule' },
  // { path: 'hrmsattendance-notification', loadChildren: './Hrms_pages/attendance-notification/attendance-notification.module#AttendanceNotificationPageModule' },
  // { path: 'hrmsloan-request', loadChildren: './Hrms_pages/loan-request/loan-request.module#LoanRequestPageModule' },
  // { path: 'hrmsloan-summary', loadChildren: './Hrms_pages/loan-summary/loan-summary.module#LoanSummaryPageModule' },
  // { path: 'hrmsassetreturn', loadChildren: './Hrms_pages/assetreturn/assetreturn.module#AssetreturnPageModule' },
  // { path: 'hrmsonlineexamportal', loadChildren: './Hrms_pages/onlineexamportal/onlineexamportal.module#OnlineexamportalPageModule' },
  // { path: 'hrmsonlineexam', loadChildren: './Hrms_pages/onlineexam/onlineexam.module#OnlineexamPageModule' },
  // { path: 'hrmsexamdetails', loadChildren: './Hrms_pages/examdetails/examdetails.module#ExamdetailsPageModule' },
  // { path: 'hrmsonlineexamtimer', loadChildren: './Hrms_pages/onlineexamtimer/onlineexamtimer.module#OnlineexamtimerPageModule' },
  // { path: 'hrmsonline-exam-ctrl', loadChildren: './Hrms_pages/online-exam-ctrl/online-exam-ctrl.module#OnlineExamCtrlPageModule' },
  // { path: 'hrmsonlineexamreports', loadChildren: './Hrms_pages/onlineexamreports/onlineexamreports.module#OnlineexamreportsPageModule' },
  // { path: 'hrmsview-report', loadChildren: './Hrms_pages/view-report/view-report.module#ViewReportPageModule' },
  // { path: 'hrmsquestionreport', loadChildren: './Hrms_pages/questionreport/questionreport.module#QuestionreportPageModule' },
  // { path: 'hrmsquestionanswerreport', loadChildren: './Hrms_pages/questionanswerreport/questionanswerreport.module#QuestionanswerreportPageModule' },
  // { path: 'hrmsapplicantsummary', loadChildren: './Hrms_pages/applicantsummary/applicantsummary.module#ApplicantsummaryPageModule' },
  // { path: 'hrmsapplicant-details', loadChildren: './Hrms_pages/applicant-details/applicant-details.module#ApplicantDetailsPageModule' },
  // { path: 'hrmsapplicanttab', loadChildren: './Hrms_pages/applicanttab/applicanttab.module#ApplicanttabPageModule' },
  // { path: 'applicanteducationdetail', loadChildren: './Hrms_pages/applicanteducationdetail/applicanteducationdetail.module#ApplicanteducationdetailPageModule' },
  // { path: 'hrmsapplicantemploymentdetails', loadChildren: './Hrms_pages/applicantemploymentdetails/applicantemploymentdetails.module#ApplicantemploymentdetailsPageModule' },
  // { path: 'hrmsapplicantskillsdetails', loadChildren: './Hrms_pages/applicantskillsdetails/applicantskillsdetails.module#ApplicantskillsdetailsPageModule' },
  // { path: 'hrmsletterrequest', loadChildren: './Hrms_pages/letterrequest/letterrequest.module#LetterrequestPageModule' },
  
  // { path: 'hrmsmyapprovals', loadChildren: './myapprovals/myapprovals.module#MyapprovalsPageModule' },
  // { path: 'hrmsodsummary', loadChildren: './Hrms_pages/odsummary/odsummary.module#OdsummaryPageModule' },

  
 
  // { path: 'attendanceemployee', loadChildren: './Hrms_pages/E-attendance/attendanceemployee/attendanceemployee.module#AttendanceemployeePageModule' },
  
  // { path: 'approverequest1', loadChildren: './myapprovals/approverequest1/approverequest1.module#Approverequest1PageModule' },
  // { path: 'approvalaccept', loadChildren: './Hrms_pages/approvalaccept/approvalaccept.module#ApprovalacceptPageModule' },
  // { path: 'deny-screen', loadChildren: './Hrms_pages/deny-screen/deny-screen.module#DenyScreenPageModule' },
  // { path: 'open-add-education', loadChildren: './Hrms_pages/open-add-education/open-add-education.module#OpenAddEducationPageModule' },
  // { path: 'openaddemploymentpage', loadChildren: './Hrms_pages/openaddemploymentpage/openaddemploymentpage.module#OpenaddemploymentpagePageModule' },
  // { path: 'reapply-od', loadChildren: './Hrms_pages/reapply-od/reapply-od.module#ReapplyODPageModule' },
  // { path: 'reapplypermission', loadChildren: './Hrms_pages/reapplypermission/reapplypermission.module#ReapplypermissionPageModule' },
  // { path: 'reapplyleave', loadChildren: './Hrms_pages/reapplyleave/reapplyleave.module#ReapplyleavePageModule' },
  // { path: 'reapplyasset', loadChildren: './Hrms_pages/reapplyasset/reapplyasset.module#ReapplyassetPageModule' },
  // { path: 'application-editeducation', loadChildren: './Hrms_pages/application-editeducation/application-editeducation.module#ApplicationEditeducationPageModule' },
  // { path: 'applicationeditskillsdetails', loadChildren: './Hrms_pages/applicationeditskillsdetails/applicationeditskillsdetails.module#ApplicationeditskillsdetailsPageModule' },
  // { path: 'applicanteditemployeedetails', loadChildren: './Hrms_pages/applicanteditemployeedetails/applicanteditemployeedetails.module#ApplicanteditemployeedetailsPageModule' },

  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

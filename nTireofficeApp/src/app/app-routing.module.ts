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
  // {
  //   path: 'applicant-details',
  //   loadChildren: () => import('./Hrms_pages/applicant-details/applicant-details.module').then( m => m.ApplicantDetailsPageModule)
  // },
  // {
  //   path: 'applicanteditemployeedetails',
  //   loadChildren: () => import('./Hrms_pages/applicanteditemployeedetails/applicanteditemployeedetails.module').then( m => m.ApplicanteditemployeedetailsPageModule)
  // },
  // {
  //   path: 'applicanteducationdetails',
  //   loadChildren: () => import('./Hrms_pages/applicanteducationdetails/applicanteducationdetails.module').then( m => m.ApplicanteducationdetailsPageModule)
  // },
  // {
  //   path: 'applicantemploymentdetails',
  //   loadChildren: () => import('./Hrms_pages/applicantemploymentdetails/applicantemploymentdetails.module').then( m => m.ApplicantemploymentdetailsPageModule)
  // },
  // {
  //   path: 'applicantskilldetails',
  //   loadChildren: () => import('./Hrms_pages/applicantskilldetails/applicantskilldetails.module').then( m => m.ApplicantskilldetailsPageModule)
  // },
  // {
  //   path: 'applicantsummary',
  //   loadChildren: () => import('./Hrms_pages/applicantsummary/applicantsummary.module').then( m => m.ApplicantsummaryPageModule)
  // },
  // {
  //   path: 'applicanttab',
  //   loadChildren: () => import('./Hrms_pages/applicanttab/applicanttab.module').then( m => m.ApplicanttabPageModule)
  // },
  // {
  //   path: 'application-editeducation',
  //   loadChildren: () => import('./Hrms_pages/application-editeducation/application-editeducation.module').then( m => m.ApplicationEditeducationPageModule)
  // },
  // {
  //   path: 'applicationeditskillsdetails',
  //   loadChildren: () => import('./Hrms_pages/applicationeditskillsdetails/applicationeditskillsdetails.module').then( m => m.ApplicationeditskillsdetailsPageModule)
  // },
  // {
  //   path: 'approvalaccept',
  //   loadChildren: () => import('./Hrms_pages/approvalaccept/approvalaccept.module').then( m => m.ApprovalacceptPageModule)
  // },
  // {
  //   path: 'assetssummary',
  //   loadChildren: () => import('./Hrms_pages/assetssummary/assetssummary.module').then( m => m.AssetssummaryPageModule)
  // },
  // {
  //   path: 'assetrequest',
  //   loadChildren: () => import('./Hrms_pages/assetrequest/assetrequest.module').then( m => m.AssetrequestPageModule)
  // },
  // {
  //   path: 'assetreturn',
  //   loadChildren: () => import('./Hrms_pages/assetreturn/assetreturn.module').then( m => m.AssetreturnPageModule)
  // },
  // {
  //   path: 'attendence',
  //   loadChildren: () => import('./Hrms_pages/attendence/attendence.module').then( m => m.AttendencePageModule)
  // },
  // {
  //   path: 'attendance-notification',
  //   loadChildren: () => import('./Hrms_pages/attendance-notification/attendance-notification.module').then( m => m.AttendanceNotificationPageModule)
  // },
  // {
  //   path: 'claimsrequest',
  //   loadChildren: () => import('./Hrms_pages/claimsrequest/claimsrequest.module').then( m => m.ClaimsrequestPageModule)
  // },
  // {
  //   path: 'claimssmmary',
  //   loadChildren: () => import('./Hrms_pages/claimssmmary/claimssmmary.module').then( m => m.ClaimssmmaryPageModule)
  // },
  // {
  //   path: 'coff-request',
  //   loadChildren: () => import('./Hrms_pages/coff-request/coff-request.module').then( m => m.CoffRequestPageModule)
  // },
  // {
  //   path: 'coffsummary',
  //   loadChildren: () => import('./Hrms_pages/coffsummary/coffsummary.module').then( m => m.CoffsummaryPageModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./Hrms_pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'deny-screen',
  //   loadChildren: () => import('./Hrms_pages/deny-screen/deny-screen.module').then( m => m.DenyScreenPageModule)
  // },
  // {
  //   path: 'employees',
  //   loadChildren: () => import('./Hrms_pages/employees/employees.module').then( m => m.EmployeesPageModule)
  // },
  // {
  //   path: 'examdetails',
  //   loadChildren: () => import('./Hrms_pages/examdetails/examdetails.module').then( m => m.ExamdetailsPageModule)
  // },
  // {
  //   path: 'leave-request',
  //   loadChildren: () => import('./Hrms_pages/leave-request/leave-request.module').then( m => m.LeaveRequestPageModule)
  // },
  // {
  //   path: 'leavesummary',
  //   loadChildren: () => import('./Hrms_pages/leavesummary/leavesummary.module').then( m => m.LeavesummaryPageModule)
  // },
  // {
  //   path: 'letterrequest',
  //   loadChildren: () => import('./Hrms_pages/letterrequest/letterrequest.module').then( m => m.LetterrequestPageModule)
  // },
  // {
  //   path: 'loan-request',
  //   loadChildren: () => import('./Hrms_pages/loan-request/loan-request.module').then( m => m.LoanRequestPageModule)
  // },
  // {
  //   path: 'loan-summary',
  //   loadChildren: () => import('./Hrms_pages/loan-summary/loan-summary.module').then( m => m.LoanSummaryPageModule)
  // },
  // {
  //   path: 'mobilepin',
  //   loadChildren: () => import('./Hrms_pages/mobilepin/mobilepin.module').then( m => m.MobilepinPageModule)
  // },
  // {
  //   path: 'myapprovals',
  //   loadChildren: () => import('./Hrms_pages/myapprovals/myapprovals.module').then( m => m.MyapprovalsPageModule)
  // },
  // {
  //   path: 'myprofile',
  //   loadChildren: () => import('./Hrms_pages/myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  // },
  // {
  //   path: 'od-request',
  //   loadChildren: () => import('./Hrms_pages/od-request/od-request.module').then( m => m.OdRequestPageModule)
  // },
  // {
  //   path: 'odsummary',
  //   loadChildren: () => import('./Hrms_pages/odsummary/odsummary.module').then( m => m.OdsummaryPageModule)
  // },
  // {
  //   path: 'online-exam-ctrl',
  //   loadChildren: () => import('./Hrms_pages/online-exam-ctrl/online-exam-ctrl.module').then( m => m.OnlineExamCtrlPageModule)
  // },
  // {
  //   path: 'onlineexam',
  //   loadChildren: () => import('./Hrms_pages/onlineexam/onlineexam.module').then( m => m.OnlineexamPageModule)
  // },
  // {
  //   path: 'onlineexamportal',
  //   loadChildren: () => import('./Hrms_pages/onlineexamportal/onlineexamportal.module').then( m => m.OnlineexamportalPageModule)
  // },
  // {
  //   path: 'onlineexamreports',
  //   loadChildren: () => import('./Hrms_pages/onlineexamreports/onlineexamreports.module').then( m => m.OnlineexamreportsPageModule)
  // },
  // {
  //   path: 'onlineexamtimer',
  //   loadChildren: () => import('./Hrms_pages/onlineexamtimer/onlineexamtimer.module').then( m => m.OnlineexamtimerPageModule)
  // },
  // {
  //   path: 'openaddemploymentpage',
  //   loadChildren: () => import('./Hrms_pages/openaddemploymentpage/openaddemploymentpage.module').then( m => m.OpenaddemploymentpagePageModule)
  // },
  // {
  //   path: 'payslip',
  //   loadChildren: () => import('./Hrms_pages/payslip/payslip.module').then( m => m.PayslipPageModule)
  // },
  // {
  //   path: 'permission-request',
  //   loadChildren: () => import('./Hrms_pages/permission-request/permission-request.module').then( m => m.PermissionRequestPageModule)
  // },
  // {
  //   path: 'permissionsummary',
  //   loadChildren: () => import('./Hrms_pages/permissionsummary/permissionsummary.module').then( m => m.PermissionsummaryPageModule)
  // },
  // {
  //   path: 'processed-attendance',
  //   loadChildren: () => import('./Hrms_pages/processed-attendance/processed-attendance.module').then( m => m.ProcessedAttendancePageModule)
  // },
  // {
  //   path: 'questionanswerreport',
  //   loadChildren: () => import('./Hrms_pages/questionanswerreport/questionanswerreport.module').then( m => m.QuestionanswerreportPageModule)
  // },
  // {
  //   path: 'questionreport',
  //   loadChildren: () => import('./Hrms_pages/questionreport/questionreport.module').then( m => m.QuestionreportPageModule)
  // },
  // {
  //   path: 'reapply-od',
  //   loadChildren: () => import('./Hrms_pages/reapply-od/reapply-od.module').then( m => m.ReapplyOdPageModule)
  // },
  // {
  //   path: 'reapplyasset',
  //   loadChildren: () => import('./Hrms_pages/reapplyasset/reapplyasset.module').then( m => m.ReapplyassetPageModule)
  // },
  // {
  //   path: 'reapplycoff',
  //   loadChildren: () => import('./Hrms_pages/reapplycoff/reapplycoff.module').then( m => m.ReapplycoffPageModule)
  // },
  // {
  //   path: 'reapplyleave',
  //   loadChildren: () => import('./Hrms_pages/reapplyleave/reapplyleave.module').then( m => m.ReapplyleavePageModule)
  // },
  // {
  //   path: 'reapplyloan',
  //   loadChildren: () => import('./Hrms_pages/reapplyloan/reapplyloan.module').then( m => m.ReapplyloanPageModule)
  // },
  // {
  //   path: 'reapplypermission',
  //   loadChildren: () => import('./Hrms_pages/reapplypermission/reapplypermission.module').then( m => m.ReapplypermissionPageModule)
  // },
  // {
  //   path: 'view-report',
  //   loadChildren: () => import('./Hrms_pages/view-report/view-report.module').then( m => m.ViewReportPageModule)
  // },

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
  
  // hrms\
  

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

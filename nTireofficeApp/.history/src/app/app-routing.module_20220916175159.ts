import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./Login/login/login.module').then(m => m.LoginPageModule)
  },
  // CAMS
  {
    path: 'dashboardCams',
    loadChildren: () => import('./Cams_pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./navbar/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  // },
  // {
  //   path: 'invoiceupload',
  //   loadChildren: () => import('./procurement/invoiceupload/invoiceupload.module').then( m => m.InvoiceuploadPageModule)
  // },
  // {
  //   path: 'updatevendoritem',
  //   loadChildren: () => import('./procurement/updatevendoritem/updatevendoritem.module').then( m => m.UpdatevendoritemPageModule)
  // },
  // {
  //   path: 'updatevendorquot',
  //   loadChildren: () => import('./procurement/updatevendorquot/updatevendorquot.module').then( m => m.UpdatevendorquotPageModule)
  // },
  {
    path: 'vendormaster',
    loadChildren: () => import('./procurement/vendormaster/vendormaster.module').then( m => m.VendormasterPageModule)
  },
  // {
  //   path: 'vendormaster-model',
  //   loadChildren: () => import('./procurement/vendormaster-model/vendormaster-model.module').then( m => m.VendormasterModelPageModule)
  // },
  // {
  //   path: 'vendorpayments',
  //   loadChildren: () => import('./procurement/vendorpayments/vendorpayments.module').then( m => m.VendorpaymentsPageModule)
  // },
  // {
  //   path: 'vendorppconfirm',
  //   loadChildren: () => import('./procurement/vendorppconfirm/vendorppconfirm.module').then( m => m.VendorppconfirmPageModule)
  // },
  // {
  //   path: 'vendorquotation',
  //   loadChildren: () => import('./procurement/vendorquotation/vendorquotation.module').then( m => m.VendorquotationPageModule)
  // },
  // {
  //   path: 'vendorsdetails',
  //   loadChildren: () => import('./procurement/vendorsdetails/vendorsdetails.module').then( m => m.VendorsdetailsPageModule)
  // },
  // {
  //   path: 'vendorsitems',
  //   loadChildren: () => import('./procurement/vendorsitems/vendorsitems.module').then( m => m.VendorsitemsPageModule)
  // },
  {
    path: 'vendorpoconfirm',
    loadChildren: () => import('./procurement/vendorpoconfirm/vendorpoconfirm.module').then( m => m.VendorpoconfirmPageModule)
  },


  {
    path: 'pending-jobs',
    loadChildren: () => import('./Cams_pages/pending-jobs/pending-jobs.module').then(m => m.PendingJobsPageModule)
  },
  {
    path: 'asset-details',
    loadChildren: () => import('./Cams_pages/asset-details/asset-details.module').then(m => m.AssetDetailsPageModule)
  },
  {
    path: 'completion-jobs',
    loadChildren: () => import('./Cams_pages/completion-jobs/completion-jobs.module').then(m => m.CompletionJobsPageModule)
  },
  {
    path: 'asset-reconcil',
    loadChildren: () => import('./Cams_pages/asset-reconcil/asset-reconcil.module').then(m => m.AssetReconcilPageModule)
  },
  {
    path: 'user-request',
    loadChildren: () => import('./Cams_pages/user-request/user-request.module').then(m => m.UserRequestPageModule)
  },
  {
    path: 'service-request',
    loadChildren: () => import('./Cams_pages/service-request/service-request.module').then(m => m.ServiceRequestPageModule)
  },
  {
    path: 'location-wise-asset',
    loadChildren: () => import('./Cams_pages/location-wise-asset/location-wise-asset.module').then(m => m.LocationWiseAssetPageModule)
  },
  {
    path: 'asset-transfer',
    loadChildren: () => import('./Cams_pages/asset-transfer/asset-transfer.module').then(m => m.AssetTransferPageModule)
  },
  {
    path: 'reconciliation-report',
    loadChildren: () => import('./Cams_pages/reconciliation-report/reconciliation-report.module').then(m => m.ReconciliationReportPageModule)
  },
  {
    path:'department-wise',
    loadChildren:() => import('./Cams_pages/department-wise/department-wise.module').then(m => m.DepartmentWisePageModule)
  },


  //  hrms
  { path: 'hrmsdashboard', loadChildren: () => import('./Hrms_pages/dashboard/dashboard.module').then(m => m.DashboardPageModule) },

  { path: 'hrmsemployees', loadChildren: () => import('./Hrms_pages/employees/employees.module').then(m => m.EmployeesPageModule) },

  //Property

  {
    path: 'pmsdashboard',
    loadChildren: () => import('./Property_Pages/pmsdashboard/pmsdashboard.module').then(m => m.PmsdashboardPageModule)
  },
  {
    path: 'pmscustomer',
    loadChildren: () => import('./Property_Pages/pmscustomer/pmscustomer.module').then(m => m.PmscustomerPageModule)
  },
  {
    path: 'pmsemployees',
    loadChildren: () => import('./Property_Pages/pmsemployees/pmsemployees.module').then(m => m.PmsemployeesPageModule)
  },
  {
    path: 'pms-create-issue',
    loadChildren: () => import('./Property_Pages/pms-create-issue/pms-create-issue.module').then(m => m.PmsCreateIssuePageModule)
  },
  {
    path: 'pms-issue-status',
    loadChildren: () => import('./Property_Pages/pms-issue-status/pms-issue-status.module').then(m => m.PmsIssueStatusPageModule)
  },
  {
    path: 'pmsreports',
    loadChildren: () => import('./Property_Pages/pmsreports/pmsreports.module').then(m => m.PmsreportsPageModule)
  },

  //Sales Page
  {
    path: 'salesdashboard',
    loadChildren: () => import('./Sales_pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'newlead-retail',
    loadChildren: () => import('./Sales_pages/newlead-retail/newlead-retail.module').then(m => m.NewleadRetailPageModule)
  },
  {
    path: 'addnewcorporate',
    loadChildren: () => import('./Sales_pages/addnewcorporate/addnewcorporate.module').then(m => m.AddnewcorporatePageModule)
  },
  {
    path: 'addcontact',
    loadChildren: () => import('./Sales_pages/addcontact/addcontact.module').then(m => m.AddcontactPageModule)
  },
  {
    path: 'newleadcorporate',
    loadChildren: () => import('./Sales_pages/newleadcorporate/newleadcorporate.module').then(m => m.NewleadcorporatePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Hrms_pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'applicant-details',
    loadChildren: () => import('./Hrms_pages/applicant-details/applicant-details.module').then( m => m.ApplicantDetailsPageModule)
  },
  {
    path: 'applicanteditemployeedetails',
    loadChildren: () => import('./Hrms_pages/applicanteditemployeedetails/applicanteditemployeedetails.module').then( m => m.ApplicanteditemployeedetailsPageModule)
  },
  {
    path: 'applicanteducationdetail',
    loadChildren: () => import('./Hrms_pages/applicanteducationdetail/applicanteducationdetail.module').then( m => m.ApplicanteducationdetailPageModule)
  },
  {
    path: 'applicantemploymentdetails',
    loadChildren: () => import('./Hrms_pages/applicantemploymentdetails/applicantemploymentdetails.module').then( m => m.ApplicantemploymentdetailsPageModule)
  },
  {
    path: 'applicantskilssdetails',
    loadChildren: () => import('./Hrms_pages/applicantskilssdetails/applicantskilssdetails.module').then( m => m.ApplicantskilssdetailsPageModule)
  },
  {
    path: 'applicantsummary',
    loadChildren: () => import('./Hrms_pages/applicantsummary/applicantsummary.module').then( m => m.ApplicantsummaryPageModule)
  },
  {
    path: 'applicanttab',
    loadChildren: () => import('./Hrms_pages/applicanttab/applicanttab.module').then( m => m.ApplicanttabPageModule)
  },
  {
    path: 'applicantion-editeducation',
    loadChildren: () => import('./Hrms_pages/applicantion-editeducation/applicantion-editeducation.module').then( m => m.ApplicantionEditeducationPageModule)
  },
  {
    path: 'applicantioneditskillsdetails',
    loadChildren: () => import('./Hrms_pages/applicantioneditskillsdetails/applicantioneditskillsdetails.module').then( m => m.ApplicantioneditskillsdetailsPageModule)
  },
  {
    path: 'approvalaccept',
    loadChildren: () => import('./Hrms_pages/approvalaccept/approvalaccept.module').then( m => m.ApprovalacceptPageModule)
  },
  {
    path: 'assetssummary',
    loadChildren: () => import('./Hrms_pages/assetssummary/assetssummary.module').then( m => m.AssetssummaryPageModule)
  },
  {
    path: 'assetrequest',
    loadChildren: () => import('./Hrms_pages/assetrequest/assetrequest.module').then( m => m.AssetrequestPageModule)
  },
  {
    path: 'assetreturn',
    loadChildren: () => import('./Hrms_pages/assetreturn/assetreturn.module').then( m => m.AssetreturnPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./Hrms_pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'attendance-notification',
    loadChildren: () => import('./Hrms_pages/attendance-notification/attendance-notification.module').then( m => m.AttendanceNotificationPageModule)
  },
  {
    path: 'claimsrequest',
    loadChildren: () => import('./Hrms_pages/claimsrequest/claimsrequest.module').then( m => m.ClaimsrequestPageModule)
  },
  {
    path: 'claimssummary',
    loadChildren: () => import('./Hrms_pages/claimssummary/claimssummary.module').then( m => m.ClaimssummaryPageModule)
  },
  {
    path: 'coff-request',
    loadChildren: () => import('./Hrms_pages/coff-request/coff-request.module').then( m => m.CoffRequestPageModule)
  },
  {
    path: 'coffsummary',
    loadChildren: () => import('./Hrms_pages/coffsummary/coffsummary.module').then( m => m.CoffsummaryPageModule)
  },
  {
    path: 'deny-screen',
    loadChildren: () => import('./Hrms_pages/deny-screen/deny-screen.module').then( m => m.DenyScreenPageModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./Hrms_pages/employees/employees.module').then( m => m.EmployeesPageModule)
  },
  {
    path: 'examdetails',
    loadChildren: () => import('./Hrms_pages/examdetails/examdetails.module').then( m => m.ExamdetailsPageModule)
  },
  {
    path: 'leave-request',
    loadChildren: () => import('./Hrms_pages/leave-request/leave-request.module').then( m => m.LeaveRequestPageModule)
  },
  {
    path: 'leavesummary',
    loadChildren: () => import('./Hrms_pages/leavesummary/leavesummary.module').then( m => m.LeavesummaryPageModule)
  },
  {
    path: 'letterrequest',
    loadChildren: () => import('./Hrms_pages/letterrequest/letterrequest.module').then( m => m.LetterrequestPageModule)
  },
  {
    path: 'loan-request',
    loadChildren: () => import('./Hrms_pages/loan-request/loan-request.module').then( m => m.LoanRequestPageModule)
  },
  {
    path: 'loan-summary',
    loadChildren: () => import('./Hrms_pages/loan-summary/loan-summary.module').then( m => m.LoanSummaryPageModule)
  },
  {
    path: 'mobilepin',
    loadChildren: () => import('./Hrms_pages/mobilepin/mobilepin.module').then( m => m.MobilepinPageModule)
  },
  {
    path: 'myapprovals',
    loadChildren: () => import('./Hrms_pages/myapprovals/myapprovals.module').then( m => m.MyapprovalsPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./Hrms_pages/myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'od-request',
    loadChildren: () => import('./Hrms_pages/od-request/od-request.module').then( m => m.OdRequestPageModule)
  },
  {
    path: 'odsummary',
    loadChildren: () => import('./Hrms_pages/odsummary/odsummary.module').then( m => m.OdsummaryPageModule)
  },
  {
    path: 'online-exam-ctrl',
    loadChildren: () => import('./Hrms_pages/online-exam-ctrl/online-exam-ctrl.module').then( m => m.OnlineExamCtrlPageModule)
  },
  {
    path: 'onlineexam',
    loadChildren: () => import('./Hrms_pages/onlineexam/onlineexam.module').then( m => m.OnlineexamPageModule)
  },
  {
    path: 'onlineexamportal',
    loadChildren: () => import('./Hrms_pages/onlineexamportal/onlineexamportal.module').then( m => m.OnlineexamportalPageModule)
  },
  {
    path: 'onlineexamreports',
    loadChildren: () => import('./Hrms_pages/onlineexamreports/onlineexamreports.module').then( m => m.OnlineexamreportsPageModule)
  },
  {
    path: 'onlineexamtimer',
    loadChildren: () => import('./Hrms_pages/onlineexamtimer/onlineexamtimer.module').then( m => m.OnlineexamtimerPageModule)
  },
  {
    path: 'open-add-education',
    loadChildren: () => import('./Hrms_pages/open-add-education/open-add-education.module').then( m => m.OpenAddEducationPageModule)
  },
  {
    path: 'openaddemploymentpage',
    loadChildren: () => import('./Hrms_pages/openaddemploymentpage/openaddemploymentpage.module').then( m => m.OpenaddemploymentpagePageModule)
  },
  {
    path: 'payslip',
    loadChildren: () => import('./Hrms_pages/payslip/payslip.module').then( m => m.PayslipPageModule)
  },
  {
    path: 'permission-request',
    loadChildren: () => import('./Hrms_pages/permission-request/permission-request.module').then( m => m.PermissionRequestPageModule)
  },
  {
    path: 'permissionsummary',
    loadChildren: () => import('./Hrms_pages/permissionsummary/permissionsummary.module').then( m => m.PermissionsummaryPageModule)
  },
  {
    path: 'processed-attendance',
    loadChildren: () => import('./Hrms_pages/processed-attendance/processed-attendance.module').then( m => m.ProcessedAttendancePageModule)
  },
  {
    path: 'questionanswerreport',
    loadChildren: () => import('./Hrms_pages/questionanswerreport/questionanswerreport.module').then( m => m.QuestionanswerreportPageModule)
  },
  {
    path: 'questionreport',
    loadChildren: () => import('./Hrms_pages/questionreport/questionreport.module').then( m => m.QuestionreportPageModule)
  },
  {
    path: 'reapply-od',
    loadChildren: () => import('./Hrms_pages/reapply-od/reapply-od.module').then( m => m.ReapplyOdPageModule)
  },
  {
    path: 'reapplyasset',
    loadChildren: () => import('./Hrms_pages/reapplyasset/reapplyasset.module').then( m => m.ReapplyassetPageModule)
  },
  {
    path: 'reapplycoff',
    loadChildren: () => import('./Hrms_pages/reapplycoff/reapplycoff.module').then( m => m.ReapplycoffPageModule)
  },
  {
    path: 'reapplyleave',
    loadChildren: () => import('./Hrms_pages/reapplyleave/reapplyleave.module').then( m => m.ReapplyleavePageModule)
  },
  {
    path: 'reapplyloan',
    loadChildren: () => import('./Hrms_pages/reapplyloan/reapplyloan.module').then( m => m.ReapplyloanPageModule)
  },
  {
    path: 'reapplypermission',
    loadChildren: () => import('./Hrms_pages/reapplypermission/reapplypermission.module').then( m => m.ReapplypermissionPageModule)
  },
  {
    path: 'view-report',
    loadChildren: () => import('./Hrms_pages/view-report/view-report.module').then( m => m.ViewReportPageModule)
  },






  // {
  //   path: 'updateleads',
  //   loadChildren: () => import('./Sales_pages/updateleads/updateleads.module').then(m => m.UpdateleadsPageModule)
  // },


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

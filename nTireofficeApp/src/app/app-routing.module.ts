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
  // },service-list
  {
    path:'department-wise-model',
    loadChildren: ()  =>  import('./Cams_pages/department-wise-model/department-wise-model.module').then(m  =>m.DepartmentWiseModelPageModule)
  },
  {
    path: 'service-list',
    loadChildren: () => import('./Cams_pages/service-list/service-list.module').then( m => m.ServiceListPageModule)
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
    path: 'completion-jobs-reopen',
    loadChildren: ()  =>  import('./Cams_pages/completion-jobs-reopen/completion-jobs-reopen.module').then(m=>m.CompletionJobsReopenPageModule)
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
    path: 'pms-transaction',
    loadChildren: () => import('./Property_Pages/pms-transaction/pms-transaction.module').then(m => m.PmsTransactionPageModule)
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
  {
    path: 'property-condact-list',
    loadChildren: () => import('./Property_Pages/property-condact-list/property-condact-list.module').then( m => m.PropertyCondactListPageModule)
  },
  {
    path: 'document-expiry-report',
    loadChildren: () => import('./Property_Pages/document-expiry-report/document-expiry-report.module').then( m => m.DocumentExpiryReportPageModule)
  },
  {
    path: 'issue-ledger',
    loadChildren: () => import('./Property_Pages/issue-ledger/issue-ledger.module').then( m => m.IssueLedgerPageModule)
  },
  {
    path: 'payment-details',
    loadChildren: () => import('./Property_Pages/payment-details/payment-details.module').then( m => m.PaymentDetailsPageModule)
  },
  {
    path: 'pms-list',
    loadChildren: () => import('./Property_Pages/pms-list/pms-list.module').then( m => m.PmsListPageModule)
  },
  {
    path: 'my-task',
    loadChildren: () => import('./Property_Pages/my-task/my-task.module').then( m => m.MyTaskPageModule)
  },
  {
    path: 'additional-page',
    loadChildren: () => import('./Property_Pages/additional-page/additional-page.module').then( m => m.AdditionalPagePageModule)
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
    path:'attendance',
    loadChildren:()=> import('./Hrms_pages/attendance/attendance.module').then(m => m.AttendancePageModule)
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

  // procurement


  {
    path: 'manage-rfq',
    loadChildren: () => import('./procurement/manage-rfq/manage-rfq.module').then( m => m.ManageRfqPageModule)
  },
  {
    path: 'purchase-request',
    loadChildren: () => import('./procurement/purchase-request/purchase-request.module').then( m => m.PurchaseRequestPageModule)
  },
  {
    path: 'prsstatus',
    loadChildren: () => import('./procurement/prsstatus/prsstatus.module').then( m => m.PRSstatusPageModule)
  },
  {
    path: 'rfp',
    loadChildren: () => import('./procurement/rfp/rfp.module').then( m => m.RFPPageModule)
  },
  {
    path: 'rfq',
    loadChildren: () => import('./procurement/rfq/rfq.module').then( m => m.RFQPageModule)
  },
  {
    path: 'workflow-approval',
    loadChildren: () => import('./procurement/workflow-approval/workflow-approval.module').then( m => m.WorkflowApprovalPageModule)
  },
  {
    path: 'material-request',
    loadChildren: () => import('./procurement/material-request/material-request.module').then( m => m.MaterialRequestPageModule)
  },
  {
    path: 'material-issue',
    loadChildren: () => import('./procurement/material-issue/material-issue.module').then( m => m.MaterialIssuePageModule)
  },
  {
    path: 'physical-inventory',
    loadChildren: () => import('./procurement/physical-inventory/physical-inventory.module').then( m => m.PhysicalInventoryPageModule)
  },
  {
    path: 'pi-mismatch',
    loadChildren: () => import('./procurement/pi-mismatch/pi-mismatch.module').then( m => m.PiMismatchPageModule)
  },
  {
    path: 'inter-location-transfer',
    loadChildren: () => import('./procurement/inter-location-transfer/inter-location-transfer.module').then( m => m.InterLocationTransferPageModule)
  },
  {
    path: 'vendorpending-quotations',
    loadChildren: () => import('./procurement/vendorpending-quotations/vendorpending-quotations.module').then( m => m.VendorpendingQuotationsPageModule)
  },
  {
    path: 'upload-invoice',
    loadChildren: () => import('./procurement/upload-invoice/upload-invoice.module').then( m => m.UploadInvoicePageModule)
  },
  {
    path: 'view-popdffile',
    loadChildren: () => import('./procurement/view-popdffile/view-popdffile.module').then( m => m.ViewPOPDFFilePageModule)
  },
  {
    path: 'view-invoice-status',
    loadChildren: () => import('./procurement/view-invoice-status/view-invoice-status.module').then( m => m.ViewInvoiceStatusPageModule)
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
  {
    path: 'pendingleads',
    loadChildren: () => import('./Sales_pages/pendingleads/pendingleads.module').then( m => m.PendingleadsPageModule)
  },
  {
    path: 'imageview',
    loadChildren: () => import('./Sales_pages/imageview/imageview.module').then( m => m.ImageviewPageModule)
  },
  {
    path: 'histotydetails',
    loadChildren: () => import('./Sales_pages/histotydetails/histotydetails.module').then( m => m.HistotydetailsPageModule)
  },
  {
    path: 'closedleads',
    loadChildren: () => import('./Sales_pages/closedleads/closedleads.module').then( m => m.ClosedleadsPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./Sales_pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'locationupdateleads',
    loadChildren: () => import('./Sales_pages/locationupdateleads/locationupdateleads.module').then( m => m.LocationupdateleadsPageModule)
  },
  {
    path: 'heatmap',
    loadChildren: () => import('./Sales_pages/heatmap/heatmap.module').then( m => m.HeatmapPageModule)
  },
  {
    path: 'mymeeting',
    loadChildren: () => import('./Sales_pages/mymeeting/mymeeting.module').then( m => m.MymeetingPageModule)
  },
  {
    path: 'teammeetings',
    loadChildren: () => import('./Sales_pages/teammeetings/teammeetings.module').then( m => m.TeammeetingsPageModule)
  },
  {
    path: 'expensedetails',
    loadChildren: () => import('./Sales_pages/expensedetails/expensedetails.module').then( m => m.ExpensedetailsPageModule)
  },
  {
    path: 'addtravelexpensedetails',
    loadChildren: () => import('./Sales_pages/addtravelexpensedetails/addtravelexpensedetails.module').then( m => m.AddtravelexpensedetailsPageModule)
  },
  {
    path: 'myclients',
    loadChildren: () => import('./Sales_pages/myclients/myclients.module').then( m => m.MyclientsPageModule)
  },






  {
    path: 'updateleads',
    loadChildren: () => import('./Sales_pages/updateleads/updateleads.module').then(m => m.UpdateleadsPageModule)
  },
  {
    path: 'vendor-quotation',
    loadChildren: () => import('./procurement/vendor-quotation/vendor-quotation.module').then( m => m.VendorQuotationPageModule)
  },

  {
    path: 'updateprsstatus/:id',
    loadChildren: () => import('./procurement/updateprsstatus/updateprsstatus.module').then( m => m.UpdateprsstatusPageModule)
  },
  {
    path: 'updateprsstatus',
    loadChildren: () => import('./procurement/updateprsstatus/updateprsstatus.module').then( m => m.UpdateprsstatusPageModule)
  },
  {
    path: 'reciept-master-page',
    loadChildren: () => import('./Property_Pages/reciept-master-page/reciept-master-page.module').then( m => m.RecieptMasterPagePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {CreateTopicComponent} from './create-topic/create-topic.component'
// import {DiscussionBoardComponent} from './discussion-board/discussion-board.component'
// import {DiscussionDetailComponent} from './discussion-board/discussion-detail/discussion-detail.component'
import { AuthGuard } from '../shared/services/auth/auth.guard';
import {DashBoardSummaryComponent} from './dash-board-summary/dash-board-summary.component'

import { RegistrationComponent } from './Registration/registration/registration.component';
import {  RegistrationListComponent} from './Registration/registration-list/registration-list.component';
import {  UserRegistrationComponent} from './Registration/user-registration/user-registration.component';
import {RolePageMappingComponent} from './Master/role-page-mapping/role-page-mapping.component'
import {PositionMasterComponent} from './Master/position-master/position-master.component'
// import { OrderDetailPopupComponent } from './orders-list/order-detail-popup/order-detail-popup.component';

const routes: Routes = [
  // {path:'CreateTopic',component:CreateTopicComponent,data: { title: 'TopicMaster', breadcrumb: 'TopicMaster' }},
  // {path:'DiscussionBoard',component:DiscussionBoardComponent,data: { title: 'Discussion', breadcrumb: 'Discussion' }},
  // {path:'DiscussionDetails',component:DiscussionDetailComponent,data: { title: 'DiscussionDetail', breadcrumb: 'DiscussionDetail' }},
  {path:'Dashboard',component:DashBoardSummaryComponent,canActivate:[AuthGuard],data: { title: 'Dashboard1 ', breadcrumb: 'Dashboard1' }},
  // {path:'OrdersList',component:OrdersListComponent,canActivate:[AuthGuard],data: { title: 'OrderListing ', breadcrumb: 'OrderListing' }},
  // {path:'FailedOrderDetail',component:FailOrderDetailsComponent,canActivate:[AuthGuard],data: { title: 'FailedOrderDetail ', breadcrumb: 'FailedOrderDetail' }},
  // // {path:'DetailOrders',component:DetailOrderComponent,canActivate:[AuthGuard],data: { title: 'OrderDetail ', breadcrumb: 'OrderDetail' }},
  // {path:'OrderTracking',component:OrderTrackingComponent,canActivate:[AuthGuard],data: { title: 'OrderTracking ', breadcrumb: 'OrderTracking' }},
  // {path:'AssignCreditLimit1',component:AssignCreditLimitComponent,canActivate:[AuthGuard],data: { title: 'CreditLimit', breadcrumb: 'CreditLimit' }},
  {path:'Registration',component:RegistrationComponent,canActivate:[AuthGuard],data: { title: 'Registration', breadcrumb: 'Registration' }},
  {path:'RegistrationList',component:RegistrationListComponent,canActivate:[AuthGuard],data: { title: 'Users List', breadcrumb: 'Users List' }},
  {path:'UserRegistration',component:UserRegistrationComponent,canActivate:[AuthGuard],data: { title: 'Registration', breadcrumb: 'Registration' }},
  {path:'AssignCreditLimit',component:RolePageMappingComponent,canActivate:[AuthGuard],data: { title: 'Role Page Mapping', breadcrumb: 'Role page Mapping' }},
  {path:'Positionmaster',component:PositionMasterComponent,canActivate:[AuthGuard],data: { title: 'Position Master', breadcrumb: 'Position Master' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

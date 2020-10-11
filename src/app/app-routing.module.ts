import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { LoginComponent } from './modules/login/login.component';
import { OtpComponent } from './modules/otp/otp.component';
import { RegUserComponent } from './modules/reg-user/reg-user.component';
import { RegCandidateComponent } from './modules/reg-candidate/reg-candidate.component';
import { UserListComponent } from './modules/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: FullwidthComponent,
    children: [
      {
        //path: 'login',
        path: '',
        component: LoginComponent,
      },
      {
        path: 'reg-user',
        component: RegUserComponent,
      },
      {
        path: 'reg-candidate',
        component: RegCandidateComponent,
      },
      {
        path: 'otp',
        component: OtpComponent,
      },
    ],
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

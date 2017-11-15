import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';

import { Angular2TokenService } from 'angular2-token';
import { UserService } from './user.service';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PreventLoggedInAccess } from './guards/preventLoggedInAccess';
import { PatientGuard } from './guards/patient.guard';


import { ProfileComponent } from './profile/profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'about',
    component: AboutComponent  
  },
  {
    path: 'signup',
    component: SignupComponent,
  }, 
  {
    path: 'doctor-dashboard',
    component: DoctorDashboardComponent,
    canActivate: [ DoctorGuard ],
  },
  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent,
    canActivate: [ PatientGuard ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ],
  }, 
  {
    path: 'password',
    component: ResetpasswordComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'password/edit',
    component: ChangePasswordComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}

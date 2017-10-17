import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { Angular2TokenService } from 'angular2-token';
import { UserService } from './user.service';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/patient.guard';
import { ProfileComponent } from './profile/profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

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
    path: 'doctor-dashboard/:id',
    component: DoctorDashboardComponent,
    canActivate: [ DoctorGuard ],
  },
  {
    path: 'patient-dashboard/:id',
    component: PatientDashboardComponent,
    canActivate: [ PatientGuard ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ],
  }, 
  {
    path: 'change-password',
    component: ResetpasswordComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

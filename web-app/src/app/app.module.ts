import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterializeModule } from "angular2-materialize"

import { AppComponent } from './app.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { LoginComponent } from './login/login.component'
import { AppRoutingModule } from './app-routing.module'
import { AboutComponent } from './about/about.component'
import { SignupComponent } from './signup/signup.component'
import { Angular2TokenService } from 'angular2-token'
import { UserService } from './user.service'
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component'
import { AuthGuard } from './guards/auth.guard'
import { DoctorGuard } from './guards/doctor.guard';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { ProfileComponent } from './profile/profile.component'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AboutComponent,
    SignupComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
  ],
  providers: [ Angular2TokenService, UserService, AuthGuard, DoctorGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

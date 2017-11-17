import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from "angular2-materialize";

import { AppComponent } from './app.component'
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { Angular2TokenService } from 'angular2-token';
import { UserService } from './user.service';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/patient.guard';
import { PreventLoggedInAccess } from './guards/preventLoggedInAccess';
import { ProfileComponent } from './profile/profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { NotesComponent } from './notes/notes.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SkypeComponent } from './skype/skype.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LogoutComponent } from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RemindersComponent } from './reminders/reminders.component';
import { PatientDescripComponent } from './patient-descrip/patient-descrip.component';

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
    ResetpasswordComponent,
    NotesComponent,
    ContactListComponent,
    SkypeComponent,
    LogoutComponent,
    ChangePasswordComponent,
    RemindersComponent,
    PatientDescripComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
    Ng2SearchPipeModule,
  ],
  providers: [ Angular2TokenService, UserService, AuthGuard, DoctorGuard, PreventLoggedInAccess, PatientGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

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
import { PreventLoggedInAccess } from './guards/preventLoggedInAccess';
import { ProfileComponent } from './profile/profile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { NotesComponent } from './notes/notes.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SkypeComponent } from './skype/skype.component';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule,
  ],
  providers: [ Angular2TokenService, UserService, AuthGuard, DoctorGuard, PreventLoggedInAccess ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

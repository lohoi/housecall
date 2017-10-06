import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { NotesComponent } from './notes/notes.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { path: 'about',
   component: AboutComponent  
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

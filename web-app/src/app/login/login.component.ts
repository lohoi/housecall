import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {environment} from "../../environments/environment";
import {Angular2TokenService} from "angular2-token";




@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public user: User;

  constructor(private authToken: Angular2TokenService) {
    this.user = new User();
    this.authToken.init(environment.token_auth_config);
  }

  onSubmit = function() {
    
    console.log("onSubmit clicked!");
    this.authToken.signIn({email: this.user.email, password: this.user.password}).subscribe(

        res => {

          console.log('auth response:', res);
          console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
          console.log('auth response body:', res.json()); //log the response body to show the user 
        },

        err => {
          console.error('auth error:', err);
        }
    )


    // this.http.post('http://localhost:3000/users', this.user).subscribe();
  }
}

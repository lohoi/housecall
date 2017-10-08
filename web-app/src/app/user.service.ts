import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { environment } from "../environments/environment";
import { Router } from '@angular/router'
import { Subject, Observable } from "rxjs";
import { Response } from "@angular/http";


@Injectable()
export class UserService {
	constructor(private authService: Angular2TokenService, private router: Router) {
    this.authService.init(environment.token_auth_config);
    this.authService.validateToken().subscribe(
        res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    )
	}


  userSignedIn$:Subject<boolean> = new Subject();


  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
    );
  }

  registerUser(user_):Observable<Response>{
    // delete user_.confirm_success_url;
    // let param = {
    //   email: user_.email,
    //   password: user_.password,
    //   passwordConfirmation: user_.passwordConfirmation,
    //   skype: user_.skype,
    //   firstname: user_.firstname,
    //   lastname: user_.lastname
    // }

    // console.log("inside user service with arguments: " , param);

    return this.authService.registerAccount(user_).map(
      res => {
        return res
      }
    );
  }

  logInUser(email_, password_):Observable<Response>{
    console.log("email: ", email_);
    console.log("password: ", password_);
    return this.authService.signIn({email: email_, password: password_}).map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      },

      err => {
        console.error('auth error:', err);
        console.log("returning a -1");
      }
    );
  }


 //  login = function(email_, password_) {
 //    return this.authToken.signIn({ email: email_, password: password_}).subscribe(

 //        res => {
 //          // TODO add this in later when we have user types
 //          // this._tokenService.currentUserType = res.json().currentUserType;

 //          console.log('auth response:', res);
 //          console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
 //          console.log('auth response body:', res.json()); //log the response body to show the user 
 //          this.router.navigate(['/about']);
 //        },

 //        err => {
 //          console.error('auth error:', err);
 //          console.log("returning a -1");
 //        }
 //    )
 //  }

 //  getUser = function() {
 //  	// gets user info
 //  	return this.user;
 //  }

 //  logout = function() {
 //  	this.authToken.signOut().subscribe(
 //    	res =>      console.log(res),
 //    	error =>    console.log(error)
	// )}

  userSignedIn = function() {
    // console.log("authToken: ",this.authService)
    // console.log("user signed in??" , this.authService.userSignedIn());
    // console.log("user", this.authService.currentUserData);
    return this.authToken.userSignedIn();
  }
}

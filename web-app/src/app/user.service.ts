import { Injectable } from '@angular/core'
import { Angular2TokenService } from "angular2-token"
import { environment } from "../environments/environment"
import { Router } from '@angular/router'
import { Subject, Observable } from "rxjs"
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';



@Injectable()
export class UserService {
	constructor(private authService: Angular2TokenService, private router: Router, private http: Http) {
    // this.authService.init(environment.token_auth_config);
    this.authService.validateToken().subscribe(
        res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    )
	}


  userSignedIn$:Subject<boolean> = new Subject()

  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
    );
  }

  registerUser(user_):Observable<Response>{
    return this.authService.registerAccount(user_).map(
      res => {
        return res;
      }
    );
  }

  logInUser(email_, password_, userType_):Observable<Response>{
    return this.authService.signIn({email: email_, password: password_, userType: userType_}).map(
      res => {
        this.userSignedIn$.next(true)
        return res;
      },

      err => {
        console.error('auth error:', err);
      }
    );
  }

  isDoctor(): boolean {
    if (!this.authService.userSignedIn() || this.authService.currentUserType !== "doctor") { 
      return false;
    } else {
      return true;
    }
  }

  isPatient():boolean {
    if (!this.authService.userSignedIn() || this.authService.currentUserType !== "patient") { 
      return false
    } else {
      return true;
    }
  }

  getUser(): any {
    return this.authService.validateToken()
  }

  getUserType(email_): any {
    let options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: new URLSearchParams('email=' + email_)
    });
    
    return this.http.get('http://localhost:3000/user_type', options)
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
    return this.authService.userSignedIn();
  }
}

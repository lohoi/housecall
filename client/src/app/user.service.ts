import { Injectable} from '@angular/core'
import { Angular2TokenService } from "angular2-token"
import { environment } from "../environments/environment"
import { Router } from '@angular/router'
import { Subject, Observable } from "rxjs"
import { Contact } from './contact'
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';

@Injectable()
export class UserService {
  static selectedContact$: Subject<Contact> = new Subject();
  static contacts$: Subject<Contact[]> = new Subject();

  userSignedIn$: Subject<boolean> = new Subject()

  constructor(private authService: Angular2TokenService, private router: Router, private http: Http) {
    this.authService.init(environment.token_auth_config);
    this.authService.validateToken().subscribe(
        res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    );
  }

  logOutUser():any {
    console.log('called logOutUser')
    this.authService.signOut().subscribe(
      res => {
        console.log('emitting..')
        this.userSignedIn$.next(false);
        this.router.navigate(['/login']);
      },
      err => {
        console.log('err?');
        this.userSignedIn$.next(false);
        this.router.navigate(['/login']);
      }
    );
  }

  registerUser(user_):Observable<Response>{
    return this.authService.registerAccount(user_);
  }

  logInUser(email_, password_, userType_):any {
    console.log('email:', email_);
    console.log('password: ', password_);
    console.log('usertype: ', userType_);
    return this.authService.signIn({email: email_, password: password_, userType: userType_});
  }

  setSignIn(sign_in_):any {
    // changes emitter 
    this.userSignedIn$.next(sign_in_);
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
    return this.authService.validateToken();
  }

  getUserType(email_): any {
    let options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: new URLSearchParams('email=' + email_)
    });
    
    return this.http.get(environment.apiUrl + 'user_type', options)
  }

  requestResetToken(email_) : any {
    // let url = environment.apiUrl + '/password/edit';
    return this.authService.resetPassword({
        email: email_
        // redirect_url: url,
    })
  }

  getResetToken(email_): any {
     let options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: new URLSearchParams('email=' + email_)
    });
    return this.http.get(environment.apiUrl + 'resetPasswordToken', options);
  }

  changePassword(password_, passwordConfirmation_, passwordCurrent_, resetPasswordToken_): any {
    return this.authService.updatePassword({
        password:             password_,
        passwordConfirmation: passwordCurrent_,
        passwordCurrent:      password_,
        resetPasswordToken:   resetPasswordToken_,
    });
  }

  updateUser(userID_, firstname_, lastname_, skype_): any {
    let params = {
      id: userID_,
      firstname: firstname_,
      lastname: lastname_,
      skype: skype_
    }
    return this.http.post(environment.apiUrl + 'updateUser', params)
  }

  setAllConacts(c: Contact[]) {
    UserService.contacts$.next(c);
  }

  getAllContacts(): any {
    return UserService.contacts$;
  }

   setSelectedContact(c: Contact) {
    UserService.selectedContact$.next(c);
  }

  getSelectedContact(): any {
    return UserService.selectedContact$;
  }

   userSignedIn = function() {
      console.log('within userSigned in:', this.authService.userSignedIn());
      return this.authService.userSignedIn();
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
}

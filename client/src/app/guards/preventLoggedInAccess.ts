import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { UserService } from "../user.service"

@Injectable()
export class PreventLoggedInAccess implements CanActivate {

  constructor(private userService:UserService,
              private router:Router) {}

  canActivate() {
  	console.log("this.userService.userSignedIn$: ", this.userService.userSignedIn());
  	if (this.userService.userSignedIn()) {
      console.log("waaaat: ",this.userService.userSignedIn$.subscribe(res=> {console.log(res)}))
      this.router.navigate(['/about']);
      return false;
  	} else {
      return true;
  	}
  }
} 
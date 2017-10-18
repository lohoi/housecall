import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { UserService } from "../user.service"

@Injectable()
export class PreventLoggedInAccess implements CanActivate {

  constructor(private userService:UserService,
              private router:Router) {}

  canActivate() {
  	if (!this.userService.userSignedIn()) {
  		return true;
  	} else {
  		this.router.navigate(['/about'])
  	}
  }
} 
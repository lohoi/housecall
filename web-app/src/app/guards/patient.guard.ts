import { Injectable } from '@angular/core'
import { CanActivate, Router} from "@angular/router"
import { UserService } from "../user.service"

@Injectable()
export class PatientGuard implements CanActivate {

  constructor(private userService:UserService,
              private router:Router){}

  canActivate() {
    if(this.userService.userSignedIn() && this.userService.isPatient()) {
      return true;
    } else {
      this.router.navigate(['about'])
      return false;
    }
  }
}
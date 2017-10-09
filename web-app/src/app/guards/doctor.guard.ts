import { Injectable } from '@angular/core'
import { CanActivate, Router} from "@angular/router"
import { UserService } from "../user.service"

@Injectable()
export class DoctorGuard implements CanActivate {

  constructor(private userService:UserService,
              private router:Router){}

  canActivate() {
    if(this.userService.userSignedIn$ && this.userService.isDoctor()) {
      console.log("inside can activate of doctr guard")
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
}
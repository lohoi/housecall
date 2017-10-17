import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { User } from '../user'
import { UserService } from '../user.service'
import { Router } from "@angular/router"


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public user: User;

  @Output() onFormResult = new EventEmitter<any>()

  constructor(private userService:UserService, private router: Router) {
    this.user = new User()
  }

  onSubmit = function() {
    event.preventDefault();

    // need to query the dB to get user type
    this.userService.getUserType(this.user.email)
    .subscribe(
      res => {
        this.userType = res.text();
        this.userService.logInUser(this.user.email, this.user.password, this.userType)
          .subscribe(
            res => {
              if (res.status === 200) {
                this.user = JSON.parse(res._body).data;
                console.log("SUCCESS!");
                console.log(this.user);
                console.log("id:", this.user.id);
                switch(this.user.user_type) {
                  case 'doctor':
                    this.router.navigate(['/doctor-dashboard', this.user.id])
                    break  
                  case 'patient':
                    this.router.navigate(['/patient-dashboard', this.user.id])
                    break
                  default:
                    this.router.navigate(['/'])
                    break
                }
              }
            },
            err => {
              this.onFormResult.emit({signedIn: false, err})
            }
          )
      }



    )
  }
}

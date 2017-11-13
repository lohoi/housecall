import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { User } from '../user'
import { UserService } from '../user.service'
import { Router } from "@angular/router"


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User;

  @Output() onFormResult = new EventEmitter<any>()

  constructor(private userService:UserService, private router: Router) {
    this.user = new User()
  }

  ngOnInit() {
    this.userService.logOutUser();
  }

  onSubmit = function() {
    event.preventDefault();

    // need to query the dB to get user type
    this.userService.getUserType(this.user.email)
    .subscribe(
      res => {
        this.userType = res.text();
        console.log('usertype: ', this.userType)
        this.userService.logInUser(this.user.email, this.user.password, this.userType)
          .subscribe(
            res => {
              if (res.status === 200) {
                this.userService.setSignIn(true);
                let data = JSON.parse(res._body).data;
                console.log('success! data:', data)
                switch(data.user_type) {
                  case 'doctor':
                    console.log("navigating to doctor dashboard");
                    this.router.navigate(['/doctor-dashboard'])
                    break  
                  case 'patient':
                    console.log("navigating to patient dash")
                    this.router.navigate(['/patient-dashboard'])
                    break
                  default:
                    this.router.navigate(['/'])
                    break
                }
              }
            },
            err => {
              this.onFormResult.emit({signedIn: false, err})
              this.userService.setSignIn(false);
              alert("Incorrect user credentials");
            }
          )
      }, err => {
        alert("Invalid Credentials");
      }



    )
  }
}

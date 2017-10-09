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
    this.userService.logInUser(this.user.email, this.user.password)
    .subscribe(
      res => {
        if (res.status === 200) {
          let data = JSON.parse(res._body).data

          this.onFormResult.emit({signedIn: true, res})

          console.log("user_type: ", data.user_type)
          switch(data.user_type) {
            case 'doctor':
              this.router.navigate(['/doctor-dashboard'])
              break  
            case 'patient':
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
        
      }
    );   
  }
}

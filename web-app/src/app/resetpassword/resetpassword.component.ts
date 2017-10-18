import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  reset_password_token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  passwordCurrent: string;
  
  constructor(private userService:UserService, private router:Router) {}

  ngOnInit() {
    this.email = this.userService.getUser().email;
    console.log("email: ", this.email)
  }

  onSubmit() {
    this.userService.requestResetToken(this.email).subscribe(
      res => {
        console.log("requestResetToken: ", res);
        this.userService.getResetToken(this.email).subscribe(
          res => {
            this.reset_password_token = res.text();
            console.log("token: ", this.reset_password_token);
            this.userService.changePassword(this.password, this.passwordConfirmation, this.passwordCurrent, this.reset_password_token).subscribe(
              res => {
                this.userService.logOutUser();
                this.router.navigate(['/login']);
              },
              error => {
                alert("ERROR?");
              }
            )
          }, 
          err => {
            console.log("error");
          }
        )
      }, 
      err => {
        console.log("error: ", err);
        alert("ERROR getting password reset token?");
      }
    );
  }

}

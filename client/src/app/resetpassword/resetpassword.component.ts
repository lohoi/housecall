import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordToken: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  passwordCurrent: string;
  
  constructor(private userService:UserService, private router:Router) {}

  ngOnInit() {
    this.email = this.userService.getUser().email;
    console.log("email: ", this.email)
  }

  sendResetToken() {
    this.userService.requestResetToken(this.email).subscribe(
      res => {
        alert('An email with a password reset token has been set! Please check your email');          
      }, 
      err => {
        console.log("error: ", err);
        alert("ERROR getting password reset token?");
      }
    );
  }

  resetPassword() {
    this.userService.changePassword(this.password, this.passwordConfirmation, this.passwordCurrent, this.resetPasswordToken).subscribe(
      res => {
        this.userService.logOutUser();
        this.router.navigate(['/login']);
      },
      error => {
        alert("ERROR?");
      })
  }
}

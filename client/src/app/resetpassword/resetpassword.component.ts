import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  email: string;
  
  constructor(private userService:UserService, private router:Router ,private authService: Angular2TokenService) {}

  ngOnInit() {
    this.email = this.userService.getUser().subscribe(
      res => {
        this.email = this.authService.currentUserData.email;
        console.log('email:',this.email);
      },
      error => {
        console.log('ERROR! Could not find user info??', error);
      }
    )
  }

  sendResetToken() {
    this.userService.requestResetToken(this.email).subscribe(
      res => {
        alert('An email with a password reset token has been set! Please check your email');     
        console.log('res', res);     
      }, 
      err => {
        console.log("error: ", err);
        alert("ERROR getting password reset token?");
      }
    );
  }
}

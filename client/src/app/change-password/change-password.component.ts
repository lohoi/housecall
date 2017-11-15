import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordToken: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  passwordCurrent: string;

  constructor(private userService:UserService, private router:Router ,private authService: Angular2TokenService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.resetPasswordToken = params['reset_password_token'];
        console.log('reset_password_token: ', this.resetPasswordToken);
    });
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

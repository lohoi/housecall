import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';



@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public user: User;

  constructor(private userService:UserService) {
    this.user = new User();
  }

  onSubmit = function() {
    event.preventDefault();
    this.userService.logInUser(this.user.email, this.user.password)
    // .subscribe((data) => {
    //   console.log("done!");
    //   // if (data === -1) {
        // this.loginForm.controls['email'].setErrors({'incorrect': true});
        // this.loginForm.controls['password'].setErrors({'incorrect': true});
    //   // }
    // });   
  }
}

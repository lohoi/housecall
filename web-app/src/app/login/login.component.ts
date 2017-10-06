import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import {Router} from "@angular/router";


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public user: User;

  @Output() onFormResult = new EventEmitter<any>();


  constructor(private userService:UserService, private router: Router) {
    this.user = new User();
  }

  onSubmit = function() {
    event.preventDefault();
    this.userService.logInUser(this.user.email, this.user.password)
    .subscribe(
        res => {
        console.log("done!");
        if (res.status === 200) {
          this.onFormResult.emit({signedIn: true, res});
          this.router.navigate(['/doctor-dashboard']);  
        }
      },
      err => {
          this.onFormResult.emit({signedIn: false, err});
        
      }
    );   
  }
}

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../user';
import { UserService } from '../user.service';
declare var $: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  public user:any;

  constructor(private http: Http, private userService: UserService) {
    this.http = http;
    this.user = new User();
  }

  ngOnInit() {
    $(document).ready(function() {
      $('select').material_select();
    });
  }

  onSubmit = function() {    
    console.log(this.user);
    this.userService.registerUser(this.user)
    .subscribe(
      res => {
        console.log("done!");
        if (res.status === 200) {
          this.router.navigate(['/login']);  
        }
      },
      err => {
          this.onFormResult.emit({signedIn: false, err});
        
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../user';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Router } from "@angular/router";

declare var $: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  public user: any;
  public hospitals: any;
  public specialties: any;
z  // public userTypes: any;

  constructor(private http: Http, private userService: UserService, private router: Router) {
    this.http = http;
    this.user = new User();
    // this.hospitals = ['Mott Children\'s Hospital','Kellogg Eye Center'];
    this.specialties = ['general', 'cardiology', 'orthopedic_surgery',
                   'gastroentrerology', 'dermatology',
                   'anesthesiology', 'plastic_surgery']
  }

  ngOnInit() {
    // this.userTypes = ["Doctor", "Patient", "Admin"];
  }

  onSubmit = function() {    
    // TODO for now
    this.user.specialty = 1;

    this.userService.registerUser(this.user)
    .subscribe(
      res => {
        alert("registration successful!");
        this.router.navigate(['/login']);  
      },
      err => {
          this.onFormResult.emit({signedIn: false, err});
        
      }
    );
  }
}

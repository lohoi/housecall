import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private http: Http) {
    this.http = http
  }

  ngOnInit() {
  }

  submitUser = function() {
    // let params = {
    //   email: ,
    //   skype: ,
    //   firstname: ,
    //   lastname: ,
    //   password: ,
    //   specialty: ,
    //   hospital_id: ,
    //   user_type: ,
    // }
    console.log(this.user);
    // this.http.post('http://localhost:3000/users', params).subscribe();
  }
}

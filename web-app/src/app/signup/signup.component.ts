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
    this.submitUser()
  }

  submitUser = function() {
    let params = {
      email: "remsr@umich.edu",
      skype: "test",
      firstname: "rem",
      lastname: "re",
      password: "1234567890",
      specialty: 1,
      hospital_id: 2,
      user_type: 1
    }
    console.log(params)
    this.http.post('http://localhost:3000/users', params).subscribe();
  }
}

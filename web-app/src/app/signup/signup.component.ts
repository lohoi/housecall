import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public user: User;

  constructor(private http: Http) {
    this.http = http;
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit = function() {
    
    console.log(this.user);
    this.http.post('http://localhost:3000/login', this.user).subscribe();
    // this.http.post('http://localhost:3000/users', this.user).subscribe();
  }
}

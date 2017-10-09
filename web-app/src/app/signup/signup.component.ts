import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { User } from '../user'
import { UserService } from '../user.service'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Router } from "@angular/router"

declare var $: any


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  public user: any
  public hospitals: any
  public specialties: any
  public userTypes: any;

  constructor(private http: Http, private userService: UserService, private router: Router) {
    this.http = http
    this.user = new User()
    this.hospitals = [
      {'id': 0, 'name': 'Mott Children\'s Hospital'},
      {'id': 1, 'name': 'Kellogg Eye Center'}
    ]
    this.specialties = [
      {'id': 0, 'name':' General'}, 
      {'id': 1, 'name': 'Cardiology'},
      {'id': 2, 'name': 'Orthopedic Surgery'},
      {'id': 3, 'name': 'Gastroentrerology'},
      {'id': 4, 'name': 'Dermatology'},
      {'id': 5, 'name': 'Anesthesiology'},
      {'id': 6, 'name': 'Plastic Surgery'}
    ]
    this.userTypes = [
      {'id': 0, 'name': 'Doctor'},
      {'id': 1, 'name': 'Patient'}
    ]

  }

  ngOnInit() {
  }

  onSubmit = function() {    
    this.userService.registerUser(this.user)
    .subscribe(
      res => {
        alert("registration successful!")
        this.router.navigate(['/login']) 
      },
      err => {
          alert("Registration failed! Please double check all fields are correct")
          this.onFormResult.emit({signedIn: false, err})
          console.log("ERROR: ", err)
      }
    );
  }
}

import { Component, OnInit } from '@angular/core'
import { Http } from '@angular/http'
import { User } from '../user'
import { UserService } from '../user.service'
import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'
import { Router } from "@angular/router"

declare var $: any

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public user: any
  public hospitals: any;
  public specialties: any;
  public userTypes: any;
  public isSet: boolean;

  constructor(private http: Http, private userService: UserService, private router: Router) {
    this.user = new User();
    this.isSet = false;
    
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
      {'id': 0, 'name': 'doctor'},
      {'id': 1, 'name': 'patient'}
    ]

  }

  ngOnInit() {
  	this.userService.getUser().subscribe(
      res => {
        this.user = res.json().data;
        console.log("credentials!", this.user)
        this.isSet = true;
      }, error => {
        alert("ERROR")!
      }
    )
  }

  onSubmit = function() {    
    console.log("registering with params: ", this.user);
    this.userService.updateUser(this.user.id, this.user.firstname, this.user.lastname, this.user.skype)
    .subscribe(
      res => {
        alert("successful!")
        this.userService.logOutUser().subscribe(() => this.router.navigate(['/']));
      },
      err => {
          alert("Failed!")
          console.log("ERROR: ", err)
      }
    );
  }
}


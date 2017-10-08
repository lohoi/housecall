import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../user';
import { UserService } from '../user.service';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
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
  // public userTypes: any;

  constructor(private http: Http, private userService: UserService) {
    this.http = http;
    this.user = new User();
    this.hospitals = ['Mott Children\'s Hospital','Kellogg Eye Center'];
    this.specialties = ['General', 'Cardiology', 'Orthopedic Surgery',
                   'Gastroentrerology', 'Dermatology',
                   'Anesthesiology', 'Plastic Surgery']
  }

  ngOnInit() {
    $(document).ready(function() {
      $('select').material_select();
    });

    // this.userTypes = ["Doctor", "Patient", "Admin"];
  }


  onChange(value: any) {
    console.log("hello", value);
  }

  onSubmit = function() {    
    console.log(this.user);
    // this.userService.registerUser(this.user)
    // .subscribe(
    //   res => {
    //     console.log("done!");
    //     if (res.status === 200) {
    //       this.router.navigate(['/login']);  
    //     }
    //   },
    //   err => {
    //       this.onFormResult.emit({signedIn: false, err});
        
    //   }
    // );
  }
}

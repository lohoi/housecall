import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token'
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { PatientDescription } from "../patient-description"
import { UserService } from "../user.service";
import { User } from "../user";

@Component({
  selector: 'app-patient-description',
  templateUrl: './patient-description.component.html',
  styleUrls: ['./patient-description.component.scss']
})
export class PatientDescriptionComponent implements OnInit {
  user: User;
  patient_id;

   constructor(public userService:UserService, private http: Http, private authService: Angular2TokenService) { 
    this.http = http;
    this.userService.getUser().subscribe((res) => {
      this.user = this.authService.currentUserData;
      if(this.user.user_type === "doctor") {
        this.userService.getSelectedContact().subscribe(
          res => {
            console.log("returning with res: ", res)
            this.patient_id =  res.id; 
          }
        )
      }
      else {
        this.patient_id = this.user.id;
      }
    }); 
    this.getPatientDescription();
  }

  ngOnInit() {
  }

  getPatientDescription(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log("get patient " + this.patient_id + "description");

    this.http.get('http://localhost:3000/patient_descriptions/' + this.patient_id + '.json').subscribe(
      (res: Response) => {
          this.notes = res.json();
          this.setEdit();
          console.log("notes: ", this.notes);
        }
    );
  }

}
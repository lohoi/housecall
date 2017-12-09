import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token'
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { UserService } from "../user.service";
import { User } from "../user";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-patient-descrip',
  templateUrl: './patient-descrip.component.html',
  styleUrls: ['./patient-descrip.component.scss']
})
export class PatientDescripComponent implements OnInit {
  user: any;
  patient_id = -1 ;
  patient_descrip: any;

  constructor(public userService:UserService, private http: Http, private authService: Angular2TokenService){
    this.http = http;
    this.userService.getUser().subscribe((res) => {
      this.user = this.authService.currentUserData;
      this.getData();
      if(this.user.user_type === "doctor") {
        this.userService.getSelectedContact().subscribe(
          res => {
            //console.log("returning with res: ", res)
            this.patient_id = res.id; 
            document.getElementById("saveButton").removeAttribute("disabled");
            this.getData();
          },
          error => {
            console.log("ERROR!");
          }
        )
      }
      else if(this.user.user_type === "patient") {
        this.patient_id = this.user.id;
        //console.log("PATIENT ID", this.patient_id);
        document.getElementById("saveButton").removeAttribute("disabled");
        this.getData();
      }
    });
  }

  ngOnInit() {
  }

  getData(){
    if(this.patient_id === -1){
      console.log("patient id is not set");
    }
    else {
      console.log("get patient", this.patient_id);
      this.http.get(environment.apiUrl + 'users/' + this.patient_id + '.json').subscribe(
        (res: Response) => {
            this.patient_descrip = res.json().patient_description;
            console.log("got patient descrip:", this.patient_descrip);
          }
      );
    }
  }

  showIcon = function(icon:string) {
    var pencilIcon = document.getElementById('pencil');
    var checkIcon = document.getElementById('check');
    var textElement = document.getElementById('patient_descrip');
    if(icon === "pencil"){
      pencilIcon.style.display = "none";
      checkIcon.style.display = "block";
      textElement.contentEditable = "true";
      textElement.style.fontFamily = 'Courier New';
      textElement.style.border = "1.8px solid #dcad51";

    } else {
      textElement.style.border = "none";
      textElement.style.fontFamily = 'Roboto';
      checkIcon.style.display = "none";
      pencilIcon.style.display = "block";
      textElement.contentEditable = "false";
    }
  }

  editDescrip(){
    console.log("edit description");
    let user = new User;
    user.id = this.patient_id
    user.patient_description = document.getElementById('patient_descrip').innerText;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(environment.apiUrl + 'updateUser', JSON.stringify(user), { headers: headers }).subscribe(
      res=> {
        console.log(res)
      },
      err => {
        alert("edit description failed")
    });
    this.getData();
  }
}

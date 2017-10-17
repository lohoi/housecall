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
  patient_description;

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
          this.patient_description = res.json();
          this.setEdit();
          console.log("patient_description: ", this.patient_description);
        }
    );
  }

  setEdit(){
    this.patient_description.edit = false;
  }

  savePatientDescription = function(){
    console.log("savePatientDescription called!")
    let patient_description = new PatientDescription();
    patient_description.text = this.newPatientDescription;
    patient_description.doctor_id = this.user.id;
    patient_description.patient_id = this.patient_id;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/patient_descriptions.json', JSON.stringify(patient_description), { headers: headers }).subscribe((ok) => console.log(ok));
    this.newPatientDescription = "";
    this.newPatientDescription = "";
  }

  editPatientDescription = function(id: number){
    console.log(id);
    console.log("edit");
    let patient_description = new PatientDescription();
    patient_description.text = document.getElementById('text-patient-description').innerHTML;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.patch('http://localhost:3000/patient_descriptions/' + id + '.json', JSON.stringify(patient_description), { headers: headers }).subscribe((ok) => console.log(ok));      
  }

  showIcon = function(icon:string, id:number) {
    var pencilIcon = document.getElementById('pencil-patient-description');
    var checkIcon = document.getElementById('check-patient-description');
    var tableElement = document.getElementById('tableElement-patient-description');
    var titleElement = document.getElementById('title-patient-description');
    var textElement = document.getElementById('text-patient-description');
    if(icon === "pencil"){
      tableElement.style.border = "1.8px solid #dcad51";
      tableElement.style.fontFamily = 'Courier New';
      pencilIcon.style.display = "none";
      checkIcon.style.display = "block";
      textElement.contentEditable = "true";
      titleElement.contentEditable = "true";
    } else {
      tableElement.style.border = ".6px solid #000";
      tableElement.style.fontFamily = 'Roboto';
      checkIcon.style.display = "none";
      pencilIcon.style.display = "block";
      textElement.contentEditable = "false";
      titleElement.contentEditable = "false";
    }
  }


}
import { Angular2TokenService } from 'angular2-token'
import { UserService } from "../user.service";
import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Reminder } from "../reminder";
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})

export class RemindersComponent implements OnInit {
  user: any;
  reminders: [Reminder];
  is_doctor = false;
  patient_id = -1 ;

  constructor(private http: Http, private authService: Angular2TokenService, private userService: UserService, private router:Router) {
    this.http = http;
    this.userService.getUser().subscribe((res) => {
      this.user = this.authService.currentUserData;
      if(this.user.user_type === "doctor") {
        this.is_doctor = true;
        this.userService.getSelectedContact().subscribe(
          res => {
            //console.log("returning with res: ", res)
            this.patient_id = res.id; 
            document.getElementById("task_submit").removeAttribute("disabled");
            this.getReminders();
          },
          error => {
            console.log("ERROR!");
          }
        )
      }
      if(this.user.user_type === "patient") {
        this.patient_id = this.user.id;
        document.getElementById("task_submit").removeAttribute("disabled");
        this.is_doctor = false;
        this.getReminders();
      }
    }); 
  }

  ngOnInit() {
  }

  addReminder(new_reminder_text: string){
    if(this.patient_id === -1){
      console.log("patient_id is not set");
    }
    else{
      let reminder = new Reminder();
      reminder.text = new_reminder_text;
      reminder.user_id = this.user.id;
      reminder.patient_id = this.patient_id;
      let dic = {reminder: reminder};
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('http://localhost:3000/reminders.json', JSON.stringify(dic), { headers: headers }).subscribe((res: Response) => {
        //console.log("response", res.json().id)
        this.reminders.push(res.json());
      });
    }
  }

  getReminders() {
    // let reminder = new Reminder();
    // reminder.id = 0;
    // reminder.text = "test1";
    // reminder.user_id = this.user.id;
    // reminder.patient_id = this.patient_id;
    // reminder.completed = false;
    // this.reminders = ([reminder]);

    // let reminder2 = new Reminder();
    // reminder2.id = 0;
    // reminder2.text = "test2";
    // reminder2.user_id = this.user.id;
    // reminder2.patient_id = this.patient_id;
    // reminder2.completed = false;
    // this.reminders.push(reminder2);

    if(this.patient_id === -1){
      console.log("patient id is not set");
    }
    else {
      let options = new RequestOptions({
        // Have to make a URLSearchParams with a query string
        search: new URLSearchParams('user_id=' + this.user.id + '&patient_id=' + this.patient_id)
      });
      console.log("get reminders");
      this.http.get('http://localhost:3000/reminders.json', options).subscribe(
        (res: Response) => {
            this.reminders = res.json();
            //console.log("notes: ", this.notes);
          }
      );
    }
  }

  setCompleted(id: number) {
    console.log("hit");

    let reminder = new Reminder();
    // reminder.completed = 
    // reminder.id = id;
    // reminder.text = 
    // note.title = document.getElementById('title-'+id).innerHTML;
    // note.text = document.getElementById('text-'+id).innerHTML;
    // note.user_id = this.user.id;
    // note.patient_id = this.patient_id;
    // note.id = id;

    let dic = {reminder: reminder}
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.patch('http://localhost:3000/reminders/' + id + '.json', JSON.stringify(dic), { headers: headers }).subscribe((ok) => console.log(ok));      
    console.log("edit note");
  
  }


}

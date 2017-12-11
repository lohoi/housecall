import { Angular2TokenService } from 'angular2-token'
import { UserService } from "../user.service";
import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Reminder } from "../reminder";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

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
      console.log(this.user);
      if (this.user.user_type === 'doctor') {
        this.is_doctor = true;
        this.userService.getSelectedContact().subscribe(
          res => {
            if (res != null) {
              this.patient_id = res.id; 
              document.getElementById('task_submit').removeAttribute('disabled');
              this.resetReminders();
              this.getReminders();
            } else {
              this.patient_id = -1;
              document.getElementById("task_submit").setAttribute('disabled', 'disabled');
              this.resetReminders();
            }
          },
          error => {
            console.log("ERROR!");
          }
        )
      }
      // patient view
      else {
        this.is_doctor = false;
        this.patient_id = this.user.id;
        this.getReminders();
      }
    }); 
  }

  ngOnInit() {
  }

  // Set checkbox values and "No current task" text
  setReminderComponentState(){
    console.log("set reminder component");
    if(this.reminders == null && this.reminders.length > 0){
      document.getElementById("no_reminders").setAttribute("display", "none");
      for(var i = 0; i < this.reminders.length; i++){
        if(this.reminders[i].completed == false ){
          document.getElementById('checkbox-'+this.reminders[i].id).removeAttribute("checked");
        }
      }
    }
  }

    // Reset the reminder list on contact change
  // For doctor-dashboard
  resetReminders(){
    this.reminders = null;
  }


  addReminder(new_reminder_text: string){
    if(this.patient_id === -1){
      console.log("patient_id is not set");
    }
    else if(!new_reminder_text){
        console.log("task must contain text");
    }
    else{
      let reminder = new Reminder();
      reminder.text = new_reminder_text;
      reminder.user_id = this.user.id;
      reminder.patient_id = this.patient_id;
      reminder.completed = false;

      let dic = {reminder: reminder};
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(environment.apiUrl + 'reminders.json', JSON.stringify(dic), { headers: headers }).subscribe((res: Response) => {
        //console.log("response", res.json().id)
        this.reminders.push(res.json());
      });
    }
  }

  getReminders() {
    let options: any;
    if (this.patient_id === -1) {
      console.log('patient id is not set');
    } else if (this.user.user_type !== 'doctor') {
      options = new RequestOptions({
        // Have to make a URLSearchParams with a query string
        search: new URLSearchParams('user_id=' + this.user.doctor_id + '&patient_id=' + this.user.id)
      });
    } else {
      options = new RequestOptions({
        // Have to make a URLSearchParams with a query string
        search: new URLSearchParams('user_id=' + this.user.id + '&patient_id=' + this.patient_id)
      });
    }
    console.log('getReminders()');
    console.log(options);
    this.http.get(environment.apiUrl + 'reminders.json', options).subscribe(
      (res: Response) => {
          this.reminders = res.json();
      }
    );
  }

  setCompleted(id: number, checked: boolean) {
    console.log("Change completed status");
    let reminder = new Reminder();
    reminder.id = id;
    reminder.completed = checked;

    let dic = {reminder: reminder}
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.patch(environment.apiUrl + 'reminders/' + id + '.json', JSON.stringify(dic), { headers: headers }).subscribe((ok) => console.log(ok));      

  }

  deleteReminder = function(id: number) {
    if (this.user.user_type === 'patient') {
      alert('Patients cannot delete tasks');
      return;
    }
    if (confirm('Delete task?')) {
      let delete_idx = this.reminders.findIndex(reminder => reminder.id === id);
      this.reminders.splice(delete_idx,1);
      this.http.delete(environment.apiUrl + 'reminders/' + id + '.json').subscribe();
    }
  }


}

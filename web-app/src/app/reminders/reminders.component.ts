import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Reminder } from "../reminder"

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {

  reminders: [Reminder];
  user_id;

  constructor(private http: Http) { 
    this.http = http;
    //user_id = UserService.getUser().id;
    this.user_id = 2;
    this.reminders = [
      {id: 0, text:"Reminder1", user_id: 2, completed: false},
      {id: 1, text:"Reminder2", user_id: 2, completed: false},
    ]
    //getData(this.user_id);
  }

  ngOnInit() {
  }

  // TODO
  getData(){
    let options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: new URLSearchParams('user_id=' + this.user_id)
    });
    console.log("get reminders");
    this.http.get('http://localhost:3000/reminders.json', options).subscribe((res: Response) => {this.reminders = res.json(); });
    console.log(this.reminders);
  }

  setCompleted(id: number, completed_in: boolean){
    console.log(id);
    console.log("edit");
    let reminder = new Reminder();
    reminder.text = document.getElementById('text-'+id).innerHTML;
    reminder.user_id = this.user_id;
    reminder.id = id;
    reminder.completed = completed_in;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.patch('http://localhost:3000/reminders/' + id + '.json', JSON.stringify(reminder), { headers: headers }).subscribe((ok) => console.log(ok));          
  }

}

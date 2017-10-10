import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Note } from "../note"
//import { UserService } from "../user.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: [Note];
  user_id;

  constructor(private http: Http) { 
    this.http = http;
    //user_id = UserService.getUser().id;
    this.user_id = 2;
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    let options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: new URLSearchParams('user_id=' + this.user_id)
    });
    console.log("get notes");
    this.http.get('http://localhost:3000/notes.json', options).subscribe((res: Response) => {this.notes = res.json()});
    console.log(this.notes);
  }

  saveNote = function(noteTitle: string, noteText: string){
    let note = new Note();
    note.title = this.newNoteTitle;
    note.text = this.newNoteText;
    note.user_id = this.user_id;
    //let obj = {title: this.newNoteTitle, text: this.newNoteText};
    console.log(note);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/notes.json', JSON.stringify(note), { headers: headers }).subscribe((ok) => console.log(ok));
    //this.getData();
  }

  deleteNote = function(id:number){
    console.log("delete", id);
    this.http.delete('http://localhost:3000/notes/' + id + '.json').subscribe((res: Response) => console.log(res.json));

  }

  emailNote = function(){
    console.log("email");
  }

}

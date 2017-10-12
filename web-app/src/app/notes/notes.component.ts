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
    this.http.get('http://localhost:3000/notes.json', options).subscribe((res: Response) => {this.notes = res.json(); this.setEdit()});
    console.log(this.notes);
  }

  setEdit(){
    this.notes.forEach(note => {
      note.edit = false;
    });
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
    this.newNoteText = "";
    this.newNoteTitle = "";
  }

  deleteNote = function(id: number){
    console.log("delete note");
    this.http.delete('http://localhost:3000/notes/' + id + '.json').subscribe((res: Response) => console.log(res.json));

  }

  editNote = function(id: number){
    console.log(id);
    console.log("edit");
    let note = new Note();
    note.title = document.getElementById('title-'+id).innerHTML;
    note.text = document.getElementById('text-'+id).innerHTML;
    note.user_id = this.user_id;
    note.id = id;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.patch('http://localhost:3000/notes/' + id + '.json', JSON.stringify(note), { headers: headers }).subscribe((ok) => console.log(ok));      
  }

  showIcon = function(icon:string, id:number) {
    var pencilIcon = document.getElementById('pencil-'+id);
    var checkIcon = document.getElementById('check-'+id);
    var tableElement = document.getElementById('tableElement-'+id);
    if(icon === "pencil"){
      tableElement.style.border = "1.8px solid #dcad51";
      tableElement.style.fontFamily = 'Courier New';
      pencilIcon.style.display = "none";
      checkIcon.style.display = "block";
    } else {
      tableElement.style.border = ".6px solid #000";
      tableElement.style.fontFamily = 'Roboto';
      checkIcon.style.display = "none";
      pencilIcon.style.display = "block";
    }
  }

}

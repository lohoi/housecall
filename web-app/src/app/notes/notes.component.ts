import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token'
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Note } from "../note"
import { UserService } from "../user.service";
import { User } from "../user";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: [Note];
  user: User;
  patient_id;

  constructor(public userService:UserService, private http: Http, private authService: Angular2TokenService) { 
    this.http = http;
    this.userService.getUser().subscribe((res) => {
      this.user = this.authService.currentUserData;
      if(this.user.user_type === "doctor") {
        console.log("HITTING THIS!")
        this.userService.getSelectedContact().subscribe(
          res => {
            console.log("returning with res: ", res)
            // this.patient_id =  res.id; 
          },
          error => {
            console.log("ERROR!");
          }
        )
      }
      else {
        this.patient_id = this.user.id;
      }
    }); 
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    let options = new RequestOptions({
      // Have to make a URLSearchParams with a query string
      search: new URLSearchParams('user_id=' + this.user.id + ' patient_id=' + this.patient_id)
    });
    console.log("get notes");
    this.http.get('http://localhost:3000/notes.json', options).subscribe(
      (res: Response) => {
          this.notes = res.json();
          this.setEdit();
          console.log("notes: ", this.notes);
        }
    );
  }

  setEdit(){
    this.notes.forEach(note => {
      note.edit = false;
    });
  }

  saveNote = function(){
    console.log("save note called!")
    let note = new Note();
    note.title = this.newNoteTitle;
    note.text = this.newNoteText;
    note.user_id = this.user.id;
    note.patient_id = this.patient_id;
    let dic = {note: note};
    console.log(dic);

    this.notes.push(note);
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/notes.json', JSON.stringify(dic), { headers: headers }).subscribe((ok) => console.log(ok));
    this.newNoteText = "";
    this.newNoteTitle = "";
  }

  deleteNote = function(id: number){
    console.log("delete note");

    let delete_idx = this.notes.findIndex(note => note.id == id);
    this.notes.splice(delete_idx,1);
    this.http.delete('http://localhost:3000/notes/' + id + '.json').subscribe((res: Response) => console.log(res.json));
  }

  editNote = function(id: number){
    console.log(id);
    console.log("edit");
    let note = new Note();
    note.title = document.getElementById('title-'+id).innerHTML;
    note.text = document.getElementById('text-'+id).innerHTML;
    note.user_id = this.user.id;
    note.patient_id = this.patient_id;
    note.id = id;
    let dic = {note: note}
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.patch('http://localhost:3000/notes/' + id + '.json', JSON.stringify(dic), { headers: headers }).subscribe((ok) => console.log(ok));      
  }

  showIcon = function(icon:string, id:number) {
    var pencilIcon = document.getElementById('pencil-'+id);
    var checkIcon = document.getElementById('check-'+id);
    var tableElement = document.getElementById('tableElement-'+id);
    var titleElement = document.getElementById('title-'+id);
    var textElement = document.getElementById('text-'+id);
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

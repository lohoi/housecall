import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token'
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Note } from "../note"
import { UserService } from "../user.service";
import { User } from "../user";
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: [Note];
  user: any;
  patient_id = -1 ;

  constructor(public userService:UserService, private http: Http, private authService: Angular2TokenService) { 
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
      let options = new RequestOptions({
        // Have to make a URLSearchParams with a query string
        search: new URLSearchParams('user_id=' + this.user.id + '&patient_id=' + this.patient_id)
      });
      console.log("get notes");
      this.http.get(environment.apiUrl + 'notes.json', options).subscribe(
        (res: Response) => {
            this.notes = res.json();
            this.setEdit();
            //console.log("notes: ", this.notes);
          }
      );
    }
  }

  setEdit(){
    this.notes.forEach(note => {
      note.edit = false;
    });
  }

  saveNote = function(){
    if(this.patient_id === -1){
      console.log("patient_id is not set");
    }
    else{
      let note = new Note();
      note.title = this.newNoteTitle;
      note.text = this.newNoteText;
      note.user_id = this.user.id;
      note.patient_id = this.patient_id;
      let dic = {note: note};
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(environment.apiUrl + 'notes.json', JSON.stringify(dic), { headers: headers }).subscribe((res: Response) => {
        //console.log("response", res.json().id)
        this.notes.push(res.json());
      });
      this.newNoteText = "";
      this.newNoteTitle = "";
    }
  }

  deleteNote = function(id: number){
    console.log("delete note");

    let delete_idx = this.notes.findIndex(note => note.id == id);
    this.notes.splice(delete_idx,1);
    this.http.delete(environment.apiUrl + 'notes/' + id + '.json').subscribe();
  }

  editNote = function(id: number){
    console.log("edit note");
    let note = new Note();
    note.title = document.getElementById('title-'+id).innerHTML;
    note.text = document.getElementById('text-'+id).innerHTML;
    note.user_id = this.user.id;
    note.patient_id = this.patient_id;
    note.id = id;
    let dic = {note: note}
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.patch(environment.apiUrl + 'notes/' + id + '.json', JSON.stringify(dic), { headers: headers }).subscribe((ok) => console.log(ok));      
  }

  emailNote = function(id: number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let idx = this.notes.findIndex(note => note.id == id)
    let note = this.notes[idx]
    let dic = {note: note};
    console.log(note)
    this.http.post(environment.apiUrl + 'notes/mail.json', JSON.stringify(dic), { headers: headers }).subscribe((res: Response) => {
        console.log(res.json());
    });


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

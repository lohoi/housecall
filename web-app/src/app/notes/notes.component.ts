import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  noteText: string = "";
  notes: [{
    text: string,
    name: string
  }];

  constructor(private http: Http) { 
    this.http = http;
    this.notes = [
      {text: "one", name:"one"},
      {text: "two", name:"one"},
      {text: "three", name:"one"},
      {text: "four", name:"one"},
      {text: "five", name:"one"},
      {text: "six", name:"one"},
    ];
    //http.get('http://localhost:3000/about.json').subscribe(res => this.text = res.json().message);
  }

  ngOnInit() {
  }

  saveNote = function(){
    console.log(this.noteText);
    //this.http.post('http://localhost:3000/addNote', this.noteText).subscribe();
  }

  deleteNote = function(){
    console.log("delete");
    //this.http.post('http://localhost:3000/deleteNote', this.noteText).subscribe();
  }

}

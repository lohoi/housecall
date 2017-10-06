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
  }];

  constructor(private http: Http) { 
    this.http = http;
    this.notes = [
      {text: "one"},
      {text: "two"}
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
  }

}

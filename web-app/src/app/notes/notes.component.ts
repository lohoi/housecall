import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  noteText: string = "";

  constructor(private http: Http) { 
    this.http = http;
  }

  ngOnInit() {
  }

  saveNote = function(){
    console.log( this.noteText);
    //this.http.post('http://localhost:3000/addNote', this.noteText).subscribe();
  }

}

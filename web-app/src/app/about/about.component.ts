import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  text:string;
  
  constructor(private http: Http) { 
    http.get('http://localhost:3000/about.json').subscribe(res => this.text = res.json().message);
  }

  ngOnInit() {
    console.log("HERE")
    this.text = "Woo ay"
  }
}

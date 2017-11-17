import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  text:string;
  
  constructor(private http: Http) { 
    http.get(environment.apiUrl + 'about.json').subscribe(res => this.text = res.json().message);
  }

  ngOnInit() {
    this.text = "Woo ay"
  }
}

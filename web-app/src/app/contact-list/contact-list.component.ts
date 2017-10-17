import { Angular2TokenService } from 'angular2-token'
import { UserService } from "../user.service";
import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Contact } from '../contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  user_id;
  show;
  contacts: [Contact];

  constructor(private http: Http, private authService: Angular2TokenService, private userService: UserService, private router:Router) {
    this.http = http;
    this.userService.getUser().subscribe((res) => {
      this.user_id = this.authService.currentUserData.id;
      this.getContacts();
      this.show = false;
    }); 
  }

  setClickedRow (index){
    this.userService.setSelectedContact(this.contacts[index]);
  }

  ngOnInit() {
  }

  callSkype(){
    console.log("hey!");
  }

  getContacts() {
    let options = new RequestOptions({
      search: new URLSearchParams('user_id=' + this.user_id)
    });

    console.log("get all contacts");

    this.http.get('http://localhost:3000/contacts.json', options).subscribe((res: Response) => {this.contacts = res.json()});

    console.log(this);
  }

  addContact = function(patientFirstName: string, patientLastName: string,
                        patientEmail: string, patientSkype: string){
    let contact = new Contact();
    console.log(this.patientFirstName);
    contact.firstname = this.patientFirstName;
    contact.lastname = this.patientLastName;
    contact.email = this.patientEmail;
    contact.skype = this.patientSkype;
    contact.doctor_id = this.user_id;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/contacts.json', JSON.stringify(contact), { headers: headers }).subscribe(
      res=> {
        this.router.navigate(['/doctor-dashboard'])
      },
      err => {
        alert("Registration failed! Please double check all fields are correct")
      });
    
    this.patientFirstName = "";
    this.patientLastName = "";
    this.patientEmail = "";
    this.patientSkype ="";
  }

}

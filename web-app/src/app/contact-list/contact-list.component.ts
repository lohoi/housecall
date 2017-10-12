import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import { Contact } from '../contact'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  user_id;

  contacts: [Contact];

  constructor(private http: Http) {
    this.http = http;
    // user_id = UserService.getUser().id;
    this.user_id = 2;
    this.getContacts();
  }

  ngOnInit() {
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
    contact.firstname = this.patientFirstName;
    contact.lastname = this.patientLastName;
    contact.email = this.patientEmail;
    contact.skype = this.patientSkype;
    contact.doctor_id = this.user_id;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/contacts.json', JSON.stringify(contact), { headers: headers }).subscribe((ok) => console.log(ok));

    this.patientFirstName = "";
    this.patientLastName = "";
    this.patientEmail = "";
    this.patientSkype ="";
  }

}

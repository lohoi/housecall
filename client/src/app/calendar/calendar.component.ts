import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, Headers } from '@angular/http';
import {CalendarHeaderComponent} from '../calendar-header/calendar-header.component';
import {DateTimePickerComponent} from '../calendar-time-picker/calendar-time-picker.component';
import { UserService } from '../user.service';
import { environment } from '../../environments/environment';

import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { Angular2TokenService } from 'angular2-token';

const colors: any = {
  blue: {
    primary: '#03A9F4',
    secondary: '#03A9F4'
  },
  red: {
    primary: '#D32F2F',
    secondary: '#D32F2F'
  },
  yellow: {
    primary: '#FFC107',
    secondary: '#FFC107'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', '../../../node_modules/angular-calendar/dist/css/angular-calendar.css']
})

export class CalendarComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  user: any;
  patient_id = -1;
  view = 'month';
  show = false;
  contacts: any;
  selectedDate: Date = null;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Clicked', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  selectedEvent: any;
  events: CalendarEvent[] = [];

  activeDayIsOpen = false;

  constructor(public userService: UserService, private modal: NgbModal, private http: Http, private authService: Angular2TokenService) {
    this.http = http;

    this.userService.getUser().subscribe((res) => {
      console.log(res.json());
      this.user = this.authService.currentUserData;
      if (this.user.user_type === 'doctor') {
        this.userService.getAllContacts().subscribe((r) => {
          this.contacts = r;
          console.log(this.contacts);
          document.getElementById('add-btn').setAttribute('disabled', 'disabled');
          this.user = this.authService.currentUserData;
          this.getData();
          if (this.user.user_type === 'doctor') {
            this.userService.getSelectedContact().subscribe(
              r => {
                if (r != null) {
                  document.getElementById('add-btn').removeAttribute('disabled');
                  console.log(r);
                  if (this.patient_id !== r.id) {
                    this.patient_id = r.id;
                    this.getData();
                  }
                } else {
                  document.getElementById('add-btn').setAttribute('disabled', 'disabled');
                  this.getData()
                }
              }
            );
          }
        });
      } else {
          document.getElementById('add-btn').setAttribute('disabled', 'disabled');
          this.actions = []
          this.getData();
        }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) {
        this.activeDayIsOpen = false;
        this.selectedDate = null;
      } else {
        this.selectedDate = date;
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
    console.log(this.selectedDate);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: any): void {
    this.selectedEvent = event;
    this.modalData = { event, action };
    if (this.user.user_type === 'doctor') {
      if (action === 'Clicked') {
        let contact = this.contacts.find(c => c.id === event.patient_id);
        console.log(contact);
        this.userService.setSelectedContact(contact);
        this.selectedEvent = event;
      } else if (action === 'Dropped or resized') {
        this.editEvent(event);
      } else if (action === 'Deleted') {
        this.deleteEvent(event);
      }
    }
  }

  addEvent(): void {
    if (this.user.user_type !== 'doctor') {
      alert('Patients cannot edit events');
      return;
    }
    // if (this.patient_id < 0) {
    //   return;
    // }
    let start = this.selectedDate != null ? this.selectedDate : new Date();
    let end = addHours(start, 2);
    let event = {
      event: {
        user_id: this.user.id,
        patient_id: this.patient_id,
        title: 'New Event',
        start: start,
        description: 'Description',
        end: end,
        color: colors.red,
        draggable: true,
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(environment.apiUrl + 'events.json', JSON.stringify(event), { headers: headers }).subscribe((res: Response) => {
      event['event']['id'] = res.json()['id'];
      let e = Object.assign({}, event['event']);
      this.events.push(e);
      console.log('Adding event...');
      console.log(e);
      this.refresh.next();
      this.selectedEvent = e;
      this.activeDayIsOpen = true;
    });
  }

  editEvent(event: any): void {
    if (this.user.user_type !== 'doctor') {
      alert('Patients cannot edit events');
      return;
    }
    let e = {
      event: event
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.patch(environment.apiUrl + 'events/' + event.id +
      '.json', JSON.stringify(e), { headers: headers })
      .subscribe((ok) => console.log(ok));
  }

  getData(): void {
    let options: any;
    if (this.user.user_type !== 'doctor') {
      options = new RequestOptions({
        search: new URLSearchParams('user_id=' + this.user.doctor_id + '&patient_id=' + this.user.id)
      });
    } else if (this.patient_id === -1) {
      options = new RequestOptions({
        search: new URLSearchParams('user_id=' + this.user.id)
      });
    } else {
      options = new RequestOptions({
        search: new URLSearchParams('user_id=' + this.user.id + '&patient_id=' + this.patient_id)
      });
    }

    this.http.get(environment.apiUrl + 'events.json', options).subscribe(
      (res: Response) => {
        this.events = [];
        console.log(res.json());
        for (let event of res.json()) {
          let e = Object.assign({}, event);
          e.color = {
            primary: e.color,
            secondary: e.color,
          };
          e.resizable = {
            beforeStart: e.resizeBeforeStart,
            afterEnd: e.resizeAfterEnd
          };
          delete e['resizeBeforeStart'];
          delete e['resizeAfterEnd'];

          e.start = new Date(e.start);
          e.end = new Date(e.end);
          e.actions = this.actions;
          this.events.push(e);
        }
        this.refresh.next();
      }
    );
  }

  deleteEvent(event: any): void {
    if (this.user.user_type !== 'doctor') {
      alert('Patients cannot edit events');
      return;
    }
    if (confirm('Delete event?')) {
      if (event === this.selectedEvent) {
        this.selectedEvent = null;
      }
      let index = this.events.indexOf(event, 0);
      if (index > -1) {
         this.events.splice(index, 1);
      }
      this.refresh.next();
      this.http.delete(environment.apiUrl + 'events/' + event.id + '.json').subscribe(
        (res: Response) => {
          console.log('Event deleted');
        }
      );
    }
  }

  toggleEventEdit(): void {
    this.show = !this.show;
    if (this.selectedEvent) {
      if (this.user.user_type === 'doctor') {
        this.editEvent(this.selectedEvent);
      }
      this.selectedEvent = null;
      console.log(this.patient_id);
    }
  }
}

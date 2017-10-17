import { Component, OnInit, NgZone} from '@angular/core';
import { UserService } from '../user.service';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[skype-contact-id]' })
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}

@Component({
  selector: 'app-skype',
  templateUrl: './skype.component.html',
  styleUrls: ['./skype.component.scss']
})
export class SkypeComponent implements OnInit {
  static reloaded:boolean = true;
  contactID:string;

  constructor(private zone: NgZone) { 
  }

  ngOnInit() {
    if (!SkypeComponent.reloaded) {
      this.zone.runOutsideAngular(() => {
        location.reload();
      });
    }
    SkypeComponent.reloaded = true
    // Get the username of the person to contact here
    this.contactID = "remingtonsr"
  }

  ngOnDestroy() {
    SkypeComponent.reloaded = false
  }
}

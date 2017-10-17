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

  constructor(private zone: NgZone, private userService:UserService) { 
  }

  ngOnInit() {
    if (!SkypeComponent.reloaded) {
      this.zone.runOutsideAngular(() => {
        location.reload();
      });
    }
    SkypeComponent.reloaded = true
    // Get the username of the person to contact here
    // this.contactID = "remingtonsr"

    this.userService.getSelectedContact().subscribe(
      res => {
        console.log("returning with res: ", res)
        this.contactID = res.skype;
        // var parent = document.getElementById("app-skype");
        // var child = document.getElementById("skype-chat");
        // parent.removeChild(child);

        // // var x = document.getElementsByTagName("BODY")[0];
        // // var skypeChat = document.getElementsByClassName("skype-chat")[0];
        // // x.removeChild(skypeChat);
        
        // var skypeSpan = document.createElement("span");
        // skypeSpan.setAttribute("id", "skype-chat")
        // skypeSpan.classList.add("skype-button");
        // skypeSpan.classList.add("bubble");
        // skypeSpan.setAttribute("data-contact-id", this.contactID);
        // parent.appendChild(skypeSpan);
      }
    );
    this.contactID = "remingtonsr"
  }

  ngOnDestroy() {
    SkypeComponent.reloaded = false
  }
}

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from "@angular/router";
import { User } from '../user';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  user: User;
  constructor(public userService:UserService, private router:Router, private route: ActivatedRoute) { 
    this.user = new User();
  }

  ngOnInit() {
    console.log("navBar Init!");
    console.log("user signed in? ",this.userService.userSignedIn());
  	if (this.userService.userSignedIn()) {
  		this.user = this.userService.getUser();
      console.log("navbar user:" , this.user);
  	}
  }

  logOut() {
  	this.userService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }
}

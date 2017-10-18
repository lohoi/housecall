import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  logOut() {
  	this.userService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

//   $(document).ready(function () {
//     $('.tooltipped').tooltip({ delay: 50 });
// });

}
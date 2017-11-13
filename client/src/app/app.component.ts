import { Component } from '@angular/core';
import { UserService } from "./user.service";
import { environment } from "../environments/environment";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private userService:UserService) {
		// this.authService.init(environment.token_auth_config);
	}
}

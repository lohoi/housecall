import { Component } from '@angular/core';
import { Angular2TokenService } from "angular2-token"
import { environment } from "../environments/environment"



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loaded = false;
	constructor(private authService: Angular2TokenService) {
    setTimeout(() => {
      document.getElementById("loading").remove();
      this.loaded = true;
    }, 2500);
		this.authService.init(environment.token_auth_config);
	}
}

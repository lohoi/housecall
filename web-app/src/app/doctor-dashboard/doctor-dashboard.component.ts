import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent {

  constructor(private userService:UserService) { }
}

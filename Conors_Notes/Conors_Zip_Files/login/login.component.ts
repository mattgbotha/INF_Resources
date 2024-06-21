import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  courses:any[] = []

  constructor(private router: Router, private dataService: DataService) { }


  Login(){
    this.dataService.Login().subscribe((result: any) => 
      localStorage.setItem('Token', JSON.stringify(result))
    )
  }

  GetCourses(){
    this.dataService.Courses().subscribe((result: any[]) => 
      {this.courses = result}
    )
  }

}

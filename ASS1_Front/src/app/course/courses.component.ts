import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Course } from '../shared/course';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  
  courses:Course[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetCourses()
    
    console.log(this.courses)
  }

  GetCourses()
  {
    this.dataService.GetCourses().subscribe(result => {
      let courseList:any[] = result
      courseList.forEach((element) => {
        this.courses.push(element)
      });
      this.courses.reverse();
    })
  }

  deleteCourse(id:number){
    this.dataService.deleteCourse(id).subscribe({
      next: (response) => {
        alert("Deleted");
        // this.GetCourses();
        window.location.reload();
      }
    });
  }

  cancel(){
    this.router.navigate(["courses"]);
  };
}

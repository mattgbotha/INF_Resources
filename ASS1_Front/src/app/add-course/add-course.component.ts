import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Course } from '../shared/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  addCourseAtt: Course = {
    courseId: 0,
    name: '',
    duration: '',
    description: '',
  };

  constructor(private dataService: DataService, private router: Router ) { }

  ngOnInit(): void {
  }

  addCourse(){
    this.dataService.addCourse(this.addCourseAtt).subscribe({
      next: (course) => {
        this.router.navigate(['courses'])
        console.log(course)

      }
    });
  }


  cancel(){
    this.router.navigate(["courses"]);
  };
}

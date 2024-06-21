import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Course } from '../shared/course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  courseAtt: Course = {
    courseId: 0,
    name: '',
    duration: '',
    description: ''
  };


  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const courseId = params.get('courseId');

        //Call the API
        if(courseId){
          this.dataService.getCourseId(courseId).subscribe({
            next: (response) => {
              this.courseAtt = response;
            }
          });
        }
      }
    })
  }


  updateCourse(){
    this.dataService.updateEmployee(this.courseAtt.courseId, this.courseAtt).subscribe({
      next: (response) =>{
        this.router.navigate(['courses'])
      }
    });
 
  }

  cancel(){
    this.router.navigate(["courses"]);
  };
}

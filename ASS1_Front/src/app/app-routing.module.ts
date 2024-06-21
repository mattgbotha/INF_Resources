import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './course/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

const routes: Routes = [
  
  {path: 'courses', component: CoursesComponent},  
  {path: '', redirectTo: '/courses', pathMatch: 'full'},
  {path: 'addCourses', component: AddCourseComponent},
  {path: 'editCourses/:courseId', component: EditCourseComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

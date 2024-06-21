import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Course } from '../shared/course';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:5116/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
  }

  GetCourses(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Course/GetAllCourses`)
    .pipe(map(result => result))
  }

  addCourse(addCourseAtt: Course){
    return this.httpClient.post<Course>(`${this.apiUrl}Course/AddCourse`, addCourseAtt)
    .pipe(map(result => result))
  }

  getCourseId(courseId: string): Observable<Course>{
    return this.httpClient.get<Course>(`${this.apiUrl}Course/GetCourse/` + courseId)
  }


  updateEmployee(id: number, courseAtt: Course): Observable<Course>{
    return this.httpClient.put<Course>(`${this.apiUrl}Course/EditCourse/` + id, courseAtt)
  }

  deleteCourse(courseId: number): Observable<Course>{
    return this.httpClient.delete<Course>(`${this.apiUrl}Course/DeleteCourse/` + courseId)
  }
}



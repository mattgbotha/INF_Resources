
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:5240/api/'

  // httpOptions ={
  //   headers: new HttpHeaders({
  //     ContentType: 'application/json'
  //   })
  // }

  constructor(private httpClient: HttpClient) {   
  }

  Login(){
    let user = new UserCredentials
    return this.httpClient.post(`${this.apiUrl}Course/Login`, user)
  }

  Courses(){
    return this.httpClient.get<any>(`${this.apiUrl}Course/GetAllCourses`)
  }

}

class UserCredentials  {
  EmailAddress:string = 'Addyouremailaddresshere';
  Password:string = 'Addyourpasswordhere'
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Hero } from '../shared/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  apiUrl = 'http://localhost:5116/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private _httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]>{
    return this._httpClient.get<Hero[]>(`${this.apiUrl}Hero/GetAllHeroes`)
    .pipe(map(result => result))
  }

  getHero(heroId: number) {
    return this._httpClient.get(`${this.apiUrl}Hero/GetHero` + "/" + heroId)
    .pipe(map(result => result))
  }
}

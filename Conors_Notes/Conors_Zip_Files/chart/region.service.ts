import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private httpclient : HttpClient) { }


  public getRegions(): Observable<any> {
    let appheaders = this.getHeaderConfigurations();
    return this.httpclient.get<any[]>('https://localhost:7250/Regions', { headers: appheaders});
  }

  private getHeaderConfigurations()
    {
        return new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
               'Access-Control-Allow-Origin': '*'
        });
    }
}

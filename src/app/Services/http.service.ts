import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(url);
  }

  // If the app was bigger we could add error handler for all http requests
  // private handleError(error: HttpErrorResponse) {}
}

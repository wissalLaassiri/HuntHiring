import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private endpoint = 'http://localhost:8000/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as 'body',
  };
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  addSkills(skill: any, url: string): Observable<any> {
    return this.http
      .post<HttpResponse<any>>(
        this.endpoint + url,
        JSON.stringify(skill),
        this.httpOptions
      )
      .pipe(
        map((response) => {
          return response.body;
        }),
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let msg = {
      name: '',
    };
    if (error.status === 400) {
      // client-side error
      if (error.error['name'] != null) {
        msg['name'] = error.error['name'][0];
      }
      console.log(error.error);
      console.log(JSON.stringify(msg['name']));
    }
    if (error.status === 401) {
      msg = error.error['detail'];
      console.log(msg);
    }
    if (error.status === 404) {
      msg = error.error['detail'];
      console.log(msg);
    } else {
      console.log(msg);
    }
    return throwError(msg);
  }
}

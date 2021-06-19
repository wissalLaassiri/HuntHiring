import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

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
  constructor(private http: HttpClient, private token: TokenStorageService,
    ) {}

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
  addOffer(offer: any, url: string) {
    return this.http
      .post<HttpResponse<any>>(
        this.endpoint + url,
        JSON.stringify(offer),
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

  getOffers(): Observable<any> {
    let authToken = this.token.getUser();
    authToken = 'Bearer ' + authToken;
    return this.http.get(this.endpoint + '/offer/', this.httpOptions).pipe(
      map((res) => {
        const detail = res['body'];
        this.token.type = JSON.stringify(detail['type']);
       console.log("det  ",detail);
       return detail;
      }),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    let msg = {};
    if (error.status === 400) {
      // client-side error
      if (error.error['name'] != null) {
        msg['name'] = error.error['name'][0];
      }
      if (error.error['entreprise_name'] != null) {
        msg['entreprise_name'] = error.error['entreprise_name'][0];
      }
      if (error.error['title'] != null) {
        msg['title'] = error.error['title'][0];
      }
      if (error.error['city'] != null) {
        msg['city'] = error.error['city'][0];
      }
      if (error.error['skills'] != null) {
        msg['skills'] = error.error['skills'][0];
      }
      if (error.error['description'] != null) {
        msg['description'] = error.error['description'][0];
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

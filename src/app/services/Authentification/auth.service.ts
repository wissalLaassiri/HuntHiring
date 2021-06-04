import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from './../token-storage.service';
import { User } from '../../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'http://localhost:8000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as 'body',
  };
  currentUser = {};
  res = '';

  constructor(
    private http: HttpClient,
    private token: TokenStorageService,
    public router: Router
  ) {}

  //Sign-In
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        this.endpoint + '/token/',
        {
          email,
          password,
        },
        this.httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        }),
        retry(1),
        catchError(this.handleError)
      );
  }

  // Sign-up
  addUser(user: User, url: string): Observable<User> {
    return this.http
      .post<HttpResponse<User>>(
        this.endpoint + url,
        JSON.stringify(user),
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

  getRole(): Observable<any> {
    let authToken = this.token.getUser();
    authToken = 'Bearer ' + authToken;
    return this.http.get(this.endpoint + '/me/', this.httpOptions).pipe(
      map((res) => {
        const detail = res['body'];
        this.token.type = JSON.stringify(detail['type']);
       console.log("det  ",detail);
       console.log("typee in auth  ",this.token.type);
       return detail;
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
    };
    if (error.status === 400) {
      // client-side error
      if (error.error['email'] != null) {
        msg['email'] = error.error['email'][0];
      }
      if (error.error['username'] != null) {
        msg['username'] = error.error['username'][0];
      }
      if (error.error['first_name'] != null) {
        msg['first_name'] = error.error['first_name'][0];
      }
      if (error.error['last_name'] != null) {
        msg['last_name'] = error.error['last_name'][0];
      }
      if (error.error['password'] != null) {
        msg['password'] = error.error['password'][0];
      }

      console.log(JSON.stringify(msg['email']));
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

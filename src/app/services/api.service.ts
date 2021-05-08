import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { catchError,map ,retry} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import {User} from './user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private endpoint = 'http://localhost:8000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe : "response" as "body"
  } 
  currentUser = {};
  res = '';

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  //Sign-In
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.endpoint + '/token/', {
      username,
      password
    }, this.httpOptions);
  }

  // Sign-up
  addUser(user:User,flag_comp:boolean,flag_stud:boolean): Observable<User> {
    user.is_entreprise = flag_comp;
    user.is_student = flag_stud;
    return this.http.post<HttpResponse<User>>(this.endpoint + '/student/create/', JSON.stringify(user), this.httpOptions)
    .pipe(
      map((response)=>{
        return response.body
      }),
      retry(1),
      catchError(this.handleError)
    )
  }  

  

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
 
// Error 
handleError(error: HttpErrorResponse) {
  let msg = {first_name:'',last_name:'', username: '', email: '', password: ''};
  if (error.status === 400) {
    // client-side error
   // msg = error.error.message;
   if(error.error['email'] != null ){
    msg['email'] = error.error['email'];
  }
  if(error.error['username'] != null ){
    msg ['username']= error.error['username'];
  }
  if(error.error['first_name'] != null ){
    msg ['first_name']= error.error['first_name'];
  }
  if(error.error['last_name'] != null ){
    msg ['last_name']= error.error['last_name'];
  }
  if(error.error['password'] != null ){
    msg ['password']= error.error['password'];
  }
  
  

    console.log(JSON.stringify(msg));
  } else {
    // server-side error
   // msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   msg =JSON.stringify("heyyy");
  console.log(msg)
  }
  return throwError(msg);
}

}

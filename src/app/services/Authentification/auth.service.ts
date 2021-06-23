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

  //================================Sign-In==========================
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

  //===========================Sign-up========================
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

  //====================== get user role =====================
  getRole(): Observable<any> {
    let authToken = this.token.getUser();
    authToken = 'Bearer ' + authToken;
    return this.http.get(this.endpoint + '/me/', this.httpOptions).pipe(
      map((res) => {
        const detail = res['body'];
        this.token.type = JSON.stringify(detail['type']);
        console.log('det  ', detail);
        console.log('typee in auth  ', this.token.type);
        return detail;
      }),
      catchError(this.handleError)
    );
  }

  // ========================= get Education ===========================
  getEducation(): Observable<any> {
    return this.http.get(this.endpoint + '/education/', this.httpOptions).pipe(
      map((res) => {
        const detail = res['body'];
        console.log('det  ', detail);
        return detail;
      }),
      catchError(this.handleError)
    );
  }
  // ========================= get Education By Id===========================
  getEducationById(id: any): Observable<any> {
    return this.http
      .get(this.endpoint + `/education/${id}/`, this.httpOptions)
      .pipe(
        map((res) => {
          const detail = res['body'];
          console.log('det  ', detail);
          return detail;
        }),
        catchError(this.handleError)
      );
  }
  // ========================= get Experience ===========================
  getExperience(): Observable<any> {
    return this.http.get(this.endpoint + '/experience/', this.httpOptions).pipe(
      map((res) => {
        const detail = res['body'];
        console.log('det  ', detail);
        return detail;
      }),
      catchError(this.handleError)
    );
  }
  // ========================= get Skills ===========================
  getSkills(id: number): Observable<any> {
    return this.http.get(this.endpoint + '/skill/' + id, this.httpOptions).pipe(
      map((res) => {
        const detail = res['body'];
        return detail;
      }),
      catchError(this.handleError)
    );
  }
  // ========================= get Projects ===========================
  getProjects(): Observable<any> {
    let authToken = this.token.getUser();
    authToken = 'Bearer ' + authToken;
    return this.http.get(this.endpoint + '/project/', this.httpOptions).pipe(
      map((res) => {
        const detail = res['body'];
        return detail;
      }),
      catchError(this.handleError)
    );
  }
   // ========================= get Project By Id===========================
   getProjectById(id: any): Observable<any> {
    return this.http
      .get(this.endpoint + `/project/${id}/`, this.httpOptions)
      .pipe(
        map((res) => {
          const detail = res['body'];
          return detail;
        }),
        catchError(this.handleError)
      );
  }
  // ========================= get Certifications ===========================
  getCertifications(): Observable<any> {
    return this.http
      .get(this.endpoint + '/certificate/', this.httpOptions)
      .pipe(
        map((res) => {
          const detail = res['body'];
          return detail;
        }),
        catchError(this.handleError)
      );
  }
  //==================== get Applications ========================
  getApplications(): Observable<any> {
    return this.http
      .get(this.endpoint + '/application/', this.httpOptions)
      .pipe(
        map((res) => {
          const detail = res['body'];
          return detail;
        }),
        catchError(this.handleError)
      );
  }
  // ========================= get application by id ===========================
  getApplicationsById(id: any): Observable<any> {
    let authToken = this.token.getUser();
    authToken = 'Bearer ' + authToken;
    return this.http
      .get(this.endpoint + `/application/${id}/`, this.httpOptions)
      .pipe(
        map((res) => {
          const detail = res['body'];
          // console.log('offeer BY ID  ', detail);
          return detail;
        }),
        catchError(this.handleError)
      );
  }
  //========================== Add projects =======================

  addProjects(project: any, url: string): Observable<any> {
    return this.http
      .post<HttpResponse<any>>(
        this.endpoint + url,
        JSON.stringify(project),
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
  //============================ Add Application ==================
  addApplication(application: any, url: string): Observable<any> {
    return this.http
      .post<HttpResponse<any>>(
        this.endpoint + url,
        JSON.stringify(application),
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
  //============================ Edit Application ==================
  editApplication(application: any): Observable<any> {
    return this.http
      .put<HttpResponse<any>>(
        this.endpoint + `/application/${application.id}/`,
        JSON.stringify(application),
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
  //============================ Edit Education ==================
  editEducation(id: any, education: any): Observable<any> {
    return this.http
      .put<HttpResponse<any>>(
        this.endpoint + `/education/${id}/`,
        JSON.stringify(education),
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
   //============================ Edit Projects ==================
   editProject(id: any, project: any): Observable<any> {
    return this.http
      .put<HttpResponse<any>>(
        this.endpoint + `/project/${id}/`,
        JSON.stringify(project),
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
  // ========================= delete application by id ===========================
  deleteApplication(id: any): Observable<any> {
    return this.http
      .delete(this.endpoint + `/application/${id}/`, this.httpOptions)
      .pipe(
        map((res) => {
          console.log('done delete');
          return;
        }),
        catchError(this.handleError)
      );
  }
  //============================ Handle form Errors ===============
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

import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler,HTTP_INTERCEPTORS,HttpEvent  } from "@angular/common/http";
import { AuthService } from "./auth.service";
import {TokenStorageService} from "../token-storage.service";
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';  


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let authReq = req;
      const token = this.token['token'];
      console.log("okey ",this.token['token']); 

      if (this.isHeaderNeeded('api/company')&& token != null) {
        authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      }
      return next.handle(authReq);
    }
    isHeaderNeeded(url: string) {
      if (url === "api/company/me") { 
          return false;
      } else {
          return true;
      }
    }
  }
  
  export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];


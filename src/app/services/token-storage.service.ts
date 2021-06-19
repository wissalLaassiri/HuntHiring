import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  token="";
  isLogedIn = false;
  type="";
  user:any;
 
  constructor() { }

  public saveToken(token_access: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token_access);
  }

  public getToken(): string | null {
    this.isLogedIn=true;
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser(): any {
    this.isLogedIn=true;
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
     this.token = JSON.parse(user);
     this.token=this.token['body']['access'];
     console.log("still ",this.token);
      return this.token;
    }
  }

  public saveUser(user: any): void {
    //window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  signOut(): void {
    this.isLogedIn=false;
    window.sessionStorage.clear();
  }

}

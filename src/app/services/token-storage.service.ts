import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  token="";
  isLogedIn = false;
 
  constructor() { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser(): any {
    this.isLogedIn=true;
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
     this.token = JSON.parse(user);
     this.token=this.token['body']['access'];
     console.log(this.token);
      return this.token;
    }
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  signOut(): void {
    this.isLogedIn=false;
    window.sessionStorage.clear();
  }

}

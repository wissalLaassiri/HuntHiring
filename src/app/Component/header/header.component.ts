import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  type: string = '';
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    ) {
      // if (!this.tokenStorage.getToken()) {
      //   console.log('not logged in');
      // } else {
      //   console.log('logged in');
      // }
     }

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = !!this.tokenStorage.getToken();
    // }
  }
  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-stud-header',
  templateUrl: './stud-header.component.html',
  styleUrls: ['./stud-header.component.scss']
})
export class StudHeaderComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  type: string = '';
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    ) {

     }

  ngOnInit(): void {

  }

  header_variable= false;
  @HostListener("document:scroll")
  scrollfunction(){
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop>0){
      this.header_variable=true;
    }
    else{
      this.header_variable = false;
    }
  }
  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }

}

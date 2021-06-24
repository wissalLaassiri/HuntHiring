import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  isLoggedIn = false;
  type = "";

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    // if(this.tokenStorageService.getToken()){
    //   this.isLoggedIn = !!this.tokenStorageService.getToken();
    //   this.onGetUser();
    // }
   }
   onGetUser() {
    this.authService.getRole().subscribe(
      (data) => {
        this.type = data.type;
        console.log('useerrr type in home ', this.type);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

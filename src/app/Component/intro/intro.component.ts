import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-intro',
  templateUrl:  './intro.component.html',
  styleUrls: ['./intro.component.scss']
})


export class IntroComponent implements OnInit {
  isLoggedIn = false;
  type='';

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.type = this.tokenStorageService.type;
  }
  notSignIn(): void{
    this.router.navigate(['/login']);
  }
  onSignIn(): void{
    if(this.type === '"COMPANY"'){
      console.log(" im comp");
      this.router.navigate(['company/home']);
    }else{
      console.log(" im studentttt", this.type);
      this.router.navigate(['/index']);

    }
  }
  
}

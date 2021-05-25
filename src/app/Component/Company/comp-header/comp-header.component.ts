import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/Authentification/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage.service';
@Component({
  selector: 'app-comp-header',
  templateUrl: './comp-header.component.html',
  styleUrls: ['./comp-header.component.scss']
})
export class CompHeaderComponent implements OnInit {

  
  private roles: string[] = [];
  isLoggedIn = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,    private authService: AuthService,

    ) { }

  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.tokenStorageService.type);
   
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/'])
  }


}

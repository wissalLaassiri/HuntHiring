import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-comp-home',
  templateUrl: './comp-home.component.html',
  styleUrls: ['./comp-home.component.scss'],
})
export class CompHomeComponent implements OnInit {
  public user;

  constructor(
    private token: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.token.getToken()) {
      console.log('not logged in');
    } else {
      console.log('logged in');
    }
  }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.onGetUser();
    } else {
      this.router.navigate(['']);
    }
  }

  onGetUser() {
    this.authService.getRole().subscribe(
      (data) => {
        this.user = data;
        console.log('useerrr home ', this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

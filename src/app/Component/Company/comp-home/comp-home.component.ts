import { OfferService } from 'src/app/services/Offer/offer.service';
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
  offer = [];
  type: any = [
    { id: 1, name: 'internship' },
    { id: 2, name: 'CDI' },
    { id: 3, name: 'CDD' },
    { id: 4, name: 'freelance' },
  ];
  constructor(
    private token: TokenStorageService,
    private authService: AuthService,
    public offerServicce: OfferService,
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
      this.onGetOffers();
    } else {
      this.router.navigate(['']);
    }
  }

  onGetOffers(){
    this.offerServicce.getOffers().subscribe(
      (data) => {
        console.log('first home ', data);
        this.offer= data;
        console.log('useerrr home ', this.offer);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onGetUser() {
    this.authService.getRole().subscribe(
      (data) => {
        this.user = data;
        console.log('useerrr home ', this.user);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/login']);
      }
    );
  }
}

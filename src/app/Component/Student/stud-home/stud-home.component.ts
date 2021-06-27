import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { OfferService } from 'src/app/services/Offer/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-stud-home',
  templateUrl: './stud-home.component.html',
  styleUrls: ['./stud-home.component.scss'],
})
export class StudHomeComponent implements OnInit {
  //====================== Variables=======================
  isLoggedIn: boolean;
  url: string;
  student_name: string;
  offers=[];
  type: any = [
    { id: 1, name: 'internship' },
    { id: 2, name: 'CDI' },
    { id: 3, name: 'CDD' },
    { id: 4, name: 'freelance' },
  ];
  form = new FormGroup({
    offer_type: new FormControl('', Validators.required),
  });

  @Input() key = {
    id:'',
    search:''
  }
  application={
    id:'',
    offer:'',
    date: new Date(),
    note:''
  }
  //====================================================
  constructor(
    public offerServicce: OfferService,
    private authService: AuthService,
    public router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = !!this.token.getToken();
      this.onGetUser();
    }
  }
//================ get authantified user =============
  onGetUser() {
    this.authService.getRole().subscribe(
      (data) => {
        console.log('authorized ', data.username);
        this.student_name = data.username;
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/login']);
      }
    );
  }
  //============ get offers =============================
  onGetOffers(){
    this.offerServicce.getOffersByKey(this.key.search).subscribe(
      (data) => {
        console.log('first home ', data);
        this.offers= data;
        console.log('useerrr home ', this.offers);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //=================== Application ====================
  onApply(id:any){
    this.url = '/application/';
    console.log("offers id",this.application.date);
    this.application.offer = id;

    this.authService.addApplication(this.application, this.url).subscribe(
      (response) => {
        console.log('doonee application', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // =============== choose type ======================
  changeOfferType(e) {
    const val = e.target.value;
    let vv = this.type.find((v) => v.name == val);
    console.log(val);
  }
}

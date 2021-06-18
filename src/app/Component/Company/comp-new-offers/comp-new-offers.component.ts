import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { OfferService } from 'src/app/services/Offer/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-comp-new-offers',
  templateUrl: './comp-new-offers.component.html',
  styleUrls: ['./comp-new-offers.component.scss'],
})
export class CompNewOffersComponent implements OnInit {
  // form: FormGroup;
  closeModal: string;
  isLoggedIn: boolean;
  url: string;
  form = new FormGroup({
    offer_type: new FormControl('', Validators.required),
  });
  @Input() skill = {
    id: '',
    name: '',
  };

  @Input() offer = {
    id: '',
    title: '',
    offer_type: 1,
    skills: [],
    entreprise_name: '',
    description: '',
    link: '',
    city: '',
  };
  type: any = ['internship', 'CDI', 'CDD', 'freelance'];

  constructor(
    private modalService: NgbModal,
    public offerServicce: OfferService,
    private http: HttpClient,
    private authService: AuthService,
    public router: Router,
    private token: TokenStorageService
  ) {
    if (!this.token.getToken()) {
      console.log('not logged in');
    } else {
      console.log('logged in');
    }
  }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = !!this.token.getToken();
      this.onGetUser();
    }
  }

  get f() {
    return this.form.controls;
  }

  triggerModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onAddSkills(data: any) {
    this.url = '/skill/';
    // this.userObj.is_student = true;
    this.offerServicce.addSkills(this.skill, this.url).subscribe(
      (response) => {
        console.log(response.name);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submit() {
    console.log(this.form.value);
  }
  changeOfferType(e) {
    console.log(e.target.value);
  }

  onGetUser() {
    this.authService.getRole().subscribe(
      (data) => {
        console.log('authorized');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

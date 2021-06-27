import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { OfferService } from 'src/app/services/Offer/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-comp-edit-offer',
  templateUrl: './comp-edit-offer.component.html',
  styleUrls: ['./comp-edit-offer.component.scss'],
})
export class CompEditOfferComponent implements OnInit {
  closeModal: string;
  isLoggedIn: boolean;
  url: string;
  company_name: string;
  currentOffer = {
    id: '',
    title: '',
    offer_type: 1,
    skills: [],
    entreprise_name: '',
    description: '',
    link: '',
    city: '',
  };
  form = new FormGroup({
    offer_type: new FormControl('', Validators.required),
    offer_form: new FormControl('', Validators.required),
  });
  constructor(
    private modalService: NgbModal,
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
  type: any = [
    { id: 1, name: 'internship' },
    { id: 2, name: 'CDI' },
    { id: 3, name: 'CDD' },
    { id: 4, name: 'freelance' },
  ];
  skills: any = [];
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

  onAddOffer() {
    this.url = '/offer/';
    this.offerServicce.addOffer(this.offer, this.url).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/company/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeOfferType(e) {
    const val = e.target.value;
    let vv = this.type.find((v) => v.name == val);
    this.offer.offer_type = vv.id;
    console.log(vv.id);
  }

  onGetUser() {
    this.authService.getRole().subscribe(
      (data) => {
        console.log('authorized ', data.username);
        this.company_name = data.username;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

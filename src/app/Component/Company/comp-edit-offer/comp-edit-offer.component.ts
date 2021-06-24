import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { OfferService } from 'src/app/services/Offer/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute } from '@angular/router';

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
  currentOffer: any;
  form = new FormGroup({
    offer_type: new FormControl('', Validators.required),
    offer_form: new FormControl('', Validators.required),
  });
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
  constructor(
    private modalService: NgbModal,
    public offerServicce: OfferService,
    private authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = !!this.token.getToken();
      this.onGetUser();
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      // console.log("iddd iss ",id);
      this.onGetOfferById(id);
    }
  }
  @Input() skill = {
    id: '',
    name: '',
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

  //================== get currentOffer ==========================
  getCurrentOffer() {
    this.offer.id = this.currentOffer.id;
    this.offer.offer_type = this.currentOffer.offer_type;
    this.offer.link = this.currentOffer.link;
    this.offer.title = this.currentOffer.title;
    this.offer.city = this.currentOffer.city;
    this.offer.entreprise_name = this.currentOffer.entreprise_name;
    this.offer.description = this.currentOffer.description;
    this.currentOffer.skills.forEach(s => {
      this.onGetSkillById(s.id);
    });
    console.log('iddd iss ', this.offer.offer_type);
  }
  //============ get new input values ===========
  onEdit() {
    console.log('iddd iss ', this.offer);
  }
  //================ Modal for skills ======================
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
  //======================= get CurrentOffer ==========================
  onGetOfferById(id: any) {
    this.offerServicce.getOffersById(id).subscribe(
      (data) => {
        this.currentOffer = data;
        if (this.currentOffer) {
          console.log('current offer ', this.currentOffer);
          this.getCurrentOffer();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //======================= get skills ==========================
  onGetSkillById(id: any) {
    this.offerServicce.getSkillById(id).subscribe(
      (data) => {
        // this.skill = data;
        this.skills.push(data);

          console.log('current skill ', this.skills);

      },
      (error) => {
        console.log(error);
      }
    );
  }
  //========================= Edit Offer ====================
  onEditOffer(id: any) {
    console.log('doonee edit', this.offer);

    this.offerServicce.editOffer(id, this.offer).subscribe(
      (response) => {
        console.log('doonee edit', response);
        this.refresh();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //================== add skills =================
  onAddSkills() {
    this.url = '/skill/';
    this.offerServicce.addSkills(this.skill, this.url).subscribe(
      (response) => {
        this.skills.push(response.name);
        this.offer.skills.push(response.id);
        console.log('doonee sills', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //================== select type of offer ==================================
  changeOfferType(e) {
    const val = e.target.value;
    let vv = this.type.find((v) => v.name == val);
    this.offer.offer_type = vv.id;
    console.log(vv.id);
  }
  //======================= get cutrrent user ====================
  onGetUser() {
    this.authService.getRole().subscribe(
      (data) => {
        console.log('authorized ', data.username);
        this.company_name = data.username;
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }
  //============ refresh page ==============
  refresh(): void {
    this.router.navigate(['/company/home']);
  }
}

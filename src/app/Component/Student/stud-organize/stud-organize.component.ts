import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { OfferService } from 'src/app/services/Offer/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-stud-organize',
  templateUrl: './stud-organize.component.html',
  styleUrls: ['./stud-organize.component.scss']
})
export class StudOrganizeComponent implements OnInit {
  offers = [];
  user: any;
  applications = [];
  offer:any;
  closeModal: string;
  constructor(    private token: TokenStorageService,
    private authService: AuthService,
    public offerServicce: OfferService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.onGetUser();
      this.onGetApplications();
    } else {
      this.router.navigate(['']);
    }
  }

  onGetApplications(){
    this.authService.getApplications().subscribe(
      (data) => {
        this.applications= data;
        this.applications.forEach(a=>{
          this.offer = this.onGetOffers(a.offer);
        })
        console.log('useerrr application ', this.applications);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //===============================get offer details ============
  onGetOffers(id:any){
    this.offerServicce.getOffersById(id).subscribe(
      (data) => {
        this.offer= data;
        this.offers.push(data);
        return data;
        console.log('useerrr offers ', this.offers);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //=========================== get authentified user =================
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

  showModal(content) {
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
}

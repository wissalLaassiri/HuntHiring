import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { AuthService } from '../../services/Authentification/auth.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  type: string = '';
  form: any = { email: '', password: '' };
  closeModal: string;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private modalService: NgbModal
  ) {
    if (!this.tokenStorage.getToken()) {
      console.log('not logged in');
    } else {
      console.log('logged in');
    }
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.type = this.tokenStorage.type;
      this.redirectUser();
    }
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

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.access);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        if (this.isLoggedIn) {
          this.authService.getRole().subscribe((res) => {
            this.type = JSON.stringify(res['type']);
            console.log('on submit login ', this.tokenStorage.type);
            this.redirectUser();
          });
        }
      },
      (err) => {
        this.errorMessage = err;
        console.log('erooor ', this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }
  redirectUser() {
    if (this.tokenStorage.type === '"STUDENT"') {
      console.log('============== log im stuud');
      this.router.navigate(['/student/profile']);
    } else {
      if (this.tokenStorage.type === '"COMPANY"') {
        console.log('======= loog Compaaaa');
        this.router.navigate(['/company/home']);
      }
    }
  }
}

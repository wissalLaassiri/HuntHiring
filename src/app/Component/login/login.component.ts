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
  type: string = "";
  form: any = { email: '', password: '' };
  is_company = false;
  closeModal: string;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private modalService : NgbModal
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.is_company = this.tokenStorage.getUser().is_entreprise;
        if (this.isLoggedIn) {
          this.authService.getRole('/company/me/').subscribe((res) => {
             this.type= JSON.stringify(res);
              console.log("types 2 "+ this.type);
              this.router.navigate(['/company/home']);
           
         },
         (err)=>{
           if(err==="Not found."){
             console.log(err);
             this.authService.getRole('/student/me/').subscribe((res) => {
              this.type= JSON.stringify(res['body']['type']);
               console.log("types 2 "+ this.type);
               this.router.navigate(['/index']);
             
            });
            }
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

  reloadPage(): void {
    window.location.reload();
  }
}
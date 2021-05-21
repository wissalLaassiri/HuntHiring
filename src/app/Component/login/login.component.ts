import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../../../_helpers/must-match.validator';
import { TokenStorageService } from '../../services/token-storage.service';
import { AuthService } from '../../services/Authentification/auth.service';
import { Router } from '@angular/router';

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
  submitted = false;
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
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
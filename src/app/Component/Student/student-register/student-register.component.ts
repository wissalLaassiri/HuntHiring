import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/Authentification/auth.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss'],
})
export class StudentRegisterComponent implements OnInit {
  form: FormGroup;
  url = '';
  //submitted = false;
  formError = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  };

  @Input() userObj = {
    id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    is_student: false,
    is_entreprise: false,
  };
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  addUser(data: any) {
    this.url = '/student/create/';
    // this.userObj.is_student = true;
    this.authService.addUser(this.userObj, this.url).subscribe(
      (response) => {
        console.log(response.email);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.formError = error;
      }
    );
  }
}

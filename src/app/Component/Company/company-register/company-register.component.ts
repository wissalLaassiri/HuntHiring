import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/Authentification/auth.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {
  form: FormGroup;
  url = '';
  formError = {first_name:'',last_name:'', username: '', email: '', password: '',website_link: '',linkedin_link:'',city:'',domain:''};
 // submitted = false;


  @Input() userObj = { id:'',first_name:'',last_name:'', username: '', email: '', password: '',website_link: '',linkedin_link:'',city:'',domain:''}
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService, 
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:'',
      username : ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(){
    return this.form.controls;
  }

  addUser(data: any) {
    this.url = '/company/create/'
    this.authService.addUser(this.userObj,this.url).subscribe((response) => {
     console.log(response.email)
      this.router.navigate(['/login'])
    },
    (error) => {
      this.formError = error;
    })
  }
} 
 


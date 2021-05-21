import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authentification/auth.service';

@Component({
  selector: 'app-comp-new-offers',
  templateUrl: './comp-new-offers.component.html',
  styleUrls: ['./comp-new-offers.component.scss']
})
export class CompNewOffersComponent implements OnInit {
  form: FormGroup;
  url = '';
  formError = {first_name:'',last_name:'', username: '', email: '', password: '',website_link: '',linkedin_link:'',city:'',domain:''};
  @Input() userObj = { id:'',first_name:'',last_name:'', username: '', email: '', password: '',website_link: '',linkedin_link:'',city:'',domain:''}

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService, 
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
  }

  get f(){
    return this.form.controls;
  }

  addUser(data: any) {
    
  }
}

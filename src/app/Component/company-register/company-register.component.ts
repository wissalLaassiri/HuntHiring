import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {
  form: FormGroup;
  formError = {first_name:'',last_name:'', username: '', email: '', password: ''};
 // submitted = false;


  @Input() userObj = { id:'',first_name:'',last_name:'', username: '', email: '', password: '',is_student:false,is_entreprise:true }
  constructor(
    private formBuilder: FormBuilder,
    public authService: ApiService, 
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
    
    this.authService.addUser(this.userObj,true,false).subscribe((response) => {
     console.log(response.email)
      this.router.navigate(['/login'])
    },
    (error) => {
      if(error!="") this.formError = error;
    })
  }
  /* submit(): void {
    this.submitted = true;
    if(this.form.invalid){
      console.log('erroor');
      return;
    }
    else {
    this.http.post('http://localhost:8000/api/student/create/', this.form.getRawValue())
      .subscribe(
        (response)=>{
          if(response['email'] == "user with this email already exists."){
            console.log(response['email']);
          }
          console.log(response);
          this.router.navigate(['/login']);
        }
      );
  }
} */
} 
 


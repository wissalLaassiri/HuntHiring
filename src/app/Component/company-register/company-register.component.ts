import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {
  registerForm = new FormGroup({ firstName: new FormControl(''),lastName: new FormControl(''),email: new FormControl(''),website: new FormControl(''),linkedin: new FormControl(''),city: new FormControl(''),password: new FormControl(''),confirmPassword: new FormControl('')});
  submitted = false;
  constructor(private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm =this.FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      linkedin: ['', Validators.required],
      website: ['', Validators.required],
      city: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  
  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MustMatch } from '../../../_helpers/must-match.validator';

@Component({
  selector: 'app-company-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  
  loginForm = new FormGroup({ email: new FormControl(''),password: new FormControl('')});
  submitted = false;
  constructor(private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm =new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  
  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
  }
  

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
<<<<<<< HEAD
import { MustMatch } from '../../../_helpers/must-match.validator';

@Component({
  selector: 'app-student-register',
  templateUrl: 'student-register.component.html',
  styleUrls: ['student-register.component.scss']
=======
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
>>>>>>> origin/fati
})
export class StudentRegisterComponent implements OnInit {
  registerForm = new FormGroup({ firstName: new FormControl(''),lastName: new FormControl(''),email: new FormControl(''),password: new FormControl(''),confirmPassword: new FormControl('')});
  submitted = false;
  constructor(private FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm =this.FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
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
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

  constructor() { }

  ngOnInit(): void {
  }

}

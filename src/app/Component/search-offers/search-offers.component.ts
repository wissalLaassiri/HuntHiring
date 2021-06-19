import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subject, throwError } from "rxjs";
import { map,debounceTime, distinctUntilChanged, switchMap, catchError } from "rxjs/operators";

import { SearchOffersService } from "./search-offers.service";
@Component({
  selector: 'app-search-offers',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.scss']
})

export class SearchOffersComponent implements OnInit {
  
  constructor() { }



  ngOnInit(): void {

  }



  header_variable= false;
  @HostListener("document:scroll")
  scrollfunction(){
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop>0){
      this.header_variable=true;
    }
    else{
      this.header_variable = false;
    }
  }
  




}

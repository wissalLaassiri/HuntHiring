import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subject, throwError } from "rxjs";
import { map,debounceTime, distinctUntilChanged, switchMap, catchError } from "rxjs/operators";
import { ICities } from './cities.interface';
import { IField } from './fields.interface';
import { SearchOffersService } from "./search-offers.service";
import { IType } from './types.interface';
@Component({
  selector: 'app-search-offers',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.scss']
})

export class SearchOffersComponent implements OnInit {
  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
	@Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();

  searchText: string = '';
  public types: Array<IType> = [{id:1,name:'Internship'},{id:2,name:'CDD'},{id:3,name:'CDI'},{id:4,name:'Freelance'}];
  public typeId: number = 1;
  public fields: Array<IField> = [{id:1,name:'informatique'},{id:2,name:'electricité'},{id:3,name:'Mecanique'}] ;
  public fieldId: number =1;

  public cities: Array<ICities> = [{id:1,name:'Casablanca'},{id:2,name:'Rabat'},{id:3,name:'Tanger'}] ;
  public cityId: number =1;

  constructor(private searchOffersService: SearchOffersService, private fb: FormBuilder) { }

  public loading: boolean;
  public searchTerm= new Subject<string>();
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;

  public searchForm = new FormGroup({
    inputs: new FormControl(""),
    types: new FormControl("", Validators.required),
    fields: new FormControl(""),
    cities: new FormControl(""),
  });
  submitted = false;

 
/************************ ************************ */
  public search1(){
    this.searchTerm.pipe(
      map((e: any) => {
        console.log(e.target.value);
        return e.target.value;
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term =>{
        this.loading = true;
        return this.searchOffersService._searchEntries(term);
      }),
      catchError((e) =>{
        console.log(e);
        this.loading = false;
        this.errorMessage = e.message;
        return throwError(e);
      }),
    ).subscribe(v => {
      this.loading = false;
      this.searchResults = v;
      this.paginationElements = this.searchResults;
    })
  }
  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }

  ngOnInit(): void {
    this.search1();

  }

  onSubmit(){
    this.submitted = true;
    if(this.searchForm){
      return;
    }
    
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

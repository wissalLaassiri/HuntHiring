import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { empty, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class SearchOffersService{
    constructor(private httpClient: HttpClient){}

    public baseUrl = ""; //api link
    public searchResults: any;

    //http call api
    public searchEntries(term): Observable<any>{
        if(term === ""){
            console.log("not defined");
            return of(null);
        }else{
            let params = {q: term}
            return this.httpClient.get(this.baseUrl, {params}).pipe(
                map(Response =>{
                    console.log(Response);
                    return this.searchResults = Response["items"];
                })
            );
        }
    }

    

    public _searchEntries(term){
        return this.searchEntries(term);
    }
}


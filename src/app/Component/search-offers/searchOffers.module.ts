import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { SearchOffersComponent } from "./search-offers.component";
import { FormsModule } from "@angular/forms";
@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        NgxPaginationModule,
        FormsModule,
        
    
    ],
    
    declarations: [SearchOffersComponent]
})

export class SearchOffersModule{}

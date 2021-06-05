import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SearchOffersComponent } from "./search-offers.component";



const routes: Routes = [
    {path: "Search", component: SearchOffersComponent}
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule{}
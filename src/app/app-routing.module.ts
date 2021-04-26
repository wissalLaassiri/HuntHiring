import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IntroComponent} from './Component/intro/intro.component';
import {HomeComponent} from './Component/home/home.component'
const routes: Routes = [
{
  path:'',
  component:IntroComponent
},
{
  path:'index',
  component:HomeComponent
}
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

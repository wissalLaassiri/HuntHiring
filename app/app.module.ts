import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyRegisterComponent } from './Component/company-register/company-register.component';
import { IntroComponent } from './Component/intro/intro.component';
import { StudentRegisterComponent } from './Component/student-register/student-register.component';
@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    CompanyRegisterComponent,
    StudentRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './Component/intro/intro.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { CompanyRegisterComponent} from './Component/Company/company-register/company-register.component';
import { StudentRegisterComponent} from './Component/Student/student-register/student-register.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';

import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { CompHomeComponent } from './Component/Company/comp-home/comp-home.component';
import { CompHeaderComponent } from './Component/Company/comp-header/comp-header.component';
import { authInterceptorProviders } from './services/Authentification/auth.interceptor';
import { CompNewOffersComponent } from './Component/Company/comp-new-offers/comp-new-offers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Component/header/header.component';

import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { CompEditOfferComponent } from './Component/Company/comp-edit-offer/comp-edit-offer.component';
import { StudHeaderComponent } from './Component/Student/stud-header/stud-header.component';
import { StudProfileComponent } from './Component/Student/stud-profile/stud-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    LoginComponent,
    CompanyRegisterComponent,
    StudentRegisterComponent,
    CompHomeComponent,
    CompHeaderComponent,
    CompNewOffersComponent,
    HeaderComponent,
    CompEditOfferComponent,
    StudHeaderComponent,
    StudProfileComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

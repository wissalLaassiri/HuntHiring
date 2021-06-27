import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';


=======
>>>>>>> 2a6d684e2160c41a96bed217efe8905723506591
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './Component/intro/intro.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
<<<<<<< HEAD
import { CompanyRegisterComponent } from './Component/company-register/company-register.component';
import { StudentRegisterComponent } from './Component/student-register/student-register.component';
import { SearchOffersComponent } from './Component/search-offers/search-offers.component';
import { FilterPipe } from './filter.pipe';
import { UpdateStudentProfilComponent } from './Component/update-student-profil/update-student-profil.component';


=======
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
>>>>>>> 2a6d684e2160c41a96bed217efe8905723506591

import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { CompEditOfferComponent } from './Component/Company/comp-edit-offer/comp-edit-offer.component';
import { StudHeaderComponent } from './Component/Student/stud-header/stud-header.component';
import { StudProfileComponent } from './Component/Student/stud-profile/stud-profile.component';
import { StudHomeComponent } from './Component/Student/stud-home/stud-home.component';
import { StudOrganizeComponent } from './Component/Student/stud-organize/stud-organize.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    LoginComponent,
    CompanyRegisterComponent,
    StudentRegisterComponent,
<<<<<<< HEAD
    FilterPipe,
    UpdateStudentProfilComponent,
=======
    CompHomeComponent,
    CompHeaderComponent,
    CompNewOffersComponent,
<<<<<<< HEAD
    HeaderComponent
>>>>>>> 2a6d684e2160c41a96bed217efe8905723506591
=======
    HeaderComponent,
    CompEditOfferComponent,
    StudHeaderComponent,
    StudProfileComponent,
    StudHomeComponent,
    StudOrganizeComponent
>>>>>>> d8ce5e6bc1816c4c2695586e3943be377de9565a
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    HttpClientModule,
    NgxPaginationModule,
    
    
=======
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders
>>>>>>> 2a6d684e2160c41a96bed217efe8905723506591
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

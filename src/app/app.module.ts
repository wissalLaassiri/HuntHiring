import { NgModule } from '@angular/core';
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
    HeaderComponent
>>>>>>> 2a6d684e2160c41a96bed217efe8905723506591
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
    NgbModule
  ],
  providers: [authInterceptorProviders
>>>>>>> 2a6d684e2160c41a96bed217efe8905723506591
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

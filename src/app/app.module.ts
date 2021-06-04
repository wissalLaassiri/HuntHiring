import { NgModule } from '@angular/core';
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
    HeaderComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './Component/intro/intro.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { CompanyRegisterComponent} from './Component/company-register/company-register.component';
import { StudentRegisterComponent} from './Component/student-register/student-register.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';

import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './services/api.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    HomeComponent,
    LoginComponent,
    CompanyRegisterComponent,
    StudentRegisterComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

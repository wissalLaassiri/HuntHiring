import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { IntroComponent } from './Component/intro/intro.component';
import { HomeComponent } from './Component/home/home.component';
import { StudentRegisterComponent } from './Component/student-register/student-register.component';
import { CompanyRegisterComponent } from './Component/company-register/company-register.component';
import { SearchOffersComponent } from './Component/search-offers/search-offers.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  {path:'StudentRegister',component: StudentRegisterComponent},
  {path:'CompanyRegister',component: CompanyRegisterComponent},
  {
    path: 'index',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'SearchOffers',
    loadChildren: () => import("./Component/search-offers/searchOffers.module").then(m => m.SearchOffersModule),
    component: SearchOffersComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

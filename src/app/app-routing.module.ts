import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { IntroComponent } from './Component/intro/intro.component';
import { HomeComponent } from './Component/home/home.component';
<<<<<<< HEAD
import { StudentRegisterComponent } from './Component/student-register/student-register.component';
import { CompanyRegisterComponent } from './Component/company-register/company-register.component';
import { SearchOffersComponent } from './Component/search-offers/search-offers.component';
import { ProfilStudentComponent } from './Component/profil-student/profil-student.component';
import { UpdateStudentProfilComponent } from './Component/update-student-profil/update-student-profil.component';

=======
import {StudentRegisterComponent} from './Component/Student/student-register/student-register.component';
import { CompanyRegisterComponent } from './Component/Company/company-register/company-register.component';
import {CompHomeComponent} from './Component/Company/comp-home/comp-home.component';
import { CompNewOffersComponent } from './Component/Company/comp-new-offers/comp-new-offers.component';
>>>>>>> 2a6d684e2160c41a96bed217efe8905723506591
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
<<<<<<< HEAD
    path: 'SearchOffers',
    loadChildren: () => import("./Component/search-offers/searchOffers.module").then(m => m.SearchOffersModule),
    component: SearchOffersComponent
  },
  {
    path: 'Profil',
    component: ProfilStudentComponent
  },
  {
    path: 'update',
    component: UpdateStudentProfilComponent
    
=======
    path: 'student',
    component: StudentRegisterComponent
  },
  {
    path: 'company',
    component:CompanyRegisterComponent
  },
  {
    path: 'company/home',
    component:CompHomeComponent
  },
  {
    path: 'company/addOffer',
    component:CompNewOffersComponent
>>>>>>> 2a6d684e2160c41a96bed217efe8905723506591
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

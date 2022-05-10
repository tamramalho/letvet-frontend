import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MedvetCreateComponent } from './components/medvet/medvet-create/medvet-create.component';
import { MedvetListComponent } from './components/medvet/medvet-list/medvet-list.component';
import { MedvetUpdateComponent } from './components/medvet/medvet-update/medvet-update.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'medvet', component: MedvetListComponent },
      { path: 'medvet/create', component: MedvetCreateComponent },
      { path: 'medvet/update/:id', component: MedvetUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

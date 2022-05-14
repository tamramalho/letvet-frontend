import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ConsultaCreateComponent } from './components/consulta/consulta-create/consulta-create.component';
import { ConsultaListComponent } from './components/consulta/consulta-list/consulta-list.component';
import { ConsultaUpdateComponent } from './components/consulta/consulta-update/consulta-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MedvetCreateComponent } from './components/medvet/medvet-create/medvet-create.component';
import { MedvetDeleteComponent } from './components/medvet/medvet-delete/medvet-delete.component';
import { MedvetListComponent } from './components/medvet/medvet-list/medvet-list.component';
import { MedvetUpdateComponent } from './components/medvet/medvet-update/medvet-update.component';
import { NavComponent } from './components/nav/nav.component';
import { PacientepetCreateComponent } from './components/pacientepet/pacientepet-create/pacientepet-create.component';
import { PacientepetDeleteComponent } from './components/pacientepet/pacientepet-delete/pacientepet-delete.component';
import { PacientepetListComponent } from './components/pacientepet/pacientepet-list/pacientepet-list.component';
import { PacientepetUpdateComponent } from './components/pacientepet/pacientepet-update/pacientepet-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'medvet', component: MedvetListComponent },
      { path: 'medvet/create', component: MedvetCreateComponent },
      { path: 'medvet/update/:id', component: MedvetUpdateComponent },
      { path: 'medvet/delete/:id', component: MedvetDeleteComponent },

      { path: 'pacientepet', component: PacientepetListComponent },
      { path: 'pacientepet/create', component: PacientepetCreateComponent },
      { path: 'pacientepet/update/:id', component: PacientepetUpdateComponent },
      { path: 'pacientepet/delete/:id', component: PacientepetDeleteComponent },

      { path: 'consulta', component: ConsultaListComponent },
      { path: 'consulta/create', component: ConsultaCreateComponent },
      { path: 'consulta/update/:id', component: ConsultaUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

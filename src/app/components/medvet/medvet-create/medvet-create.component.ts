import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { medvet } from 'src/app/models/medvet';
import { MedvetService } from 'src/app/services/medvet.service';

@Component({
  selector: 'app-medvet-create',
  templateUrl: './medvet-create.component.html',
  styleUrls: ['./medvet-create.component.css']
})
export class MedvetCreateComponent implements OnInit {

  medvet: medvet = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataConsulta: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(private service: MedvetService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.medvet).subscribe(() => {
      this.toast.success('Médico cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['medvet']);
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfil(perfil: any): void{
    if(this.medvet.perfis.includes(perfil)){
      this.medvet.perfis.splice(this.medvet.perfis.indexOf(perfil), 1);
    } else {
      this.medvet.perfis.push(perfil);
    }
  }
  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}

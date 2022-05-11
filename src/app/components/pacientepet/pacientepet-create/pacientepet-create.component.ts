import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pacientepet } from 'src/app/models/pacientepet';
import { PacientepetService } from 'src/app/services/pacientepet.service';

@Component({
  selector: 'app-pacientepet-create',
  templateUrl: './pacientepet-create.component.html',
  styleUrls: ['./pacientepet-create.component.css']
})
export class PacientepetCreateComponent implements OnInit {

  pacientepet: pacientepet = {
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

  constructor(private service: PacientepetService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.pacientepet).subscribe(() => {
      this.toast.success('Paciente cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['pacientepet']);
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
    if(this.pacientepet.perfis.includes(perfil)){
      this.pacientepet.perfis.splice(this.pacientepet.perfis.indexOf(perfil), 1);
    } else {
      this.pacientepet.perfis.push(perfil);
    }
  }
  
  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}

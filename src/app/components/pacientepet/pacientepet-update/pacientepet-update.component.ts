import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pacientepet } from 'src/app/models/pacientepet';
import { PacientepetService } from 'src/app/services/pacientepet.service';

@Component({
  selector: 'app-pacientepet-update',
  templateUrl: './pacientepet-update.component.html',
  styleUrls: ['./pacientepet-update.component.css']
})
export class PacientepetUpdateComponent implements OnInit {

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

  constructor(private service: PacientepetService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pacientepet.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.pacientepet.id).subscribe(resposta => {
      resposta.perfis = [];
      this.pacientepet = resposta;
    });
  }

  update(): void{
    this.service.update(this.pacientepet).subscribe(() => {
      this.toast.success('Paciente atualizado com sucesso!', 'Atualização');
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

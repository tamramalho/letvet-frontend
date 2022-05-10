import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { medvet } from 'src/app/models/medvet';
import { MedvetService } from 'src/app/services/medvet.service';

@Component({
  selector: 'app-medvet-update',
  templateUrl: './medvet-update.component.html',
  styleUrls: ['./medvet-update.component.css']
})
export class MedvetUpdateComponent implements OnInit {

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

  constructor(private service: MedvetService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.medvet.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.service.findById(this.medvet.id).subscribe(resposta => {
      resposta.perfis = [];
      this.medvet = resposta;
    });
  }

  update(): void{
    this.service.update(this.medvet).subscribe(() => {
      this.toast.success('Médico atualizado com sucesso!', 'Atualização');
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

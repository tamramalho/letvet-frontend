import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { medvet } from 'src/app/models/medvet';
import { MedvetService } from 'src/app/services/medvet.service';

@Component({
  selector: 'app-medvet-delete',
  templateUrl: './medvet-delete.component.html',
  styleUrls: ['./medvet-delete.component.css']
})
export class MedvetDeleteComponent implements OnInit {

  medvet: medvet = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataConsulta: ''
  }

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

  delete(): void{
    this.service.delete(this.medvet.id).subscribe(() => {
      this.toast.success('Médico excluído com sucesso!', 'Exclusão');
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
}


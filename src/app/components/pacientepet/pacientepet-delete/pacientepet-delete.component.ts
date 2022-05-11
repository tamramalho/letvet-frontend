import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pacientepet } from 'src/app/models/pacientepet';
import { PacientepetService } from 'src/app/services/pacientepet.service';

@Component({
  selector: 'app-pacientepet-delete',
  templateUrl: './pacientepet-delete.component.html',
  styleUrls: ['./pacientepet-delete.component.css']
})
export class PacientepetDeleteComponent implements OnInit {

  pacientepet: pacientepet = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataConsulta: ''
  }

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

  delete(): void{
    this.service.delete(this.pacientepet.id).subscribe(() => {
      this.toast.success('Paciente excluído com sucesso!', 'Exclusão');
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
}


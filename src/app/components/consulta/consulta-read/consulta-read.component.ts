import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-consulta-read',
  templateUrl: './consulta-read.component.html',
  styleUrls: ['./consulta-read.component.css']
})
export class ConsultaReadComponent implements OnInit {

  consulta: consulta = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    medvet: '',
    pacientepet: '',
    nomePacientepet: '',
    nomeMedvet: '',
  }

  constructor(private consultaService: ConsultaService, private toastService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.consulta.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void{
    this.consultaService.findById(this.consulta.id).subscribe(resposta => {
      this.consulta = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  retornaStatus(status: any): string {
    if(status == '0'){
      return 'MARCADA';
    } else if(status == '1'){
      return 'EM ANDAMENTO';
    } else {
      return 'FINALIZADA';
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0'){
      return 'POUCO URGENTE';
    } else if(prioridade == '1'){
      return 'URGENTE';
    } else {
      return 'MUITO URGENTE';
    }
  }
}
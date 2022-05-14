import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { consulta } from 'src/app/models/consulta';
import { medvet } from 'src/app/models/medvet';
import { pacientepet } from 'src/app/models/pacientepet';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedvetService } from 'src/app/services/medvet.service';
import { PacientepetService } from 'src/app/services/pacientepet.service';

@Component({
  selector: 'app-consulta-update',
  templateUrl: './consulta-update.component.html',
  styleUrls: ['./consulta-update.component.css']
})
export class ConsultaUpdateComponent implements OnInit {

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
  pacientepets: pacientepet[] = [];
  medvets: medvet[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  medvet: FormControl = new FormControl(null, [Validators.required]);
  pacientepet: FormControl = new FormControl(null, [Validators.required]);

  constructor(private consultaService: ConsultaService, private pacientepetService: PacientepetService, private medvetService: MedvetService, private toastService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.findAllPacientepets();
    this.findAllMedvets();
  }

  create(): void {
    this.consultaService.create(this.consulta).subscribe(reposta => {
      this.toastService.success('Consulta agendada com sucesso', 'Nova consulta');
      this.router.navigate(['consulta']);
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }

  findAllPacientepets(): void{
    this.pacientepetService.findAll().subscribe(resposta => {
      this.pacientepets = resposta;
    })
  }

  findAllMedvets(): void{
    this.medvetService.findAll().subscribe(resposta => {
      this.medvets = resposta;
    })
  }

  validaCampos(): boolean{
    return this.prioridade.valid && this.status.valid && this.titulo.valid && this.observacoes.valid && this.medvet.valid && this.pacientepet.valid;
  }

}
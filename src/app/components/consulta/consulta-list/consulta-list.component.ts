import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { consulta } from 'src/app/models/consulta';

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.css']
})
export class ConsultaListComponent implements OnInit {

  ELEMENT_DATA: consulta[] = [
    {
      id: 1,
      dataConsulta: '21/06/2022',
      dataAtendimento: '21/06/2022',
      prioridade: 'ALTA',
      status: 'ANDAMENTO',
      titulo: 'Consulta 1',
      descricao: 'Teste consulta 1',
      medvet: 1,
      pacientepet: 5,
      nomePacientepet: 'Ravena',
      nomeMedvet: 'Letícia Ramalho'
    }
  ];

  displayedColumns: string[] = ['id', 'titulo', 'pacientepet', 'medvet', 'dataConsulta', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<consulta>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

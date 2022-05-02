import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { medvet } from 'src/app/models/medvet';

@Component({
  selector: 'app-medvet-list',
  templateUrl: './medvet-list.component.html',
  styleUrls: ['./medvet-list.component.css']
})
export class MedvetListComponent implements OnInit {
  
  ELEMENT_DATA: medvet[] = [
    {
      id: 1,
      nome: 'Letícia Ramalho',
      cpf: '123.456.789-00',
      email: 'leticia@email.com',
      senha: '1234',
      perfis: ['0'],
      dataConsulta: '15/08/2022'
    }
  ];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<medvet>(this.ELEMENT_DATA);

  constructor() { }
  
  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
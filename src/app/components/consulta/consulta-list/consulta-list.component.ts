import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.css']
})
export class ConsultaListComponent implements OnInit {

  ELEMENT_DATA: consulta[] = [];
  FILTERED_DATA: consulta[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'pacientepet', 'medvet', 'dataConsulta', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<consulta>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ConsultaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<consulta>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  orderByStatus(status: any): void {
    let list: consulta[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status)
        list.push(element);
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<consulta>(list);
      this.dataSource.paginator = this.paginator;
  }
}

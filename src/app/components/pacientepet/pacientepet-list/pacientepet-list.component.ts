import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { pacientepet } from 'src/app/models/pacientepet';
import { PacientepetService } from 'src/app/services/pacientepet.service';

@Component({
  selector: 'app-pacientepet-list',
  templateUrl: './pacientepet-list.component.html',
  styleUrls: ['./pacientepet-list.component.css']
})
export class PacientepetListComponent implements OnInit {

  ELEMENT_DATA: pacientepet[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<pacientepet>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: PacientepetService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<pacientepet>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
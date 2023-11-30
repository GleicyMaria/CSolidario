import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/service/category.service';
import { OngService } from 'src/service/ong.service';
import { Ong } from 'src/model/ong.model';
import { AlertService } from 'src/service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-ong',
  templateUrl: './cadastro-ong.page.html',
  styleUrls: ['./cadastro-ong.page.scss'],
})
export class CadastroOngPage implements OnInit {
  novaOng: Ong = {
    nome: '',
    missao: '',
    dataCriacao: new Date(),
    email: '',
    telefone: '',
    categoriaId: '',
  };

  categorias: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private ongService: OngService,
    private alertService:AlertService,
    private router:Router
  ) {}

  ngOnInit() {
    this.categoryService.getCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  adicionarOng() {
    this.ongService
      .adicionarOng(this.novaOng)
      .then((ref) => {
        this.alertService.showAlert('', 'ONG adicionada com sucesso:');
        this.router.navigate(["/home"])
      })
      .catch((error: any) => {
        console.error('Erro ao adicionar ONG:', error);
      });
  }
}

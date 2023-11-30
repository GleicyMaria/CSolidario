import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/service/category.service';
import { OngService } from 'src/service/ong.service';
import { UserService } from 'src/service/user.service';


@Component({
  selector: 'app-list-ongs',
  templateUrl: './list-ongs.page.html',
  styleUrls: ['./list-ongs.page.scss'],
})
export class ListOngsPage implements OnInit {
  ongs: any[] = [];
  categorias: any[] = [];
  ongsNaoAssociadas: any[] = [];
  constructor(
    private ongService: OngService,
    private userService: UserService,
    private categoryService :CategoryService
  ) {}

  usuarioId = ' ';
  ngOnInit() {
    this.usuarioId = this.userService.getUserId() || '';

    this.ongService.getOngs().subscribe((ongs) => {
      this.ongs = ongs;
      console.log(this.ongs);
      // Obtenha a lista de categorias
      this.categoryService.getCategorias().subscribe((categorias) => {
        this.categorias = categorias;
        console.log(this.categorias);

        this.ongs.forEach((ong) => {
          const nomeCategoria = this.categorias.find(
            (categoria) => categoria.id === ong.categoriaId
          );
          console.log(nomeCategoria);
          ong.nomeCategoria = nomeCategoria.Nome;
        });

        this.ongsNaoAssociadas = this.ongs.filter(
          (ong) =>
            !Array.isArray(ong.participantes) ||
            !ong.participantes.includes(this.usuarioId)
        );
        console.log(this.ongsNaoAssociadas);
      });
    });
  }
  participar(ongId: string) {
    console.log('idOng' + ongId);
    this.ongService.participarOng(this.usuarioId, ongId);
    this.ongsNaoAssociadas = this.ongsNaoAssociadas.filter(
      (ong) => ong.id !== ongId
    );
  }
}

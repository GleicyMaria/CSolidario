import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OngService } from 'src/service/ong.service';
import { UserService } from 'src/service/user.service';
import { MenuController } from '@ionic/angular';
import { CategoryService } from 'src/service/category.service';
@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.page.html',
  styleUrls: ['./main-user.page.scss'],
})
export class MainUserPage implements OnInit {
  ongsQueParticipo: any[] = [];
  usuarioId = '';

  cardItems = [
    {
      title: 'Aviso 1',
      subtitle: 'Importante',
      content: 'Este é um aviso importante.'
    },
    {
      title: 'Aviso 2',
      subtitle: 'Informativo',
      content: 'Este é um aviso informativo.'
    },
    {
      title: 'Aviso 3',
      subtitle: 'Aviso Geral',
      content: 'Este é um aviso geral para todos os usuários.'
    },
  ];
  constructor(
    private router: Router,
    private userService: UserService,
    private ongService: OngService,
    private menu: MenuController,
    private categoryService :CategoryService
  ) {}

  ngOnInit() {
    this.usuarioId = this.userService.getUserId() || '';
    console.log(this.usuarioId);
    this.ongService.getOngsAssociadas(this.usuarioId).subscribe(
    (ongs) => {
      this.ongsQueParticipo = ongs;
      this.categoryService.getCategorias().subscribe((categorias) => {
        ongs.forEach((ong) => {
          const nomeCategoria = categorias.find(
            (categoria) => categoria.id === ong.categoriaId
          );
          if (nomeCategoria) {
            ong.nomeCategoria = nomeCategoria.Nome;
          }
        });
      });
    },
    (error) => {
      console.error('Erro ao obter ongs associadas:', error);
    }
  );
  }

  openMenu() {
    this.menu.open('start')
  }

  irParaPerfilOng(ongId : String){
    console.log('idOng' + ongId);
    this.router.navigate(['/ong-profile', { ongId:ongId }]);
  }

  irParaListaOngs() {
    this.router.navigate(['/list-ongs']);
  }
}

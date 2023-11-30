import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user.model';
import { AlertService } from 'src/service/alert.service';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})
export class CadastroUserPage implements OnInit {
  usuario: User = {
    Nome: '',
    Email: '',
    Senha: '',
    Papel: '',
  };

  papeis: any[] = [];
  constructor(
    private router:Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.userService.getTypeUser().subscribe((papeis) => {
      this.papeis = papeis;
    });
  }

  adicionarUser() {
    this.userService
      .cadastrarUsuario(this.usuario)
      .then((resultado) => {
        console.log('Usuário adicionado com sucesso:', resultado);
        this.alertService.showAlert('', 'Usuário adicionado com sucesso');
        this.router.navigate(["/login"]);
      })
      .catch((error: any) => {
        console.error('Erro ao adicionar usuário:', error);
      });
  }
}

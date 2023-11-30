import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertService } from 'src/service/alert.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async login() {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      if (result.user) {
        await this.userService.inicializarUsuarioId();
        this.router.navigate(['/main-user']);
      } else {
        this.alertService.showAlert(
          'Erro de Login',
          'Usuário não autenticado.'
        );
      }
    } catch (error) {
      console.error(error);
      this.alertService.showAlert(
        'Erro de Login',
        'Verifique seu e-mail e senha e tente novamente.'
      );
    }

  }

  fazerRegistro(){
    this.router.navigate(["/home"])
  }
}

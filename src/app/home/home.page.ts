import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  
  cadastrarOng() {
    this.router.navigate(['/cadastro-ong']);
  }

  cadastrarVoluntario() {
    this.router.navigate(['/cadastro-user']);
  }

  fazerLogin() {
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private afAuth: AngularFireAuth, private router: Router,private menu: MenuController, private authService: AuthService) {}
  
  isUserAuthenticated(): boolean {
    return !!this.afAuth.currentUser;
  }

  redirectToLoginIfNotAuthenticated() {
    if (!this.isUserAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
  
  openUserProfile() {
    this.router.navigate(['/user-profile'])
    this.menu.close();
  }

  logout() {
    this.authService.logout();
    this.menu.close();
    this.router.navigate(['/login'])
  }
}

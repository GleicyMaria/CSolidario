import { Component, OnInit } from '@angular/core';
import { NavController,  AlertController  } from '@ionic/angular';
import { UserService } from 'src/service/user.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  userId: string = '';
  userDetails!: User;
  editedProfile: any = {};
  editMode = false;
  papeis: any[] = [];
  constructor(private userService: UserService,private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.userId = this.userService.getUserId() || '';
    this.getTypeProfile();
    this.loadUserProfile();
  }

  getTypeProfile(){
    this.userService.getTypeUser().subscribe((papeis) => { 
      this.papeis = papeis;  
    });
  }

  loadUserProfile() {
    this.userService.getUserDetails(this.userId).subscribe(
      (userDetails) => {
        if (userDetails) {
          this.userDetails = userDetails;
          if (this.papeis && userDetails.Papel) {
            this.userDetails.Papel = this.getPapelNameById(userDetails.Papel);
          }
        } else {
          console.error('Detalhes do usuário indefinidos.');
        }
      },
      (error) => {
        console.error('Erro ao carregar o perfil do usuário:', error);
      }
    );
  }

  getPapelNameById(id: string): string {
    const papel = this.papeis.find(p => p.id === id);
    return papel ? papel.Nome : '';
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Tem certeza de que deseja excluir sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.userService.deleteUser(); 
          },
        },
      ],
    });

    await alert.present();
  }
  

  async saveChanges() {
    try {
      await this.userService.updateUserProfile(this.editedProfile);
      this.editMode = false;
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  }

}

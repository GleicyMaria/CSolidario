import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    
  ) {
    this.afAuth
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      console.log('Persistência de sessão configurada com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao configurar persistência de sessão:', error);
    });
  }

  logout() {
    return this.afAuth.signOut();
  }

 
}

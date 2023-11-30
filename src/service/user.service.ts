import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of, from, throwError } from 'rxjs';
import { filter, switchMap, catchError, map } from 'rxjs/operators';
import { User } from 'src/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId: string | null = null;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  adicionarUsuario(uid: string, dados: any): Promise<void> {
    return this.firestore.collection('user').doc(uid).set(dados);
  }

  private async obterIdUsuario(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

  async inicializarUsuarioId(): Promise<void> {
    if (!this.userId) {
      this.userId = await this.obterIdUsuario();
    }
  }

  async cadastrarUsuario(usuario: any): Promise<void> {
    try {
      const resultado = await this.afAuth.createUserWithEmailAndPassword(
        usuario.Email,
        usuario.Senha
      );
      const uid = resultado.user?.uid;
      await this.adicionarInformacoesUsuario(uid, usuario);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }

  private adicionarInformacoesUsuario(
    uid: string | undefined,
    usuario: any
  ): Promise<void> {
    if (uid) {
      const dadosUsuario = {
        Nome: usuario.Nome,
        Email: usuario.Email,
        Papel: usuario.Papel,
      };

      return this.firestore.collection('user').doc(uid).set(dadosUsuario);
    } else {
      return Promise.reject('UID do usuário não disponível.');
    }
  }

  getTypeUser(): Observable<any[]> {
    return this.firestore
      .collection('typeUser')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getUserId(): string | null {
    return this.userId;
  }

  getUserDetails(uid: string): Observable<User | undefined> {
    return this.firestore
      .collection<User>('user')
      .doc(uid)
      .valueChanges()
      .pipe(
        catchError((error: any) => {
          console.error('Erro ao obter detalhes do usuário:', error);
          return of(undefined);
        }),
        filter((user: User | undefined): user is User => !!user), // Removendo valores undefined
        switchMap((user: User) => {
          console.log('Detalhes do usuário obtidos com sucesso:', user);

          return of(user);
        })
      );
  }

  updateUserProfile(updatedProfile: any) {
    return new Promise<void>(async (resolve, reject) => {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userId = user.uid;
        this.firestore
          .collection('user')
          .doc(userId)
          .update(updatedProfile)
          .then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      }
    });
  }

  async deleteUser() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await this.firestore.collection('user').doc(user.uid).delete();
        await user.delete();
        console.log('Usuário excluído com sucesso.');
        this.router.navigate(['/login']);
      } else {
        console.error('Nenhum usuário autenticado encontrado.');
      }
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error);
    }
  }
}

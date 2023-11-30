import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comment } from 'src/model/comment.model';
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  addComment(ongId: string, userId: string, comment: string): Promise<void> {
    const commentData: Comment = {
      ongId: ongId,
      userId: userId,
      comment: comment,
      timestamp: new Date(),
    };

    return this.firestore
      .collection('comments')
      .add(commentData)
      .then(() => {
       
        console.log('Comentário adicionado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao adicionar comentário:', error);
        
      });
  }

  getComments(ongId: string): Observable<Comment[]> {
    return this.firestore
      .collection<Comment>('comments', (ref) => ref.where('ongId', '==', ongId))
      .valueChanges()
      .pipe(
        switchMap((comments: Comment[]) => {
          // Verificar se há comentários
          if (comments.length === 0) {
            return of([]);
          }

          // Buscar detalhes do usuário para cada comentário
          const userObservables = comments.map((comment) => this.userService.getUserDetails(comment.userId));

          // Combinar observables de usuários
          return combineLatest(userObservables).pipe(
            map((users: any[]) => {
              // Associar detalhes do usuário a cada comentário
              return comments.map((comment, index) => ({
                ...comment,
                userName: users[index]?.Nome || 'Usuário não encontrado',
              }));
            })
          );
        })
      );
  }



}

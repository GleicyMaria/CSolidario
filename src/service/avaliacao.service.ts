import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , map} from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Avaliacao } from 'src/model/avaliacao.model';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  private avaliacoes: { [ongId: string]: number } = {};

  private avaliacoesSubject = new BehaviorSubject<{ [ongId: string]: number }>(
    {}
  );

  constructor(private firestore: AngularFirestore) {}

  getAvaliacoes(): Observable<{ [ongId: string]: number }> {
    return this.avaliacoesSubject.asObservable();
  }
  
  adicionarAvaliacao(ongId: string, usuarioId: string, nota: number): Promise<void> {
    const avaliacao: Avaliacao = { ongId, usuarioId, nota };
    return this.firestore.collection('avaliacoes').doc(`${ongId}_${usuarioId}`).set(avaliacao);
  }
  
  getAvaliacaoPorUsuario(ongId: string, usuarioId: string): Observable<Avaliacao | null> {
    return this.firestore.doc<Avaliacao>(`avaliacoes/${ongId}_${usuarioId}`).valueChanges().pipe(
      map(avaliacao => avaliacao || null) 
    );
  }

  getAvaliacoesPorOng(ongId: string): Observable<Avaliacao[]> {
    return this.firestore.collection<Avaliacao>('avaliacoes', ref => ref.where('ongId', '==', ongId)).valueChanges();
  }
  
}

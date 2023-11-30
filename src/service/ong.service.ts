
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ong } from 'src/model/ong.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OngService {
  constructor(private firestore: AngularFirestore) {}
async participarOng(usuarioId: string, ongId: string) {
    const ongRef = this.firestore.doc(`ongs/${ongId}`).ref;
    try {
      const ongDoc = await ongRef.get();
      const participantes = ongDoc.get('participantes') || [];

      if (!participantes.includes(usuarioId)) {
        participantes.push(usuarioId);
        await ongRef.update({ participantes });
        await this.firestore
          .collection(`user/${usuarioId}/ongsAssociadas`)
          .add({
            ongRef: ongRef,
          });
      }
    } catch (error) {
      console.error('Erro ao participar da ONG:', error);
    }
  }

  getOngsAssociadas(userId: string): Observable<any[]> {
    return this.firestore
      .collection(`user/${userId}/ongsAssociadas`)
      .valueChanges()
      .pipe(
        switchMap((ongsAssociadas: any[]) => {
          console.log(ongsAssociadas);
      
          const ongsObservables = ongsAssociadas.map((ongAssociada) => {
            const ongRef = ongAssociada.ongRef;
            console.log(ongRef);
      
            const ongObservable = this.firestore
              .doc(ongRef.path)
              .snapshotChanges()  
              .pipe(
                map((doc) => {
                  const data = doc.payload.data() as { [key: string]: any };
                  const id = doc.payload.id;
                  return { id, ...data };
                })
              );
            console.log(ongObservable);
      
            return ongObservable;
          });
      
          return combineLatest(ongsObservables);
        })
      );
  }

  getOngs(): Observable<any[]> {
    return this.firestore
      .collection('ongs')
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

  adicionarOng(ong: Ong): Promise<any> {
    return this.firestore.collection('ongs').add(ong);
  }
}
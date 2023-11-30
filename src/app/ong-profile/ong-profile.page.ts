import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CommentService } from 'src/service/comment.service';
import { UserService } from 'src/service/user.service';
import { AlertService } from 'src/service/alert.service';
import { AvaliacaoService } from 'src/service/avaliacao.service';
import { Avaliacao } from 'src/model/avaliacao.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-ong-profile',
  templateUrl: './ong-profile.page.html',
  styleUrls: ['./ong-profile.page.scss'],
})
export class OngProfilePage implements OnInit {
  coracoes: any[] = [
    { icon: 'heart-outline', classe: 'coracao-cinza' },
    { icon: 'heart-outline', classe: 'coracao-cinza' },
    { icon: 'heart-outline', classe: 'coracao-cinza' },
    { icon: 'heart-outline', classe: 'coracao-cinza' },
    { icon: 'heart-outline', classe: 'coracao-cinza' },
  ];

  menuItems = [
    { page: '/historia', icon: 'book', content: 'Conteúdo da História' },
    { page: '/projetos-atuais', icon: 'construct', content: 'Conteúdo dos Projetos Atuais' },
    { page: '/necessidades', icon: 'list', content: 'Conteúdo das Necessidades' },
    { page: '/historico', icon: 'calendar', content: 'Conteúdo dos Eventos Passados' },
    { page: '/calendario', icon: 'today', content: 'Conteúdo do Calendário' },
  ];

  loading = true;
  ongId: string = '';
  ongDetails: any; // Tipo pode variar com base na sua estrutura de dados
  usuarioId = '';
  comentarios: any[] = [];
  novoComentario: string = '';
  nota: number = 0;
  avaliacaoPorUsuario$: Observable<Avaliacao | null> = of(null);
  notaOng: number = 0;



  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private commentService: CommentService,
    private userService: UserService,
    private alertService: AlertService,
    private avaliacaoService: AvaliacaoService
  ) {}

  ngOnInit() {
    this.usuarioId = this.userService.getUserId() || '';
    const ongIdParam = this.route.snapshot.paramMap.get('ongId');
    if (ongIdParam !== null) {
      this.ongId = ongIdParam;
      this.loadOngDetails();
      this.processarAvaliacaoPorUsuario();
      this.calcularMediaAvaliacoes();
    }
  }

  private loadOngDetails() {
    this.firestore
      .doc(`ongs/${this.ongId}`)
      .valueChanges()
      .subscribe((ongDetails: any) => {
        if (ongDetails) {
          this.ongDetails = ongDetails;
          this.loading = false;
          this.loadComments();
        } else {
          console.log('Documento não encontrado ou vazio.');
        }
      });
  }

  private calcularMediaAvaliacoes() {
    this.avaliacaoService
      .getAvaliacoesPorOng(this.ongId)
      .subscribe((avaliacoes) => {
        const totalNotas = avaliacoes.reduce(
          (total, avaliacao) => total + avaliacao.nota,
          0
        );
        this.notaOng =
          avaliacoes.length > 0 ? totalNotas / avaliacoes.length : 0;
        console.log('Média das avaliações:', this.notaOng);
      });
  }

  private processarAvaliacaoPorUsuario() {
    this.avaliacaoPorUsuario$ = this.avaliacaoService.getAvaliacaoPorUsuario(
      this.ongId,
      this.usuarioId
    );

    this.avaliacaoPorUsuario$.subscribe((avaliacao) => {
      if (avaliacao) {
        const nota = avaliacao.nota; // Supondo que a propriedade da nota seja 'nota'
        this.atualizarCoracoesComNota(nota);
      }
    });
  }

  loadComments() {
    this.commentService.getComments(this.ongId).subscribe((comments) => {
      console.log(comments);
      this.comentarios = comments;
    });
  }

  adicionarComentario() {
    if (this.novoComentario.trim() !== '') {
      if (this.ongId && this.usuarioId) {
        this.commentService
          .addComment(this.ongId, this.usuarioId, this.novoComentario)
          .then(() => {
            this.alertService.showAlert(
              ' ',
              'Comentário adicionado com sucesso!'
            );
            this.loadComments();
            this.novoComentario = '';
          })
          .catch((error) => {
            this.alertService.showAlert(' ', 'Erro ao adicionar comentário');
          });
      } else {
        this.alertService.showAlert(' ', 'Erro ao adicionar comentário');
      }
    } else {
      this.alertService.showAlert(
        ' ',
        'Você não pode adicionar um comentario em branco'
      );
    }
  }

  clicarNoCoracao(index: number) {
    this.nota = index + 1;
    this.atualizarCoracoesComNota(this.nota);
    this.avaliacaoService.adicionarAvaliacao(
      this.ongId,
      this.usuarioId,
      this.nota
    );
  }

  private atualizarCoracoesComNota(nota: number) {
    this.coracoes.forEach((coracao, i) => {
      coracao.icon = i < nota ? 'heart' : 'heart-outline';
      coracao.classe = i < nota ? 'coracao-vermelho' : 'coracao-cinza';
    });
  }

  formatarData(timestamp: any): string {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  }
  
 
  
navegarParaPagina(pagina: string) {
this.alertService.showAlert("Pagina Em Construção", "Desculpe pelo transtorno")
}
}

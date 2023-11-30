import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro-ong',
    loadChildren: () => import('./cadastro-ong/cadastro-ong.module').then( m => m.CadastroOngPageModule)
  },
  {
    path: 'cadastro-user',
    loadChildren: () => import('./cadastro-user/cadastro-user.module').then( m => m.CadastroUserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main-user', 
    loadChildren: () => import('./main-user/main-user.module').then( m => m.MainUserPageModule)
  },
  {
    path: 'list-ongs',
    loadChildren: () => import('./list-ongs/list-ongs.module').then( m => m.ListOngsPageModule)
  },
  {
    path: 'ong-profile',
    loadChildren: () => import('./ong-profile/ong-profile.module').then( m => m.OngProfilePageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

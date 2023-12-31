import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'register',
    redirectTo: 'register',
    pathMatch: 'full'
  },

  {
    path: 'principal',
    redirectTo: 'principal',
    pathMatch: 'full'
  },

  {
    path: 'forgot-password',
    redirectTo: 'forgot-password',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./e404/e404.module').then(m => m.E404PageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  },


  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then(m => m.ScannerPageModule)
  },

  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  // ** TIENE QUE SER LA ULTIMA

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

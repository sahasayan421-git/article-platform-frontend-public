import { Routes } from '@angular/router';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login-component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register-component')
        .then(m => m.RegisterComponent)
  },

  {
    path: 'articles',
    loadComponent: () =>
      import('./components/articles/list/article-list-component')
        .then(m => m.ArticleListComponent)
  },

  {
    path: 'articles/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/articles/create/create-article-component')
        .then(m => m.CreateArticleComponent)
  },

  {
    path: 'articles/:id',
    loadComponent: () =>
      import('./components/articles/detail/article-detail-component')
        .then(m => m.ArticleDetailComponent)
  },

  {
    path: 'drafts',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/articles/drafts/draft-list/draft-list-component')
        .then(m => m.DraftListComponent)
  },

  {
    path: 'drafts/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/articles/edit/edit-article-component')
        .then(m => m.EditArticleComponent)
  },

  {
    path: '**',
    redirectTo: 'articles'
  }
];
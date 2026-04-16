import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'recipes',
        loadComponent: () =>
          import('./pages/recipes-page/recipes-page.component').then((m) => m.RecipesPageComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories-page/categories-page.component').then(
            (m) => m.CategoriesPageComponent,
          ),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favorites-page/favorites-page.component').then(
            (m) => m.FavoritesPageComponent,
          ),
      },
      {
        path: 'recipes/:id',
        loadComponent: () =>
          import('./pages/recipe-details-page/recipe-details-page.component').then(
            (m) => m.RecipeDetailsPageComponent,
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about-page/about-page.component').then((m) => m.AboutPageComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found-page/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import { NonAuthGuard } from './shared/auth/non-auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import( './pages/auth/auth.module' ).then( m => m.AuthModule ),
    canActivate: [ NonAuthGuard ]
  },
  {
    path: 'app',
    loadChildren: () => import( './pages/app-plan/app-plan.module' ).then( m => m.AppPlanModule ),
    canActivate: [ AuthGuard ]
  },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [ AuthGuard ] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [ AuthGuard ] },
];

@NgModule( {
  imports: [ RouterModule.forRoot( appRoutes ) ],
  exports: [ RouterModule ]
} )

export class AppRoutingModule {

}

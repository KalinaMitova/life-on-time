import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { NonAuthGuard } from '../auth/non-auth-guard.service';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration, Forgot password etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: 'content-layout',
    loadChildren: () => import( '../../pages/content-layout-page/content-pages.module' ).then( m => m.ContentPagesModule )
  },
  {
    path: 'user',
    loadChildren: () => import( '../../pages/auth/auth.module' ).then( m => m.AuthModule ),
    canActivate: [ NonAuthGuard ]
  }
];

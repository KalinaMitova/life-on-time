//Modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';

const childRoutes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
      },
    ]
  }
]

@NgModule( {
  imports: [
    RouterModule.forChild( childRoutes )
  ],
  exports: [
    RouterModule
  ]
} )
export class AuthRoutingModule { }

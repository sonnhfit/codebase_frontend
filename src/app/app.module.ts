import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';
import { ServicesModule } from 'src/app/services/services.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { 
  AuthenticationService as AuthGuard 
} from './services/authentication.service';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent, canActivate: []},
  { path: 'users', loadChildren: './user/user.module#UserModule' , canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServicesModule,
    AuthModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

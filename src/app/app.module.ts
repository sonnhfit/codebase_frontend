import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';
import { ServicesModule } from 'src/app/services/services.module';
import { AuthModule } from 'src/app/auth/auth.module';

export const ROUTES: Routes = [
  // { path: '', pathMatch: 'full', component: AppComponent },
  // { path: 'question',  },
];

@NgModule({
  declarations: [
    AppComponent
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

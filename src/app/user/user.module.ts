import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './user-add/user-add.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { Routes, RouterModule } from '@angular/router';
import {WebcamModule} from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { UserCheckComponent } from './user-check/user-check.component';

export const ROUTES: Routes = [
  { path: 'add', component: UserAddComponent },
  { path: 'history', component: UserHistoryComponent },
  { path: 'check', component: UserCheckComponent },
];

@NgModule({
  declarations: [
    UserAddComponent,
    UserHistoryComponent,
    UserCheckComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    WebcamModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class UserModule { }

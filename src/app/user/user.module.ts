import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './user-add/user-add.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { Routes, RouterModule } from '@angular/router';
import {WebcamModule} from 'ngx-webcam';
import { FormsModule } from '@angular/forms';

export const ROUTES: Routes = [
  { path: 'add', component: UserAddComponent },
  { path: 'history', component: UserHistoryComponent },
];

@NgModule({
  declarations: [
    UserAddComponent,
    UserHistoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    WebcamModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class UserModule { }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '@/../../src/app/models/user';
import { environment } from '../../environments/environment';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private httpOptions: any;

    constructor(private http: HttpClient) {
    this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        })
        };
    }


    login(username: string, password: string) {
        console.log(`${environment.apiUrl}/user/login/`);
        return this.http.post<any>(`${environment.apiUrl}/user/login/`, JSON.stringify({ 'username': username, 'password': password }))
        .subscribe(
            data => {
                localStorage.setItem('access_token', data['access_token']);
                this.httpOptions = {
                    headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    })
                };
                
            },
            err => {
                console.error('refresh error', err);
            }
        );
    }

    logout() {
        console.log(localStorage.getItem('access_token'));
        // remove user from local storage to log user out
        
        return this.http.post<any>(`${environment.apiUrl}/user/logout/`, '', this.httpOptions)
        .subscribe(
            data => {
                console.log('oke log');
                localStorage.removeItem('access_token');
                
            },
            err => {
                console.error('refresh error', err);
            }
        );
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username = 'sonnh';
  public password = 'son123';
  constructor(private _authenService: AuthenticationService, public router: Router) {
    if (localStorage.getItem('access_token') != null) {
       this.router.navigate(['/']);
    }
   }

  ngOnInit() {
  }

  test_api() {
    console.log('test');
    var user = this._authenService.login(this.username, this.password);
    
  }

  logout() {
    this._authenService.logout();
  }
}

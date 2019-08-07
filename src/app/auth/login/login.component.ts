import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authenService: AuthenticationService) { }

  ngOnInit() {
  }

  test_api() {
    console.log('test');
    var user = this._authenService.login('sonnh', 'son123');
    console.log(user);
  }

  logout() {
    this._authenService.logout();
  }
}

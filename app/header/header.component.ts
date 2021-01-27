import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck {

  authStatus = "login"
  constructor(
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.user){
      this.authStatus = "logout"
    }
  }
  ngDoCheck(){
    if(this.authService.user){
      this.authStatus = "logout"
    }
    else{
      this.authStatus = "login"
    }
  }

  onAuthClick(){
    console.log(this.authService.user)
    if(this.authService.user){
      this.authService.clearLogoutTimer();
      this.authService.logout();
    }
  }

}

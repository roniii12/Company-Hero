import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authStatus = "login"
  user:User;
  constructor(
    public authService:AuthService
  ) { }

  ngOnInit(): void {

    this.authService.userChanged.subscribe((user:User)=>{
      this.user=user;
      if(this.user){
        this.authStatus = "logout"
      }
      else{
        this.authStatus = "login"
      }
    })
  }

  onAuthClick(){
    if(this.user){
      this.authService.clearLogoutTimer();
      this.authService.logout();
    }
  }

}

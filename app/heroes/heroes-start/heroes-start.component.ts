import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-heroes-start',
  templateUrl: './heroes-start.component.html',
  styleUrls: ['./heroes-start.component.css']
})
export class HeroesStartComponent implements OnInit {

  user:User

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.User;
  }

}

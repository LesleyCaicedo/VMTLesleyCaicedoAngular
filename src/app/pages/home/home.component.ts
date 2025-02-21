import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  usuario: User = {
    username: 'Juan',
    rolRolid: 2,
    email: 'pepe@gmail.com'
  } as User;
  turnosAtendidosGestor = 12;
  turnosAtendidosAdmin = 20;

  constructor(private accountService: AccountService, private router:Router) {
    this.accountService.isLogged$.subscribe(value => {
      if(!value) this.router.navigate(['/login']); 
    })
  }

  getUser() {
    let usuario:any = JSON.parse(localStorage.getItem('user')!);
    return usuario;
  }

  
}

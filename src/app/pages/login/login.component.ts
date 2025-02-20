import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { LoginCredential } from '../../models/login-credential.mode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginCredentials: LoginCredential = {} as LoginCredential;
  
  constructor(private accountService: AccountService, private router:Router, private toast: ToastrService) {
    this.accountService.isLogged$.subscribe(value => {
      if(value) this.router.navigate(['/home']); 
    });
  }

  login() {
    if(!this.loginCredentials.username || !this.loginCredentials.password) {
      this.toast.info('Ingrese usuario y contraseña.');
      return;
    }

    this.accountService.login(this.loginCredentials.username, this.loginCredentials.password).subscribe({
      next: (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/home']);
        this.accountService.setIsLogued(true);
      }, error: () => {
        this.toast.error('Ocurrio un error, intente de nuevo.');
      }
    });
  }
}

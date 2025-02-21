import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  fecha = new Date();

  nuevoUsuario: User = {
    creationdate: this.fecha.toISOString(),
    usercreate: this.GetId(),
    userapproval: this.GetRol() === 1 ? this.GetId() : '',
    userstatusStatusid: this.GetRol() === 1 ? 1 : 2,
    datespproval: this.GetRol() === 1 ? this.fecha.toISOString() : ''
  } as User;

  constructor(private toastr: ToastrService, private accountService: AccountService, private router: Router) {
    this.accountService.isLogged$.subscribe(value => {
      if (!value) this.router.navigate(['/login']);
    })
  }

  CrearUsuario() {
    this.accountService.CrearUser(this.nuevoUsuario).subscribe({
      next:(value:any)=>{
        console.log(value)
      },
      error:(err) => {
        this.toastr.error(err.error.message)
      }
    });
  }

  GetRol(): number {
    return (JSON.parse(localStorage.getItem('user')!) as User).rolRolid!;
  }

  GetId(): number {
    return (JSON.parse(localStorage.getItem('user')!) as User).userid!;
  }

}

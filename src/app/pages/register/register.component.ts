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

  listaUsuarios = [
    {
      id: 1,
      username: 'admin123',
      email: 'admin@example.com',
      rolRolid: 1 // Administrador
    },
    {
      id: 2,
      username: 'gestor456',
      email: 'gestor@example.com',
      rolRolid: 2 // Gestor
    },
    {
      id: 3,
      username: 'cajero789',
      email: 'cajero@example.com',
      rolRolid: 3 // Cajero
    },
    {
      id: 4,
      username: 'adminPro',
      email: 'adminpro@example.com',
      rolRolid: 1 // Administrador
    },
    {
      id: 5,
      username: 'gestorPro',
      email: 'gestorpro@example.com',
      rolRolid: 2 // Gestor
    },
    {
      id: 6,
      username: 'cajeroPro',
      email: 'cajeropro@example.com',
      rolRolid: 3 // Cajero
    }
  ];

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

  EditarUsuario(usuario: any) {
    console.log('Editar usuario:', usuario);
  }

  EliminarUsuario(usuario: any) {
    console.log('Eliminar usuario:', usuario);
    this.listaUsuarios = this.listaUsuarios.filter(u => u.id !== usuario.id);
  }
}

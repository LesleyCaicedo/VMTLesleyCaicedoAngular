import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  // Datos "quemados" para usuario, cajero y gestor
  usuario = {
    nombre: 'Carlos Gómez',
    rol: 'Cajero',
    estado: 'Activo'
  };

  cajero = {
    nombre: 'Ana Pérez',
    estado: 'Inactivo'
  };

  gestor = {
    nombre: 'Luis Martínez',
    estado: 'Activo'
  };

  constructor(private toastr: ToastrService, private accountService: AccountService, private router: Router) {
    if(this.GetRol() !== 1) {
      this.router.navigate(['/home']);
      this.toastr.info('No tiene acceso a esta ruta');
    }
    this.accountService.isLogged$.subscribe(value => {
      if (!value) this.router.navigate(['/login']);
    })
  }

  actualizarUsuario() {
    this.toastr.success(`Usuario ${this.usuario.nombre} (${this.usuario.rol}) actualizado a estado ${this.usuario.estado}`);
  }

  actualizarCajero() {
    this.toastr.success(`Cajero ${this.cajero.nombre} actualizado a estado ${this.cajero.estado}`);
  }

  actualizarGestor() {
    this.toastr.success(`Gestor ${this.gestor.nombre} actualizado a estado ${this.gestor.estado}`);
  }

  GetRol(): number {
    return (JSON.parse(localStorage.getItem('user')!) as User).rolRolid!;
  }
}

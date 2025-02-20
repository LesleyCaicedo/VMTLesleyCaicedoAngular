import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-turns',
  standalone: false,
  templateUrl: './turns.component.html',
  styleUrl: './turns.component.scss'
})
export class TurnsComponent {
  turnosAsignados = [
    { usuario: 'Cajero 1', turno: 'Mañana', fecha: new Date('2025-02-19') },
    { usuario: 'Cajero 2', turno: 'Tarde', fecha: new Date('2025-02-19') }
  ];

  turno:any = {
    usuario: '',
    turno: '',
    fecha: ''
  };

  constructor(private accountService: AccountService, private router: Router, private toast:ToastrService) {
    this.accountService.isLogged$.subscribe(value => {
      if (!value) this.router.navigate(['/login']);
    })
  }

  asignarTurno() {
    if (this.turno.usuario && this.turno.turno && this.turno.fecha) {
      this.turnosAsignados.push({ ...this.turno });
      this.toast.success(`Turno de ${this.turno.usuario} asignado para el día ${this.turno.fecha}`);
      this.turno = { usuario: '', turno: '', fecha: '' };
    } else {
      this.toast.info('Por favor, complete todos los campos.');
    }
  }
}

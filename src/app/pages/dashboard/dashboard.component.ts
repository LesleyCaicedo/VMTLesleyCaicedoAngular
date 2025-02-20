import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  // Datos simulados (quemados)
  usuario = {
    nombre: 'Carlos Gómez',
    rol: 'Administrador'
  };

  // Indicadores de usuarios
  usuariosActivos = 120;
  usuariosInactivos = 30;
  usuariosBloqueados = 10;

  // Indicadores de cajas, cajeros y gestores
  cajasActivas = 5;
  cajerosActivos = 15;
  gestoresActivos = 3;

  // Filtros de fecha
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.isLogged$.subscribe(value => {
      if (!value) this.router.navigate(['/login']);
    })
  }

  ngOnInit(): void {
    // Inicialización si es necesario
  }

  filtrar(): void {
    console.log('Filtrando entre:', this.fechaInicio, 'y', this.fechaFin);
    // Aquí puedes implementar la lógica para filtrar los datos según las fechas
  }
}

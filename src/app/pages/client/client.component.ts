import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { AccountService } from '../../services/account.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client',
  standalone: false,
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

   modelo:Client = {} as Client;

  constructor(private toastr: ToastrService, private clientService: ClientService, private router: Router,
    private accountService:AccountService
  ){    
  this.accountService.isLogged$.subscribe(value => {
    if (!value) this.router.navigate(['/login']);
  })
  }

  CrearCliente() {
    this.clientService.CrearCliente(this.modelo).subscribe({
      next:(value:any)=>{
        console.log(value)
      },
      error:(err) => {
        this.toastr.error(err.error.message)
      }
    });
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  CrearCliente(modelo:Client){
    return this.http.post<Client>(`${this.baseUrl}/Cliente/RegistroCliente`,modelo);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}

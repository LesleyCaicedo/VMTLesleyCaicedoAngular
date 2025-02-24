import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  tablaUsuario() {
    return this.http.get(`${this.baseUrl}/Usuario/ObtenerUsuario`).pipe(
      catchError(this.handleError)
    );
  }  

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}

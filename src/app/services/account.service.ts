import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private isLogged = new BehaviorSubject<boolean>(this.getInfo());
  isLogged$ = this.isLogged.asObservable();
  
  baseUrl = environment.apiUrl;
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  getInfo(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  setIsLogued(value: boolean) {
    this.isLogged.next(value);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      catchError(this.handleError)
    );
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  // logout() {
  //   localStorage.removeItem('user');
  //   this.isLoggedIn = false;
  // }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private isLogged = new BehaviorSubject<boolean>(this.getInfo());
  isLogged$ = this.isLogged.asObservable();
  
  baseUrl = environment.apiUrl;
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.get(`${this.baseUrl}/Login/login?username=${username}&password=${password}`);
  }

  CrearUser(modelo:User){
    return this.http.post<User>(`${this.baseUrl}/Usuario/RegistroUsuario`,modelo);
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

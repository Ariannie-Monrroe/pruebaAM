import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUser: any | null = null; //Datos usuario auth.
  private loggedInUser: string | null = null;
  constructor() { }
  
  setUser(user: any) {
    this.currentUser = user;
  }

  getUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  setLoggedInUser(correo: string) {
    localStorage.setItem('loggedInUser', correo);
  }

  // Obtener el correo del usuario logeado
  getLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
  }

  // Borrar el correo del usuario logeado
  logout() {
    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {
    const loggedInUser = this.getLoggedInUser();
    return !!loggedInUser;
  }

}

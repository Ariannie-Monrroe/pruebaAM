import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthServiceService } from './auth-service.service';
const userStorage = 'userStorage';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthServiceService) { }

  private userStorage = 'userStorage';

  async agregarUsuario(clave: string, valor: string) {
    await Preferences.set({ key: clave, value: valor });
  }

  async obtenerUsuarios(llave: string): Promise<string | null> {
    const obj = await Preferences.get({ key: llave });
    return obj.value;
  }

  async guardarUsuario(user: any) {
    const usuarioExistente = await this.obtenerUsuarios(this.userStorage);
    const usuarios = usuarioExistente ? JSON.parse(usuarioExistente) : [];
    usuarios.push(user);

    await this.agregarUsuario(this.userStorage, JSON.stringify(usuarios));
  }

  async validarCredenciales(correo: string, contrasena: string): Promise<boolean> {
    const usuarioObtenido = await this.obtenerAlumno(correo);
    if (usuarioObtenido) {
      console.log('Usuario obtenido:', usuarioObtenido);
      return usuarioObtenido.password === contrasena;
    }
    return false;
  }

  async obtenerAlumno(email: string) {
    const datos = await this.obtenerUsuarios(this.userStorage);

    if (datos === null) {
      return null; // No hay usuarios almacenados
    }
    const data: any[] = JSON.parse(datos);
    if (data) {
      console.log('Datos obtenidos:', data);

      const usuarioEncontrado = data.find((user) => user.email === email);

      console.log('Usuario encontrado:', usuarioEncontrado);
      return usuarioEncontrado || null;
    } else {
      console.log('No se encontraron usuarios en los datos.');
      return null;
    }
  }




  async obtenerDatosUsuarioActual(): Promise<any | null> {
    const correoUsuarioActual = this.authService.getLoggedInUser(); // Obtén el correo del usuario actual
    if (correoUsuarioActual) {
      const usuario = await this.obtenerAlumno(correoUsuarioActual);
      return usuario;
    } else {
      return null; // No hay un usuario logeado
    }
  }

}

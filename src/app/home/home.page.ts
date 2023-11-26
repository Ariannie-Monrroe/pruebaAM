import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { FormBuilder } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private alertController: AlertController,
  ) {
    this.loginForm = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    })
  }

  registro() {
    this.router.navigateByUrl("register");
  }

  recuperarContrasena() {
    this.router.navigateByUrl("recuperar-contrasena");
  }

  // iniciarSesion() {
  //   const usuarios = this.userService.getUsers();
  //   const usuarioEncontrado = usuarios.find(
  //     user =>
  //       user.email === this.usuario.email &&
  //       user.password === this.usuario.password
  //   );

  //   if (usuarioEncontrado) {
  //     this.router.navigate(['/register']);
  //     console.log('Inicio de sesión exitoso');
  //   } else {
  //     // Usuario no encontrado o contraseña incorrecta
  //     console.log('Inicio de sesión fallido');
  //   }
  // }

  async ingresar() {
    var f = this.loginForm.value;

    var usuarioString: string | null = localStorage.getItem('usuario');
    var usuario: { email: string; password: string } | null = usuarioString ? JSON.parse(usuarioString) : null;

    // Verifica si el usuario es nulo antes de intentar acceder a sus propiedades
    if (usuario && usuario.email === f.email && usuario.password === f.password) {
      console.log('ingresar');
    } else {
      this.alertController.create({
        header: 'Ups, Datos Incorrectos',
        message: 'Los datos que ingresaste no son correctos',
        buttons: ['Aceptar']
      }).then(alert => alert.present());
    }
  }

  //     var usuario: string | null = JSON.parse(localStorage.getItem('usuario'));

  //     if(usuario && usuario.email === f.email && usuario.password === f.password){
  //       console.log('ingresar');
  // } else {
  //   console.log('Inicio de sesión fallido');
  // }
  //   }
}


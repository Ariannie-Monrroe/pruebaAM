import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginForm: FormGroup;
  email: string = "";
  contraseña: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private authService: AuthServiceService,
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
  async ingresar() {
    var f = this.loginForm.value;
    console.log('Formulario:', f);

    this.email = f.email;
    this.contraseña = f.password;
    const credencialesValidas = await this.userService.validarCredenciales(
      this.email,
      this.contraseña
    );


    if (credencialesValidas) {
      const usuario = await this.userService.obtenerAlumno(f.email);
      if (credencialesValidas) {
        this.authService.setLoggedInUser(f.email);
        this.router.navigateByUrl('menu');
      }
    } else {
      this.alertController.create({
        header: 'Ups, Datos Incorrectos',
        message: 'Los datos que ingresaste no son correctos',
        buttons: ['Aceptar']
      }).then(alert => alert.present());
      console.log(f.email, f.password)

    }
  }
}


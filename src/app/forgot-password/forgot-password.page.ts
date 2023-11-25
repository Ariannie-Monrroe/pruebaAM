import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private userService: UserService,
    private alertController: AlertController,
    private fb: FormBuilder,
  ) {
    this.forgotPasswordForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }

  async recoverPassword() {
    const f = this.forgotPasswordForm.value;
    this.email = f.email;
    console.log(this.email)

    const emailExiste = await this.userService.obtenerAlumno(this.email);

    if (emailExiste) {
      const contrasena = emailExiste.password;
      const alert = await this.alertController.create({
        header: 'Recuperar contraseña',
        message: 'Tu contraseña es: ' + contrasena,
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigateByUrl('home');
    } else {
      const alert = await this.alertController.create({
        header: 'Recuperar contraseña',
        message: 'El correo no existe',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
selector: 'app-register',
templateUrl: './register.page.html',
styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
registerForm: FormGroup;

constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
) {
    this.registerForm = this.formBuilder.group({
      // username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(4),Validators.maxLength(4)]],
      nombre: ['', Validators.required],
      rut: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      fechaNacimiento: ['', Validators.required],
      carrera: ['', Validators.required],
    });
}

onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario enviado con éxito:', this.registerForm.value);
      this.alertController.create({
        header: 'Registro exitoso',
        message: '¡Felicitaciones! Ya estás registrado.',
        buttons: ['OK']
      }).then(alert => alert.present());
    } else {
      console.log('Formulario no válido');
    }
}

async scan() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });


  } catch (error) {
    console.log('Error en el scanner:', error);
  }
}

async takePicture() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    console.log('Imagen capturada:', image);
  } catch (error) {
    console.error('Error al tomar la foto:', error);
  }
}
}
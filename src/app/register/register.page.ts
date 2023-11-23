import { Component, OnInit, booleanAttribute } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Router } from '@angular/router';
import { ApiUbicationService } from '../services/api-ubication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  usuario: string = '';
  nombre: string = '';
  photo: string | undefined;
  email: string;
  password: string = '';
  carrera: string;
  rut: string;
  regionSeleccionada: string = '';
  comunaSeleccionada: string = '';
  regiones: any[] = [];
  comunas: any[] = [];
  regionSel: number = 0;
  comunaSel: number = 0;
  seleccionComuna: boolean = true;
  fechaNacimiento: string;
  formularioServ: any;
  mostrarBoton: boolean = false;

  constructor(
    public photoService: PhotoService,
    private router: Router,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private apiUbication: ApiUbicationService
  ) {
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.carrera = '';
    this.rut = '';
    this.fechaNacimiento = '';

    this.registerForm = this.formBuilder.group({
      // username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      nombre: ['', Validators.required],
      rut: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      fechaNacimiento: ['', Validators.required],
      carrera: ['', Validators.required],
    });

  }
  async ngOnInit() {
    this.cargarRegion();
    defineCustomElements(window);
    this.photoService.loadSaved().then((photo) => {
      this.photo = photo ? photo.webviewPath : undefined;
    });

    const datosLocalStorage = localStorage.getItem('usuario');

    // Si hay algo en el localStorage, muestra el botón
    if (datosLocalStorage) {
      this.mostrarBoton = true;
    }
    throw new Error('Method not implemented.');

  }
  async cargarRegion() {
    const req = await this.apiUbication.getRegion();
    this.regiones = req.data;
  }



  async cargarComuna() {
    this.seleccionComuna = false;
    const req = await this.apiUbication.getComuna(this.regionSel);
    this.comunas = req.data;
  }
  // onSubmit() {
  //     if (this.registerForm.valid) {
  //       console.log('Formulario enviado con éxito:', this.registerForm.value);
  //       this.alertController.create({
  //         header: 'Registro exitoso',
  //         message: '¡Felicitaciones! Ya estás registrado.',
  //         buttons: ['OK']
  //       }).then(alert => alert.present());
  //     } else {
  //       console.log('Formulario no válido');
  //     }

  //     this.userService.add(this.nombre);
  //     this.userService.add(this.email);
  //     this.userService.add(this.password);
  //     this.userService.add(this.rut);
  //     this.userService.add(this.fechaNacimiento);
  //     this.formularioServ= " ";
  // }

  async guardar() {
    var f = this.registerForm.value;

    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      this.alertController.create({
        header: 'Registro exitoso',
        message: '¡Felicitaciones! Ya estás registrado.',
        buttons: ['OK']
      }).then(alert => alert.present());
    } else {
      this.alertController.create({
        header: 'Ups',
        message: 'Completa correctamente todos los campos',
        buttons: ['Aceptar']
      }).then(alert => alert.present());




      // (this.registerForm.invalid){
      //   this.alertController.create({
      //     header: 'Ups',
      //     message: 'Completa correctamente todos los campos',
      //     buttons: ['Aceptar']
      //   }).then(alert => alert.present());

      // return
    }

    var usuario = {
      nombre: f.nombre,
      email: f.email,
      password: f.password,
      carrera: f.carrera,
      rut: f.rut,
      fechaNacimiento: f.fechaNacimiento
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
    console.log(usuario)
  }


  // async scan() {
  //   try {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: true,
  //       resultType: CameraResultType.Uri,
  //       source: CameraSource.Camera,
  //     });


  //   } catch (error) {
  //     console.log('Error en el scanner:', error);
  //   }
  // }

  // async takePicture() {
  //   try {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: true,
  //       resultType: CameraResultType.DataUrl,
  //       source: CameraSource.Camera
  //     });

  //     console.log('Imagen capturada:', image);
  //   } catch (error) {
  //     console.error('Error al tomar la foto:', error);
  //   }
  // }
}
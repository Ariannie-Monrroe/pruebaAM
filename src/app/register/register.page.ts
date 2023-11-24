import { Component, OnInit, booleanAttribute } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Router } from '@angular/router';
import { ApiUbicationService } from '../services/api-ubication.service';
import { Region } from '../models/region';
import { Comuna } from '../models/comuna';
import { Geolocation, GeolocationPosition, PositionOptions } from '@capacitor/geolocation';



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
  regiones: Region[] = [];
  comunas: Comuna[] = [];
  idRegion: number = 0;
  idComuna: number = 0;
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
    this.photo = '';
    this.regionSeleccionada = '';
    this.comunaSeleccionada = '';
    this.idRegion = 0;
    this.idComuna = 0;



    this.registerForm = this.formBuilder.group({
      // username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      nombre: ['', Validators.required],
      rut: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      fechaNacimiento: ['', Validators.required],
      carrera: ['', Validators.required],
      region: ['', Validators.required],
      comuna: ['', Validators.required],
      photo: ['', Validators.required],
      idRegion: [null, Validators.required],
      idComuna: [null, Validators.required],
    });

  }
  async ngOnInit() {
    this.cargarRegion();
    this.registerForm?.get('idRegion')?.valueChanges.subscribe((idRegion) => {
      if (idRegion) {
        this.idRegion = idRegion;
        this.cargarComuna();
      }
    });
    defineCustomElements(window);
    this.photoService.loadSaved().then((photo) => {
      this.photo = photo ? photo.webviewPath : undefined;
      this.registerForm?.get('photo')?.setValue(this.photo);
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
    const req = await this.apiUbication.getComuna(this.idRegion);
    this.comunas = req.data;
    console.log('Comunas cargadas:', this.comunas);
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery().then((photo) => {

    });
  }

  async guardar() {
    var f = this.registerForm.value;

    if (!this.registerForm.valid) {
      // console.log(this.registerForm.value);
      this.alertController.create({
        header: 'Ups',
        message: 'Completa correctamente todos los campos',
        buttons: ['Aceptar']
      }).then(alert => alert.present());

      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);

        if (control && control.invalid) {
          console.log(`Control '${key}' no es válido. Errores:`, control.errors);
        }
      });
    } else {
      this.alertController.create({
        header: 'Registro exitoso',
        message: '¡Felicitaciones! Ya estás registrado.',
        buttons: ['OK']
      }).then(alert => alert.present());
      const locationSel = await this.getCurrentLocation();
      const regionSeleccionada = this.regiones.find(region => region.id === this.idRegion);
      const comunaSeleccionada = this.comunas.find(comuna => comuna.id === this.idComuna);

      var usuario = {
        nombre: f.nombre,
        email: f.email,
        password: f.password,
        carrera: f.carrera,
        rut: f.rut,
        fechaNacimiento: f.fechaNacimiento,
        photo: f.photo,
        region: f.idRegion.nombre,
        comuna: f.idComuna.nombre,
        latitud: locationSel.latitude,
        longitud: locationSel.longitude,
      }
      console.log(f.region);
      this.userService.guardarUsuario(usuario);
      console.log(usuario)
      this.router.navigateByUrl("login");

    }
  }

  async getCurrentLocation() {
    const location = await Geolocation.getCurrentPosition();
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    var data = { latitude, longitude }
    return data
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




  // (this.registerForm.invalid){
  //   this.alertController.create({
  //     header: 'Ups',
  //     message: 'Completa correctamente todos los campos',
  //     buttons: ['Aceptar']
  //   }).then(alert => alert.present());

  // return



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

  // validarRut(rut: string) {
  //   if (!rut || rut.length < 3) {
  //     return false;
  //   }
  //   const rutSinFormato = rut.replace(/[^0-9kK-]/g, '');
  //   if (rutSinFormato.length < 3) {
  //     return false;
  //   }
  //   const split = rutSinFormato.split('-');
  //   if (split.length !== 2) {
  //     return false;
  //   }
  //   const num = parseInt(split[0], 10);
  //   const dgv = split[1];
  //   const dvCalc = this.dv(num);
  //   return dvCalc === dgv;
  // }
  // dv(T: any) {
  //   let M = 0;
  //   let S = 1;
  //   for (; T; T = Math.floor(T / 10)) {
  //     S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  //   }
  //   return S ? S - 1 : 'k';
  // }
}
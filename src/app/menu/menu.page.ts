import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, IonCard } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  user: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthServiceService) { }

  ngOnInit() {
    const userEmail = this.authService.getLoggedInUser(); // Obtiene el correo del usuario actual
    if (userEmail) {
      this.userService.obtenerDatosUsuarioActual().then(usuario => {
        if (usuario) {
          this.user = usuario; // Asigna el usuario actual a la variable user
        }
      });
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl("home");
  }
  loadAndConvertPhoto(photoPath: string) {

    const reader = new FileReader();
    fetch(photoPath)
      .then((response) => response.blob())
      .then((blob) => {
        reader.readAsDataURL(blob);
      });
    reader.onloadend = () => {
      this.user.photo = reader.result;
    };
  }

  scan() {
    this.router.navigateByUrl("scanner");
  }

}


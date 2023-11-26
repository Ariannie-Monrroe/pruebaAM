import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { UserService } from '../services/user.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ApiUbicationService } from '../services/api-ubication.service';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  qrResult: any = "";
  Titulo = "¡Scanner de registro de clases!"
  parametroIdEmpleado: number | undefined;
  resultadoScan: any = '';
  isScanning: boolean = false;
  usuario: any[] = [];
  user: any;
  separado: string[] = [];
  regiones: any[] = [];
  comunas: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiUbication: ApiUbicationService,
    private userService: UserService,
    private authService: AuthServiceService) { }

  async ngOnInit() {


    const userEmail = this.authService.getLoggedInUser();

    if (userEmail) {
      this.userService.obtenerDatosUsuarioActual().then(usuario => {
        if (usuario) {
          this.user = usuario;
          console.log("Bienvenido, " + usuario.nombreCompleto);
        }
      });
    }

    const regionesResponse = await this.apiUbication.getRegion();
    if (regionesResponse.success) {
      this.regiones = regionesResponse.data;
    }

    const comunasResponse = await this.apiUbication.getComuna(this.user.idRegion);
    if (comunasResponse.success) {
      this.comunas = comunasResponse.data;
    }
  }

  getNombreRegion(id: number): string {
    const region = this.regiones.find(r => r.id === id);
    return region;
  }

  getNombreComuna(id: number): string {
    const comuna = this.comunas.find((c) => c.id === id);
    return comuna ? comuna.nombre : 'Desconocida';
  }

  async scan() {
    this.isScanning = true;
  }

  onCodeResult(result: string) {
    this.qrResult = result;
    this.isScanning = false;
    this.separado = this.qrResult.split(',');
  }

  volver() {
    this.router.navigateByUrl("menu");
  }
}

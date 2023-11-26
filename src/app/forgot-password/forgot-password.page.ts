import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: any;
  storageService: any;

  constructor(private navCtrl: NavController,
    ){}

    async recoverPassword() {}
    

  goBack() {
    this.navCtrl.back();
  }
}

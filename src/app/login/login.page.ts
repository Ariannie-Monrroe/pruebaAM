import { Component } from '@angular/core';

@Component({
selector: 'app-login',
templateUrl: './login.page.html',
styleUrls: ['./login.page.scss'],
})
export class LoginPage {

constructor() { }

onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulario válido:', form.value);
    } else {
      console.log('Formulario inválido');
    }
}
}
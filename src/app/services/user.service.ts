import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  formularioServ: any[] = []

  add(formularioServ: any){
    this.formularioServ.push(formularioServ)
  }  

  getUsers() {
    return this.formularioServ;
  }
}

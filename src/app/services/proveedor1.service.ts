import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Proveedor1Service {

  public idUsuario: number;
  public telefono: string;
  public ubicacion: string;
  constructor(
    public http: HttpClient
  ) {
    console.log('Hola Proveedor1');
  }
  

}

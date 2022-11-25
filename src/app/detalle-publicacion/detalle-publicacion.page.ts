import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Proveedor1Service } from '../services/proveedor1.service';


@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.page.html',
  styleUrls: ['./detalle-publicacion.page.scss'],
})
export class DetallePublicacionPage implements OnInit {


  publicaciones: any = [];
  publicacionesF: any = [];
  vendedores: any = [];
  trocador: any;
  telefono: string;
  ubicacion: string;
  constructor(private Http: HttpClient,
    public proveedor: Proveedor1Service) { }

  ngOnInit() {
    
    this.getPublicaciones().subscribe(res => {
      console.log("Res", res);
      this.publicaciones = res;

      this.publicacionesF = this.publicaciones.filter((listaItem) => listaItem.usuarioId === this.proveedor.idUsuario);
      this.telefono = this.proveedor.telefono;
      this.ubicacion = this.proveedor.ubicacion;
      

      // var iframe = document.getElementById("frame1");

      // iframe.setAttribute("src", this.ubicacion);
    })
    
  }
  prueba() {

    var ruta = this.ubicacion;

    var iframe = document.getElementById("frame1");

    iframe.setAttribute("src", ruta);

  }

  getPublicaciones() {
    return this.Http
      .get("assets/files/publicaciones.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )
  }


}

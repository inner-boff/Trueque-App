import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Proveedor1Service } from '../services/proveedor1.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  users: any = [];
  searchedUser: any;

  permission: boolean;
  constructor(
    private router: Router,
    private Http: HttpClient,
    public proveedor: Proveedor1Service) { }

  ngOnInit() {
    this.permission = true;
    this.getUsers().subscribe(res => {
      console.log("Res", res);
      this.users = res;
      this.searchedUser = this.users;
    });
  }
  goToHome() {
    this.router.navigate(['/home'])
  }

  getUsers() {
    return this.Http
      .get("assets/files/vendedor.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )

  }
  searchCustomer(event) {
    const text = event.target.value;
    this.searchedUser = this.users;
    if (text && text.trim() != '') {
      this.searchedUser = this.searchedUser.filtler((user: any) => {
        return (user.name.toLowerCase().indexOf(text.toLoweCase()) > -1);
      })
    }
  }

  IrAPublicacion(numeroId: number, telefono:string, ubicacion: string){
this.proveedor.idUsuario = numeroId;
this.proveedor.telefono = telefono;
this.proveedor.ubicacion = ubicacion;
this.router.navigate(['/detalle-publicacion']);
  }
}

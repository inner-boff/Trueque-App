import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Proveedor1Service } from 'src/app/services/proveedor1.service';

@Component({
  selector: 'app-comentarios-component',
  templateUrl: './comentarios-component.component.html',
  styleUrls: ['./comentarios-component.component.scss'],
})
export class ComentariosComponentComponent implements OnInit, OnDestroy {

  comentario = '';
  comentarios: Comentario[] = []; 

  suscriber: Subscription;
  suscriberUserInfo: Subscription;
  
  constructor(
    private authService: AuthService,
    public database: AngularFirestore,
    public proveedor: Proveedor1Service
  ) { }
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {}

  loadCommentarios() {
    let startAt = null;
    if(this.comentarios.length) {
        startAt = this.comentarios[ this.comentarios.length - 1].fecha;
    }
    const path = 'Productos/' +  this.proveedor.idLugar+ '/comentarios';
    this.suscriber = this.authService.getCollectionPaginada<Comentario>(path, 3, startAt).subscribe( res => {
         if (res.length) {
            res.forEach( comentario => {
                const exist = this.comentarios.find( commentExist => {
                       commentExist.id === comentario.id   
                });
                if (exist === undefined) {
                  this.comentarios.push(comentario);
                }
            });
            // this.comentarios = res;
            console.log(res);
         }
    } );

  }

  // comentar() {
  //    const comentario = this.comentario;
  //    console.log('comentario ->' , comentario);
  //    const path = 'Productos/' +  this.proveedor.idLugar + '/comentarios';
  //    const data: Comentario = {
  //       autor: this.authService.datosCliente.nombre,
  //       comentario: comentario,
  //       fecha: new Date(),
  //       id: this.authService.getId()
  //    }
  //    this.firestoreService.createDoc(data, path, data.id).then( () => {
  //        console.log('comentario enviado');
  //        this.comentario = '';
  //    });
  // }


  

}
interface Comentario {
  autor: string;
  comentario: string;
  fecha: any;
  id: string;
}
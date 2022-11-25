import { Component } from '@angular/core';
import { collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { Cliente } from '../models';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { FirestorageService } from '../services/firestorage.service';
import { Proveedor1Service } from '../services/proveedor1.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;

  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    password: '',
    foto: '',
   
    nombre: '',
    
  };

  uid = '';

  
  constructor(
   
    private authService: AuthService,
    private router: Router,
    public proveedor: Proveedor1Service,
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public firestorageService: FirestorageService,
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
      //this.firestorageService.database.collectionGroup();
    })
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true })
  }

  async changeImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // camara, fotos o prompt
      
    });
    console.log('esta es la imagen:' + image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: "Falló la carga de imagen",
          message: "Ocurrió un problema al cargar tu avatar",
          buttons: ['OK'],
        });
        await alert.present();
      }
    }

  }

  // cargarImagenDelRegistro() {
  //   const user = this.firestorageService.getUserProfile()
    
  // }

  initCliente() {
    this.uid = '';
    this.cliente = {
      uid: '',
      email: '',
      celular: '',
      password: '',
      foto: '',
      nombre: '',
      
    };
    console.log(this.cliente);
}

  mostrarImagen(){
    this.cliente.foto;
    console.log( this.cliente.foto);
  }

  mostrarFoto(){
    this.cliente.email;
  }


}

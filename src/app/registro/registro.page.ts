import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestorageService } from '../services/firestorage.service';
import { Subscription } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  cliente: Cliente = {
    uid: '',
    email: '',
    celular: '',
    password: '',
    foto: '',
   
    nombre: '',
    
  };

  newFile: any;

  uid = '';

  


  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public firestorageService: FirestorageService,
    private authService: AuthService,
    
    private router: Router,

  ) { 

  }
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
suscriberUserInfo: Subscription;
  // get email() {
  //   return this.credentials.get('email');
  // }

  // get password() {
  //   return this.credentials.get('password');
  // }


  ngOnInit() {
    // this.credentials = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // })
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  getUserInfo(uid: string) {
    console.log('getUserInfo');
    const path = 'Clientes';
    this.suscriberUserInfo = this.firestorageService.getDoc<Cliente>(path, uid).subscribe( res => {
           if (res !== undefined) {
             this.cliente = res;
           }
    });
}

  // async registrarse() {
  //   const loading = await this.loadingController.create();
  //   await loading.present();

  //   const user = await this.authService.register(this.credentials.value);
  //   await loading.dismiss();

  //   if (user) {
  //     this.router.navigateByUrl('/login', { replaceUrl: true });
  //   } else {
  //     this.showAlert('Falló el registro', 'Por favor intente de nuevo');
  //   }
  // }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
        this.newFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = ((image) => {
            this.cliente.foto = image.target.result as string;
        });
        reader.readAsDataURL(event.target.files[0]);
      }
   }

 
  async registrofirebase() {
    const loading = await this.loadingController.create();
     await loading.present();
    const credenciales = {
        email: this.cliente.email,
        password: this.cliente.password,
    };
    const res = await this.authService.registrar(credenciales.email, credenciales.password).catch( err => {
       
      console.log( 'error -> ',  err);
        this.showAlert('Falló el registro', 'Por favor intente de nuevo');
        this.router.navigateByUrl('/login', { replaceUrl: false});
    });
    const uid = await this.authService.getUid();
    this.cliente.uid = uid;
    this.guardarUser();
    
    await loading.dismiss();
    this.showAlert('Usuario Registrado correctamente', 'Gracias por registrarse');
    this.router.navigateByUrl('/login', { replaceUrl: true });

 }


async guardarUser() {

// Al sustituir este path pude empezar a ver las fotos en FirestoreDatabase
//const path = 'Clientes';

const name = this.cliente.nombre;
//const path = 'fotosRegistro/' + this.uid;

const path = 'fotosRegistro/';
//const path = 'Clientes/fotosRegistro/';

if (this.newFile !== undefined) {
  const res = await this.firestorageService.uploadImage(this.newFile, path, name);
  this.cliente.foto = res;

  console.log(this.newFile);
}
this.firestorageService.createDoc(this.cliente, path, this.cliente.uid).then( res => {
    console.log('guardado con exito');
}).catch( error => {console.log(error);
});



}


 
}

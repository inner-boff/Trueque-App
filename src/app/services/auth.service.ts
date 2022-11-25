import { Injectable } from '@angular/core';
// importamos para la autorización:
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models';
import { FirestorageService } from './firestorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  datosCliente: Cliente;
  // complentamos el constructor
  constructor(

    private auth: Auth,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router,
    public firestorageService: FirestorageService,
    public database: AngularFirestore



  ) { }

  // y las siguienets funciones
  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

 //metodo de pame que valida el mail
 async recuperarContraseña(email: string){
  try {
    const user = await this.afAuth.sendPasswordResetEmail(email);
    //console.log(user)
    this.showAlert('Enviado! ', 'Por favor revise su casilla de mail');
    console.log("El mail está registrado - enviando correo de recuperación")
    //return user;
    this.volver();
  } catch (e) {
    
    this.showAlert('Disculpe ', 'El correo no está registrado. Registre un nuevo usuario.');
    console.log("El mail no está registrado")
  }

  }
  
  // para poder mostrar mensajes de alerta
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  volver(){
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
    if (startAt == null) {
      startAt = new Date();
    }
    const collection = this.database.collection<tipo>(path, 
      ref => ref.orderBy('fecha', 'desc')
                .limit(limit)
                .startAfter(startAt)
      );
    return collection.valueChanges();
  }
  registrar(email: string, password: string) {
 
    return this.afAuth.createUserWithEmailAndPassword(email, password);
    
 }

 async getUid() {
  const user = await this.auth.currentUser;
  if (user === null) {
    return null;
  } else {
     return user.uid;
  }
}


stateAuth() {
  return this. afAuth.authState;
}

async getInfoUser() {
   const uid = await this.getUid();
   const path = 'Clientes';  
   this.firestorageService.getDoc<Cliente>(path, uid).subscribe( res => {
         if (res !== undefined) {
               this.datosCliente = res;
               // console.log('datosCliente ->' , this.datosCliente);
         }
   });
}

}

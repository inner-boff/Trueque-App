import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//firebase
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from 'src/environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideStorage, getStorage } from '@angular/fire/storage'
import { provideAuth, getAuth, initializeAuth, indexedDBLocalPersistence } from '@angular/fire/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

// Para poder usar los servicios que traen la info de la API
import { HttpClientModule } from '@angular/common/http'; //Para conectarnos con un cliente externo a través de HTTP
import { Proveedor1Service } from './services/proveedor1.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Capacitor } from '@capacitor/core';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, HttpClientModule,AngularFireAuthModule, 
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),//esto es lo que nos permite que nuestro formulario funcione
    //provideAuth(() => getAuth()),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence,
        });
      } else {
        return getAuth();
      }
    }
    ),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    
    
    AngularFireModule.initializeApp(environment.firebaseConfig),//esto es lo que permite que nuestro forulario funcione
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
   
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Proveedor1Service],
  bootstrap: [AppComponent],
})
export class AppModule {}

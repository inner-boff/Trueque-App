import { Injectable } from '@angular/core';
//import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
//import { Fdoc, docData, Firestore, setDoc  } from '@angular/fire/firestore';
//import { Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';

import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(
    public storage: AngularFireStorage,
    public database: AngularFirestore,

    // cosas del ejemplo del tutorial de avatares:
    private auth: Auth,
    private firestore: Firestore,
    private storage2: Storage

    ) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
}
getDoc<tipo>(path: string, id: string) {
  const collection = this.database.collection<tipo>(path);
  return collection.doc(id).valueChanges();
}

  uploadImage(file: any, path: string, nombre: string): Promise<string> {
      return new Promise(  resolve => {
          const filePath = path + '/' + nombre;
          const ref = this.storage.ref(filePath);
          const task = ref.put(file);
          task.snapshotChanges().pipe(
            finalize(  () => {
                  ref.getDownloadURL().subscribe( res => {
                    const downloadURL = res;
                    resolve(downloadURL);
                    return;
                  });
            })
         )
        .subscribe();
      });
}

// aqui en teoria estamos guardando la info del usuario
getUserProfile() {
  const user = this.auth.currentUser;
 
}

 }

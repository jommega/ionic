import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class VerfotosfavService {

  constructor(private storage: Storage) { }


public getAll() {
 
    let matriz: FavoritosImg[] = [];
 
    return this.storage.forEach((value: Favoritos, key: string, iterationNumber: Number) => {

      if (key != 'USER_INFO' && key != 'TEMP_BROW' && key != 'TEMP_CLAVE' && key != 'TEMP_CORREO' && key != 'TEMP_DISP' && key != 'TEMP_EDAD' &&  key != 'TEMP_SIST' &&  key != 'TEMP_TELE' &&  key != 'TEMP_USER' ) {
          let datos = new FavoritosImg();
          datos.key = key;
          datos.datos = value;
          matriz.push(datos);
      }
    })
      .then(() => {
        let items = JSON.stringify(matriz)
        let tlfg = JSON.parse(items)
        //  console.log(JSON.parse(items)) 

        return Promise.resolve(tlfg);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Favoritos {
  favoritoid: number;
  nombreimg: string;
  fechainicial: Date;
  fechafinal: Date;
  empresaimagen: string;
}
 
export class FavoritosImg {
  key: string;
  datos: Favoritos;
}
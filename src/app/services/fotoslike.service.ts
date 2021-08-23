import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotosLikeService {
  url = 'https://offercitypty.com/offercity/action.php?type=MegustaLike';

  elusuario:string;

  constructor(public http: HttpClient) { }
  
  getLikefotos(idruta: any, laempresa: any) {
    return new Promise(resolve => {
      this.http.get(this.url+'&codigo1='+laempresa+'&nacatal='+idruta+'&usuario=')
      .subscribe((data: any) => {
        resolve(data.records);
      }, error => {
        console.log(error);
      });
    });
  }
}

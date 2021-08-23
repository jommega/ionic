import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewcatsort';

  constructor(public http: HttpClient) { }
  
  getCategorias() {
    return new Promise(resolve => {
      this.http.get(this.url)
      .subscribe((data: any) => {
        resolve(data);
      }, error => {
        //console.log(error);
      });
    });
  }
}

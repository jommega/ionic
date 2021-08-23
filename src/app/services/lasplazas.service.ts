import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GotPlazasService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewplaz';

  constructor(public http: HttpClient) { }
  
  getLasPlazas(laplaza : any) {
    return new Promise(resolve => {
      this.http.get(this.url+'&filtro='+laplaza)
      .subscribe((data: any) => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }
}

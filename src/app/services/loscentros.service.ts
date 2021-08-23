import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GotCentrosService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewcent';

  constructor(public http: HttpClient) { }
  
  getLosCentros(elcentro : any) {
    return new Promise(resolve => {
      this.http.get(this.url+'&filtro='+elcentro)
      .subscribe((data: any) => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }
}

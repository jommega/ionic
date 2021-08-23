import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecienteService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewrecientes';

  constructor(public http: HttpClient) { }
  
  getOfertasRecientes() {
    return new Promise(resolve => {
      this.http.get(this.url)
      .subscribe((data: any) => {
        /* console.log(data); */
        resolve(data);
      }, error => {
        /* console.log(error); */
      });
    });
  }
}

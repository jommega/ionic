import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlazaService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewgrupoplazas';

  constructor(public http: HttpClient) { }
  
  getPlazas() {
    return new Promise(resolve => {
      this.http.get(this.url)
      .subscribe((data: any) => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }
}

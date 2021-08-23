import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GotZonaLibreService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewzona';

  constructor(public http: HttpClient) { }
  
  getZonaLibre() {
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

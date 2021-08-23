import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewgrupocentros';

  constructor(public http: HttpClient) { }
  
  getCentros() {
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

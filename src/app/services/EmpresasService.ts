import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewemp';
  
  constructor(public http: HttpClient) { }
  
  getEmpresas() {
    return new Promise(resolve => {
      this.http.get(this.url)
      .subscribe((data: any) => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  };
}

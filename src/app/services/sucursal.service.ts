import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  url = 'https://offercitypty.com/offercity/apiaction.php?type=viewemp2';

  constructor(public http: HttpClient) { }
  
  getSucursal(laempresa : any) {
    return new Promise(resolve => {
      this.http.get(this.url+'&filtro='+laempresa)
      .subscribe((data: any) => {
        resolve(data.records);
      }, error => {
        console.log(error);
      });
    });
  }
}

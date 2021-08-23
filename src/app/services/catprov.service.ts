import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CatprovService {
  url = 'https://www.offercitypty.com/offercity/scripts/vercatalogo.php';
  url2 = 'https://www.offercitypty.com/OfertasCPL/wp-admin/admin-ajax.php?action=mstoreapp-vendors';
  url3 = 'https://www.offercitypty.com/OfertasCPL/wp-admin/admin-ajax.php?action=mstoreapp-products';

  idruta: string;
  
  constructor(public http: HttpClient) { 
    
  }

  getCatalogos(idruta: any)  {
    return new Promise(resolve => {
      this.http.get(this.url+'?direccion=' + idruta)
      .subscribe((data: any) => {
        resolve(data.files);
      }, (error: any) => {
        //console.log(error);
      });
    });
  }

  getVendors() {
    return new Promise(resolve => {
      this.http.get(this.url2)
      .subscribe((data: any) => {
        console.log(data);
        resolve(data);
      }, (error: any) => {
        console.log(error);
      });
    });
  }
 
    getProducts() {
    return new Promise(resolve => {
      this.http.get(this.url3)
      .subscribe((data: any) => {
        console.log(data);
        resolve(data);
      }, (error: any) => {
        console.log(error);
      });
    });
  }
  
  getSliders(idruta: any)  {
    //console.log(this.url+'?direccion=' + idruta)
    return new Promise(resolve => {
      this.http.get(this.url+'?direccion=' + idruta)
      .subscribe((data: any) => {
        resolve(data.files);
      }, (error: any) => {
        //console.log(error);
      });
    });
  }
}
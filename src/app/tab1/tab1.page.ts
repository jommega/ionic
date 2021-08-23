/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ProveedorService } from './../services/ProveedorService';
import { VistaCatalogoPage } from './../modals/vistacatalogo/vercatalogo.page';
import { CatprovService } from './../services/catprov.service';
import { CategoriaService } from './../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage-angular';
import { VerfotosfavService, Favoritos, FavoritosImg } from '../services/verfotosfav.service';
import { LoaderService } from './../services/loading.service';
import { LoadingController} from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { StarRatingModule } from 'ionic5-star-rating';


declare let WooCommerceAPI: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  Ofertones: any = [];
  public favoritosimg: String ;
  CategoriasList: any = [];
  idcatalogo: any;
  idruta: any;
  CatalogosArray: any = [];
  SlidersArray: any = [];
  nombrecomp: any;
  rutadelcatalogo: any;
  isSearchbarOpened: boolean;
  index: number;
  public searchTerm = '';
  public totalcart: any ;
  // searchTerm: any = { nombredeempresa: '' };
  isLoading = false;
  A1: any;
  nombreuser: any;
  imagenuser: any;

      WooCommerce = WooCommerceAPI.WooCommerceAPI({
      url: "https://www.offercitypty.com/OfertasCPL/",
      consumerKey: "ck_574e5b8815ba02ae9d21de600d1bde0674aaa1fe",
      consumerSecret:"cs_22d89b946715a010ec3a478d8ae45994da785f59",
      wpAPI: true,
      queryStringAuth: true,
      version: 'wc/v3'
    });

  constructor(
    private navCtrl: NavController,
    public proveedorServicio: ProveedorService,
    private modalControler: ModalController,
    public catalogoService: CatprovService,
    private categoriaService: CategoriaService,
    private menuCtrl: MenuController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private authService: AuthenticationService,
    private verfotosfavService: VerfotosfavService,
    private storage: Storage,
    public loadincontroller: LoadingController,
    public loading: LoaderService,
    public http: HttpClient
  ) {  }



  async ngOnInit() {
    this.storage.get('TotalCart').then((val) => {
      this.totalcart = val;
    });

    await this.storage.get('USER_INFO').then((response) => {
      if (response) {
            this.A1 = response;
      } else {
            this.A1 ={ 'nombrecompleto': '',
                       'imagenusuario': '' };
      }
    });


    this.nombreuser = this.A1.nombrecompleto;
    this.imagenuser = this.A1.imagenusuario;

    await this.nombreuser;
    await this.imagenuser;
    this.nombrecomp = null;
    this.loading.showLoader();

    setTimeout(() => {
      this.hideLoader();
    }, 2000);

    this.WooCommerce.getAsync("products").then((data: { body: string }) => {
      console.log(JSON.parse(data.body));
    }, (err) => {
      console.log(err);
    });

    this.WooCommerce.getAsync("coupons").then((data: { body: string }) => {
      console.log(JSON.parse(data.body));
    }, (err) => {
      console.log(err);
    });

    this.WooCommerce.getAsync("products/categories/?per_page=100").then((data: { body: string }) => {
      console.log(JSON.parse(data.body));
    }, (err) => {
      console.log(err);
    });

    this.catalogoService.getVendors();
    this.catalogoService.getProducts();
    this.getSliders('../imagenes/sliders/');
    this.getOfertas();
    this.getCategorias();
    this.hideLoader();

  }


  async showLoader() {
    this.loading.showLoader();

    setTimeout(() => {
      this.hideLoader();
    }, 2000);
  }

  async hideLoader() {
     this.loading.hideLoader();
  }

  ionViewDidEnter() {
    this.verfotosfavService.getAll().then((result) => {
        this.favoritosimg = result;
      });
    this.hideLoader();

    }

  ionViewDidLoad() {
    console.log('not fired on entering a view that is already cached');
  }

  ionViewWillEnter() {
    this.hideLoader();
        document.querySelector('#tab-button-tab3').shadowRoot.querySelector('.button-native').setAttribute('style', 'margin-top: -2px');

  }


  async openModal(idcatalogo: any) {
    this.showLoader();
    this.sendPostRequest(idcatalogo.idofertas);
    const Ofertacatalogo: any  = idcatalogo;
    const modal = await this.modalControler.create({
      component: VistaCatalogoPage,
      componentProps: {
        nombrecomp: Ofertacatalogo.nombredeempresa,
        correoemp: Ofertacatalogo.correo,
        rutacatalogo: Ofertacatalogo.rutacatalogo,
        telempresa: Ofertacatalogo.telefono1,
        telempresa2: Ofertacatalogo.telefono2,
        hayzona: Ofertacatalogo.eszonalibre,
        haycoti: Ofertacatalogo.escotizable,
        haycompra: Ofertacatalogo.escompra,
        hayhotel: Ofertacatalogo.eshotel,
        laempresa: Ofertacatalogo.codempresa,
        fecini: Ofertacatalogo.inicia,
        fecfin: Ofertacatalogo.termina,
        faltando: Ofertacatalogo.faltan,
        totalcarrito: this.totalcart
      }
    });
    return modal.present();
  }



    async sendPostRequest(idoferta: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;' );
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data =  {
      'idoferta':  idoferta
  };

    const formData = Utility.convertModelToFormData(data);
    const params = new HttpParams().append('type', 'addvisitcatalog').append('', JSON.stringify(data));



    //console.log(FormData)
    this.http.post<any>('https://www.offercitypty.com/offercity/apiaction.php', formData , {'headers':headers, 'params': params})
      .subscribe(data => {
        /* console.log(data); */
       }, error => {
        /* console.log(error); */
      });
  }

/*
  logoutUser(){
    this.authService.logout();
  } */

  trackByFn(index: any, ofertas: any) {
/*     console.log(index,ofertas); */
    return ofertas.empresa;
  }

  toggleMenu() {
    this.menuCtrl.toggle('mycontent');
  }

  doRefresh(event: any) {
    this.getOfertas();

    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  // ** Funcion para ordenar las Categorias **/

async  getOfertas() {
    // llamamos a la funcion getOfertas de nuestro servicio.
    this.proveedorServicio.getOfertas().then(data => {
      this.Ofertones = data;
      /* console.log(data); */
    });
  }

async  getCategorias() {
    // llamamos a la funcion getOfertas de nuestro servicio.
    this.categoriaService.getCategorias().then(data => {
      this.CategoriasList = data;
      /* console.log(data); */
    });
  }

async getSliders(idsliders: any) { // llamamos a la funcion getPost de nuestro servicio.
  //console.log(idsliders)
  this.catalogoService.getSliders(idsliders)
    .then(data => {
      this.SlidersArray = data;
      /* console.log(data); */
    });
}

 async getCatalogos(idruta: any) {
    // llamamos a la funcion getCatalogos de nuestro servicio.
    this.catalogoService.getCatalogos(idruta).then(data => {
      this.CatalogosArray = data;
      /* console.log(data); */
    });
  }
}

export class Utility {
    public static convertModelToFormData(model: any, form: FormData = null, namespace = 'data'): FormData {
        const formData = form || new FormData();
        let formKey: any;

        for (const propertyName in model) {
            if (!model.hasOwnProperty(propertyName) || !model[propertyName]) { continue; }
            const formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
            if (model[propertyName] instanceof Date) {
                formData.append(formKey, model[propertyName].toISOString());
            } else if (model[propertyName] instanceof Array) {
                model[propertyName].forEach((element, index) => {
                    const tempFormKey = `${formKey}[${index}]`;
                    this.convertModelToFormData(element, formData, tempFormKey);
                });
            } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
                this.convertModelToFormData(model[propertyName], formData, formKey);
 } else {
                formData.append(formKey, model[propertyName].toString());
 }
        }
        return formData;
    }
}

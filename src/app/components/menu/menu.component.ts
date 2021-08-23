/* eslint-disable eqeqeq */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent   {
  public A1: any;
  public nombreuser: any;
  public imagenuser: any;

  public appMenu = [
    { title: 'INICIO', url: '/tabs/tab1', icon: 'home' },
    { title: 'NEGOCIOS', url: '/tabs/tab3', icon: 'briefcase' },
    { title: 'OFERTAS RECIENTES', url: 'recientes', icon: 'pricetag' },
    { title: 'CENTROS COMERCIALES', url: 'centros', icon: 'business' },
    { title: 'ZONA LIBRE', url: 'zonalibre', icon: 'business' },
    { title: 'PLAZAS COMERCIALES', url: 'plazas', icon: 'business' },
    { title: 'DONDE ESTOY', url: 'localdirection', icon: 'pin' },
    { title: 'MIS FAVORITOS', url: 'favoritos', icon: 'star' },
    { title: 'CERRAR SESIÓN', url: 'RemoveStorge', icon: 'log-out' },
  ];
  constructor(
    private router: Router,
    public storage: Storage,
    private navCtrl: NavController,
  ) {  }

  async ngOnInit() {
    await this.storage.get('USER_INFO').then((response) => {
      if (response) {
            this.A1 = response;
            /* console.log(this.A1) */
                this.nombreuser = this.A1.nombrecompleto;
                this.imagenuser = this.A1.imagenusuario;
      } else {
            this.A1 ={ 'nombrecompleto':'',
                       'imagenusuario':'' };
      }
    });
  }

  ionViewWillEnter() {
    //console.log('entre muchas gracias')
  }

  ionViewDidEnter() {
    //console.log('entre en did')
  }
  async RemoveStorge() {
    await this.storage.remove('USER_INFO');
    this.navCtrl.navigateRoot('/loginform');
  }

  navigateMenu(tag: any) {
    if (tag == 'RemoveStorge')  {
          this.RemoveStorge();
      } else {
          this.router.navigate([tag]);
      };

  }
}

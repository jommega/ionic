/* eslint-disable @typescript-eslint/semi */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ModalController, LoadingController } from '@ionic/angular';
import { VistaCatalogoPage } from './modals/vistacatalogo/vercatalogo.page';
import { LoaderService } from './services/loading.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
// import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private db: IDBDatabase;
  public A1: any;
  public nombreuser: any;
  public imagenuser: any;
  public A2: any;
  public A3: any;
  public A4: any;
  public A5: any;
  public A6: any;
  public A7: any;
  public A8: any;
  public A9: any;
  public AA: any;
  public AB: any;
  public AC: any;
  public AD: any;
  public AE: any;
  public AF: any;
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private authenticationService: AuthenticationService,
    private storage: Storage,
    private alertCtrl: AlertController,
    public http: HttpClient,
    private modalControler: ModalController,
    public loadincontroller: LoadingController,
    public loading: LoaderService, private androidPermissions: AndroidPermissions) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      await this.storage.create();
/*       if (this.platform.is("cordova")) {
          this.setupPush();
          this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
            result => console.log('Has permission?',result.hasPermission),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
          );

          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
                } */
    });
  }

  showLoader() {
    this.loading.showLoader();

    setTimeout(() => {
      this.hideLoader();
    }, 2000);
  }

  async hideLoader() {
     this.loading.hideLoader();
  }

  async presentAlertConfirm(title: any, msg: any, task: any, datos: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Abrir',
          handler: () => {
            this.VerificaNotificacion(task);
            ;
          }
        }
      ]
    });
    alert.present();
  }

  async showAlert(title: any, msg: any, task: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'Action: ${task}',
          handler: () => {
            // E.g: Navigate to a specific screen
          },
        },
      ],
    });
    alert.present();
  }

  async VerificaNotificacion(impdata: any) {
    var headers = new HttpHeaders();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=utf-8;'
    );
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    let data = {
      type: 'checkemail',
      filtro: impdata.codempresa,
    };
    var params = new HttpParams()
      .append('type', 'viewofertasfiltro')
      .append('filtro', impdata.codempresa);

    let formData = Utility.convertModelToFormData(data);

    //console.log(JSON.stringify(formData));
    //console.log(impdata);
    this.http
      .get<any>('https://www.offercitypty.com/offercity/apiaction.php', {
        headers: headers,
        params: params,
      })
      .subscribe(
        (data) => {
          //console.log(data);

          let offcity = data;
          let titufilter = '';
          let enteredValue = impdata.codempresa;

          if (impdata.tipo === 'verofertas') {
            var nombreregi = this.A1.nombrecompleto;
            var data = offcity[0];

            if (data.codempresa === enteredValue) {
                 this.showAdvancedNotification(data);
              }
            }
        },
        (error) => {
          //console.log(error);
        }
      );
  }

  async showAdvancedNotification(a1: any) {
    this.showLoader()
    let Ofertacatalogo: any  = a1;
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
        faltando: Ofertacatalogo.faltan
      }
    });
    return modal.present();
  }
}

export class Utility {
  public static convertModelToFormData(
    model: any,
    form: FormData = null,
    namespace = ''
  ): FormData {
    let formData = form || new FormData();
    let formKey: any;

    for (let propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue;
      let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
      if (model[propertyName] instanceof Date)
        formData.append(formKey, model[propertyName].toISOString());
      else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element, index) => {
          const tempFormKey = `${formKey}[${index}]`;
          this.convertModelToFormData(element, formData, tempFormKey);
        });
      } else if (
        typeof model[propertyName] === 'object' &&
        !(model[propertyName] instanceof File)
      )
        this.convertModelToFormData(model[propertyName], formData, formKey);
      else formData.append(formKey, model[propertyName].toString());
    }
    return formData;
  }
}

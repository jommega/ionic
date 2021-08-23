import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ModalController,  NavParams, ActionSheetController, Platform } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { CatprovService } from './../../services/catprov.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage-angular';
import { finalize } from 'rxjs/operators';
import { stringify } from 'querystring';
import { CotizarPage } from './../../cotizar/cotizar.page';
import { ComprasPage } from './../../compras/compra.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

@Component({
  selector: 'app-vistacatalogo',
  templateUrl: 'vercatalogo2.page.html',
  styleUrls: ['vercatalogo2.page.scss'],
})


export class VistaCatalogoPage2  {
  @ViewChild('slides', {static: true}) slides: IonSlides;

   public rutacatalogo: any;
   public telempresa: any;
   public emailempresa: any;
   public hayzona: any;
   public haycoti: any;
   public haycompra: any;
   public hayhotel: any;
   public laempresa: any;
   public nombrecomp: any;
   public lafechaini: any;
   public lafechafin: any;
   public losdiasfaltan: any;
   public telefonoallamar: any;
   public telefonoallamar2: any;

  public contador: number;
  public total: number;
  totlikes: number;
  segment = 0;
  public idruta: any = { rutacat: '' };
  CatalogosArray: any = [];
  FotosLikeArray: any = [];
  slideOptsOne = {
    initialSlide: 1,
    speed: 300,
    effect: 'flip',
    zoom: true,
    loop: true,
  };
  actionSheet: any;

  rutapasada = null;
  public fileTransfer: FileTransferObject = this.transfer.create();

  constructor(private modalController: ModalController, public catalogoService: CatprovService,
              private parametro: NavParams, private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing, private file: File, private filePath: FilePath,
              private androidPermissions: AndroidPermissions, private transfer: FileTransfer,
              public toastController: ToastController, private loadingController: LoadingController,
              private http: HttpClient, private platform: Platform, private storage: Storage, 
              private callNumber: CallNumber, private photoLibrary: PhotoLibrary) {

                      //   console.log(this.parametro.get('rutacatalogo'));
                         this.idruta = this.parametro.get('rutacatalogo');
                         this.emailempresa = this.parametro.get('correoemp');
                         this.laempresa = this.parametro.get('laempresa');
                         this.lafechaini = this.parametro.get('fecini');
                         this.lafechafin = this.parametro.get('fecfin');
                         this.losdiasfaltan = this.parametro.get('faltando');
                         this.telefonoallamar = this.parametro.get('telempresa');
                         this.telefonoallamar2 = this.parametro.get('telempresa2');
                         //   console.log(this.parametro.get('laempresa'));
                      //   this.getLikefotos(this.idruta, this.laempresa);
                         this.getCatalogos();
                      //   this.GetMatch(this.CatalogosArray, this.FotosLikeArray);
                         this.contador = 1;
                      //   console.log(this.total, this.contador);
                      //   console.log(this.CatalogosArray, this.FotosLikeArray);
              }

async closeModal(){
  await this.modalController.dismiss(); }

async openModal() {
let Ofertacatalogo: any;
const modal = await this.modalController.create({
  component: CotizarPage,
  componentProps: {
    imagenamostrar : this.CatalogosArray[this.contador - 1].file,
    correoempresas : this.emailempresa
  }
});
return modal.present();
}

async openModalCompras() {
let Ofertacatalogo: any;
const modal = await this.modalController.create({
  component: ComprasPage,
  componentProps: {
    imagenamostrar : this.CatalogosArray[this.contador - 1].file,
    correoempresas : this.emailempresa
  }
});
return modal.present();
}

slideChanged(events: any) {
  this.slides.getActiveIndex().then((index: number) => {
      this.contador  = index + 1;
      this.totlikes = this.CatalogosArray[this.contador - 1].totallikesfotos;
      // console.log(this.contador, this.totlikes);
  });
}


launchDialer(n: string){
        this.callNumber.callNumber(n, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
}

  presentActionSheet() {
    this.actionSheet = this.actionSheetController.create({
      header: 'Seleccion una opcion',
      buttons: [{
        text: 'Whatsapp',
        role: 'share',
        icon: 'logo-whatsapp',
        handler: () => {
          this.whatsappShare('Compartido desde Ofertas Panama Media Group - Descargala desde la Play Store (Android) o la Appstore (Iphone)');
        }
      }, {
        text: 'Correo',
        icon: 'mail',
        handler: () => {
          this.enviaraemail('Ofertas Panamá Media Group --- ' + 'Imagen del Catalogo de ' + this.nombrecomp);
        }
      }, {
        text: 'Guardar',
        icon: 'save',
        handler: () => {
          this.savetoRoll();
        }
      }, {
        text: 'Mis Favoritos',
        icon: 'heart',
        handler: () => {
          this.startUpload(this.CatalogosArray[this.contador - 1].file);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          /* console.log('Cancel clicked'); */
        }
      }]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }

presentActionSheet2() {
    this.actionSheet = this.actionSheetController.create({
      header: 'Seleccion una opcion',
      buttons: [{
        text: this.telefonoallamar,
        icon: 'call',
        handler: () => {
          this.launchDialer(this.telefonoallamar);
        }
      }, {
        text: this.telefonoallamar2,
        icon: 'call',
        handler: () => {
          this.launchDialer(this.telefonoallamar2);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          /* console.log('Cancel clicked'); */
        }
      }]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }


async GetMatch(b: any, a: any) {
  //console.log(a, b);
  for ( var i = 0; i < a.length; i++ ) {
      /* console.log('me gustan', a[i]); */
      for ( var e = 0; e < b.length; e++ ) {
          if ( a[i].imagen === b[e].file ) {
              b[e].totallikesfotos = a[i].totallikes;
                  /* console.log(b); */

          }
      }
  }
};

async getCatalogos() { // llamamos a la funcion getPost de nuestro servicio.
  this.catalogoService.getCatalogos(this.idruta)
    .then(data => {
      this.CatalogosArray = data;
      this.total = this.CatalogosArray.length;
      this.totlikes = this.CatalogosArray[1].totallikesfotos;
      /* console.log(data); */
    });
}

async downloadFile(archivo: any, nombrearchivo: any) {
     //console.log(archivo, nombrearchivo);
    this.fileTransfer.download(archivo, this.file.externalRootDirectory +
          '/Download/'+ nombrearchivo, true).then((entry) => {
    //this.http.get(archivo, { responseType: 'blob' })
    //  .subscribe((imageBlob: Blob) => {
        // imageBlob is the binary data of the the image
        // From here you can manipulate it and store it where you want
        // For example, to store it in your app dir
        // The replace true is optional but is just in case you want to overwrite it
      //  const result = this.file.writeFile(this.file.externalRootDirectory +
      //    '/Download/', nombrearchivo, imageBlob, { replace: true });
        //console.log(result);

      });
  }
  /* console.log(this.file.externalRootDirectory); */

  async downloadFile2carrete(archivo: any, nombrearchivo: any) {
    this.http.get(archivo, { responseType: 'blob' })
      .subscribe((imageBlob: Blob) => {
        // imageBlob is the binary data of the the image
        // From here you can manipulate it and store it where you want
        // For example, to store it in your app dir
        // The replace true is optional but is just in case you want to overwrite it
        const result = this.file.writeFile(this.file.externalRootDirectory +
          '/DCIM/Camera/', nombrearchivo, imageBlob, { replace: true });
        //console.log(result);

      });
  }

createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
}

getPermission(archivo: any) {
  this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    .then(status => {
      if (status.hasPermission) {
        const nombrearhivo = this.createFileName();
        this.downloadFile(archivo, nombrearhivo);
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
          .then(status => {
            if (status.hasPermission) {
              const nombrearhivo = this.createFileName();
              this.downloadFile(archivo, nombrearhivo);
            }
          });
      }
    });
}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Su imagen ha sido guardada',
      duration: 2000
    });
    toast.present();
  }


  async presentToast2(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

getPermission2save(archivo: any) {
  this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    .then(status => {
      if (status.hasPermission) {
        const nombrearhivo = this.createFileName();
        this.downloadFile2carrete(archivo, nombrearhivo);
        this.presentToast();
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
          .then(status => {
            if (status.hasPermission) {
              const nombrearhivo = this.createFileName();
              this.downloadFile2carrete(archivo, nombrearhivo);
              this.presentToast();
            }
          });
      }
    });
}

savetoRoll() {
    const a2 = this.CatalogosArray[this.contador - 1].file;
    const a3 = this.CatalogosArray[this.contador - 1].file;
    this.photoLibrary.saveImage(a3,"OfertasPanama");
    this.presentToast2('Imagen guardada en Galeria - Album OfertasPanama.')
    //this.socialSharing.saveToPhotoAlbum(a3);
    // this.getPermission2save(a2);

  }

enviaraemail(a1: any){
  const a2 = this.CatalogosArray[this.contador - 1].file;
  this.socialSharing.shareViaEmail('Compartido desde Ofertas Panama Media Group - Descargala desde la Play Store (Android) o la Appstore (Iphone)', a1, [] , [], [], a2)

}

whatsappShare(a1: any) {
    const a2 = this.CatalogosArray[this.contador - 1].file;
    const a3 = this.CatalogosArray[this.contador - 1].file;
    this.getPermission(a2);
    //console.log(a2,a3, this.contador, this.CatalogosArray[this.contador-1].file);
    this.socialSharing.shareViaWhatsApp(a1, a2, 'https://play.google.com/store/apps/details?id=com.offercitypty.ofertaspanama&hl=es' )
       .then((res) => {
        /* console.log("Compartido en WhatsApp Exitoso"); */
      }).catch((err) => {
       this.presentToast2("Error al compartir en WHATSAPP")
       //console.log("Error al compartir en WHATSAPP", err);
    });
  }

readFile(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        formData.append('file', imgBlob, file.name);
        this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
}

async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
        message: 'Cargando Imagen...',
    });
    await loading.present();

    this.http.post("http://localhost:8100/upload.php", formData)
        .pipe(
            finalize(() => {
                loading.dismiss();
            })
        )
        .subscribe(res => {
            if (res['success']) {
                this.presentToast2('Imagen Grabada con EXITO.')
            } else {
                this.presentToast2('Error al grabar IMAGEN.')
            }
        });
}

public async getDownloadPath() {
        if (this.platform.is('ios')) {
            return this.file.documentsDirectory;
        }

			// To be able to save files on Android, we first need to ask the user for permission.
			// We do not let the download proceed until they grant access
        await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            result => {
                if (!result.hasPermission) {
                    return this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
                 }
            }
        );

        /* return this.file.externalRootDirectory + "/Download/"; */
        return this.file.externalDataDirectory	  + 'uploads/';
 };

async startUpload(imgEntry: any) {
  const url = encodeURI(imgEntry);
  const path =  await this.getDownloadPath();
  const rutadirectorio = this.file.externalDataDirectory;
  const rutadirectorioios = this.file.applicationStorageDirectory;
  
   this.file.checkDir(rutadirectorio, 'uploads')
       .then(function(success) {
 /*         // success
         alert("status " + success); */

       }, function(error) {
         // error
         this.file.createDir(rutadirectorio, 'uploads', false);
       });

       if (this.platform.is('ios')) {
         this.file.checkDir(rutadirectorio, 'documents/uploads')
             .then(function(success) {
       /*         // success
               alert("status " + success); */

             }, function(error) {
               // error
               this.file.createDir(rutadirectorio, 'documents/uploads', false);
             });
       }

  const lastChar = url.substr(url.length - 4);
  const idimagen = new Date().getTime();
  const filename = idimagen + lastChar;
  const filename2 = idimagen.toString() ;
  
/*   console.log(path, filename, filename2); */


  // tslint:disable-next-line: deprecation
  this.fileTransfer.download(url, path + filename, true).then((entry) => {
  
  //this.http.get(url, { responseType: 'blob' }).subscribe((imageBlob: Blob) => {
  //  console.log(url,path,filename, filename2);
  // this.fileTransfer.download(url, path + filename, true).then((entry) => {
    
  const misfavoritos = {
      favoritoid:  idimagen,
      nombreimg: path + filename,
      fechainicial: this.lafechaini,
      fechafinal: this.lafechafin,
      empresaimagen: this.nombrecomp,
      diasfaltan: this.losdiasfaltan
    };
  this.storage.set(filename2, misfavoritos).then((response) => {
      /* console.log(response); */
  });
  this.presentToast2('Imagen agregada a FAVORITOS.')
  }, (error) => {
     this.presentToast2('Error en carga de IMAGEN.')
  });
};
}


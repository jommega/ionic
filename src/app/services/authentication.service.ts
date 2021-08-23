/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-shadow */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';


@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  private db: IDBDatabase;
  public A1: any;
  public nombreuser: any;
  public imagenuser: any;

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private navCtrl: NavController,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  async ifLoggedIn() {
    await this.storage.get('USER_INFO').then((response) => {
      /* console.log(response); */
      if (response) {
        /* console.log(response); */
        this.authState.next(true);
        /* console.log('1') */
        this.storage.get('USER_INFO').then((response) => {
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
        this.navCtrl.navigateRoot('/tabs/tab1');
      } else {
        /* console.log('2') */
        /* console.log(response); */
        this.authState.next(false);
        this.navCtrl.navigateRoot('/loginform');
      }

    });

   this.storage.forEach;

   this.storage.get('FAVORITOS').then((response) => {
      if (response) {
        /* console.log(response); */
       }
    });
  }


  login(a1: any,a2: any,a3: any) {
    var entrada_usuarios = {
      user_id: a1,
      user_name: a2,
      user_device: a3
    };

/*           const tx = this.db.transaction('earthquakes', 'readwrite');
          const store = tx.objectStore('earthquakes');

          store.put({id: a1, name: a2, device: a3});

          tx.oncomplete = e => {
            localStorage.setItem('lastUpdate', Date.now().toString());
    }; */

    this.storage.set('USER_INFO', entrada_usuarios).then((response) => {
      /* console.log(response); */
      this.router.navigate(['/tabs/tab1']);
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['loginform']);
      this.authState.next(false);
    });
  }

  async agreement(){
    const res = await this.storage.set('USER_INFO', 'message');
    this.router.navigateByUrl('/home');
    this.authState.next(true);
  }

  isAuthenticated() {
    return this.authState.value;
  }



}


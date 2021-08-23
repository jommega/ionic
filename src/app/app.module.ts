/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoaderService } from './services/loading.service';
// import { AuthenticationService } from './services/authentication.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { VistaCatalogoPage } from './modals/vistacatalogo/vercatalogo.page';
/* import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AgmCoreModule } from '@agm/core';
import { Camera } from '@ionic-native/Camera/ngx';
import { AuthGuard } from './auth.guard';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Md5 } from 'ts-md5/dist/md5';
import { DeviceDetectorService } from 'ngx-device-detector';

import { Facebook } from '@ionic-native/facebook/ngx';*/
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CotizarPage } from './cotizar/cotizar.page';
import { ComprasPage } from './compras/compra.page';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import '@angular/compiler';

@NgModule({
  declarations: [AppComponent, VistaCatalogoPage, CotizarPage, ComprasPage ],
  entryComponents: [VistaCatalogoPage, CotizarPage, ComprasPage],
  imports: [BrowserModule, HttpClientModule,BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
           ComponentsModule,
            IonicStorageModule.forRoot(),
            IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    WebView,
    Geolocation,
    FileTransfer,
    FileTransferObject,
    File,
    FilePath,
    PhotoLibrary,
    LoaderService,
    CallNumber,
    // AuthenticationService,
    AndroidPermissions,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreloadImageComponent } from './preload-image/preload-image.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [PreloadImageComponent, MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  exports : [PreloadImageComponent, MenuComponent]
})
export class ComponentsModule { }

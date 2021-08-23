import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { VistaCatalogoPage } from './vercatalogo.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '',component: VistaCatalogoPage}]),
  ],
  declarations: [],
  providers: [ActionSheetController]
})
export class VistaCatalogoPageModule {}

 
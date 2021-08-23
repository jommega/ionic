import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { VistaCatalogoPage2 } from './vercatalogo2.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '',component: VistaCatalogoPage2}]),
  ],
  declarations: [],
  providers: [ActionSheetController]
})
export class VistaCatalogoPage2Module {}


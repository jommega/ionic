import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ComponentsModule } from '../components/components.module';
import { Tab1Page } from './tab1.page';
import { StarRatingModule } from 'ionic5-star-rating';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    StarRatingModule,
    Ng2SearchPipeModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page ],
  entryComponents:[]
})
export class Tab1PageModule {}

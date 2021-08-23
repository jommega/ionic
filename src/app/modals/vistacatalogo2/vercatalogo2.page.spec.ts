import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VistaCatalogoPage2 } from './vercatalogo2.page';

describe('VistaCatalogoPage2', () => {
  let component: VistaCatalogoPage2;
  let fixture: ComponentFixture<VistaCatalogoPage2>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaCatalogoPage2 ],
      imports: [IonicModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCatalogoPage2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptacionTratamientoDatosComponent } from './aceptacion-tratamiento-datos.component';

describe('AceptacionTratamientoDatosComponent', () => {
  let component: AceptacionTratamientoDatosComponent;
  let fixture: ComponentFixture<AceptacionTratamientoDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptacionTratamientoDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptacionTratamientoDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

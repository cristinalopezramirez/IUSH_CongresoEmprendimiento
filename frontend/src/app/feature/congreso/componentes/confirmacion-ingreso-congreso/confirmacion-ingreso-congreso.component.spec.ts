import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionIngresoCongresoComponent } from './confirmacion-ingreso-congreso.component';

describe('ConfirmacionIngresoCongresoComponent', () => {
  let component: ConfirmacionIngresoCongresoComponent;
  let fixture: ComponentFixture<ConfirmacionIngresoCongresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionIngresoCongresoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionIngresoCongresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

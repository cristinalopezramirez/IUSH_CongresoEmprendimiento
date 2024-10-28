import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEvaluacionEmprendimientoComponent } from './modal-evaluacion-emprendimiento.component';

describe('ModalEvaluacionEmprendimientoComponent', () => {
  let component: ModalEvaluacionEmprendimientoComponent;
  let fixture: ComponentFixture<ModalEvaluacionEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEvaluacionEmprendimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEvaluacionEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

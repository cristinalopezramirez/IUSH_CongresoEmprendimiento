import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionEmprendimientoComponent } from './evaluacion-emprendimiento.component';

describe('EvaluacionEmprendimientoComponent', () => {
  let component: EvaluacionEmprendimientoComponent;
  let fixture: ComponentFixture<EvaluacionEmprendimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionEmprendimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionEmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

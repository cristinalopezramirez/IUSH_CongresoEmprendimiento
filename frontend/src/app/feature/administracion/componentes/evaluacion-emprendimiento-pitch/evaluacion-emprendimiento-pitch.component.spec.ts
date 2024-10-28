import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionEmprendimientoPitchComponent } from './evaluacion-emprendimiento-pitch.component';

describe('EvaluacionEmprendimientoPitchComponent', () => {
  let component: EvaluacionEmprendimientoPitchComponent;
  let fixture: ComponentFixture<EvaluacionEmprendimientoPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionEmprendimientoPitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionEmprendimientoPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

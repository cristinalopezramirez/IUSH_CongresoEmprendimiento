import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionResultadosComponent } from './evaluacion-resultados.component';

describe('EvaluacionResultadosComponent', () => {
  let component: EvaluacionResultadosComponent;
  let fixture: ComponentFixture<EvaluacionResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

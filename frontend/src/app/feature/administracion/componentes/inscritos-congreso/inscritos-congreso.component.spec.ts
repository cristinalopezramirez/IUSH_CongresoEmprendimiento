import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritosCongresoComponent } from './inscritos-congreso.component';

describe('InscritosCongresoComponent', () => {
  let component: InscritosCongresoComponent;
  let fixture: ComponentFixture<InscritosCongresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscritosCongresoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscritosCongresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

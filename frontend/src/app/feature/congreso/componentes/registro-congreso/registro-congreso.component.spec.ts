import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCongresoComponent } from './registro-congreso.component';

describe('RegistroCongresoComponent', () => {
  let component: RegistroCongresoComponent;
  let fixture: ComponentFixture<RegistroCongresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCongresoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCongresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

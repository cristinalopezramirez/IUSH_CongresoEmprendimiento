import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInstitucionComponent } from './registro-institucion.component';

describe('RegistroInstitucionComponent', () => {
  let component: RegistroInstitucionComponent;
  let fixture: ComponentFixture<RegistroInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroInstitucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

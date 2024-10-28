import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEventoComponent } from './agenda-evento.component';

describe('AgendaEventoComponent', () => {
  let component: AgendaEventoComponent;
  let fixture: ComponentFixture<AgendaEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

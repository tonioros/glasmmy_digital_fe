import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionFormComponent } from './confirmacion-form.component';

describe('ConfirmacionFormComponent', () => {
  let component: ConfirmacionFormComponent;
  let fixture: ComponentFixture<ConfirmacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

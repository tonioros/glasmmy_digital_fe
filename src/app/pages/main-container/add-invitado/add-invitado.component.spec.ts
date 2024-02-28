import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvitadoComponent } from './add-invitado.component';

describe('AddInvitadoComponent', () => {
  let component: AddInvitadoComponent;
  let fixture: ComponentFixture<AddInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvitadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

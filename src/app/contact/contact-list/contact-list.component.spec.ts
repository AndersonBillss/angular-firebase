import { ComponentFixture, TestBed } from '@angular/core/testing';

import { contactListComponent } from './contact-list.component';

describe('contactListComponent', () => {
  let component: contactListComponent;
  let fixture: ComponentFixture<contactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [contactListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(contactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

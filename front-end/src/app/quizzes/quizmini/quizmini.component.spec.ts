import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizminiComponent } from './quizmini.component';

describe('QuizminiComponent', () => {
  let component: QuizminiComponent;
  let fixture: ComponentFixture<QuizminiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizminiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

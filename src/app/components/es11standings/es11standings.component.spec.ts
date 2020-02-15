import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Es11standingsComponent } from './es11standings.component';

describe('Es11standingsComponent', () => {
  let component: Es11standingsComponent;
  let fixture: ComponentFixture<Es11standingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Es11standingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Es11standingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

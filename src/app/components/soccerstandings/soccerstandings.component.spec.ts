import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerstandingsComponent } from './soccerstandings.component';

describe('SoccerstandingsComponent', () => {
  let component: SoccerstandingsComponent;
  let fixture: ComponentFixture<SoccerstandingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccerstandingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerstandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

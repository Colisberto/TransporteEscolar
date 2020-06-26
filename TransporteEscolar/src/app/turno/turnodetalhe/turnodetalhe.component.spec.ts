import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnibusdetalheComponent } from './turnodetalhe.component';

describe('OnibusdetalheComponent', () => {
  let component: OnibusdetalheComponent;
  let fixture: ComponentFixture<OnibusdetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnibusdetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnibusdetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

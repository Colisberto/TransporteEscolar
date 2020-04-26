import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MotoristaDetalheComponent} from './motoristadetalhe.component';


describe('MotoristadetalheComponent', () => {
  let component: MotoristaDetalheComponent;
  let fixture: ComponentFixture<MotoristaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoristaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoristaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

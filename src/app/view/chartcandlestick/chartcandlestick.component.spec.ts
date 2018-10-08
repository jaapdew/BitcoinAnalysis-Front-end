import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { chartCandlestickComponent } from './chartcandlestick.component';

describe('ChartCandlestickComponent', () => {
  let component: chartCandlestickComponent;
  let fixture: ComponentFixture<chartCandlestickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ chartCandlestickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(chartCandlestickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

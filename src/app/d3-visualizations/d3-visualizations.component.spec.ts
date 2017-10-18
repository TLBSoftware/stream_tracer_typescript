import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3VisualizationsComponent } from './d3-visualizations.component';

describe('D3VisualizationsComponent', () => {
  let component: D3VisualizationsComponent;
  let fixture: ComponentFixture<D3VisualizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3VisualizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3VisualizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

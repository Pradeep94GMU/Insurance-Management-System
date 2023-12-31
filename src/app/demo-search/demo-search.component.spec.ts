import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSearchComponent } from './demo-search.component';

describe('DemoSearchComponent', () => {
  let component: DemoSearchComponent;
  let fixture: ComponentFixture<DemoSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoSearchComponent]
    });
    fixture = TestBed.createComponent(DemoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

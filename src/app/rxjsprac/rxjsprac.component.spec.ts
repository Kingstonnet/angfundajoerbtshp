import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjspracComponent } from './rxjsprac.component';

describe('RxjspracComponent', () => {
  let component: RxjspracComponent;
  let fixture: ComponentFixture<RxjspracComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RxjspracComponent]
    });
    fixture = TestBed.createComponent(RxjspracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

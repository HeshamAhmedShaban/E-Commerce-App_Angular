import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContuctusComponent } from './contuctus.component';

describe('ContuctusComponent', () => {
  let component: ContuctusComponent;
  let fixture: ComponentFixture<ContuctusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContuctusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContuctusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompNewOffersComponent } from './comp-new-offers.component';

describe('CompNewOffersComponent', () => {
  let component: CompNewOffersComponent;
  let fixture: ComponentFixture<CompNewOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompNewOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompNewOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

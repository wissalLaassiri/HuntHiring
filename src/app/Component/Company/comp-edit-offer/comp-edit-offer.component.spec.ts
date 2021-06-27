import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompEditOfferComponent } from './comp-edit-offer.component';

describe('CompEditOfferComponent', () => {
  let component: CompEditOfferComponent;
  let fixture: ComponentFixture<CompEditOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompEditOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

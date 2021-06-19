import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudHeaderComponent } from './stud-header.component';

describe('StudHeaderComponent', () => {
  let component: StudHeaderComponent;
  let fixture: ComponentFixture<StudHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

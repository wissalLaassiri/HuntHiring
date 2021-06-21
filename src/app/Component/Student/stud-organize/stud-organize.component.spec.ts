import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudOrganizeComponent } from './stud-organize.component';

describe('StudOrganizeComponent', () => {
  let component: StudOrganizeComponent;
  let fixture: ComponentFixture<StudOrganizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudOrganizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudOrganizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

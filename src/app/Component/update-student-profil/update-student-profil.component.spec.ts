import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentProfilComponent } from './update-student-profil.component';

describe('UpdateStudentProfilComponent', () => {
  let component: UpdateStudentProfilComponent;
  let fixture: ComponentFixture<UpdateStudentProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStudentProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

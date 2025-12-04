import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackCard } from './add-track-card';

describe('AddTrackCard', () => {
  let component: AddTrackCard;
  let fixture: ComponentFixture<AddTrackCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrackCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrackCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

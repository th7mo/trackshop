import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartTrack } from './shopping-cart-track';

describe('ShoppingCartTrack', () => {
  let component: ShoppingCartTrack;
  let fixture: ComponentFixture<ShoppingCartTrack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartTrack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartTrack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

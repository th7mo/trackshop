import { Component, inject, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Track } from '../track/track';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-shopping-cart-track',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './shopping-cart-track.html',
  styleUrl: './shopping-cart-track.css',
})
export class ShoppingCartTrack {
  track = input.required<Track>();
  customerService = inject(CustomerService);
  removeTrackEvent = output<number>();

  removeTrackFromCart() {
    this.customerService.removeTrackFromCart(this.track().id).subscribe(
      _ => this.removeTrackEvent.emit(this.track().id)
    );
  }
}

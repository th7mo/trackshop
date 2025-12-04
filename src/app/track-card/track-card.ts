import { Component, inject, input, output } from '@angular/core';
import { Track } from '../track/track';
import { DurationPipe } from '../duration.pipe';
import { NgOptimizedImage } from '@angular/common';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-track-card',
  imports: [
    DurationPipe,
    NgOptimizedImage
  ],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css',
})
export class TrackCard {

  addTrackEvent = output<Track>();

  track = input.required<Track>();
  customerService = inject(CustomerService);

  addTrackToCart() {
    this.customerService.addTrackToCart(this.track().id);
    this.addTrackEvent.emit(this.track());
  }
}

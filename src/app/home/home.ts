import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { TrackService } from '../track/track.service';
import { Track } from '../track/track';
import { TrackCard } from '../track-card/track-card';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-home',
  imports: [
    NavigationBar,
    TrackCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  trackService = inject(TrackService);
  customerService = inject(CustomerService);
  tracks: WritableSignal<Track[]> = signal([]);
  customer = this.customerService.customer;

  ngOnInit() {
    this.trackService.getTracks().subscribe(
      tracks => this.tracks.set(tracks)
    );
    this.updateCart();
  }

  updateCart() {
    this.customerService.getCustomer();
  }
}

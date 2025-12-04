import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
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
  tracks: WritableSignal<Track[]> = signal([]);
  customer: WritableSignal<Customer> = signal({} as Customer);

  trackService = inject(TrackService);
  customerService = inject(CustomerService);

  ngOnInit() {
    this.trackService.getTracks().subscribe(tracks => this.tracks.set(tracks));
    this.customerService.getCustomer().subscribe(customer => this.customer.set(customer));
  }

  updateCart() {
    this.customerService.getCustomer().subscribe(customer => this.customer.set(customer));
  }
}


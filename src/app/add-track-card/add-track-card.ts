import { Component, inject } from '@angular/core';
import { Track } from '../track/track';
import { FormsModule } from '@angular/forms';
import { TrackService } from '../track/track.service';

@Component({
  selector: 'app-add-track-card',
  imports: [
    FormsModule
  ],
  templateUrl: './add-track-card.html',
  styleUrl: './add-track-card.css',
})
export class AddTrackCard {
  track: Track = {} as Track;

  trackService = inject(TrackService);

  addTrack() {
    this.trackService.postTrack(this.track);
    this.track = {} as Track;
  }
}

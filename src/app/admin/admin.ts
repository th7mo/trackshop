import { Component } from '@angular/core';
import { AddTrackCard } from '../add-track-card/add-track-card';

@Component({
  selector: 'app-admin',
  imports: [
    AddTrackCard
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

}

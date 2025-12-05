import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from './track';

@Injectable({providedIn: 'root'})
export class TrackService {
  private apiUrl = 'https://trackshop.th7mo.com/api';

  constructor(private http: HttpClient) { }

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/tracks`);
  }

  postTrack(track: Track) {
    const jwt = localStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${jwt}` };
    return this.http.post<Track>(`${this.apiUrl}/tracks`, track, { headers }).subscribe();
  }
}

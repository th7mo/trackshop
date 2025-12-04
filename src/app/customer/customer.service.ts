import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Customer } from './customer';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = 'https://trackshop.th7mo.com/api';

  customerId: WritableSignal<number | null> = signal(null);
  customer: WritableSignal<Customer | null> = signal(null);

  constructor(private http: HttpClient) {}

  signUp(username: string, password: string) {
    this.http.post<Customer>(`${this.apiUrl}/customers`, { username, password }).subscribe(
      _ => this.login(username, password)
    );
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { responseType: 'text' })
      .pipe(
        tap(token => {
          localStorage.setItem("jwt", token);
          this.customerId.set(jwtDecode<{ id: number }>(token).id);
        })
      );
  }

  getCustomer(): Observable<Customer> {
    if (this.customerId() === null) {
      this.setCustomerId();
    }

    const jwt = localStorage.getItem('jwt');
    const headers = {Authorization: `Bearer ${jwt}`};

    return this.http.get<Customer>(`${this.apiUrl}/customers/${this.customerId()}`, {headers});
  }

  setCustomerId() {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const decoded = jwtDecode<{ id: number }>(token);
    this.customerId.set(decoded.id);
  }

  getRole(): string | null {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("No token yet");
      return null;
    }

    try {
      const decoded = jwtDecode<{ role: { authority: string }[] }>(token);
      return decoded.role?.[0]?.authority ?? null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("jwt");
  }

  addTrackToCart(trackId: number) {
    const jwt = localStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${jwt}` };

    return this.http
      .post(`${this.apiUrl}/customers/${this.customerId()}/cart/items/${trackId}`, null, { headers })
      .subscribe();
  }

  removeTrackToCart(trackId: number) {
    const jwt = localStorage.getItem('jwt');
    const headers = { Authorization: `Bearer ${jwt}` };

    return this.http
      .delete(`${this.apiUrl}/customers/${this.customerId()}/cart/items/${trackId}`, { headers })
      .subscribe();
  }
}

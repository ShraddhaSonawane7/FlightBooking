// src/app/services/flight.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'https://localhost:7132/api/Flights/';

  constructor(private http: HttpClient) {}

  // Existing methods for managing flights
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}GetAll`);
  }

  addFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(`${this.apiUrl}add`, flight);
  }

  updateFlight(flightId: number, flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.apiUrl}update/${flightId}`, flight);
  }

  deleteFlight(flightId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${flightId}`);
  }

  getFlightById(flightId: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${flightId}`);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload-image`, formData);
  }

  // Search flights by source, destination, and optional date
  searchFlights(source: string, destination: string, date: string): Observable<Flight[]> {
    const params = new HttpParams()
      .set('source', source)
      .set('destination', destination)
      .set('date', date);

    return this.http.get<Flight[]>(`${this.apiUrl}search`, { params });
  }

  // Search flights by source and destination (without date)
  searchFlightsBySourceDestination(source: string, destination: string): Observable<Flight[]> {
    const params = new HttpParams()
      .set('source', source)
      .set('destination', destination);

    return this.http.get<Flight[]>(`${this.apiUrl}searchBySourceDestination`, { params });
  }

  // Filter flights by airline
  filterByAirline(airline: string): Observable<Flight[]> {
    const params = new HttpParams().set('airline', airline);
    return this.http.get<Flight[]>(`${this.apiUrl}filterByAirline`, { params });
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-passenger-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passenger-dashboard.component.html',
  styleUrls: ['./passenger-dashboard.component.css'],
})
export class PassengerDashboardComponent implements OnInit {
  source: string = '';
  destination: string = '';
  date: string = ''; // Date can be left empty
  flights: Flight[] = [];
  errorMessage: string = '';
  
  // New filters
  airline: string = '';
  seatType: string = '';
  priceRange: string = '';

  constructor(private flightService: FlightService) {}

  // OnInit method to fetch all available flights initially
  ngOnInit(): void {
    this.getAllFlights();
  }

  // Method to fetch all flights
  getAllFlights(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data;
        if (this.flights.length === 0) {
          this.errorMessage = 'No available flights at the moment.';
        } else {
          this.errorMessage = ''; // Clear error message if flights are found
        }
      },
      error: (err: HttpErrorResponse) => {
        this.flights = [];
        this.errorMessage = 'An error occurred while fetching available flights.';
      }
    });
  }

  // Method to call the search API
  searchFlights(): void {
    if (this.source && this.destination) {
      if (this.date) {
        // If date is provided, search with source, destination, and date
        this.flightService.searchFlights(this.source, this.destination, this.date).subscribe({
          next: (data) => {
            this.flights = data;
            if (this.flights.length === 0) {
              this.errorMessage = 'No flights found for the given search parameters.';
            } else {
              this.errorMessage = ''; // Clear error message if flights are found
            }
          },
          error: (err: HttpErrorResponse) => {
            this.flights = [];
            this.errorMessage = 'Flights details not found.';
          }
        });
      } else {
        // If date is not provided, search with only source and destination
        this.flightService.searchFlightsBySourceDestination(this.source, this.destination).subscribe({
          next: (data) => {
            this.flights = data;
            if (this.flights.length === 0) {
              this.errorMessage = 'No flights found for the given source and destination.';
            } else {
              this.errorMessage = ''; // Clear error message if flights are found
            }
          },
          error: (err: HttpErrorResponse) => {
            this.flights = [];
            this.errorMessage = 'An error occurred while fetching flight details.';
          }
        });
      }
    } else {
      this.errorMessage = 'Please enter valid source and destination.';
    }
  }

  // New method for filtering flights by airline
  filterByAirline(): void {
    this.flightService.filterByAirline(this.airline).subscribe({
      next: (data) => {
        this.flights = data;
        if (this.flights.length === 0) {
          this.errorMessage = 'No flights found for the selected airline.';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Error fetching flights by airline.';
      }
    });
  }

  }

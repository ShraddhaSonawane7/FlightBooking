import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  imports:[CommonModule, FormsModule, RouterModule],
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  flights: Flight[] = [];
  newFlight: Flight = new Flight();
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  selectedFile: File | null = null;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.getAllFlights().subscribe(
      (data) => (this.flights = data),
      (error) => console.error('Error fetching flights', error)
    );
  }

  // Image Upload Method
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Get the selected file
    if (this.selectedFile) {
      this.uploadImage(this.selectedFile);
    }
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file); // Append file to FormData

    this.flightService.uploadImage(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * event.loaded / (event.total || 1));
      } else if (event instanceof HttpResponse) {
        this.uploadSuccess = true;
        this.newFlight.flightImageUrl = event.body?.fileName || ''; // Store filename in flight object
      }
    });
  }

  // Add Flight
  addFlight(): void {
    this.flightService.addFlight(this.newFlight).subscribe(() => {
      this.loadFlights();
      this.newFlight = new Flight(); // Reset form
      this.closeModal('addFlightModal'); // Close modal
    });
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  }

  deleteFlight(flightId: number): void {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.flightService.deleteFlight(flightId).subscribe(() => {
        this.flights = this.flights.filter((f) => f.flightId !== flightId);
      });
    }
  }
}

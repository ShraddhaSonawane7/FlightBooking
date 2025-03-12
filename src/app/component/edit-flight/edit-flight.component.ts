import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit {
  flight: Flight = new Flight();  // Flight to be edited

  constructor(
    private flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('flightId');
    if (flightId) {
      this.flightService.getFlightById(+flightId).subscribe((data) => {
        this.flight = data;
      });
    }
  }

  updateFlight(): void {
    if (this.flight) {
      this.flightService.updateFlight(this.flight.flightId, this.flight).subscribe(() => {
        this.router.navigate(['/admin-dashboard']);
      });
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}

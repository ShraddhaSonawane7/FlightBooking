export class Flight {
  flightId: number = 0; // Default to 0, as the backend will auto-generate
  flightNumber: string = '';
  airline: string = '';
  source: string = '';
  destination: string = '';
  departureTime: Date = new Date();  // Changed to Date type
  arrivalTime: Date = new Date();    // Changed to Date type
  windowSeatPrice: number = 0;
  aisleSeatPrice: number = 0;
  middleSeatPrice: number = 0;
  totalSeats: number = 0;
  availableSeats: number = 0;
  createdAt: string | null = null;
  flightImageUrl: string | null = null;

  // Using Partial for easy initialization
  constructor(init?: Partial<Flight>) {
    Object.assign(this, init); // Allows object destructuring initialization
  }
}

export interface Booking {
  bookingId: number;
  travelId: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
  paymentType: string;
  notes?: string;
}

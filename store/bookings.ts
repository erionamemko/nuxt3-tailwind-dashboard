// stores/bookings.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Booking } from '~/types/booking';

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref<Booking[]>([]);
  const isLoaded = ref(false);

  const fetchBookings = async () => {
    if (!isLoaded.value) {
      try {
        const response = await fetch('/api/bookings');
        const data: Booking[] = await response.json();
        bookings.value = data;
        isLoaded.value = true;
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    }
  };

  const addBooking = (booking: Booking) => {
    bookings.value.push(booking);
  };

  const updateBooking = (updatedBooking: Booking) => {
    const index = bookings.value.findIndex(b => b.bookingId === updatedBooking.bookingId);
    if (index !== -1) {
      bookings.value[index] = updatedBooking;
    }
  };

  const removeBooking = (bookingId: number) => {
    bookings.value = bookings.value.filter(b => b.bookingId !== bookingId);
  };

  const getBookings = () => bookings.value;

  return { bookings, addBooking, updateBooking, removeBooking, getBookings, fetchBookings };
});

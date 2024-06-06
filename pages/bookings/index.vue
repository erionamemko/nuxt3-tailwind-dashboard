<template>
  <div>
    <Table :columns="columns" :data="filteredBookings" @edit="openEditBookingModal" @remove="openConfirmDeleteBookingModal">
        <template #actions>
            <button @click="openAddBookingModal" class="text-white px-6 rounded mr-4 mt-4 bg-[#ff4758]">Add New Booking</button>
        </template>
    </Table>
    <BookingAddEditModal
      :isModalOpen="isAddEditBookingModalOpen"
      :isEdit="isEdit"
      :bookingData="selectedBooking"
      @close="closeAddEditBookingModal"
      @submit="handleAddEditBooking"
      :travels="travels"
    />

    <ModalConfirm
      :isModalOpen="isConfirmDeleteModalOpen"
      message="Are you sure you want to delete this booking?"
      @close="closeConfirmDeleteModal"
      @confirm="handleConfirmDeleteBooking"
    />
  </div>
</template>

<script setup lang="ts">
import { useTravelsStore } from '~/store/travels';
import { useBookingsStore } from '~/store/bookings';
import { type Booking } from '~/types/booking';

const travelsStore = useTravelsStore();
const bookingsStore = useBookingsStore();

const isAddEditBookingModalOpen = ref(false);
const isConfirmDeleteModalOpen = ref(false);
const isEdit = ref(false);
const selectedBooking = reactive<Booking>({
  bookingId: 0,
  travelId: 0,
  customerName: '',
  email: '',
  phoneNumber: '',
  age: 0,
  gender: '',
  paymentType: '',
  notes: '',
});
const bookingToDelete = ref<number | null>(null);

const columns = [
  { key: 'travelTitle', label: 'Travel title', sortable: true },
  { key: 'customerName', label: 'Customer Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'paymentType', label: 'Payment Type', sortable: true },
  { key: 'notes', label: 'Notes' },
];

const travels = computed(() => travelsStore.getTravels());
const bookings = computed(() => bookingsStore.getBookings());

const filteredBookings = computed(() => {
  return bookings.value.map(booking => {
    const travel = travels.value.find(t => t.travelId === booking.travelId);
    return {
      ...booking,
      travelTitle: travel ? travel.travelTitle : 'Unknown travel'
    };
  });
});

const openAddBookingModal = async () => {
  if (!travelsStore.isLoaded) {
    await travelsStore.fetchTravels();
  }
  isEdit.value = false;
  Object.assign(selectedBooking, {
    bookingId: 0,
    travelId: 0,
    customerName: '',
    email: '',
    phoneNumber: '',
    age: 0,
    gender: '',
    paymentType: '',
    notes: '',
  });
  isAddEditBookingModalOpen.value = true;
};

const openEditBookingModal = async (booking: Booking) => {
  if (!travelsStore.isLoaded) {
    await travelsStore.fetchTravels();
  }
  isEdit.value = true;
  Object.assign(selectedBooking, booking);
  isAddEditBookingModalOpen.value = true;
};

const openConfirmDeleteBookingModal = (booking: Booking) => {
  if (booking && booking.bookingId !== undefined) {
    bookingToDelete.value = booking.bookingId;
    isConfirmDeleteModalOpen.value = true;
  } else {
    console.error("Booking is undefined or missing 'bookingId':", booking);
  }
};

const closeAddEditBookingModal = () => {
  isAddEditBookingModalOpen.value = false;
};

const closeConfirmDeleteModal = () => {
  isConfirmDeleteModalOpen.value = false;
};

const handleAddEditBooking = (booking: Booking) => {
  if (isEdit.value) {
    bookingsStore.updateBooking(booking);
  } else {
    bookingsStore.addBooking({ ...booking, bookingId: Date.now() });
  }
  closeAddEditBookingModal();
};

const handleConfirmDeleteBooking = () => {
  if (bookingToDelete.value !== null) {
    bookingsStore.removeBooking(bookingToDelete.value);
    closeConfirmDeleteModal();
  }
};

// Fetch bookings only when component is mounted and if not already loaded
onMounted(() => {
  bookingsStore.fetchBookings();
  
});
</script>

<style scoped>
/* Add your styles here */
</style>

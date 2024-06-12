<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold text-black-900 dark:text-white lg:text-3xl ml-4">Bookings</h1>
    <Table :columns="tableColumnsData" :data="filteredBookings" @edit="openEditBookingModal" @remove="openConfirmDeleteBookingModal">
        <template #actions>
            <button class="text-white px-6 rounded mr-4 mt-4 bg-[#ff4758]" title="Add New Booking" @click="openAddBookingModal">Add New Booking</button>
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
const selectedBooking = ref<Booking>({
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

const tableColumnsData = [
  { key: 'travelTitle', label: 'Travel', sortable: true },
  { key: 'customerName', label: 'Customer', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'gender', label: 'Gender', sortable: true },
  { key: 'paymentType', label: 'Payment', sortable: true },
  { key: 'notes', label: 'Notes' },
];

const travels = computed(() => travelsStore.getTravels());
const bookings = computed(() => bookingsStore.getBookings());

//Todo: send only necessary data on component
// const travelTitlesAndIds = computed(() =>
//   travels.value.map((travel) => ({
//     id: travel.travelId,
//     travelTitle: travel.travelTitle,
//   }))
// );

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
  isEdit.value = false;
  isAddEditBookingModalOpen.value = true;
};

const openEditBookingModal = async (booking: Booking) => {
  isEdit.value = true;
  selectedBooking.value = {...selectedBooking, ...booking};
  isAddEditBookingModalOpen.value = true;
};

const openConfirmDeleteBookingModal = (booking: Booking) => {
  if (booking?.bookingId) {
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
  travelsStore.fetchTravels();
  
});
</script>

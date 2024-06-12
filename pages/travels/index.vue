<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl ml-5 color-[#ff4758]">Travels</h1>
    <Table
      :columns="columns"
      :data="travels"
      @edit="openEditTravelModal"
      @remove="openConfirmDeleteTravelModal"
    >
      <template #actions>
        <button
          class="text-white px-6 rounded mr-4 mt-4 bg-[#ff4758]"
          title="Add New Travel"
          @click="openAddTravelModal"
        >
          Add New Travel
        </button>
      </template>
    </Table>

    <TravelAddEditModal
      :isModalOpen="isAddEditTravelModalOpen"
      :isEdit="isEdit"
      :travelData="selectedTravel"
      @close="closeAddEditTravelModal"
      @submit="handleAddEditTravel"
    />
    <ModalConfirm
      :isModalOpen="isConfirmDeleteModalOpen"
      message="Are you sure you want to delete this travel?"
      description="Deleting this travel you will also delete all the bookings connected to this travel!!!"
      @close="closeConfirmDeleteModal"
      @confirm="handleConfirmDeleteTravel"
    />
  </div>
</template>

<script setup lang="ts">
import { useTravelsStore } from "~/store/travels";
import { useBookingsStore } from "~/store/bookings";
import { type Travel } from "~/types/travel";

const travelsStore = useTravelsStore();
const bookingsStore = useBookingsStore();

const isAddEditTravelModalOpen = ref(false);
const isConfirmDeleteModalOpen = ref(false);
const isEdit = ref(false);
const selectedTravel = ref<Travel>({
  travelId: 0,
  travelTitle: "",
  price: 0,
  departureDate: "",
  returnDate: "",
  userRating: 0,
  description: "",
  location: "",
  imageUrl: "",
});
const travelToDelete = ref<number | null>(null);

const columns = [
  { key: "imageUrl", label: "Image" },
  { key: "travelTitle", label: "Travel", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "userRating", label: "Rating", sortable: true },
  { key: "location", label: "Location", sortable: true },
  { key: "description", label: "Description" },
  { key: "departureDate", label: "Departure" },
  { key: "returnDate", label: "Return" },
];

const travels = computed(() => travelsStore.getTravels());

const openAddTravelModal = () => {
  isEdit.value = false;
  isAddEditTravelModalOpen.value = true;
};

const openEditTravelModal = (travel: Travel) => {
  isEdit.value = true;
  selectedTravel.value = {...selectedTravel, ...travel }
  isAddEditTravelModalOpen.value = true;
};
const closeAddEditTravelModal = () => {
  isAddEditTravelModalOpen.value = false;
};

const handleAddEditTravel = (travel: Travel) => {
  if (isEdit.value) {
    travelsStore.updateTravel(travel);
  } else {
    travelsStore.addTravel(travel);
  }
  closeAddEditTravelModal();
};

const openConfirmDeleteTravelModal = (travel: Travel) => {
  travelToDelete.value = travel.travelId;
  isConfirmDeleteModalOpen.value = true;
};

const closeConfirmDeleteModal = () => {
  isConfirmDeleteModalOpen.value = false;
};

const handleConfirmDeleteTravel = () => {
  if (travelToDelete.value !== null) {
    travelsStore.removeTravel(travelToDelete.value);
    bookingsStore.removeBookingsByTravelId(travelToDelete.value)
  }
  closeConfirmDeleteModal();
};

onMounted(() => {
  travelsStore.fetchTravels();
});
</script>

<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-rose-400 ml-5">Bookings</span></h1>
    <Table
      :columns="columns"
      :data="travels"
      @edit="openEditTravelModal"
      @remove="openConfirmDeleteTravelModal"
    >
      <template #actions>
        <button
          @click="openAddTravelModal"
          class="text-white px-6 rounded mr-4 mt-4 bg-[#ff4758]"
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
      @close="closeConfirmDeleteModal"
      @confirm="handleConfirmDeleteTravel"
    />
  </div>
</template>

<script setup lang="ts">
import { useTravelsStore } from "~/store/travels";
import { type Travel } from "~/types/travel";

const travelsStore = useTravelsStore();

const isAddEditTravelModalOpen = ref(false);
const isConfirmDeleteModalOpen = ref(false);
const isEdit = ref(false);
const selectedTravel = reactive<Travel>({
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
  { key: "departureDate", label: "Departure Date" },
  { key: "returnDate", label: "Return Date" },
  { key: "userRating", label: "User Rating", sortable: true },
  { key: "description", label: "Description" },
  { key: "location", label: "Location", sortable: true },
];

const travels = computed(() => travelsStore.getTravels());

const openAddTravelModal = () => {
  isEdit.value = false;
  Object.assign(selectedTravel, {
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
  isAddEditTravelModalOpen.value = true;
};

const openEditTravelModal = (travel: Travel) => {
  isEdit.value = true;
  Object.assign(selectedTravel, travel);
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
  }
  closeConfirmDeleteModal();
};

onMounted(() => {
  travelsStore.fetchTravels();
});
</script>

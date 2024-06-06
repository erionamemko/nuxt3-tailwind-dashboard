<template>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <h2 class="text-lg font-bold mb-4">
        {{ isEdit ? "Edit Travel" : "Add Travel" }}
      </h2>
        <label for="travelTitle" class="block text-sm font-medium text-gray-700"
          >Travel Title</label
        >
        <input
          v-model="travel.travelTitle"
          type="text"
          id="travelTitle"
          class="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Price</label
        >
        <input
          v-model="travel.price"
          type="number"
          id="price"
          class="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label
          for="departureDate"
          class="block text-sm font-medium text-gray-700"
          >Departure Date</label
        >
        <input
          v-model="travel.departureDate"
          type="date"
          id="departureDate"
          class="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="returnDate" class="block text-sm font-medium text-gray-700"
          >Return Date</label
        >
        <input
          v-model="travel.returnDate"
          type="date"
          id="returnDate"
          class="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="userRating" class="block text-sm font-medium text-gray-700"
          >User Rating</label
        >
        <input
          v-model="travel.userRating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          id="userRating"
          class="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <textarea
          v-model="travel.description"
          id="description"
          class="p-2 border border-gray-300 rounded w-full"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="location" class="block text-sm font-medium text-gray-700"
          >Location</label
        >
        <input
          v-model="travel.location"
          type="text"
          id="location"
          class="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700"
          >Image URL</label
        >
        <input
          v-model="travel.image"
          type="text"
          id="image"
          class="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ isEdit ? "Update" : "Add" }} travel
      </button>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { type Travel } from "~/types/travel";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  travelData: {
    type: Object as () => Travel,
    required: false,
  },
  isModalOpen: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["close", "submit"]);

const travel = ref<Travel>({
  travelId: 0,
  travelTitle: "",
  price: 0,
  departureDate: "",
  returnDate: "",
  userRating: 0,
  description: "",
  location: "",
  image: "",
});

watch(
  () => props.travelData,
  (newVal) => {
    if (newVal) {
      travel.value = { ...newVal };
    }
  },
  { immediate: true }
);

const closeModal = () => {
  emits("close");
};

const submitForm = () => {
  emits("submit", travel.value);
};
</script>

<style scoped>
/* Add your styles here */
</style>

<template>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <h2 class="text-lg font-bold mb-4">
        {{ isEdit ? "Edit Travel" : "Add Travel" }}
      </h2>
        <label for="travelTitle" class="travel-modal-label"
          >Travel Title</label
        >
        <input
          v-model="travelData.travelTitle"
          type="text"
          id="travelTitle"
          class="travel-modal-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="price" class="travel-modal-label"
          >Price</label
        >
        <input
          v-model="travelData.price"
          type="number"
          id="price"
          class="travel-modal-input"
          required
        />
      </div>
      <div class="mb-4">
        <label
          for="departureDate"
          class="travel-modal-label"
          >Departure Date</label
        >
        <input
          v-model="travelData.departureDate"
          type="date"
          id="departureDate"
          class="travel-modal-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="returnDate" class="travel-modal-label"
          >Return Date</label
        >
        <input
          v-model="travelData.returnDate"
          type="date"
          id="returnDate"
          class="travel-modal-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="userRating" class="travel-modal-label"
          >User Rating</label
        >
        <input
          v-model="travelData.userRating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          id="userRating"
          class="travel-modal-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="description" class="travel-modal-label"
          >Description</label
        >
        <textarea
          v-model="travelData.description"
          id="description"
          class="travel-modal-input"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="location" class="travel-modal-label"
          >Location</label
        >
        <input
          v-model="travelData.location"
          type="text"
          id="location"
          class="travel-modal-input"
          required
        />
      </div>
      <div class="mb-4">
        <label for="image" class="travel-modal-label"
          >Image URL</label
        >
        <input
          v-model="travelData.imageUrl"
          type="text"
          id="image"
          class="travel-modal-input"
          required
        />
      </div>
      <button class="bg-blue-500 travel-modal-actions" :title="isEdit ? 'Update' : 'Add'" type="submit">
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
    required: true,
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
  imageUrl: "",
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
  emits("submit", props.travelData);
};
</script>

<style lang="postcss" scoped>
.form {
  &-label {
    @apply block text-sm font-medium text-gray-700;
  }

  &-input {
    @apply p-2 border border-gray-300 rounded w-full;
  }

  &-actions {
    @apply text-white px-4 py-2 rounded;
  }
}
</style>
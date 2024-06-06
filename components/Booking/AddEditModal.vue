<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    @click.self="closeModal"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <h2 class="text-lg font-bold mb-4">
        {{ isEdit ? "Edit Booking" : "Add Booking" }}
      </h2>
      <form @submit.prevent="submitForm">
        <div v-if="step === 1">
          <label for="travel" class="block mb-2">Select travel:</label>
          <input
            v-model="selectedtravelTitle"
            type="text"
            list="travels"
            class="w-full mb-4 p-2 border rounded"
            @input="searchtravels"
          />
          <datalist id="travels">
            <option
              v-for="travel in filteredtravels"
              :key="travel.travelId"
              :value="travel.travelTitle"
            >
              {{ travel.travelTitle }}
            </option>
          </datalist>
        </div>
        <div v-if="step === 2">
          <label for="customerName" class="block mb-2">Customer Name:</label>
          <input
            v-model="bookingData.customerName"
            type="text"
            id="customerName"
            class="w-full mb-4 p-2 border rounded"
            required
          />

          <label for="email" class="block mb-2">Email:</label>
          <input
            v-model="bookingData.email"
            type="email"
            id="email"
            class="w-full mb-4 p-2 border rounded"
            required
          />

          <label for="phoneNumber" class="block mb-2">Phone Number:</label>
          <input
            v-model="bookingData.phoneNumber"
            type="tel"
            id="phoneNumber"
            class="w-full mb-4 p-2 border rounded"
            required
          />

          <label for="age" class="block mb-2">Age:</label>
          <input
            v-model="bookingData.age"
            type="number"
            id="age"
            class="w-full mb-4 p-2 border rounded"
            required
          />

          <label for="gender" class="block mb-2">Gender:</label>
          <select
            v-model="bookingData.gender"
            id="gender"
            class="w-full mb-4 p-2 border rounded"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div v-if="step === 3">
          <label for="paymentType" class="block mb-2">Payment Type:</label>
          <select
            v-model="bookingData.paymentType"
            id="paymentType"
            class="w-full mb-4 p-2 border rounded"
            required
          >
            <option value="Credit transfer">Credit transfer</option>
            <option value="Paypal">Paypal</option>
            <option value="Revolut">Revolut</option>
          </select>

          <label for="notes" class="block mb-2">Notes:</label>
          <textarea
            v-model="bookingData.notes"
            id="notes"
            class="w-full mb-4 p-2 border rounded"
          ></textarea>
        </div>
        <div class="flex justify-between">
          <button
            type="button"
            @click="previousStep"
            v-if="step > 1"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
          <button
            type="button"
            @click="nextStep"
            v-if="step < 3"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
          <button
            type="submit"
            v-if="step === 3"
            class="bg-green-500 text-white px-4 py-2 rounded"
          >
            {{ isEdit ? "Update" : "Add" }}
          </button>
        </div>
      </form>
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-600">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Booking } from "~/types/booking";
import { type Travel } from "~/types/travel";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  bookingData: {
    type: Object as () => Travel,
    required: false,
  },
  isModalOpen: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["close", "submit"]);

const step = ref(1);
const selectedtravelTitle = ref("");
const filteredtravels = ref<Travel[]>(props.travels);

const searchtravels = () => {
  filteredtravels.value = props.travels.filter((travel) =>
    travel.travelTitle
      .toLowerCase()
      .includes(selectedtravelTitle.value.toLowerCase())
  );
};

watch(
  () => props.isModalOpen,
  (newVal) => {
    if (newVal) {
      step.value = 1;
      selectedtravelTitle.value =
        props.travels.find(
          (travel) => travel.travelId === props.bookingData.travelId
        )?.travelTitle || "";
    }
  }
);

const nextStep = () => {
  if (step.value === 1) {
    const selectedtravel = props.travels.find(
      (travel) => travel.travelTitle === selectedtravelTitle.value
    );
    if (selectedtravel) {
      props.bookingData.travelId = selectedtravel.travelId;
      step.value = 2;
    }
  } else if (step.value === 2) {
    step.value = 3;
  }
};

const previousStep = () => {
  if (step.value > 1) step.value--;
};

const submitForm = () => {
  emits("submit", props.bookingData);
};

const closeModal = () => {
  emits("close");
};
</script>
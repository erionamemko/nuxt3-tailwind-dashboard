<template>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    <div class="mb-4">
      <p>{{ message }}</p>
    </div>
    <div class="flex justify-end">
      <button
        @click="confirmAction"
        class="bg-red-500 text-white px-4 py-2 rounded mr-2"
      >
        Yes
      </button>
      <button
        @click="closeModal"
        class="bg-gray-500 text-white px-4 py-2 rounded"
      >
        No
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  isModalOpen: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["close", "confirm"]);

const closeModal = () => {
  emits("close");
};

const confirmAction = () => {
  emits("confirm");
};
</script>

<template>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    <div class="mb-4">
      <p>{{ message }}</p>
    </div>
    <div class="flex justify-end">
      <button
        class="bg-red-500 text-white px-4 py-2 rounded mr-2"
        title="Yes"
        @click="confirmAction"
      >
        Yes
      </button>
      <button
        class="bg-gray-500 text-white px-4 py-2 rounded"
        title="No"
        @click="closeModal"
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

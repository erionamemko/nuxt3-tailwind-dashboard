<template>
  <Modal :isOpen="isModalOpen" @close="closeModal">
    <div class="text-black-600 mb-4">
      <p>
        <Icon
          size="30"
          name="material-symbols:brightness-alert-outline"
          color="orange"
        />{{ message }}
      </p>
      <p class="mt-6 font-[bold]" v-if="description">
        {{ description }}
      </p>
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
  description: {
    type: String,
    required: false,
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

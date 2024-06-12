<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md relative max-h-[680px] overflow-scroll">
      <button
        @click="closeModal"
        class="absolute top-0 right-0 m-2 text-gray-600"
        title="Close"
      >
      <Icon
          class="cursor-pointer text-gray-800"
          size="20"
          name="material-symbols:close"
        />
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["close"]);

const closeModal = () => {
  emits("close");
};
</script>

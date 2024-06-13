<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-bg">
      <button @click="closeModal" class="modal-bg__close" title="Close">
        <Icon class="cursor-pointer text-gray-800" size="20" name="material-symbols:close" />
      </button>
      <slot/>
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
<style lang="postcss" scoped>
.modal {
  &-bg {
    @apply bg-white p-6 rounded shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-scroll;

    &__close {
      @apply absolute top-0 right-0 m-2 text-gray-600;
    }
  }

  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50;
}
</style>
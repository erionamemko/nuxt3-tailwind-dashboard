<template>
  <div class="search py-3 px-4">
    <div class="relative max-w-xs">
      <label class="sr-only">Search</label>
      <input
        type="text"
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Search..."
        name="hs-table-with-pagination-search"
        id="hs-table-with-pagination-search"
        class="search-input"
      />
      <Icon
        v-if="searchQuery"
        @click="clearSearch"
        size="24"
        name="material-symbols:close-small-outline-rounded"
        color="black"
        class="search-clear-icon"
      />
      <div class="search-icon">
        <Icon size="24" name="material-symbols:search-rounded" color="black" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("");

const emit = defineEmits<{
  (e: "search", query: string): void;
}>();

const onSearch = () => {
  emit("search", searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = "";
  onSearch();
};
</script>

<style lang="postcss" scoped>
.search {
  &-input {
    @apply py-2 pr-4 px-3 ps-9 block w-full shadow-sm rounded-lg focus:z-10 disabled:opacity-50 disabled:pointer-events-none border-b-[gray] border-b border-solid;
  }

  &-clear-icon {
    @apply text-gray-400 absolute top-2 right-2 cursor-pointer hover:text-gray-600;
  }

  &-icon {
    @apply absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2;
  }
}
</style>

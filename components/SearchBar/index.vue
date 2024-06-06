<template>
  <div class="py-3 px-4">
    <div class="relative max-w-xs">
      <label class="sr-only">Search</label>
      <input
        type="text"
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Search..."
        name="hs-table-with-pagination-search"
        id="hs-table-with-pagination-search"
        class="py-2 px-3 ps-9 block w-full shadow-sm rounded-lg text-md focus:z-10 disabled:opacity-50 disabled:pointer-events-none border-b-[gray] border-b border-solid"
      />
      <svg
        v-if="searchQuery"
        @click="clearSearch"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-400 absolute top-2 right-3 cursor-pointer hover:text-gray-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
      <div
        class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3"
      >
        <svg
          class="size-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
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

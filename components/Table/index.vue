<template>
  <div class="border rounded-lg divide-y divide-gray-200 overflow-x-auto max-w-[98%] overflow-x-scroll margin-x-auto ml-auto mr-auto">
    <div class="flex justify-between mb-4">
      <SearchBar @search="handleSearch" />
      <slot name="actions"></slot>
      <!-- Other pagination controls here -->
    </div>
    <table
      class="min-w-full bg-white border border-gray-200 shadow-md min-w-full divide-y divide-gray-200 overflow-scroll"
    >
      <thead class="rounded-tl-3xl">
        <tr class="bg-[#4d4d4d] text-white">
          <th
            v-for="column in columns"
            :key="column.key"
            @click="column.sortable ? sortBy(column.key) : null"
            class="py-2 px-4 border-b border-gray-200 text-left cursor-pointer"
          >
            <div class="flex items-center justify-start">
              <span>{{ column.label }}</span>
              <!-- isSortDescending sortKey === column.key -->
              <span class="flex" v-if="column.sortable">
                <Icon
                  size="20"
                  name="material-symbols:filter-alt-outline"
                  class="ml-2"
                />
              </span>
            </div>
          </th>
          <th class="py-2 px-4 border-b border-gray-200 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in paginatedData" :key="row.id" class="hover:bg-gray-50">
          <td
            v-for="column in columns"
            :key="column.key"
            class="border-b border-gray-200 py-2 px-4 text-left"
          >
            <img
              v-if="column.key === 'imageUrl'"
              :src="row[column.key]"
              alt="travel Image"
              class="w-32 h-32 object-cover rounded-tr-3xl shadow-xl ml-[-15px] rounded-bl-3xl min-w-48"
            />
            <span v-else>{{ row[column.key] }}</span>
          </td>
          <td class="py-2 px-4 border-b border-gray-200">
            <button
              @click="$emit('edit', row)"
              class="text-blue-500 hover:text-blue-700 mr-2"
            >
              Edit
            </button>
            <button
              @click="$emit('remove', row)"
              class="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  columns: {
    type: Array as () => { key: string; label: string; sortable?: boolean }[],
    required: true,
  },
  data: {
    type: Array as () => any[],
    required: true,
  },
});

const sortKey = ref("");
const isSortDescending = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const searchQuery = ref("");

const sortedData = computed(() => {
  if (!sortKey.value) {
    return props.data;
  }

  const sorted = [...props.data].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (aValue < bValue) return isSortDescending.value ? 1 : -1;
    if (aValue > bValue) return isSortDescending.value ? -1 : 1;
    return 0;
  });

  return sorted;
});

const filteredData = computed(() => {
  return sortedData.value.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value);
});

const sortBy = (key: string) => {
  if (sortKey.value === key) {
    isSortDescending.value = !isSortDescending.value;
  } else {
    sortKey.value = key;
    isSortDescending.value = false;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1; // Reset to the first page after a search
};
</script>

<style scoped>
/* Add any additional styles if necessary */
</style>

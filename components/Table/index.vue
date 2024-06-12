<template>
  <div class="flex justify-between mb-4">
    <SearchBar @search="handleSearch" />
    <slot name="actions"></slot>
  </div>
  <div class="table-container margin-x-auto overflow-x-scroll lg:max-w-[calc(100vw_-_145px)] max-w-full">
    <table>
      <thead class="rounded-tl-3xl bg-black text-white">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            @click="column.sortable ? sortBy(column.key) : null"
            class="table-container-columns"
          >
            <div class="flex items-center justify-start">
              <span>{{ column.label }}</span>
              <span class="flex" v-if="column.sortable">
                <Icon
                  size="20"
                  name="material-symbols:filter-alt-outline"
                  class="ml-2"
                />
              </span>
            </div>
          </th>
          <th class="table-container-actions">Actions</th>
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
              @error="handleImageError"
              alt="travel Image"
              class="table-container-image shadow-[15px_9px_2px_-9px_rgba(0, 0, 0, 0.88)]"
            />
            <span v-else-if="column.key === 'price'">
              {{ row[column.key] }} €
            </span>
            <span v-else-if="column.key === 'userRating'">
              {{ row[column.key] }} / 5
            </span>
            <span
              v-else-if="
                column.key !== 'departureDate' && column.key !== 'returnDate'
              "
            >
              {{ row[column.key] }}
            </span>
            <CalendarCard v-else :date="row[column.key]" />
          </td>
          <td class="py-2 px-4 border-b border-gray-200">
            <button
              class="text-blue-500 hover:text-blue-700 mr-2"
              title="Edit"
              @click="$emit('edit', row)"
            >
              Edit
            </button>
            <button
              class="text-red-500 hover:text-red-700"
              title="Delete"
              @click="$emit('remove', row)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-between items-center mt-4">
    <button
      class="table-container__previous-btn"
      title="Previous"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      class="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      title="Next"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
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

const emit = defineEmits(["edit", "remove"]);

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
  currentPage.value = 1;
};
const handleImageError = (event: Event) => {
  (event.target as HTMLImageElement).src = "/svg/places.svg";
};
</script>

<style lang="postcss" scoped>
.table-container {
  @apply border rounded-lg divide-y divide-gray-200 ml-auto mr-auto;

  table {
    @apply bg-white border border-gray-200 shadow-md;
  }

  &-columns {
    @apply py-4 px-4 border-b border-gray-200 text-left cursor-pointer lg:min-w-[100px];
  }

  &-actions {
    @apply py-2 px-4 border-b border-gray-200 text-left;
  }

  &-image {
    @apply w-32 h-32 object-cover rounded-tr-3xl ml-[-15px] rounded-bl-3xl min-w-48;
  }
  &__previous-btn {
    @apply px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50;
  }
}
</style>

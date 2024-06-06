<template>
  <header class="flex items-center h-20 px-6 sm:px-10 bg-white shadow-lg">
    <div class="flex flex-shrink-0 items-center ml-auto">
      <button class="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
        <span class="sr-only">User Menu</span>
        <div class="hidden md:flex md:flex-col md:items-end md:leading-tight">
          <span class="font-semibold">Welcome back</span>
          <span class="text-sm text-gray-600">WeRoader</span>
        </div>
        <span class="h-16 w-16 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
          <img
            src="/images/avatar.jpg"
            alt="user profile photo"
            class="h-full w-full object-cover"
          />
        </span>
      </button>
      <div class="border-l pl-3 ml-3 space-x-1">
        <button
          class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
        >
          <span class="sr-only">Notifications</span>
          <span
            class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"
          ></span>
          <span
            class="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"
          ></span>
        
          <Icon
            size="24"
            name="material-symbols:notifications-outline"
            color="black"
          />
        </button>
        <button
          class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
        >
          <span class="sr-only">Log out</span>
          <Icon
            size="24"
            name="material-symbols:logout"
            color="black"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <header class="header">
    <div class="header-title">
      <h1><span class="bg-[#ff4758] px-2">Dash</span>Board.</h1>
    </div>
    <div class="header-container">
      <button class="header-container__profile-button">
        <div class="header-container__profile-name">
          <span class="font-semibold">Welcome back</span>
          <span class="text-sm text-gray-600">WeRoader</span>
        </div>
        <span class="header-container__profile-img md:h-13">
          <img
            src="/images/wr-black.jpg"
            alt="user profile photo"
            class="h-full w-full object-cover"
          />
        </span>
      </button>
      <div class="border-l pl-3 ml-3 space-x-1">
        <button class="header-container__notification-btn">
          <span class="rounded-full"></span>
          <span class="animate-ping"></span>

          <Icon
            size="24"
            name="material-symbols:notifications-outline"
            color="black"
          />
        </button>
        <button class="header-container__logout-btn">
          <Icon size="24" name="material-symbols:logout" color="black" />
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style lang="postcss" scoped>
.header {
  @apply flex items-center h-20 px-6 sm:px-10 bg-white shadow-lg;

  &-title {
    @apply flex relative w-full max-w-md ml-8 lg:-ml-2;

    h1 {
      @apply mb-4 text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl;
    }
  }

  &-container {
    @apply flex flex-shrink-0 items-center ml-auto;

    &__profile-button {
      @apply inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg;
    }

    &__profile-name {
      @apply hidden md:flex md:flex-col md:items-end md:leading-tight;
    }

    &__profile-img {
      @apply w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 overflow-hidden;
    }

    &__notification-btn {
      @apply relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full;

      span {
        @apply absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500;
      }
    }

    &__logout-btn {
      @apply relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full;
    }
  }
}
</style>

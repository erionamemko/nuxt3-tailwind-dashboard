<template>
  <div class="sidebar bg-black">
    <!-- Mobile Menu Button -->
    <div class="sidebar-menu-btn">
      <Icon class="cursor-pointer" size="30" name="iconamoon:menu-burger-horizontal" @click="toggleSidebar" />
    </div>

    <!-- Mobile Sidebar -->
    <transition name="fade">
      <div v-if="isSidebarOpen" class="sidebar-mobile"
        @click.prevent="toggleSidebar">
        <Icon class="sidebar-mobile-icon" size="30" name="material-symbols:close" />
        <SidebarMenu />
      </div>
    </transition>

    <!-- Desktop Sidebar -->
    <div class="sidebar-desktop">
      <SidebarMenu />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style lang="postcss" scoped>
.sidebar {
  &-menu-btn {
    @apply lg:hidden flex items-center justify-between p-4 absolute;
  }
  &-mobile{
    &-icon {
      @apply absolute cursor-pointer top-4 right-4;
    }
    @apply fixed inset-0 z-50 lg:hidden bg-white lg:pb-0 pb-4;
  }
  &-desktop {
    @apply hidden lg:flex h-screen flex-col justify-between border-r min-w-24;
  }
}</style>
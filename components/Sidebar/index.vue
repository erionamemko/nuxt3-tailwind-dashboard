<template>
  <div>
    <!-- Mobile Menu Button -->
    <div class="lg:hidden flex items-center justify-between p-4 absolute">
      <Icon
        class="cursor-pointer"
        size="30"
        name="iconamoon:menu-burger-horizontal"
        @click="toggleSidebar"
      />
    </div>

    <!-- Mobile Sidebar -->
    <transition name="fade">
      <div v-if="isSidebarOpen" class="fixed inset-0 bg-white z-50 lg:hidden" @click.prevent="toggleSidebar">
        <Icon
          class="absolute cursor-pointer top-4 right-4"
          size="30"
          name="material-symbols:close"
        />
        <SidebarMenu />
      </div>
    </transition>

    <!-- Desktop Sidebar -->
    <div class="hidden lg:flex h-screen flex-col justify-between border-r">
      <SidebarMenu />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  console.log('test')
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

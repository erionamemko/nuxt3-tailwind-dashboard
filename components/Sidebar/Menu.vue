<template>
  <div class="menu relative lg:fixed">
    <div class="menu-container">
      <img width="60" src="/svg/wr-mobile.svg" />
    </div>
    <div class="px-4 grow">
      <div class="grid gap-2">
        <NuxtLink :href="item.path" v-for="(item, index) in items" :key="index" class="menu-container-link">
          <Icon size="30" :name="item.icon" class="color-black" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface MenuItem {
  path: string;
  icon: string;
}

const items = ref<MenuItem[]>([
  {
    path: "/",
    icon: "ri:dashboard-line",
  },
  {
    path: "/travels",
    icon: "material-symbols:travel",
  },
  {
    path: "/bookings",
    icon: "material-symbols:calendar-add-on",
  },
]);
</script>

<style lang="postcss" scoped>
.menu {
  &-container {
    &-link {
      @apply inline-flex items-center justify-center py-3 bg-[#ff4758] hover:bg-black focus:bg-black hover:border-l-[5px] focus:border-l-[5px] border-[#ff4758] text-black hover:text-[#ff4758] focus:text-[#ff4758] rounded-lg;
    }

    @apply flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer mb-5;
  }

}

.router-link-active {
  background-color: black;
  color: #ff4758;
  border-left: 5px inset;
}
</style>
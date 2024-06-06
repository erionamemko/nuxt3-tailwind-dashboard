<template>
  <div>
    <div
      class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer mb-5"
    >
      <img width="60" src="/svg/wr-mobile.svg" />
    </div>
    <div class="px-4 grow">
      <div class="grid gap-2">
        <NuxtLink
          :href="item.path"
          v-for="(item, index) in items"
          :key="index"
          class="inline-flex items-center justify-center py-3 hover:text-gray-400 bg-[#ff4758] focus:text-gray-400 rounded-lg"
        >
          <Icon
            size="30"
            :name="item.icon"
            color="black"
            class="hover:color-white"
          />
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

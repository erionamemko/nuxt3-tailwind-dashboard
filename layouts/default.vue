<template>
  <div class="flex">
    <Sidebar />
    <div class="w-full">
      <Header />
      <div class="p-4 lg:max-w-[1400px] m-auto max-w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
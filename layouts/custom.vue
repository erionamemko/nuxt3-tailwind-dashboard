<template>
  <div class="grid items-start lg:flex">
    <Sidebar />
    <div class="w-full">
      <Header />
        <slot />
    </div>
  </div>
</template>
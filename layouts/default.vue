<template>
    <div class="grid items-start lg:flex">
        <Sidebar />
        <div class="w-full">
            <Header />
            <div class="p-4">
                <slot />
            </div>
        </div>
    </div>
</template>
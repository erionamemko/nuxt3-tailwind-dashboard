<!-- CalendarCard.vue -->
<template>
    <div class="min-w-32 min-h-48 p-3 mb-4 font-medium">
      <div class="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-md">
        <div class="block rounded-t overflow-hidden text-center">
          <div class="bg-black text-white py-1">
            {{ month }}
          </div>
          <div class="pt-1 border-l border-r border-white bg-white">
            <span class="text-5xl font-bold leading-tight">
              {{ day }}
            </span>
          </div>
          <div class="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
            <span class="text-sm">
              {{ weekday }}
            </span>
          </div>
          <div class="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white">
            <span class="text-xs leading-normal">
              {{ time }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { format } from 'date-fns';
  
  const props = defineProps({
    date: {
      type: String,
      required: true
    }
  });
  
  const month = computed(() => format(new Date(props.date), 'MMMM'));
  const day = computed(() => format(new Date(props.date), 'dd'));
  const weekday = computed(() => format(new Date(props.date), 'EEEE'));
  const time = computed(() => format(new Date(props.date), 'h:mm a'));
  </script>
  
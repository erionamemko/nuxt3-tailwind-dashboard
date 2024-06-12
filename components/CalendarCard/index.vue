<template>
  <div class="font-medium">
    <div class="calendar">
      <div class="calendar-container">
        <div class="calendar-container__month">
          {{ month }}
        </div>
        <div class="calendar-container__day">
          <span>
            {{ day }}
          </span>
        </div>
        <div class="calendar-container__weekday -pt-2 -mb-1">
          <span class="text-xs">
            {{ weekday }}
          </span>
        </div>
        <div class="calendar-container__time">
          <span class="text-xs leading-normal">
            {{ time }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});

const month = computed(() => format(new Date(props.date), "MMMM"));
const day = computed(() => format(new Date(props.date), "dd"));
const weekday = computed(() => format(new Date(props.date), "EEEE"));
const time = computed(() => format(new Date(props.date), "h:mm a"));
</script>

<style scoped lang="postcss">
.calendar {
  @apply w-28 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-md;

  &-container {
    @apply block rounded-t overflow-hidden text-center;

    &__month {
      @apply bg-black text-white py-1;
    }

    &__day {
      @apply pt-1 border-l border-r border-white bg-white;

      span {
        @apply text-3xl font-bold leading-tight;
      }
    }

    &-weekday {
      @apply border-l border-r border-b rounded-b-lg text-center border-white bg-white;
    }

    &-time {
      @apply pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white;
    }
  }
}
</style>

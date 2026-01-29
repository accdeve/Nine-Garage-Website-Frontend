<script setup lang="ts">
import { computed } from "vue";
import type { BookingAvailability } from "~/models/booking/booking";

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    availability: BookingAvailability[];
    startHour?: number;
    endHour?: number;
  }>(),
  {
    startHour: 8,
    endHour: 17,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Generate default hours if availability is empty
const displayHours = computed(() => {
  if (props.availability.length > 0) {
    return props.availability;
  }

  const result: BookingAvailability[] = [];
  for (let h = props.startHour; h <= props.endHour; h++) {
    const hourStr = `${h.toString().padStart(2, "0")}:00`;
    result.push({ hour: hourStr, status: "available" });
  }
  return result;
});

const selectHour = (hour: string, status: string) => {
  if (status !== "available") return;
  emit("update:modelValue", hour);
};
</script>

<template>
  <div class="grid grid-cols-2 grid-flow-row-dense gap-4">
    <div
      v-for="item in displayHours"
      :key="item.hour"
      class="px-2 py-1 border rounded text-center text-sm w-16 transition-all"
      :class="{
        'border-primary text-primary bg-primary/5 cursor-pointer':
          modelValue === item.hour,
        'border-neutral-200 text-neutral-600 cursor-pointer hover:border-primary':
          modelValue !== item.hour && item.status === 'available',
        'border-red-500 text-red-500 opacity-70 cursor-not-allowed':
          item.status === 'booked' || item.status === 'locked',
      }"
      @click="selectHour(item.hour, item.status)"
    >
      <div>
        {{ item.hour }}
      </div>
      <div
        v-if="item.status === 'locked'"
        class="text-[8px] uppercase font-bold"
      >
        Locked
      </div>
      <div
        v-else-if="item.status === 'booked'"
        class="text-[8px] uppercase font-bold"
      >
        Full
      </div>
    </div>
  </div>
</template>

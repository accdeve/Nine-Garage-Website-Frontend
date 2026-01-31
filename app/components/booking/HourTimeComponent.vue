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
        'border-primary-500 bg-primary-50 text-primary-700':
          modelValue === item.hour && item.status === 'available',
        'border-green-200 bg-green-50 text-green-700 cursor-pointer hover:border-green-500':
          modelValue !== item.hour && item.status === 'available',
        'border-yellow-400 bg-yellow-50 text-yellow-700 cursor-not-allowed':
          item.status === 'locked',
        'border-red-400 bg-red-50 text-red-700 cursor-not-allowed':
          item.status === 'booked',
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
      <div v-else class="text-[8px] uppercase font-bold opacity-50">
        Available
      </div>
    </div>
  </div>
</template>

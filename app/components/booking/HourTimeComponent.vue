<script setup lang="ts">
import { computed } from "vue";
import type { BookingAvailability } from "~/models/booking/booking";

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    availability: BookingAvailability[];
    startHour?: number;
    endHour?: number;
    originalHour?: string | null;
  }>(),
  {
    startHour: 8,
    endHour: 17,
    originalHour: null,
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
        'border-blue-500 bg-blue-500 text-white font-bold ring-2 ring-blue-300':
          item.hour === originalHour,
        'border-primary-500 bg-primary-50 text-primary-700 font-bold ring-2 ring-primary-300':
          modelValue === item.hour &&
          item.hour !== originalHour &&
          item.status === 'available',
        'border-green-200 bg-green-50 text-green-700 cursor-pointer hover:border-green-500 hover:bg-green-100':
          modelValue !== item.hour &&
          item.hour !== originalHour &&
          item.status === 'available',
        'border-yellow-400 bg-yellow-50 text-yellow-700 cursor-not-allowed':
          item.status === 'locked' && item.hour !== originalHour,
        'border-red-400 bg-red-50 text-red-700 cursor-not-allowed':
          item.status === 'booked' && item.hour !== originalHour,
      }"
      @click="selectHour(item.hour, item.status)"
    >
      <div>
        {{ item.hour }}
      </div>
      <div
        v-if="item.hour === originalHour"
        class="text-[8px] uppercase font-bold"
      >
        Sebelumnya
      </div>
      <div
        v-else-if="modelValue === item.hour"
        class="text-[8px] uppercase font-bold"
      >
        {{ originalHour ? "Ganti" : "Dipilih" }}
      </div>
      <div
        v-else-if="item.status === 'locked'"
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

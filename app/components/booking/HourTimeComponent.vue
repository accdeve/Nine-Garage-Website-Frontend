<script setup lang="ts">
import { computed } from "vue";
import { useTimeFormatter } from "~/composables/useTimeFormatter";

const props = withDefaults(
  defineProps<{
    modelValue: number | null;
    startHour?: number;
    endHour?: number;
  }>(),
  {
    startHour: 8,
    endHour: 17,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const hours = computed(() => {
  const result: number[] = [];
  for (let h = props.startHour; h <= props.endHour; h++) {
    result.push(h);
  }
  return result;
});

const selectHour = (hour: number) => {
  emit("update:modelValue", hour);
};

const { formatHour } = useTimeFormatter();
</script>

<template>
  <div class="grid grid-cols-2 grid-flow-row-dense gap-4">
    <div
      v-for="hour in hours"
      :key="hour"
      class="cursor-pointer px-2 py-1 border rounded text-center text-sm w-16"
      :class="{
        'border-green-300 text-green-300': modelValue === hour,
        'border-gray-300': modelValue !== hour,
      }"
      @click="selectHour(hour)"
    >
      <div class="text">    
        {{ formatHour(hour) }}
      </div>
    </div>
  </div>
</template>

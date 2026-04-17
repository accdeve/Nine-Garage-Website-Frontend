import { defineStore } from "pinia";
import { createState } from "./state";
import { getters } from "./getters";
import { workshopActions } from "./actions/workshop";
import { availabilityActions } from "./actions/availability";
import { bookingActions } from "./actions/booking";
import { timerActions } from "./actions/timer";
import { sseActions } from "./actions/sse";

export const useBookingStore = defineStore("booking", {
  state: createState,
  getters,
  actions: {
    ...workshopActions,
    ...availabilityActions,
    ...bookingActions,
    ...timerActions,
    ...sseActions,
  },
});

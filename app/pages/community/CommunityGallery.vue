<script setup lang="ts">
import GalleryComponent from "~/components/community/GalleryComponent.vue";
import { useKomunitasStore } from "~/stores/komunitas";

const store = useKomunitasStore();
</script>

<template>
  <section>
    <h2 class="text-lg font-semibold mb-2 text-center mt-10">
      Some Moment We Felt Together
    </h2>

    <div class="p-4 space-y-8">
      <GalleryComponent
        v-for="komunitas in store.list"
        :key="komunitas.slug"
        :name="komunitas.name"
        :slug="komunitas.slug"
        :images="komunitas.images"
      />
    </div>
  </section>
</template>

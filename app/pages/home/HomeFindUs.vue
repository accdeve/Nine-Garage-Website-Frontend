<script setup lang="ts">
import FindUsComponent from "~/components/home/FindUsComponent.vue";
import daan from "~/assets/images/home/nine-garage-daan-mogot.jpg";
import jelambar from "~/assets/images/home/nine-garage-jelambar.jpg";
</script>

<template>
  <section class="mb-5 bg-neutral-200 py-5">
    <h3 class="text-center text-2xl font-bold mb-5">Temukan Kami</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <FindUsComponent
        :image-url="daan"
        address="Batuceper, Kota Tangerang, Banten"
        :is-active="false"
        link="https://maps.app.goo.gl/AqWVUDKzddyhRpLa6"
      />
      <FindUsComponent
        :image-url="jelambar"
        address=" Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta"
        link="https://maps.app.goo.gl/jyqCj3Biy2kUE4Qs6"
        :is-active="false"
      />
    </div>
  </section>
</template>

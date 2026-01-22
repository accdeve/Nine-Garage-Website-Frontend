<script setup lang="ts">
import FindUsComponent from "~/components/home/FindUsComponent.vue";
import daan from '~/assets/images/home/nine-garage-daan-mogot.jpg'
import jelambar from '~/assets/images/home/nine-garage-jelambar.jpg'
</script>

<template>
    <section class="mb-20">
        <h3 class="text-center text-2xl font-bold mb-8">Temukan Kami</h3>
        <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
            <FindUsComponent :image-url="daan" address="Jl. Merdeka No.123, Jakarta" :isActive="true" />
            <FindUsComponent :image-url="jelambar" address="Jl. Sudirman No.456, Bandung" :isActive="false" />
        </div>
    </section>
</template>
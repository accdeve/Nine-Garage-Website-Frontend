<script setup lang="ts">
    defineProps<{
        title : string
        subtitle : string
        iconUrl : string
    }>();
</script>

<template>
    <section>
        <div class="border">
            <div class="p-6 text-center">
                <UIcon :name="iconUrl" class="size-5" />
                <h3 class="mb-2 text-lg font-semibold">{{ title }}</h3>
                <p class="text-gray-600">{{ subtitle }}</p>
            </div>
        </div>
    </section>
</template>
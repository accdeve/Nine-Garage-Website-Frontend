<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  captions: string[]
  finished: boolean
  scrollWidth: number
}>()


const containerRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const spacerRef = ref<HTMLElement | null>(null)

let captionTrigger: ScrollTrigger | null = null
let currentIndex = -1

const splitText = (text: string) => {
  if (!textRef.value) return
  const words = text.split(" ")
  textRef.value.innerHTML = words
    .map(w => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${w}</span></span>`)
    .join(" ")
}

const animateText = () => {
  if (!textRef.value) return
  gsap.to(textRef.value.querySelectorAll("span span"), {
    y: 0,
    stagger: 0.05,
    duration: 0.6,
    ease: "power3.out",
  })
}

onMounted(() => {
  const container = containerRef.value
  const spacer = spacerRef.value
  if (!container || !spacer) return

  captionTrigger = ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: () => `+=${props.scrollWidth}`,
    scrub: true,
    onUpdate(self) {
      const index = Math.min(
        props.captions.length - 1,
        Math.floor(self.progress * props.captions.length)
      )

      if (index !== currentIndex && !props.finished) {
        currentIndex = index
        splitText(props.captions[0]!)
        animateText()
      }
    },
  })
})

watch(
  () => props.finished,
  (done) => {
    if (!spacerRef.value) return

    gsap.to(spacerRef.value, {
      height: done ? "5vh" : "40vh",
      duration: 0.25,
      ease: "power2.out",
      overwrite: true,
    })
  }
)

onBeforeUnmount(() => {
  captionTrigger?.kill()
})
</script>

<template>
  <section
    ref="containerRef"
    class="relative w-full flex items-center justify-center"
  >
    <div
      ref="spacerRef"
      class="w-full flex items-center justify-center"
      style="height: 40vh"
    >
      <h2
        v-if="!finished"
        ref="textRef"
        class="text-center text-3xl md:text-4xl font-black leading-tight px-6"
      />

      <UButton
        v-else
        size="lg"
        class="w-full max-w-md"
      >
        Booking Sekarang
      </UButton>
    </div>
  </section>
</template>

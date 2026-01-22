import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface Komunitas {
  slug: string;
  name: string;
  images: string[];
}

export const useKomunitasStore = defineStore("komunitas-store", () => {
  const list = ref<Komunitas[]>([
    {
      slug: "komunitas-mobil-tangerang",
      name: "Komunitas Mobil Tangerang",
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023",
        "https://images.unsplash.com/photo-1549924231-f129b911e442",
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023",
        "https://images.unsplash.com/photo-1549924231-f129b911e442",
      ],
    },
    {
      slug: "komunitas-mobil-jakarta",
      name: "Komunitas Mobil Jakarta",
      images: [
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      ],
    },
    {
      slug: "komunitas-mobil-bandung",
      name: "Komunitas Mobil Bandung",
      images: [
        "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        "https://images.unsplash.com/photo-1489824904134-891ab64532f1",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      ],
    },
    {
      slug: "komunitas-mobil-surabaya",
      name: "Komunitas Mobil Surabaya",
      images: [
        "https://images.unsplash.com/photo-1542362567-b07e54358753",
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
        "https://images.unsplash.com/photo-1549924231-f129b911e442",
      ],
    },
    {
      slug: "komunitas-mobil-yogyakarta",
      name: "Komunitas Mobil Yogyakarta",
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023",
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60",
      ],
    },
    {
      slug: "komunitas-mobil-bali",
      name: "Komunitas Mobil Bali",
      images: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a",
        "https://images.unsplash.com/photo-1489824904134-891ab64532f1",
      ],
    },
  ]);

  const getBySlug = computed(() => {
    return (slug: string) =>
      list.value.find((k) => k.slug === slug) || null;
  });

  return {
    list,
    getBySlug,
  };
});

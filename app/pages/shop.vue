<script setup lang="ts">
import { ref, computed } from "vue";
import useBasic from "../composables/useBasic";

const help = useBasic();
const searchQuery = ref("");
const sortOrder = ref("default");
const activeCategory = ref("All");

const categories = [
  { label: "All", value: "All" },
  { label: "🎧 Audio", value: "Audio" },
  { label: "📱 Gadgets", value: "Gadgets" },
  { label: "🏠 Appliances", value: "Appliances" },
  { label: "💍 Accessories", value: "Accessories" },
];

// ── Computed: filter + sort ────────────────────────────────────────────────
const filteredProducts = computed(() => {
  let list = help.products.value.filter((p) => {
    const matchCat =
      activeCategory.value === "All" || p.category === activeCategory.value;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value);
    return matchSearch && matchCat;
  });
  if (sortOrder.value === "price-asc")
    return [...list].sort((a, b) => a.price - b.price);
  if (sortOrder.value === "price-desc")
    return [...list].sort((a, b) => b.price - a.price);
  // if (sortOrder.value === '')
  return list;
});
function resetFilters() {
  searchQuery.value = "";
  activeCategory.value = "All";
  sortOrder.value = "default";
}
</script>
<template>
  <div class="bg-gray-950 text-white font-nunito min-h-screen">
    <!-- ========== PAGE HEADER ========== -->
    <div class="pt-24 pb-10 bg-gray-900 border-b border-white/5">
      <div class="max-w-6xl mx-auto px-6">
        <p
          class="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-1"
        >
          RisingStar
        </p>
        <h1 class="font-syne text-4xl font-extrabold">Shop</h1>
        <p class="text-gray-400 mt-2 text-sm">
          Accessories, gadgets &amp; appliances — all in one place.
        </p>
      </div>
    </div>

    <!-- ========== MAIN CONTENT ========== -->
    <div class="max-w-6xl mx-auto px-6 py-10">
      <!-- Search + Sort -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <div class="relative flex-1">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full bg-gray-900 border border-white/10 focus:border-amber-400/50 outline-none rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors"
          />
        </div>
        <select
          v-model="sortOrder"
          class="bg-gray-900 border border-white/10 text-sm text-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-amber-400/50 transition-colors"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A–Z</option>
        </select>
      </div>

      <!-- Category filters -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="activeCategory = cat.value"
          class="font-syne text-xs font-bold px-4 py-2 rounded-full border transition-all"
          :class="
            activeCategory === cat.value
              ? 'bg-amber-400 text-gray-900 border-amber-400'
              : 'border-white/15 text-gray-400 hover:border-amber-400/50 hover:text-white'
          "
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Results count -->
      <p class="text-gray-500 text-sm mb-6">
        Showing {{ filteredProducts.length }} product{{
          filteredProducts.length !== 1 ? "s" : ""
        }}
      </p>

      <!-- Product grid -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="card-hover bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-400/20 transition-all flex flex-col"
        >
          <!-- Product image area -->
          <div
            class="relative h-36 flex items-center justify-center text-5xl"
            :class="product.bg"
          >
            {{ product.emoji }}
            <span
              v-if="product.badge"
              class="absolute top-2 left-2 bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full font-syne"
            >
              {{ product.badge }}
            </span>
          </div>

          <!-- Product info -->
          <div class="p-4 flex flex-col flex-1">
            <span
              class="text-xs font-semibold mb-1"
              :class="product.stockClass"
              >{{ product.stock }}</span
            >
            <h3 class="font-syne font-bold text-sm leading-snug mb-1">
              {{ product.name }}
            </h3>
            <p class="text-gray-500 text-xs mb-3">{{ product.category }}</p>
            <div class="flex items-center justify-between mt-auto">
              <span class="font-syne text-amber-400 font-extrabold"
                >${{ product.price.toFixed(2) }}</span
              >
              <button
                @click="help.addToCart(product)"
                class="bg-amber-400 hover:bg-amber-300 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
              >
                + Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-24">
        <div class="text-5xl mb-4">🔍</div>
        <p class="font-syne font-bold text-lg text-gray-300">
          No products found
        </p>
        <p class="text-gray-500 text-sm mt-1">
          Try a different search or category.
        </p>
        <button
          @click="resetFilters"
          class="mt-6 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-6 py-2.5 rounded-full font-syne transition-colors text-sm"
        >
          Clear filters
        </button>
      </div>
    </div>

    <!-- ========== FOOTER ========== -->
    <footer class="bg-gray-950 border-t border-white/5 py-10 mt-10">
      <div
        class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="flex items-center gap-2">
          <svg class="w-6 h-6 star-glow" viewBox="0 0 32 32" fill="none">
            <polygon
              points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12"
              fill="#f59e0b"
            />
          </svg>
          <span class="font-syne font-extrabold text-lg"
            >Rising<span class="text-amber-400">Star</span></span
          >
        </div>
        <p class="text-gray-600 text-sm">
          © 2026 RisingStar. All rights reserved.
        </p>
        <div class="flex gap-6 text-sm text-gray-500">
          <a href="#" class="hover:text-amber-400 transition-colors">Privacy</a>
          <a href="#" class="hover:text-amber-400 transition-colors">Terms</a>
          <a href="#" class="hover:text-amber-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Nunito:wght@400;500;600&display=swap");

.font-syne {
  font-family: "Syne", sans-serif;
}
.font-nunito {
  font-family: "Nunito", sans-serif;
}

.star-glow {
  filter: drop-shadow(0 0 8px #f59e0b);
}

.nav-link {
  position: relative;
  transition: color 0.2s;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #f59e0b;
  transition: width 0.3s;
}
.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}
.nav-link.router-link-active {
  color: #fbbf24;
}

.card-hover {
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(245, 158, 11, 0.12);
}
</style>

<script setup lang="ts">
import useBasic from "../composables/useBasic";

const help = useBasic();
const stats = [
  { value: "5k+", label: "Products" },
  { value: "98%", label: "Happy customers" },
  { value: "24/7", label: "Support" },
];

const decorStars = [
  {
    id: 1,
    style:
      "top:80px;left:40px;width:6px;height:6px;background:#fcd34d;animation-delay:0s",
  },
  {
    id: 2,
    style:
      "top:160px;left:25%;width:4px;height:4px;background:white;animation-delay:0.5s",
  },
  {
    id: 3,
    style:
      "top:128px;right:33%;width:6px;height:6px;background:#fde68a;animation-delay:1s",
  },
  {
    id: 4,
    style:
      "top:240px;right:80px;width:4px;height:4px;background:white;animation-delay:1.5s",
  },
  {
    id: 5,
    style:
      "bottom:160px;left:33%;width:6px;height:6px;background:#fcd34d;animation-delay:0.7s",
  },
  {
    id: 6,
    style:
      "top:288px;left:64px;width:4px;height:4px;background:white;animation-delay:0.3s",
  },
  {
    id: 7,
    style:
      "bottom:240px;right:25%;width:4px;height:4px;background:#fde68a;animation-delay:1.2s",
  },
];

const heroCards = [
  {
    name: "Pro Headphones",
    price: "$89.99",
    emoji: "🎧",
    bgClass: "bg-gradient-to-br from-amber-400/20 to-orange-500/20",
    class: "top-0 right-8",
  },
  {
    name: "Smart Watch",
    price: "$149.99",
    emoji: "⌚",
    bgClass: "bg-gradient-to-br from-blue-400/20 to-cyan-500/20",
    class: "bottom-4 left-4",
  },
  {
    name: "Air Fryer",
    price: "$64.99",
    emoji: "🔌",
    badge: "Hot",
    bgClass: "bg-gradient-to-br from-purple-400/20 to-pink-500/20",
    class: "top-24 left-0 border-amber-400/30",
  },
];

const categories = [
  { name: "Audio", emoji: "🎧", count: 120 },
  { name: "Gadgets", emoji: "📱", count: 340 },
  { name: "Appliances", emoji: "🏠", count: 210 },
  { name: "Accessories", emoji: "💍", count: 500 },
];
</script>
<template>
  <div class="bg-gray-950 text-white font-nunito">
    <!-- ========== HERO ========== -->
    <section
      class="hero-bg min-h-screen flex items-center pt-20 overflow-hidden relative"
    >
      <!-- Decorative twinkling stars -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          v-for="star in decorStars"
          :key="star.id"
          class="absolute rounded-full star-dot"
          :style="star.style"
        ></div>
      </div>

      <div
        class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center w-full py-20"
      >
        <!-- Left: copy -->
        <div>
          <div
            class="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6"
          >
            <svg
              class="w-3.5 h-3.5 text-amber-400"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <polygon
                points="8,1 10,6 15.5,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 0.5,6 6,6"
              />
            </svg>
            <span
              class="text-amber-400 text-xs font-semibold tracking-widest uppercase"
              >New arrivals weekly</span
            >
          </div>

          <h1
            class="font-syne text-5xl md:text-6xl font-extrabold leading-tight mb-6"
          >
            Shop Smarter,<br />
            <span class="text-amber-400">Live Better.</span>
          </h1>

          <p class="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
            From stylish accessories to powerful home appliances — everything
            you need, delivered right to your door.
          </p>

          <div class="flex flex-wrap gap-4">
            <RouterLink
              to="/shop"
              class="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-8 py-3.5 rounded-full font-syne transition-all hover:scale-105"
            >
              Shop Now →
            </RouterLink>
            <button
              class="border border-white/20 hover:border-amber-400/60 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:bg-white/5"
            >
              Explore Deals
            </button>
          </div>

          <!-- Stats -->
          <div class="flex gap-8 mt-12 pt-8 border-t border-white/10">
            <div v-for="stat in stats" :key="stat.label">
              <p class="font-syne text-2xl font-bold text-amber-400">
                {{ stat.value }}
              </p>
              <p class="text-gray-500 text-sm mt-0.5">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Right: floating product cards -->
        <div class="relative hidden md:flex justify-center items-center h-96">
          <div
            v-for="(card, i) in heroCards"
            :key="card.name"
            class="float absolute bg-gray-800/80 backdrop-blur border border-white/10 rounded-2xl p-4 w-44 shadow-2xl"
            :class="card.class"
            :style="{ animationDelay: `${i}s` }"
          >
            <div
              class="w-full h-24 rounded-xl mb-3 flex items-center justify-center text-3xl"
              :class="card.bgClass"
            >
              {{ card.emoji }}
            </div>
            <p class="text-xs font-bold text-white">{{ card.name }}</p>
            <p class="text-amber-400 text-sm font-extrabold font-syne mt-1">
              {{ card.price }}
            </p>
            <span
              v-if="card.badge"
              class="text-xs bg-amber-400 text-gray-900 font-bold px-2 py-0.5 rounded-full"
              >{{ card.badge }}</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CATEGORIES ========== -->
    <section class="bg-gray-900 py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div :style="{}" class="text-center mb-12">
          <p
            class="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-2"
          >
            Browse by category
          </p>
          <h2 class="font-syne text-3xl font-bold">
            What are you looking for?
          </h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="cat in categories"
            :key="cat.name"
            class="card-hover bg-gray-800 rounded-2xl p-6 text-center cursor-pointer border border-white/5 hover:border-amber-400/30 transition-all"
          >
            <div class="text-4xl mb-3">{{ cat.emoji }}</div>
            <p class="font-syne font-bold text-sm">{{ cat.name }}</p>
            <p class="text-gray-500 text-xs mt-1">{{ cat.count }}+ items</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== FEATURED PRODUCTS ========== -->
    <section class="bg-gray-950 py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-center justify-between mb-12">
          <div>
            <p
              class="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-2"
            >
              Handpicked for you
            </p>
            <h2 class="font-syne text-3xl font-bold">Featured Products</h2>
          </div>
          <RouterLink
            to="/shop"
            class="text-amber-400 text-sm font-semibold hover:underline"
            >View all →</RouterLink
          >
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="product in help.products.value.splice(0, 3)"
            :key="product.name"
            class="card-hover bg-gray-900 rounded-2xl overflow-hidden border transition-all border-amber-400/30"
          >
            <div class="relative">
              <div
                class="h-48 flex items-center justify-center text-6xl"
                :class="product.bg"
              >
                {{ product.emoji }}
              </div>
              <span
                v-if="product.badge"
                class="absolute top-3 left-3 bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full"
              >
                {{ product.badge }}
              </span>
            </div>
            <div class="p-5">
              <span
                class="text-xs px-2 py-0.5 rounded-full font-semibold"
                :class="product.stockClass"
              >
                {{ product.stock }}
              </span>
              <h3 class="font-syne font-bold text-base mt-2">
                {{ product.name }}
              </h3>
              <p class="text-gray-500 text-xs mt-1">{{ product.category }}</p>
              <div class="flex items-center justify-between mt-4">
                <span class="font-syne text-amber-400 font-extrabold text-lg">{{
                  product.price
                }}</span>
                <button
                  class="bg-amber-400 hover:bg-amber-300 text-gray-900 text-xs font-bold px-4 py-2 rounded-full transition-colors"
                  @click="help.addToCart(product)"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== PROMO BANNER ========== -->
    <section class="bg-amber-400 py-16">
      <div
        class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <p class="font-syne text-3xl font-extrabold text-gray-900">
            Free delivery on orders over $50
          </p>
          <p class="text-gray-700 mt-1">
            Shop today and get it at your door — fast and free.
          </p>
        </div>
        <RouterLink
          to="/shop"
          class="bg-gray-900 text-white font-bold px-8 py-3.5 rounded-full font-syne hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          Start Shopping →
        </RouterLink>
      </div>
    </section>

    <!-- ========== FOOTER ========== -->
    <footer class="bg-gray-950 border-t border-white/5 py-10">
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

.hero-bg {
  background: linear-gradient(135deg, #0f0c29, #1a1a4e 40%, #24243e);
}

.star-glow {
  filter: drop-shadow(0 0 8px #f59e0b);
}

/* Navbar underline hover effect */
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
  color: white;
}

/* Floating animation for hero cards */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
.float {
  animation: float 4s ease-in-out infinite;
}

/* Twinkling star dots */
@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}
.star-dot {
  animation: twinkle 2s ease-in-out infinite;
}

/* Product card hover lift */
.card-hover {
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(245, 158, 11, 0.12);
}
</style>

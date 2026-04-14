<script setup lang="ts">
import { ref } from "vue";
import useBasic from "../stores/useBasic";

const help = useBasic();
const exitCart = () => (help.isCartOpen.value = false);
// const props = defineProps<{
//     cartArray: AddToCart[]
// }>();
const cartItems = ref(help.cartArray)
const removeItems = (id: number) => {
    cartItems.value = cartItems.value.filter(f => f.id !== id)
}
</script>
<template>
  <!-- Teleport renders the drawer at <body> level so it sits above everything -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
    </Transition>

    <!-- Drawer panel -->
    <Transition name="slide">
      <div
        class="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-gray-950 border-l border-amber-400/20 flex flex-col font-nunito"
      >
        <!-- ── Header ── -->
        <div
          class="flex items-center justify-between px-5 py-4 border-b border-white/7"
        >
          <div class="flex items-center gap-3">
            <svg
              class="w-5 h-5 text-amber-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="font-syne font-extrabold text-base">My Cart</span>
            <span
              class="bg-amber-400 text-gray-900 text-xs font-bold font-syne px-2 py-0.5 rounded-full"
            >
              totalItems
            </span>
          </div>
          <button
            @click="exitCart"
            class="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-amber-400/15 hover:text-amber-400 hover:border-amber-400/30 transition-all flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        <!-- ── Items list ── -->
        <div class="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin">
          <!-- Empty state -->
          <div
            v-if="!cartItems.length"
            class="flex flex-col items-center justify-center h-64 gap-3 text-center"
          >
            <svg
              class="w-14 h-14 text-gray-700"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p class="font-syne font-bold text-gray-400">Your cart is empty</p>
            <p class="text-gray-600 text-sm">Add some items from the shop!</p>
            <button
              @click="help.isCartOpen.value = false"
              class="mt-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold font-syne text-sm px-6 py-2.5 rounded-full transition-colors"
            >
              Browse Shop →
            </button>
          </div>
          <TransitionGroup name="item" tag="div">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-center gap-3 p-3 bg-white/3 border border-white/6 hover:border-amber-400/20 rounded-xl mb-2.5 transition-colors group"
            >
              <!-- Emoji thumbnail -->
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              >
                {{ item.emoji }}
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="font-syne font-bold text-sm text-gray-100 truncate">
                  {{ item.name }}
                </p>
                <p class="text-gray-500 text-xs mt-0.5">{{ item.category }}</p>
                <p class="font-syne font-extrabold text-amber-400 text-sm mt-1">
                  ${{ (item.price * item.price).toFixed(2) }}
                </p>
              </div>

              <!-- Qty controls + remove -->
              <div class="flex items-center gap-1.5 flex-shrink-0">
                <button
                @click="help.decreaseQuantity(item.id)"
                  class="w-6 h-6 rounded-md bg-white/7 border border-white/10 text-gray-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:text-amber-400 transition-all flex items-center justify-center text-base leading-none font-bold"
                >
                  −
                </button>
                <span class="font-syne font-bold text-white text-sm w-4 text-center">
                  {{ item.quantity }}
                </span>
                <button
                @click="help.increaseQuantity(item.id)"
                  class="w-6 h-6 rounded-md bg-white/7 border border-white/10 text-gray-300 hover:bg-amber-400/20 hover:border-amber-400/40 hover:text-amber-400 transition-all flex items-center justify-center text-base leading-none font-bold"
                >
                  +
                </button>
                <button
                    @click="removeItems(item.id)"
                  class="w-6 h-6 rounded-md border border-red-500/20 text-red-500 hover:bg-red-500/15 hover:border-red-500/50 transition-all flex items-center justify-center text-xs ml-0.5"
                >
                  ✕
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;500;600&display=swap");

.font-syne {
  font-family: "Syne", sans-serif;
}
.font-nunito {
  font-family: "Nunito", sans-serif;
}

/* Backdrop fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Drawer slide-in from right */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Cart item add/remove animation */
.item-enter-active {
  transition: all 0.25s ease;
}
.item-leave-active {
  transition: all 0.2s ease;
}
.item-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Thin scrollbar for the items list */
.scrollbar-thin::-webkit-scrollbar {
  width: 3px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 2px;
}
</style>

<script setup lang="ts">
// import { useRoute } from 'vue-router'
import useBasic from "../stores/useBasic";
import type { jwtUserInfo } from "~~/types/addToCart";

const user = useCookie("jwt_token");
const userDetail = ref<jwtUserInfo | null>(null);
onMounted(async () => {
  const token = useCookie("jwt_token");
  if (!token) return;
  const res = await $fetch("/api/auth/verifyToken", {
    method: "POST",
    body: { token: token.value },
  });
  if (!res) return;

  userDetail.value = res.user;
});
const logout = ref(false);
const toggleLogout = () => (logout.value = !logout.value);
const closeLogout = () => (logout.value = false);
const help = useBasic();
const openCart = () => {
  help.isCartOpen.value = !help.isCartOpen.value;
};
const route = useRoute();
const isActive = (routePath: string): boolean => {
  // const route = useRoute()
  return route.path === routePath;
};
</script>
<template>
  <div>
    <div v-if="user && logout">
      <LogoutModal @cancel="closeLogout" />
    </div>
    <nav
      class="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5"
    >
      <div
        class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <svg class="w-8 h-8 star-glow" viewBox="0 0 32 32" fill="none">
            <polygon
              points="16,2 20,12 31,12 22,19 25,30 16,23 7,30 10,19 1,12 12,12"
              fill="#f59e0b"
              stroke="#fcd34d"
              stroke-width="0.5"
            />
          </svg>
          <span
            class="font-syne text-xl text-white font-extrabold tracking-tight"
          >
            Rising<span class="text-amber-400">Star</span>
          </span>
        </RouterLink>

        <!-- Nav Links (desktop) -->
        <div class="hidden md:flex items-center gap-10">
          <RouterLink
            to="/"
            :class="{ 'border-b-2 border-amber-400': isActive('/') }"
            class="nav-link text-sm font-semibold text-white tracking-wide"
            >Home</RouterLink
          >
          <RouterLink
            to="/shop"
            :class="{ 'border-b-2 border-amber-400': isActive('/shop') }"
            class="nav-link text-sm font-semibold text-gray-300 hover:text-white tracking-wide"
            >Shop</RouterLink
          >
          <RouterLink
            to="/about"
            :class="{ 'border-b-2 border-amber-400': isActive('/about') }"
            class="nav-link text-sm font-semibold text-gray-300 hover:text-white tracking-wide"
            >About</RouterLink
          >
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <!-- Cart -->
          <button
            @click="openCart"
            class="relative p-2 text-gray-400 hover:text-amber-400 transition-colors"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span
              class="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-gray-900 text-xs rounded-full flex items-center justify-center font-bold"
            >
              {{ help.cartArray.value.length }}
            </span>
          </button>
          <button
            @click="toggleLogout"
            v-if="user"
            class="bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold px-5 py-2 rounded-full transition-colors font-syne"
          >
            Sign out
          </button>
          <NuxtLink
            v-if="!user"
            to="/login"
            class="bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold px-5 py-2 rounded-full transition-colors font-syne"
          >
            Sign in
          </NuxtLink>
          <!-- Mobile hamburger -->
          <button
            class="md:hidden p-2 text-gray-400 hover:text-white"
            @click="help.mobileMenuOpen.value = !help.mobileMenuOpen.value"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path v-if="!help.mobileMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="help.mobileMenuOpen"
        class="md:hidden bg-gray-900 border-t border-white/5 px-6 py-4 flex flex-col gap-4"
      >
        <RouterLink
          to="/"
          class="text-sm font-semibold text-white"
          @click="help.mobileMenuOpen.value = false"
          >Home</RouterLink
        >
        <RouterLink
          to="/shop"
          class="text-sm font-semibold text-gray-300"
          @click="help.mobileMenuOpen.value = false"
          >Shop</RouterLink
        >
        <RouterLink
          to="/about"
          class="text-sm font-semibold text-gray-300"
          @click="help.mobileMenuOpen.value = false"
          >About</RouterLink
        >
      </div>
    </nav>
    <div v-if="help.isCartOpen.value">
      <CartComponent />
    </div>
    <slot />
  </div>
</template>

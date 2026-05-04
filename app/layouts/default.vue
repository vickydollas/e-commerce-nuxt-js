<script setup lang="ts">
import { useBasic } from "../composables/useBasic";

const { storedToken, getuserDetail, userDetail } = useAuth();
const logout = ref(false);
const toggleLogout = (): boolean => (logout.value = !logout.value);
const closeLogout = () => (logout.value = false);

const help = useBasic();
const route = useRoute();
const isActive = (routePath: string): boolean => {
  // const route = useRoute()
  return route.path === routePath;
};
</script>
<template>
  <div>
    <div v-if="storedToken && logout">
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
        <div class="relative flex items-center gap-3">
          <!-- Cart -->
          <NuxtLink
            to="/cart"
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
          </NuxtLink>
          <!-- profile icon and dropdown -->
          <div
            class="flex items-center gap-3 cursor-pointer px-3 py-1 hover:bg-gray-800 rounded"
            @click="help.openCart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3s-3-1.35-3-3s1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"
              />
            </svg>
            <p
              class="nav-link text-xs font-semibold text-amber-400 hover:text-white tracking-wide"
            >
              {{
                userDetail?.username
                  ? `Welcome, ${userDetail.username}`
                  : "Profile"
              }}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                fill-rule="evenodd"
                d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <!-- profile dropdown -->
          <div
            :ref="help.target"
            @keyup.esc="help.isModalOpen.value = false"
            v-if="help.isModalOpen.value"
            class="min-h-[200px] absolute right-0 top-10 bg-gray-950/80 border border-white/10 rounded-lg py-4 w-60 flex flex-col gap-3"
          >
            <div class="flex justify-center mx-4">
              <button
                @click="toggleLogout"
                v-if="storedToken"
                class="w-full py-2 text-center rounded hover:text-white bg-amber-400"
              >
                Sign out
              </button>
              <NuxtLink
                v-if="!storedToken"
                to="/login"
                class="w-full py-2 text-center rounded hover:text-white bg-amber-400"
              >
                Sign in
              </NuxtLink>
            </div>
            <NuxtLink
              to="/account/profile"
              class="flex items-center gap-3 cursor-pointer hover:bg-gray-900 p-3 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3s-3-1.35-3-3s1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"
                />
              </svg>
              <p class="text-white">My Account</p>
            </NuxtLink>
            <button class="flex items-center gap-3 cursor-pointer hover:bg-gray-900 p-3 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 16 16"
              >
                <path
                  fill="none"
                  stroke="white"
                  stroke-linejoin="round"
                  d="M5 11.5h4M5 9h6M5 6.5h6m-5.5-4h-2v12h9v-12h-2m-5-1h5l-.625 2h-3.75z"
                  stroke-width="1"
                />
              </svg>
              <p class="text-white">Orders</p>
            </button>
          </div>
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
              <path
                v-if="!help.mobileMenuOpen.value"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path v-else d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="help.mobileMenuOpen.value"
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
    <slot />
  </div>
</template>

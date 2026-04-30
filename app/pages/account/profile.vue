<script setup lang="ts">
import { ref, computed } from "vue";

// ── Active sidebar section ────────────────────────────────────────────────────
const activeNav = ref("profile");
const sidebarOpen = ref(false);

const navItems = [
  { id: "profile",    label: "My Profile",        icon: "👤" },
  { id: "orders",     label: "My Orders",          icon: "📦" },
  { id: "inbox",      label: "Inbox",              icon: "✉️",  badge: 3 },
  { id: "wishlist",   label: "Wishlist",           icon: "❤️" },
  { id: "addresses",  label: "Address Book",       icon: "📍" },
  { id: "settings",   label: "Settings",           icon: "⚙️" },
  { id: "account",    label: "Account Management", icon: "🛡️" },
  { id: "referrals",  label: "Referrals",          icon: "🔗" },
];

// ── Mock user data ────────────────────────────────────────────────────────────
const user = ref({
  name: "Adebayo Okonkwo",
  username: "@bayo_shops",
  email: "adebayo@example.com",
  phone: "+234 812 345 6789",
  joined: "March 2023",
  avatar: "AO",
  tier: "Rising Star",
  score: 720,
  maxScore: 1000,
  totalOrders: 34,
  totalSpent: 1284.50,
  reviewsLeft: 12,
});

const scorePercent = computed(() => (user.value.score / user.value.maxScore) * 100);

const nextTier = computed(() => {
  if (user.value.score < 500)  return "Rising Star";
  if (user.value.score < 750)  return "Gold Buyer";
  if (user.value.score < 900)  return "Elite Member";
  return "Legend";
});

const addresses = ref([
  {
    id: 1, label: "Home", default: true,
    name: "Adebayo Okonkwo",
    line1: "14 Admiralty Way", line2: "Lekki Phase 1",
    city: "Lagos", state: "Lagos State", country: "Nigeria",
  },
  {
    id: 2, label: "Office", default: false,
    name: "Adebayo Okonkwo",
    line1: "Plot 5B, Adeola Odeku Street", line2: "Victoria Island",
    city: "Lagos", state: "Lagos State", country: "Nigeria",
  },
]);

const showAddressForm = ref(false);
</script>

<template>
  <div class="min-h-screen pt-20 px-10 bg-gray-950 text-gray-100 font-nunito">

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;500;600&display=swap" rel="stylesheet" />

    <!-- ── Mobile sidebar overlay ── -->
    <Transition name="fade">
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
      />
    </Transition>

    <div class="flex min-h-screen">

      <!-- ════════════════════════════════════════════
           SIDEBAR
      ════════════════════════════════════════════ -->
      <aside :class="[
        'fixed top-0 left-0 z-40 h-full w-64 bg-gray-900 border-r border-white/[0.06] flex flex-col transition-transform duration-300',
        'lg:translate-x-0 lg:static lg:z-auto',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]">

        <!-- Logo / Brand -->
        <div class="px-5 py-5 border-b border-white/[0.06]">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-gray-900 font-syne font-extrabold text-sm">S</div>
            <span class="font-syne font-extrabold text-base tracking-tight">ShopZone</span>
          </div>
        </div>

        <!-- User mini card -->
        <div class="px-4 py-4 border-b border-white/[0.06]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-syne font-extrabold text-gray-900 text-sm flex-shrink-0">
              {{ user.avatar }}
            </div>
            <div class="min-w-0">
              <p class="font-syne font-bold text-sm text-gray-100 truncate">{{ user.name }}</p>
              <p class="text-gray-500 text-xs truncate">{{ user.username }}</p>
            </div>
          </div>
          <!-- Score mini bar -->
          <div class="mt-3">
            <div class="flex justify-between text-xs mb-1">
              <span class="text-amber-400 font-syne font-bold">⭐ {{ user.tier }}</span>
              <span class="text-gray-500">{{ user.score }}/{{ user.maxScore }}</span>
            </div>
            <div class="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                class="h-full bg-amber-400 rounded-full transition-all duration-700"
                :style="{ width: scorePercent + '%' }"
              />
            </div>
          </div>
        </div>

        <!-- Nav links -->
        <nav class="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="activeNav = item.id; sidebarOpen = false"
            :class="[
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-syne font-bold transition-all text-left cursor-pointer',
              activeNav === item.id
                ? 'bg-amber-400/[0.12] text-amber-400 border border-amber-400/20'
                : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200 border border-transparent'
            ]"
          >
            <span class="text-base w-5 text-center flex-shrink-0">{{ item.icon }}</span>
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="bg-amber-400 text-gray-900 text-[10px] font-extrabold font-syne px-1.5 py-0.5 rounded-full leading-none"
            >{{ item.badge }}</span>
          </button>
        </nav>

        <!-- Logout -->
        <div class="px-3 py-4 border-t border-white/[0.06]">
          <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-syne font-bold text-red-400 hover:bg-red-500/[0.08] hover:border-red-500/20 border border-transparent transition-all cursor-pointer">
            <span class="text-base w-5 text-center">🚪</span>
            Log Out
          </button>
        </div>
      </aside>

      <!-- ════════════════════════════════════════════
           MAIN CONTENT
      ════════════════════════════════════════════ -->
      <main class="flex-1 min-w-0 px-4 py-8 md:px-8 lg:px-10 overflow-x-hidden">

        <!-- Mobile top bar -->
        <div class="flex items-center justify-between mb-8 lg:hidden">
          <button
            @click="sidebarOpen = true"
            class="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] text-gray-300 flex items-center justify-center cursor-pointer"
          >☰</button>
          <span class="font-syne font-extrabold text-base">My Account</span>
          <div class="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center font-syne font-extrabold text-gray-900 text-xs">
            {{ user.avatar }}
          </div>
        </div>

        <!-- Page title -->
        <div class="hidden lg:block mb-8">
          <p class="text-gray-500 text-sm mb-1">Welcome back,</p>
          <h1 class="font-syne font-extrabold text-3xl">{{ user.name }}</h1>
        </div>

        <!-- ════════ PROFILE VIEW ════════ -->
        <div v-if="activeNav === 'profile'" class="space-y-6">

          <!-- ── Profile Card ── -->
          <div class="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <!-- Avatar -->
              <div class="relative">
                <div class="w-20 h-20 rounded-2xl bg-amber-400 flex items-center justify-center font-syne font-extrabold text-gray-900 text-2xl flex-shrink-0">
                  {{ user.avatar }}
                </div>
                <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-950" />
              </div>
              <!-- Info -->
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h2 class="font-syne font-extrabold text-xl">{{ user.name }}</h2>
                  <span class="bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-syne font-bold px-2 py-0.5 rounded-full">
                    ⭐ {{ user.tier }}
                  </span>
                </div>
                <p class="text-gray-500 text-sm">{{ user.username }} · Joined {{ user.joined }}</p>
              </div>
              <button class="flex-shrink-0 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-gray-300 font-syne font-bold text-sm px-4 py-2 rounded-xl transition-all cursor-pointer">
                ✏️ Edit Profile
              </button>
            </div>

            <!-- Details grid -->
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <span class="text-xs font-syne font-bold text-gray-500 uppercase tracking-wider">Email</span>
                <span class="text-sm text-gray-200">{{ user.email }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-xs font-syne font-bold text-gray-500 uppercase tracking-wider">Phone</span>
                <span class="text-sm text-gray-200">{{ user.phone }}</span>
              </div>
            </div>
          </div>

          <!-- ── Stats Row ── -->
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 text-center">
              <p class="font-syne font-extrabold text-2xl text-gray-100">{{ user.totalOrders }}</p>
              <p class="text-gray-500 text-xs mt-1">Total Orders</p>
            </div>
            <div class="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 text-center">
              <p class="font-syne font-extrabold text-2xl text-amber-400">${{ user.totalSpent.toFixed(0) }}</p>
              <p class="text-gray-500 text-xs mt-1">Total Spent</p>
            </div>
            <div class="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 text-center">
              <p class="font-syne font-extrabold text-2xl text-gray-100">{{ user.reviewsLeft }}</p>
              <p class="text-gray-500 text-xs mt-1">Reviews</p>
            </div>
          </div>

          <!-- ── Rising Star Score ── -->
          <div class="bg-white/[0.02] border border-amber-400/20 rounded-2xl p-6 relative overflow-hidden">
            <!-- Background glow -->
            <div class="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-400/[0.04] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div class="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-xl">⭐</span>
                  <h3 class="font-syne font-extrabold text-base text-gray-100">Rising Star Score</h3>
                </div>
                <p class="text-gray-500 text-xs max-w-xs">
                  Earn points by shopping, leaving reviews, and referring friends. Unlock better tiers for exclusive perks.
                </p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="font-syne font-extrabold text-3xl text-amber-400">{{ user.score }}</p>
                <p class="text-gray-600 text-xs">of {{ user.maxScore }} pts</p>
              </div>
            </div>

            <!-- Progress bar -->
            <div class="mt-5">
              <div class="h-3 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000 relative"
                  :style="{ width: scorePercent + '%' }"
                >
                  <div class="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
                </div>
              </div>
              <div class="flex justify-between mt-2 text-xs">
                <span class="text-amber-400 font-syne font-bold">{{ user.tier }}</span>
                <span class="text-gray-500">Next: {{ nextTier }} at {{ user.score < 750 ? 750 : 900 }} pts</span>
              </div>
            </div>

            <!-- Tier milestones -->
            <div class="mt-5 grid grid-cols-4 gap-2">
              <div v-for="(tier, i) in [
                { name: 'Starter', pts: 0 },
                { name: 'Rising Star', pts: 500 },
                { name: 'Gold Buyer', pts: 750 },
                { name: 'Elite', pts: 900 },
              ]" :key="i"
                :class="[
                  'rounded-xl p-2.5 text-center border text-xs font-syne font-bold transition-all',
                  user.score >= tier.pts
                    ? 'bg-amber-400/[0.12] border-amber-400/30 text-amber-400'
                    : 'bg-white/[0.02] border-white/[0.06] text-gray-600'
                ]"
              >
                <p>{{ tier.name }}</p>
                <p class="font-normal text-[10px] mt-0.5 opacity-70">{{ tier.pts }}+ pts</p>
              </div>
            </div>
          </div>

        </div>

        <!-- ════════ ADDRESS BOOK VIEW ════════ -->
        <div v-else-if="activeNav === 'addresses'" class="space-y-5">
          <div class="flex items-center justify-between">
            <h2 class="font-syne font-extrabold text-xl">Address Book</h2>
            <button
              @click="showAddressForm = !showAddressForm"
              class="bg-amber-400 hover:bg-amber-300 text-gray-900 font-syne font-bold text-sm px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              + Add Address
            </button>
          </div>

          <!-- Add address form -->
          <Transition name="fadeslide">
            <div v-if="showAddressForm" class="bg-white/[0.02] border border-amber-400/20 rounded-2xl p-5">
              <h3 class="font-syne font-bold text-sm text-gray-100 mb-4">New Address</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex flex-col gap-1.5 sm:col-span-2">
                  <label class="text-xs font-syne font-bold text-gray-500 uppercase tracking-wider">Label (e.g. Home, Office)</label>
                  <input type="text" placeholder="Home"
                    class="bg-white/[0.04] border border-white/[0.09] focus:border-amber-400/50 rounded-xl px-3.5 py-2.5 text-gray-100 text-sm placeholder-gray-600 outline-none transition-all w-full" />
                </div>
                <div class="flex flex-col gap-1.5 sm:col-span-2">
                  <label class="text-xs font-syne font-bold text-gray-500 uppercase tracking-wider">Street Address</label>
                  <input type="text" placeholder="14 Admiralty Way"
                    class="bg-white/[0.04] border border-white/[0.09] focus:border-amber-400/50 rounded-xl px-3.5 py-2.5 text-gray-100 text-sm placeholder-gray-600 outline-none transition-all w-full" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-syne font-bold text-gray-500 uppercase tracking-wider">City</label>
                  <input type="text" placeholder="Lagos"
                    class="bg-white/[0.04] border border-white/[0.09] focus:border-amber-400/50 rounded-xl px-3.5 py-2.5 text-gray-100 text-sm placeholder-gray-600 outline-none transition-all w-full" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs font-syne font-bold text-gray-500 uppercase tracking-wider">State</label>
                  <input type="text" placeholder="Lagos State"
                    class="bg-white/[0.04] border border-white/[0.09] focus:border-amber-400/50 rounded-xl px-3.5 py-2.5 text-gray-100 text-sm placeholder-gray-600 outline-none transition-all w-full" />
                </div>
              </div>
              <div class="flex gap-3 mt-4">
                <button @click="showAddressForm = false"
                  class="flex-1 bg-transparent border border-white/10 hover:border-amber-400/30 hover:text-amber-400 text-gray-400 font-syne font-bold text-sm px-4 py-2.5 rounded-full transition-all cursor-pointer">
                  Cancel
                </button>
                <button @click="showAddressForm = false"
                  class="flex-1 bg-amber-400 hover:bg-amber-300 text-gray-900 font-syne font-bold text-sm px-4 py-2.5 rounded-full transition-colors cursor-pointer">
                  Save Address
                </button>
              </div>
            </div>
          </Transition>

          <!-- Address cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="addr in addresses"
              :key="addr.id"
              :class="[
                'bg-white/[0.02] border rounded-2xl p-5 relative transition-all',
                addr.default ? 'border-amber-400/30' : 'border-white/[0.07]'
              ]"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-base">📍</span>
                  <span class="font-syne font-extrabold text-sm text-gray-100">{{ addr.label }}</span>
                </div>
                <span v-if="addr.default"
                  class="bg-amber-400/15 border border-amber-400/30 text-amber-400 text-[10px] font-syne font-bold px-2 py-0.5 rounded-full">
                  Default
                </span>
              </div>
              <div class="text-sm text-gray-400 space-y-0.5">
                <p class="text-gray-200 font-bold text-xs font-syne">{{ addr.name }}</p>
                <p>{{ addr.line1 }}</p>
                <p v-if="addr.line2">{{ addr.line2 }}</p>
                <p>{{ addr.city }}, {{ addr.state }}</p>
                <p>{{ addr.country }}</p>
              </div>
              <div class="flex gap-2 mt-4">
                <button class="text-xs font-syne font-bold text-gray-500 hover:text-amber-400 transition-colors cursor-pointer">Edit</button>
                <span class="text-gray-700">·</span>
                <button v-if="!addr.default" class="text-xs font-syne font-bold text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Set Default</button>
                <button v-if="!addr.default" class="text-xs font-syne font-bold text-gray-500 hover:text-red-400 transition-colors cursor-pointer ml-auto">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ════════ INBOX VIEW ════════ -->
        <div v-else-if="activeNav === 'inbox'" class="space-y-4">
          <h2 class="font-syne font-extrabold text-xl mb-5">Inbox</h2>
          <div v-for="msg in [
            { id: 1, from: 'ShopZone Support', subject: 'Your order #4521 has shipped!', time: '2h ago', read: false, icon: '📦' },
            { id: 2, from: 'ShopZone Rewards', subject: 'You\'re 80pts away from Gold Buyer!', time: '1d ago', read: false, icon: '⭐' },
            { id: 3, from: 'ShopZone Support', subject: 'Review your recent purchase', time: '3d ago', read: true, icon: '✍️' },
          ]" :key="msg.id"
            :class="[
              'flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer hover:border-amber-400/20',
              msg.read ? 'bg-white/[0.01] border-white/[0.05]' : 'bg-white/[0.03] border-white/[0.08]'
            ]"
          >
            <div class="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-xl flex-shrink-0">{{ msg.icon }}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <p :class="['font-syne font-bold text-sm truncate', msg.read ? 'text-gray-400' : 'text-gray-100']">{{ msg.from }}</p>
                <span class="text-gray-600 text-xs flex-shrink-0">{{ msg.time }}</span>
              </div>
              <p :class="['text-sm truncate mt-0.5', msg.read ? 'text-gray-600' : 'text-gray-300']">{{ msg.subject }}</p>
            </div>
            <div v-if="!msg.read" class="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0 mt-2" />
          </div>
        </div>

        <!-- ════════ OTHER SECTIONS — placeholder ════════ -->
        <div v-else class="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <span class="text-5xl">{{ navItems.find(n => n.id === activeNav)?.icon }}</span>
          <h2 class="font-syne font-extrabold text-xl text-gray-200">
            {{ navItems.find(n => n.id === activeNav)?.label }}
          </h2>
          <p class="text-gray-600 text-sm max-w-xs">This section is coming soon. Check back later!</p>
        </div>

      </main>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;500;600&display=swap");

.font-syne   { font-family: "Syne", sans-serif; }
.font-nunito { font-family: "Nunito", sans-serif; }

/* Vue transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.fadeslide-enter-active, .fadeslide-leave-active { transition: all 0.25s ease; }
.fadeslide-enter-from  { opacity: 0; transform: translateY(-8px); }
.fadeslide-leave-to    { opacity: 0; transform: translateY(-8px); }

/* Thin scrollbar */
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #374151; border-radius: 2px; }
</style>
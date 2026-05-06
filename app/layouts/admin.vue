<script setup>
const page = ref("home");

function navClass(p) {
  const base =
    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all mb-1 border cursor-pointer ";
  return page.value === p
    ? base + "bg-amber-400 text-gray-900 border-amber-400"
    : base +
        "text-gray-400 hover:text-gray-100 hover:bg-gray-800 border-transparent";
}
const orders = ref([
  {
    id: "ORD-0091",
    customerName: "Amaka Obi",
    productName: "Running Shoes",
    amount: 24500,
    date: "May 4, 2026",
    status: "shipped",
  },
  {
    id: "ORD-0090",
    customerName: "Tunde Bello",
    productName: "Wireless Earbuds",
    amount: 18000,
    date: "May 4, 2026",
    status: "pending",
  },
  {
    id: "ORD-0089",
    customerName: "Chisom Eze",
    productName: "Sneakers (x2)",
    amount: 49000,
    date: "May 3, 2026",
    status: "delivered",
  },
  {
    id: "ORD-0088",
    customerName: "Kemi Adeyemi",
    productName: "Handbag",
    amount: 31200,
    date: "May 3, 2026",
    status: "shipped",
  },
  {
    id: "ORD-0087",
    customerName: "Biodun Adewale",
    productName: "Cap + T-Shirt",
    amount: 12800,
    date: "May 2, 2026",
    status: "delivered",
  },
]);

const toast = reactive({ show: false, message: "" });
</script>

<template>
  <div
    class="flex h-screen overflow-hidden bg-gray-950 text-gray-100 font-sans"
  >
    <!-- ── SIDEBAR ── -->
    <nav
      class="w-60 flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col"
    >
      <!-- Logo -->
      <div class="px-6 py-7 border-b border-gray-800">
        <p
          class="text-[10px] font-mono tracking-widest text-amber-400 uppercase mb-1"
        >
          Admin Panel
        </p>
        <p class="text-xl font-extrabold tracking-tight">
          Shop<span class="text-amber-400">HQ</span>
        </p>
      </div>

      <!-- Nav -->
      <div class="flex-1 px-3 py-5">
        <p
          class="text-[9px] font-mono tracking-widest uppercase text-gray-500 px-3 mb-2"
        >
          Main
        </p>

        <button @click="page = 'home'" :class="navClass('home')">
          <svg
            class="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            viewBox="0 0 24 24"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Home
        </button>

        <p
          class="text-[9px] font-mono tracking-widest uppercase text-gray-500 px-3 mt-5 mb-2"
        >
          Commerce
        </p>

        <button @click="page = 'orders'" :class="navClass('orders')">
          <svg
            class="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            viewBox="0 0 24 24"
          >
            <path d="M16 11V7a4 4 0 00-8 0v4" />
            <rect x="3" y="11" width="18" height="11" rx="2" />
          </svg>
          Orders Sent
          <span
            class="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
            :class="
              page === 'orders'
                ? 'bg-gray-900/30 text-gray-900'
                : 'bg-gray-800 text-gray-400'
            "
          >
            {{ orders.length }}
          </span>
        </button>

        <button @click="page = 'listing'" :class="navClass('listing')">
          <svg
            class="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Listing
        </button>
      </div>

      <!-- Admin chip -->
      <div class="px-3 py-4 border-t border-gray-800">
        <div
          class="flex items-center gap-3 px-3 py-2.5 bg-gray-800 rounded-lg border border-gray-700"
        >
          <div
            class="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 text-sm font-extrabold shrink-0"
          >
            A
          </div>
          <div class="min-w-0">
            <p class="text-sm font-bold text-gray-100 truncate">Admin</p>
            <p class="text-[10px] font-mono text-amber-400">● SUPER ADMIN</p>
          </div>
        </div>
      </div>
    </nav>

    <slot />
  </div>
</template>
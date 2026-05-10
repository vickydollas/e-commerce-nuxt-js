<script setup>
definePageMeta({ layout: "admin" });

const page = ref("home");
const activeFilter = ref("All");

const pageMeta = {
  home: {
    title: "Overview",
    subtitle: "Welcome back — here's what's happening today",
  },
  orders: {
    title: "Orders Sent",
    subtitle: "Track and manage all outgoing orders",
  },
  listing: {
    title: "Add Listing",
    subtitle: "Add a new product to your store",
  },
};

function navClass(p) {
  const base =
    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all mb-1 border cursor-pointer ";
  return page.value === p
    ? base + "bg-amber-400 text-gray-900 border-amber-400"
    : base +
        "text-gray-400 hover:text-gray-100 hover:bg-gray-800 border-transparent";
}

function chipClass(status) {
  return (
    {
      pending: "bg-orange-500/10 text-orange-400",
      shipped: "bg-amber-400/10 text-amber-400",
      delivered: "bg-green-500/10 text-green-400",
    }[status] || "bg-gray-700 text-gray-400"
  );
}

const products = ref([]);
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

const totalRevenue = computed(() =>
  orders.value
    .filter((o) => o.status !== "pending")
    .reduce((s, o) => s + o.amount, 0),
);
const filteredOrders = computed(() =>
  activeFilter.value === "All"
    ? orders.value
    : orders.value.filter((o) => o.status === activeFilter.value),
);

const fileInput = ref(null);
const imagePreview = ref(null);
const submitting = ref(false);
const form = reactive({
  name: "",
  price: null,
  stock: null,
  category: "",
  description: "",
});

const previewFields = computed(() => [
  { key: "Name", val: form.name || "—" },
  {
    key: "Price",
    val: form.price ? "₦" + Number(form.price).toLocaleString() : "—",
  },
  { key: "Category", val: form.category || "—" },
  { key: "Stock", val: form.stock ? form.stock + " units" : "—" },
]);

function triggerUpload() {
  fileInput.value?.click();
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  // TODO: Upload to Cloudinary, save URL to form.imageUrl
  const reader = new FileReader();
  reader.onload = (ev) => {
    imagePreview.value = ev.target.result;
  };
  reader.readAsDataURL(file);
}

async function submitProduct() {
  if (!form.name || !form.price) {
    showToast("⚠ Name and price are required");
    return;
  }
  submitting.value = true;
  try {
    // await $fetch('/api/products', { method: 'POST', body: { ...form } })
    await new Promise((r) => setTimeout(r, 800));
    showToast(`✓ "${form.name}" published!`);
    resetForm();
  } catch {
    showToast("✗ Failed to publish product");
  } finally {
    submitting.value = false;
  }
}

function resetForm() {
  Object.assign(form, {
    name: "",
    price: null,
    stock: null,
    category: "",
    description: "",
  });
  imagePreview.value = null;
}

const toast = reactive({ show: false, message: "" });
function showToast(msg) {
  toast.message = msg;
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Topbar -->
    <div
      class="flex items-center justify-between px-8 py-5 bg-gray-900 border-b border-gray-800 shrink-0"
    >
      <div>
        <h1 class="text-xl font-extrabold tracking-tight">
          {{ pageMeta[page].title }}
        </h1>
        <p class="text-xs font-mono text-gray-500 mt-0.5">
          {{ pageMeta[page].subtitle }}
        </p>
      </div>
      <button
        @click="page = 'listing'"
        class="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold rounded-lg transition-all"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          viewBox="0 0 24 24"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        New Product
      </button>
    </div>

    <!-- Scrollable content -->
    <div class="flex-1 overflow-y-auto p-8">
      <!-- ── HOME ── -->
      <div>
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div
            class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-400/40 transition-colors"
          >
            <p
              class="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-3"
            >
              Total Revenue
            </p>
            <p class="text-3xl font-extrabold tracking-tight">
              ₦{{ totalRevenue.toLocaleString() }}
            </p>
            <p class="text-xs font-mono text-amber-400 mt-2">
              ↑ from shipped orders
            </p>
          </div>
          <div
            class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-400/40 transition-colors"
          >
            <p
              class="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-3"
            >
              Orders Sent
            </p>
            <p class="text-3xl font-extrabold tracking-tight">
              {{ orders.length }}
            </p>
            <p class="text-xs font-mono text-amber-400 mt-2">↑ all time</p>
          </div>
          <div
            class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-400/40 transition-colors"
          >
            <p
              class="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-3"
            >
              Active Listings
            </p>
            <p class="text-3xl font-extrabold tracking-tight">38</p>
            <p class="text-xs font-mono text-gray-500 mt-2">in your store</p>
          </div>
        </div>

        <h2 class="text-sm font-extrabold mb-4">Recent Orders</h2>
        <div
          class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
        >
          <div
            class="grid grid-cols-[1fr_1.2fr_0.9fr_0.8fr_0.7fr] px-5 py-3 bg-gray-800/50 border-b border-gray-800"
          >
            <span
              v-for="h in [
                'Order ID',
                'Customer',
                'Product',
                'Amount',
                'Status',
              ]"
              :key="h"
              class="text-[10px] font-mono tracking-widest uppercase text-gray-500"
              >{{ h }}</span
            >
          </div>
          <div
            v-for="order in orders.slice(0, 5)"
            :key="order.id"
            class="grid grid-cols-[1fr_1.2fr_0.9fr_0.8fr_0.7fr] px-5 py-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/30 transition-colors items-center text-sm"
          >
            <span class="font-mono text-amber-400 text-xs"
              >#{{ order.id }}</span
            >
            <span>{{ order.customerName }}</span>
            <span class="text-gray-400 text-xs">{{ order.productName }}</span>
            <span>₦{{ order.amount.toLocaleString() }}</span>
            <span
              :class="chipClass(order.status)"
              class="inline-flex px-2.5 py-1 rounded-full text-[10px] font-mono font-medium w-fit capitalize"
              >{{ order.status }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── TOAST ── -->
  <transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-8"
  >
    <div
      v-if="toast.show"
      class="fixed bottom-7 right-7 flex items-center gap-3 px-5 py-3.5 bg-gray-900 border border-amber-400 rounded-xl text-amber-400 text-xs font-mono font-bold shadow-2xl z-50"
    >
      {{ toast.message }}
    </div>
  </transition>
</template>
